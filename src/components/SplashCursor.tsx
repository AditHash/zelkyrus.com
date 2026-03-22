import { useEffect, useRef } from 'react';

interface RGB { r: number; g: number; b: number }

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── WebGL setup ──────────────────────────────────────────────────────────
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
    const isWebGL2 = !!gl;
    if (!gl) gl = (canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;
    if (!gl) return;

    let supportLinearFiltering = false;
    let halfFloat: any = null;
    if (isWebGL2) {
      (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
      supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
    }
    const halfFloatTexType = isWebGL2
      ? (gl as WebGL2RenderingContext).HALF_FLOAT
      : (halfFloat?.HALF_FLOAT_OES ?? 0);

    function getSupportedFormat(iF: number, f: number): { internalFormat: number; format: number } | null {
      const tex = gl!.createTexture(); if (!tex) return null;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, iF, 4, 4, 0, f, halfFloatTexType, null);
      const fbo = gl!.createFramebuffer(); if (!fbo) return null;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      if (gl!.checkFramebufferStatus(gl!.FRAMEBUFFER) !== gl!.FRAMEBUFFER_COMPLETE) {
        if (!isWebGL2) return null;
        const g = gl as WebGL2RenderingContext;
        if (iF === g.R16F)  return getSupportedFormat(g.RG16F,   g.RG);
        if (iF === g.RG16F) return getSupportedFormat(g.RGBA16F, g.RGBA);
        return null;
      }
      return { internalFormat: iF, format: f };
    }

    let formatRGBA: any, formatRG: any, formatR: any;
    if (isWebGL2) {
      const g = gl as WebGL2RenderingContext;
      formatRGBA = getSupportedFormat(g.RGBA16F, g.RGBA);
      formatRG   = getSupportedFormat(g.RG16F,   g.RG);
      formatR    = getSupportedFormat(g.R16F,    g.RED);
    } else {
      formatRGBA = getSupportedFormat(gl.RGBA, gl.RGBA);
      formatRG   = getSupportedFormat(gl.RGBA, gl.RGBA);
      formatR    = getSupportedFormat(gl.RGBA, gl.RGBA);
    }

    // ── Shader helpers ───────────────────────────────────────────────────────
    function compile(type: number, src: string, defs?: string[]): WebGLShader | null {
      const s = gl!.createShader(type); if (!s) return null;
      gl!.shaderSource(s, (defs ? defs.map(d => `#define ${d}\n`).join('') : '') + src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) { console.error(gl!.getShaderInfoLog(s)); return null; }
      return s;
    }
    function link(vs: WebGLShader | null, fs: WebGLShader | null): WebGLProgram | null {
      if (!vs || !fs) return null;
      const p = gl!.createProgram(); if (!p) return null;
      gl!.attachShader(p, vs); gl!.attachShader(p, fs); gl!.linkProgram(p);
      if (!gl!.getProgramParameter(p, gl!.LINK_STATUS)) { console.error(gl!.getProgramInfoLog(p)); return null; }
      return p;
    }
    function uniforms(prog: WebGLProgram) {
      const u: Record<string, WebGLUniformLocation | null> = {};
      const n = gl!.getProgramParameter(prog, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) { const info = gl!.getActiveUniform(prog, i); if (info) u[info.name] = gl!.getUniformLocation(prog, info.name); }
      return u;
    }

    // ── Shaders ──────────────────────────────────────────────────────────────
    const baseVS = compile(gl.VERTEX_SHADER, `precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv,vL,vR,vT,vB;
      uniform vec2 texelSize;
      void main(){
        vUv=aPosition*0.5+0.5;
        vL=vUv-vec2(texelSize.x,0.0); vR=vUv+vec2(texelSize.x,0.0);
        vT=vUv+vec2(0.0,texelSize.y); vB=vUv-vec2(0.0,texelSize.y);
        gl_Position=vec4(aPosition,0.0,1.0);
      }`);

    const programs = {
      copy:    link(baseVS, compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main(){gl_FragColor=texture2D(uTexture,vUv);}`)),
      clear:   link(baseVS, compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main(){gl_FragColor=value*texture2D(uTexture,vUv);}`)),
      splat:   link(baseVS, compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio,radius; uniform vec3 color; uniform vec2 point; void main(){vec2 p=vUv-point; p.x*=aspectRatio; vec3 splat=exp(-dot(p,p)/radius)*color; gl_FragColor=vec4(texture2D(uTarget,vUv).xyz+splat,1.0);}`)),
      div:     link(baseVS, compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity; void main(){float L=texture2D(uVelocity,vL).x,R=texture2D(uVelocity,vR).x,T=texture2D(uVelocity,vT).y,B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy; if(vL.x<0.0)L=-C.x; if(vR.x>1.0)R=-C.x; if(vT.y>1.0)T=-C.y; if(vB.y<0.0)B=-C.y; gl_FragColor=vec4(0.5*(R-L+T-B),0.0,0.0,1.0);}`)),
      curl:    link(baseVS, compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity; void main(){gl_FragColor=vec4(0.5*(texture2D(uVelocity,vR).y-texture2D(uVelocity,vL).y-texture2D(uVelocity,vT).x+texture2D(uVelocity,vB).x),0.0,0.0,1.0);}`)),
      vortex:  link(baseVS, compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity,uCurl; uniform float curl,dt; void main(){float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x,T=texture2D(uCurl,vT).x,B=texture2D(uCurl,vB).x,C=texture2D(uCurl,vUv).x; vec2 f=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L)); f/=length(f)+0.0001; f*=curl*C; f.y*=-1.0; vec2 v=texture2D(uVelocity,vUv).xy+f*dt; gl_FragColor=vec4(clamp(v,-1000.0,1000.0),0.0,1.0);}`)),
      pressure:link(baseVS, compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uDivergence; void main(){gl_FragColor=vec4((texture2D(uPressure,vL).x+texture2D(uPressure,vR).x+texture2D(uPressure,vB).x+texture2D(uPressure,vT).x-texture2D(uDivergence,vUv).x)*0.25,0.0,0.0,1.0);}`)),
      gradSub: link(baseVS, compile(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uVelocity; void main(){float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x; vec2 v=texture2D(uVelocity,vUv).xy-vec2(R-L,T-B); gl_FragColor=vec4(v,0.0,1.0);}`)),
      advect:  link(baseVS, compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uVelocity,uSource; uniform vec2 texelSize,dyeTexelSize; uniform float dt,dissipation;
        vec4 bilerp(sampler2D s,vec2 uv,vec2 ts){vec2 st=uv/ts-0.5; vec2 i=floor(st),f=fract(st); return mix(mix(texture2D(s,(i+vec2(0.5,0.5))*ts),texture2D(s,(i+vec2(1.5,0.5))*ts),f.x),mix(texture2D(s,(i+vec2(0.5,1.5))*ts),texture2D(s,(i+vec2(1.5,1.5))*ts),f.x),f.y);}
        void main(){
          #ifdef MFILTER
            vec4 r=bilerp(uSource,vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize,dyeTexelSize);
          #else
            vec4 r=texture2D(uSource,vUv-dt*texture2D(uVelocity,vUv).xy*texelSize);
          #endif
          gl_FragColor=r/(1.0+dissipation*dt);}`, supportLinearFiltering ? undefined : ['MFILTER'])),
      display: link(baseVS, compile(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv,vL,vR,vT,vB; uniform sampler2D uTexture; uniform vec2 texelSize; void main(){ vec3 c=texture2D(uTexture,vUv).rgb; float dx=length(texture2D(uTexture,vR).rgb)-length(texture2D(uTexture,vL).rgb); float dy=length(texture2D(uTexture,vT).rgb)-length(texture2D(uTexture,vB).rgb); vec3 n=normalize(vec3(dx,dy,length(texelSize))); float d=clamp(dot(n,vec3(0,0,1))+0.7,0.7,1.0); c*=d; gl_FragColor=vec4(c,max(c.r,max(c.g,c.b)));}`)),
    };
    const U: Record<string, Record<string, WebGLUniformLocation | null>> = {};
    for (const [k, p] of Object.entries(programs)) { if (p) U[k] = uniforms(p); }

    // ── Geometry ─────────────────────────────────────────────────────────────
    const buf = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    const eBuf = gl.createBuffer()!; gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, eBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    // ── FBO helpers ──────────────────────────────────────────────────────────
    interface FBO { tex: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number; tsX: number; tsY: number; attach(id: number): number }
    interface DFBO { w: number; h: number; tsX: number; tsY: number; read: FBO; write: FBO; swap(): void }

    function blit(target: FBO | null) {
      if (!target) { gl!.viewport(0,0,gl!.drawingBufferWidth,gl!.drawingBufferHeight); gl!.bindFramebuffer(gl!.FRAMEBUFFER,null); }
      else          { gl!.viewport(0,0,target.w,target.h); gl!.bindFramebuffer(gl!.FRAMEBUFFER,target.fbo); }
      gl!.drawElements(gl!.TRIANGLES,6,gl!.UNSIGNED_SHORT,0);
    }

    function makeFBO(w: number, h: number, iF: number, f: number, param: number): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const tex = gl!.createTexture()!; gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D,0,iF,w,h,0,f,halfFloatTexType,null);
      const fbo = gl!.createFramebuffer()!; gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER,gl!.COLOR_ATTACHMENT0,gl!.TEXTURE_2D,tex,0);
      gl!.viewport(0,0,w,h); gl!.clearColor(0,0,0,0); gl!.clear(gl!.COLOR_BUFFER_BIT);
      return { tex, fbo, w, h, tsX:1/w, tsY:1/h, attach(id){ gl!.activeTexture(gl!.TEXTURE0+id); gl!.bindTexture(gl!.TEXTURE_2D,tex); return id; } };
    }
    function makeDFBO(w: number, h: number, iF: number, f: number, p: number): DFBO {
      const r=makeFBO(w,h,iF,f,p), wr=makeFBO(w,h,iF,f,p);
      return { w, h, tsX:r.tsX, tsY:r.tsY, read:r, write:wr, swap(){ const t=this.read; this.read=this.write; this.write=t; } };
    }

    function getRes(res: number) {
      const w=gl!.drawingBufferWidth, h=gl!.drawingBufferHeight, ar=w/h;
      const aspect = ar<1?1/ar:ar, min=Math.round(res), max=Math.round(res*aspect);
      return w>h ? {w:max,h:min} : {w:min,h:max};
    }

    const SIM=128, DYE=1440;
    const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    const simRes = getRes(SIM), dyeRes = getRes(DYE);
    let dye      = makeDFBO(dyeRes.w, dyeRes.h, formatRGBA.internalFormat, formatRGBA.format, filtering);
    let velocity = makeDFBO(simRes.w, simRes.h, formatRG.internalFormat,   formatRG.format,   filtering);
    let divFBO   = makeFBO (simRes.w, simRes.h, formatR.internalFormat,    formatR.format,    gl.NEAREST);
    let curlFBO  = makeFBO (simRes.w, simRes.h, formatR.internalFormat,    formatR.format,    gl.NEAREST);
    let pressure = makeDFBO(simRes.w, simRes.h, formatR.internalFormat,    formatR.format,    gl.NEAREST);

    // ── Pointer ──────────────────────────────────────────────────────────────
    const ptr = { x:0, y:0, px:0, py:0, dx:0, dy:0, color:{r:0,g:0,b:0} as RGB, moved:false };

    function brandColor(): RGB {
      // Bias towards cyan/violet/blue to match Zelkyrus palette
      const palettes: RGB[] = [
        {r:0,g:0.52,b:1.0},   // cyan-ish
        {r:0.31,g:0.14,b:0.93}, // violet
        {r:0.15,g:0.32,b:1.0},  // blue
        {r:0,g:0.83,b:1.0},   // bright cyan
      ];
      const c = palettes[Math.floor(Math.random()*palettes.length)];
      const s = 0.4 + Math.random()*0.6;
      return { r:c.r*s, g:c.g*s, b:c.b*s };
    }

    function correctRadius(r: number) { const ar=canvas!.width/canvas!.height; return r*(ar>1?ar:1); }

    function splat(x: number, y: number, dx: number, dy: number, color: RGB) {
      const p = programs.splat; if (!p) return;
      gl!.useProgram(p);
      const u = U.splat;
      gl!.uniform1i(u.uTarget, velocity.read.attach(0));
      gl!.uniform1f(u.aspectRatio, canvas!.width/canvas!.height);
      gl!.uniform2f(u.point, x, y);
      gl!.uniform3f(u.color, dx, dy, 0);
      gl!.uniform1f(u.radius, correctRadius(0.002));
      blit(velocity.write); velocity.swap();
      gl!.uniform1i(u.uTarget, dye.read.attach(0));
      gl!.uniform3f(u.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    function step(dt: number) {
      gl!.disable(gl!.BLEND);

      // curl
      gl!.useProgram(programs.curl!);
      gl!.uniform2f(U.curl.texelSize, velocity.tsX, velocity.tsY);
      gl!.uniform1i(U.curl.uVelocity, velocity.read.attach(0));
      blit(curlFBO);

      // vortex
      gl!.useProgram(programs.vortex!);
      gl!.uniform2f(U.vortex.texelSize, velocity.tsX, velocity.tsY);
      gl!.uniform1i(U.vortex.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(U.vortex.uCurl, curlFBO.attach(1));
      gl!.uniform1f(U.vortex.curl, 3);
      gl!.uniform1f(U.vortex.dt, dt);
      blit(velocity.write); velocity.swap();

      // divergence
      gl!.useProgram(programs.div!);
      gl!.uniform2f(U.div.texelSize, velocity.tsX, velocity.tsY);
      gl!.uniform1i(U.div.uVelocity, velocity.read.attach(0));
      blit(divFBO);

      // clear pressure
      gl!.useProgram(programs.clear!);
      gl!.uniform1i(U.clear.uTexture, pressure.read.attach(0));
      gl!.uniform1f(U.clear.value, 0.1);
      blit(pressure.write); pressure.swap();

      // pressure iters
      gl!.useProgram(programs.pressure!);
      gl!.uniform2f(U.pressure.texelSize, velocity.tsX, velocity.tsY);
      gl!.uniform1i(U.pressure.uDivergence, divFBO.attach(0));
      for (let i=0;i<20;i++) { gl!.uniform1i(U.pressure.uPressure, pressure.read.attach(1)); blit(pressure.write); pressure.swap(); }

      // gradient subtract
      gl!.useProgram(programs.gradSub!);
      gl!.uniform2f(U.gradSub.texelSize, velocity.tsX, velocity.tsY);
      gl!.uniform1i(U.gradSub.uPressure, pressure.read.attach(0));
      gl!.uniform1i(U.gradSub.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      // advect velocity
      gl!.useProgram(programs.advect!);
      gl!.uniform2f(U.advect.texelSize, velocity.tsX, velocity.tsY);
      if (!supportLinearFiltering) gl!.uniform2f(U.advect.dyeTexelSize, velocity.tsX, velocity.tsY);
      const vId = velocity.read.attach(0);
      gl!.uniform1i(U.advect.uVelocity, vId);
      gl!.uniform1i(U.advect.uSource, vId);
      gl!.uniform1f(U.advect.dt, dt);
      gl!.uniform1f(U.advect.dissipation, 2);
      blit(velocity.write); velocity.swap();

      // advect dye
      if (!supportLinearFiltering) gl!.uniform2f(U.advect.dyeTexelSize, dye.tsX, dye.tsY);
      gl!.uniform1i(U.advect.uVelocity, velocity.read.attach(0));
      gl!.uniform1i(U.advect.uSource, dye.read.attach(1));
      gl!.uniform1f(U.advect.dissipation, 3.5);
      blit(dye.write); dye.swap();
    }

    function render() {
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.enable(gl!.BLEND);
      gl!.useProgram(programs.display!);
      const w=gl!.drawingBufferWidth, h=gl!.drawingBufferHeight;
      gl!.uniform2f(U.display.texelSize, 1/w, 1/h);
      gl!.uniform1i(U.display.uTexture, dye.read.attach(0));
      blit(null);
    }

    // ── Resize ───────────────────────────────────────────────────────────────
    function resize() {
      const pr = window.devicePixelRatio||1;
      const w = Math.floor(canvas!.clientWidth*pr), h = Math.floor(canvas!.clientHeight*pr);
      canvas!.width=w; canvas!.height=h;
    }

    resize();
    window.addEventListener('resize', resize);

    // ── Render loop — only starts after first mousemove ───────────────────────
    let rafId = 0, lastTime = 0, started = false;

    function loop(t: number) {
      rafId = requestAnimationFrame(loop);
      const dt = Math.min((t-lastTime)/1000, 0.016666);
      lastTime = t;
      if (ptr.moved) { ptr.moved=false; splat(ptr.x,ptr.y,ptr.dx*5000,ptr.dy*5000,ptr.color); }
      step(dt);
      render();
    }

    function startLoop(t: number) { lastTime = t; rafId = requestAnimationFrame(loop); }

    // ── Events ───────────────────────────────────────────────────────────────
    function onMove(e: MouseEvent) {
      const pr = window.devicePixelRatio||1;
      const cx = e.clientX*pr, cy = e.clientY*pr;
      const nx = cx/canvas!.width, ny = 1-cy/canvas!.height;
      ptr.dx = (nx-ptr.x)*(canvas!.width/canvas!.height < 1 ? canvas!.width/canvas!.height : 1);
      ptr.dy = (ny-ptr.y)/(canvas!.width/canvas!.height > 1 ? canvas!.width/canvas!.height : 1);
      ptr.px=ptr.x; ptr.py=ptr.y; ptr.x=nx; ptr.y=ny;
      ptr.moved = Math.abs(ptr.dx)>0||Math.abs(ptr.dy)>0;
      if (!started) { started=true; requestAnimationFrame(startLoop); }
    }

    function onClick(e: MouseEvent) {
      const pr = window.devicePixelRatio||1;
      const x = (e.clientX*pr)/canvas!.width, y = 1-(e.clientY*pr)/canvas!.height;
      const c = brandColor(); c.r*=10; c.g*=10; c.b*=10;
      ptr.color = brandColor();
      splat(x,y,10*(Math.random()-0.5),30*(Math.random()-0.5),c);
      if (!started) { started=true; requestAnimationFrame(startLoop); }
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
