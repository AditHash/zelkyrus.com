'use client';
import { useEffect, useRef } from 'react';

interface ColorRGB { r: number; g: number; b: number }
interface Pointer {
  id: number; texcoordX: number; texcoordY: number;
  prevTexcoordX: number; prevTexcoordY: number;
  deltaX: number; deltaY: number;
  down: boolean; moved: boolean; color: ColorRGB;
}

function pointerPrototype(): Pointer {
  return { id: -1, texcoordX: 0, texcoordY: 0, prevTexcoordX: 0, prevTexcoordY: 0,
    deltaX: 0, deltaY: 0, down: false, moved: false, color: { r: 0, g: 0, b: 0 } };
}

interface SplashCursorProps {
  SIM_RESOLUTION?: number; DYE_RESOLUTION?: number; CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number; VELOCITY_DISSIPATION?: number; PRESSURE?: number;
  PRESSURE_ITERATIONS?: number; CURL?: number; SPLAT_RADIUS?: number; SPLAT_FORCE?: number;
  SHADING?: boolean; COLOR_UPDATE_SPEED?: number; BACK_COLOR?: ColorRGB; TRANSPARENT?: boolean;
}

export default function SplashCursor({
  SIM_RESOLUTION = 128, DYE_RESOLUTION = 1440, CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5, VELOCITY_DISSIPATION = 2, PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20, CURL = 3, SPLAT_RADIUS = 0.2, SPLAT_FORCE = 6000,
  SHADING = true, COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0, g: 0, b: 0 }, TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointers: Pointer[] = [pointerPrototype()];

    const config = {
      SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION, DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS,
      SPLAT_FORCE, SHADING, COLOR_UPDATE_SPEED, PAUSED: false, BACK_COLOR, TRANSPARENT,
    };

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
      if (!gl) gl = (canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;
      if (!gl) throw new Error('WebGL not available');
      const isWebGL2 = 'drawBuffers' in gl;
      let supportLinearFiltering = false;
      let halfFloat = null;
      if (isWebGL2) {
        (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
      }
      gl.clearColor(0, 0, 0, 1);
      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : ((halfFloat as any)?.HALF_FLOAT_OES || 0);
      let formatRGBA: any, formatRG: any, formatR: any;
      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG   = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F,   (gl as WebGL2RenderingContext).RG,  halfFloatTexType);
        formatR    = getSupportedFormat(gl, (gl as WebGL2RenderingContext).R16F,    (gl as WebGL2RenderingContext).RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG   = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR    = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }
      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    function getSupportedFormat(gl: any, internalFormat: number, format: number, type: number): any {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if ('drawBuffers' in gl) {
          const g = gl as WebGL2RenderingContext;
          if (internalFormat === g.R16F)  return getSupportedFormat(g, g.RG16F,   g.RG,   type);
          if (internalFormat === g.RG16F) return getSupportedFormat(g, g.RGBA16F, g.RGBA, type);
          return null;
        }
        return null;
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext, internalFormat: number, format: number, type: number) {
      const tex = gl.createTexture();
      if (!tex) return false;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      if (!fbo) return false;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    const { gl, ext } = getWebGLContext(canvas);

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function compileShader(type: number, source: string, keywords: string[] | null = null): WebGLShader | null {
      let src = source;
      if (keywords) src = keywords.map(k => `#define ${k}\n`).join('') + src;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(shader)); return null; }
      return shader;
    }

    function createProgram(vs: WebGLShader | null, fs: WebGLShader | null): WebGLProgram | null {
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      if (!p) return null;
      gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(p)); return null; }
      return p;
    }

    function getUniforms(program: WebGLProgram) {
      const u: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) u[info.name] = gl.getUniformLocation(program, info.name);
      }
      return u;
    }

    function hashCode(s: string) {
      let h = 0;
      for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
      return h;
    }

    class GLProgram {
      program: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vs: WebGLShader | null, fs: WebGLShader | null) {
        this.program = createProgram(vs, fs);
        this.uniforms = this.program ? getUniforms(this.program) : {};
      }
      bind() { if (this.program) gl.useProgram(this.program); }
    }

    class Material {
      vs: WebGLShader | null; fsSource: string;
      programs: Record<number, WebGLProgram | null> = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: Record<string, WebGLUniformLocation | null> = {};
      constructor(vs: WebGLShader | null, fsSource: string) { this.vs = vs; this.fsSource = fsSource; }
      setKeywords(kws: string[]) {
        let hash = 0; for (const k of kws) hash += hashCode(k);
        let p = this.programs[hash];
        if (p == null) { const fs = compileShader(gl.FRAGMENT_SHADER, this.fsSource, kws); p = createProgram(this.vs, fs); this.programs[hash] = p; }
        if (p === this.activeProgram) return;
        if (p) this.uniforms = getUniforms(p);
        this.activeProgram = p;
      }
      bind() { if (this.activeProgram) gl.useProgram(this.activeProgram); }
    }

    const baseVS = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }`);

    const copyFS      = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main(){gl_FragColor=texture2D(uTexture,vUv);}`);
    const clearFS     = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main(){gl_FragColor=value*texture2D(uTexture,vUv);}`);
    const splatFS     = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main(){vec2 p=vUv-point.xy; p.x*=aspectRatio; vec3 splat=exp(-dot(p,p)/radius)*color; vec3 base=texture2D(uTarget,vUv).xyz; gl_FragColor=vec4(base+splat,1.0);}`);
    const divergenceFS = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main(){float L=texture2D(uVelocity,vL).x; float R=texture2D(uVelocity,vR).x; float T=texture2D(uVelocity,vT).y; float B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy; if(vL.x<0.0){L=-C.x;} if(vR.x>1.0){R=-C.x;} if(vT.y>1.0){T=-C.y;} if(vB.y<0.0){B=-C.y;} float div=0.5*(R-L+T-B); gl_FragColor=vec4(div,0.0,0.0,1.0);}`);
    const curlFS      = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main(){float L=texture2D(uVelocity,vL).y; float R=texture2D(uVelocity,vR).y; float T=texture2D(uVelocity,vT).x; float B=texture2D(uVelocity,vB).x; float vorticity=R-L-T+B; gl_FragColor=vec4(0.5*vorticity,0.0,0.0,1.0);}`);
    const vorticityFS = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt; void main(){float L=texture2D(uCurl,vL).x; float R=texture2D(uCurl,vR).x; float T=texture2D(uCurl,vT).x; float B=texture2D(uCurl,vB).x; float C=texture2D(uCurl,vUv).x; vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L)); force/=length(force)+0.0001; force*=curl*C; force.y*=-1.0; vec2 velocity=texture2D(uVelocity,vUv).xy; velocity+=force*dt; velocity=min(max(velocity,-1000.0),1000.0); gl_FragColor=vec4(velocity,0.0,1.0);}`);
    const pressureFS  = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; void main(){float L=texture2D(uPressure,vL).x; float R=texture2D(uPressure,vR).x; float T=texture2D(uPressure,vT).x; float B=texture2D(uPressure,vB).x; float divergence=texture2D(uDivergence,vUv).x; float pressure=(L+R+B+T-divergence)*0.25; gl_FragColor=vec4(pressure,0.0,0.0,1.0);}`);
    const gradSubFS   = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; void main(){float L=texture2D(uPressure,vL).x; float R=texture2D(uPressure,vR).x; float T=texture2D(uPressure,vT).x; float B=texture2D(uPressure,vB).x; vec2 velocity=texture2D(uVelocity,vUv).xy; velocity.xy-=vec2(R-L,T-B); gl_FragColor=vec4(velocity,0.0,1.0);}`);
    const advectionFS = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation; vec4 bilerp(sampler2D sam,vec2 uv,vec2 tsize){vec2 st=uv/tsize-0.5; vec2 iuv=floor(st); vec2 fuv=fract(st); vec4 a=texture2D(sam,(iuv+vec2(0.5,0.5))*tsize); vec4 b=texture2D(sam,(iuv+vec2(1.5,0.5))*tsize); vec4 c=texture2D(sam,(iuv+vec2(0.5,1.5))*tsize); vec4 d=texture2D(sam,(iuv+vec2(1.5,1.5))*tsize); return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);} void main(){#ifdef MANUAL_FILTERING vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize; vec4 result=bilerp(uSource,coord,dyeTexelSize); #else vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize; vec4 result=texture2D(uSource,coord); #endif float decay=1.0+dissipation*dt; gl_FragColor=result/decay;}`, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);

    const displayFSSource = `precision highp float; precision highp sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uTexture; uniform vec2 texelSize; vec3 linearToGamma(vec3 color){color=max(color,vec3(0)); return max(1.055*pow(color,vec3(0.416666667))-0.055,vec3(0));} void main(){vec3 c=texture2D(uTexture,vUv).rgb; #ifdef SHADING vec3 lc=texture2D(uTexture,vL).rgb; vec3 rc=texture2D(uTexture,vR).rgb; vec3 tc=texture2D(uTexture,vT).rgb; vec3 bc=texture2D(uTexture,vB).rgb; float dx=length(rc)-length(lc); float dy=length(tc)-length(bc); vec3 n=normalize(vec3(dx,dy,length(texelSize))); vec3 l=vec3(0.0,0.0,1.0); float diffuse=clamp(dot(n,l)+0.7,0.7,1.0); c*=diffuse; #endif float a=max(c.r,max(c.g,c.b)); gl_FragColor=vec4(c,a);}`;

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    const eBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    interface FBO { texture: WebGLTexture; fbo: WebGLFramebuffer; width: number; height: number; texelSizeX: number; texelSizeY: number; attach(id: number): number; }
    interface DFBO { width: number; height: number; texelSizeX: number; texelSizeY: number; read: FBO; write: FBO; swap(): void; }

    function blit(target: FBO | null, doClear = false) {
      if (!target) { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
      else { gl.viewport(0, 0, target.width, target.height); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); }
      if (doClear) { gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h); gl.clear(gl.COLOR_BUFFER_BIT);
      const texelSizeX = 1 / w, texelSizeY = 1 / h;
      return { texture, fbo, width: w, height: h, texelSizeX, texelSizeY, attach(id) { gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    }

    function createDFBO(w: number, h: number, iF: number, f: number, t: number, p: number): DFBO {
      const r = createFBO(w,h,iF,f,t,p), wr = createFBO(w,h,iF,f,t,p);
      return { width: w, height: h, texelSizeX: r.texelSizeX, texelSizeY: r.texelSizeY, read: r, write: wr, swap() { const tmp=this.read; this.read=this.write; this.write=tmp; } };
    }

    function resizeFBO(target: FBO, w: number, h: number, iF: number, f: number, t: number, p: number) {
      const n = createFBO(w,h,iF,f,t,p);
      copyP.bind(); if (copyP.uniforms.uTexture) gl.uniform1i(copyP.uniforms.uTexture, target.attach(0));
      blit(n, false); return n;
    }

    function resizeDFBO(target: DFBO, w: number, h: number, iF: number, f: number, t: number, p: number) {
      if (target.width===w && target.height===h) return target;
      target.read = resizeFBO(target.read, w,h,iF,f,t,p);
      target.write = createFBO(w,h,iF,f,t,p);
      target.width=w; target.height=h; target.texelSizeX=1/w; target.texelSizeY=1/h;
      return target;
    }

    function getResolution(res: number) {
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const ar = w/h; const aspect = ar < 1 ? 1/ar : ar;
      const min = Math.round(res), max = Math.round(res*aspect);
      return w > h ? { width: max, height: min } : { width: min, height: max };
    }

    function scaleByPR(v: number) { return Math.floor(v * (window.devicePixelRatio || 1)); }

    const copyP       = new GLProgram(baseVS, copyFS);
    const clearP      = new GLProgram(baseVS, clearFS);
    const splatP      = new GLProgram(baseVS, splatFS);
    const advectionP  = new GLProgram(baseVS, advectionFS);
    const divergenceP = new GLProgram(baseVS, divergenceFS);
    const curlP       = new GLProgram(baseVS, curlFS);
    const vorticityP  = new GLProgram(baseVS, vorticityFS);
    const pressureP   = new GLProgram(baseVS, pressureFS);
    const gradSubP    = new GLProgram(baseVS, gradSubFS);
    const displayM    = new Material(baseVS, displayFSSource);

    let dye: DFBO, velocity: DFBO, divergenceFBO: FBO, curlFBO: FBO, pressureFBO: DFBO;

    function initFBOs() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA, rg = ext.formatRG, r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);
      if (!dye) dye = createDFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      else dye = resizeDFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      if (!velocity) velocity = createDFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      else velocity = resizeDFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      divergenceFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curlFBO       = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressureFBO   = createDFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    displayM.setKeywords(config.SHADING ? ['SHADING'] : []);
    initFBOs();

    let lastTime = Date.now(), colorTimer = 0;

    function step(dt: number) {
      gl.disable(gl.BLEND);
      curlP.bind();
      if (curlP.uniforms.texelSize) gl.uniform2f(curlP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (curlP.uniforms.uVelocity) gl.uniform1i(curlP.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFBO);
      vorticityP.bind();
      if (vorticityP.uniforms.texelSize) gl.uniform2f(vorticityP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (vorticityP.uniforms.uVelocity) gl.uniform1i(vorticityP.uniforms.uVelocity, velocity.read.attach(0));
      if (vorticityP.uniforms.uCurl) gl.uniform1i(vorticityP.uniforms.uCurl, curlFBO.attach(1));
      if (vorticityP.uniforms.curl) gl.uniform1f(vorticityP.uniforms.curl, config.CURL);
      if (vorticityP.uniforms.dt) gl.uniform1f(vorticityP.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();
      divergenceP.bind();
      if (divergenceP.uniforms.texelSize) gl.uniform2f(divergenceP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (divergenceP.uniforms.uVelocity) gl.uniform1i(divergenceP.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergenceFBO);
      clearP.bind();
      if (clearP.uniforms.uTexture) gl.uniform1i(clearP.uniforms.uTexture, pressureFBO.read.attach(0));
      if (clearP.uniforms.value) gl.uniform1f(clearP.uniforms.value, config.PRESSURE);
      blit(pressureFBO.write); pressureFBO.swap();
      pressureP.bind();
      if (pressureP.uniforms.texelSize) gl.uniform2f(pressureP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (pressureP.uniforms.uDivergence) gl.uniform1i(pressureP.uniforms.uDivergence, divergenceFBO.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        if (pressureP.uniforms.uPressure) gl.uniform1i(pressureP.uniforms.uPressure, pressureFBO.read.attach(1));
        blit(pressureFBO.write); pressureFBO.swap();
      }
      gradSubP.bind();
      if (gradSubP.uniforms.texelSize) gl.uniform2f(gradSubP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (gradSubP.uniforms.uPressure) gl.uniform1i(gradSubP.uniforms.uPressure, pressureFBO.read.attach(0));
      if (gradSubP.uniforms.uVelocity) gl.uniform1i(gradSubP.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();
      advectionP.bind();
      if (advectionP.uniforms.texelSize) gl.uniform2f(advectionP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering && advectionP.uniforms.dyeTexelSize) gl.uniform2f(advectionP.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const vId = velocity.read.attach(0);
      if (advectionP.uniforms.uVelocity) gl.uniform1i(advectionP.uniforms.uVelocity, vId);
      if (advectionP.uniforms.uSource)   gl.uniform1i(advectionP.uniforms.uSource, vId);
      if (advectionP.uniforms.dt)         gl.uniform1f(advectionP.uniforms.dt, dt);
      if (advectionP.uniforms.dissipation) gl.uniform1f(advectionP.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();
      if (!ext.supportLinearFiltering && advectionP.uniforms.dyeTexelSize) gl.uniform2f(advectionP.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      if (advectionP.uniforms.uVelocity) gl.uniform1i(advectionP.uniforms.uVelocity, velocity.read.attach(0));
      if (advectionP.uniforms.uSource)   gl.uniform1i(advectionP.uniforms.uSource, dye.read.attach(1));
      if (advectionP.uniforms.dissipation) gl.uniform1f(advectionP.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function drawDisplay() {
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      displayM.bind();
      if (config.SHADING && displayM.uniforms.texelSize) gl.uniform2f(displayM.uniforms.texelSize, 1/w, 1/h);
      if (displayM.uniforms.uTexture) gl.uniform1i(displayM.uniforms.uTexture, dye.read.attach(0));
      blit(null, false);
    }

    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
      const i = Math.floor(h*6), f=h*6-i, p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
      const cases: [number,number,number][] = [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]];
      const [r,g,b] = cases[i%6]; return {r,g,b};
    }

    function generateColor(): ColorRGB {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      return { r: c.r*0.15, g: c.g*0.15, b: c.b*0.15 };
    }

    function correctRadius(radius: number) {
      const ar = canvas!.width/canvas!.height;
      if (ar > 1) radius *= ar; return radius;
    }

    function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {
      splatP.bind();
      if (splatP.uniforms.uTarget) gl.uniform1i(splatP.uniforms.uTarget, velocity.read.attach(0));
      if (splatP.uniforms.aspectRatio) gl.uniform1f(splatP.uniforms.aspectRatio, canvas!.width/canvas!.height);
      if (splatP.uniforms.point) gl.uniform2f(splatP.uniforms.point, x, y);
      if (splatP.uniforms.color) gl.uniform3f(splatP.uniforms.color, dx, dy, 0);
      if (splatP.uniforms.radius) gl.uniform1f(splatP.uniforms.radius, correctRadius(config.SPLAT_RADIUS/100));
      blit(velocity.write); velocity.swap();
      if (splatP.uniforms.uTarget) gl.uniform1i(splatP.uniforms.uTarget, dye.read.attach(0));
      if (splatP.uniforms.color) gl.uniform3f(splatP.uniforms.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    function splatPointer(p: Pointer) { splat(p.texcoordX, p.texcoordY, p.deltaX*config.SPLAT_FORCE, p.deltaY*config.SPLAT_FORCE, p.color); }

    function clickSplat(p: Pointer) {
      const c = generateColor(); c.r*=10; c.g*=10; c.b*=10;
      splat(p.texcoordX, p.texcoordY, 10*(Math.random()-0.5), 30*(Math.random()-0.5), c);
    }

    function resizeCanvas() {
      const w = scaleByPR(canvas!.clientWidth), h = scaleByPR(canvas!.clientHeight);
      if (canvas!.width!==w || canvas!.height!==h) { canvas!.width=w; canvas!.height=h; return true; }
      return false;
    }

    let rafId: number;
    function update() {
      rafId = requestAnimationFrame(update);
      const now = Date.now(); let dt = Math.min((now-lastTime)/1000, 0.016666); lastTime = now;
      if (resizeCanvas()) initFBOs();
      colorTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorTimer >= 1) { colorTimer = colorTimer % 1; pointers.forEach(p => { p.color = generateColor(); }); }
      pointers.forEach(p => { if (p.moved) { p.moved=false; splatPointer(p); } });
      step(dt);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.enable(gl.BLEND);
      drawDisplay();
    }

    update();

    const onMouseDown = (e: MouseEvent) => {
      const p = pointers[0]; const x = scaleByPR(e.clientX), y = scaleByPR(e.clientY);
      p.id=-1; p.down=true; p.moved=false; p.texcoordX=x/canvas!.width; p.texcoordY=1-y/canvas!.height;
      p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY; p.deltaX=0; p.deltaY=0; p.color=generateColor();
      clickSplat(p);
    };
    const onMouseMove = (e: MouseEvent) => {
      const p = pointers[0]; const x = scaleByPR(e.clientX), y = scaleByPR(e.clientY);
      p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
      p.texcoordX=x/canvas!.width; p.texcoordY=1-y/canvas!.height;
      const ar = canvas!.width/canvas!.height;
      p.deltaX = (p.texcoordX-p.prevTexcoordX) * (ar < 1 ? ar : 1);
      p.deltaY = (p.texcoordY-p.prevTexcoordY) / (ar > 1 ? ar : 1);
      p.moved = Math.abs(p.deltaX)>0 || Math.abs(p.deltaY)>0;
    };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="w-screen h-screen block" />
    </div>
  );
}
