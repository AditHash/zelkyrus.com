import { ArrowRight, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Subtle dark vignette over aurora so text stays readable */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#050508]/40 to-[#050508]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-sm font-medium mb-8 animate-fade-in-up backdrop-blur-sm">
          <Zap size={14} className="animate-pulse" />
          AI-First Technology Company
        </div>

        {/* Main heading — branding image */}
        <div className="flex justify-center mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <img
            src="/branding-transparent.png"
            alt="Zelkyrus"
            className="w-auto max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto object-contain drop-shadow-[0_0_60px_rgba(0,212,255,0.35)]"
          />
        </div>

        <p className="text-xl md:text-2xl font-light text-slate-300 mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Where{' '}
          <span className="text-gradient font-semibold">Intelligence</span>
          {' '}Becomes{' '}
          <span className="text-gradient font-semibold">Infrastructure</span>
        </p>

        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Building intelligent systems that analyze, learn, and optimize complex
          decision-making across domains — powered by multi-agent architectures
          and real-time data pipelines.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <a
            href="#products"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            Explore Products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#about"
            className="px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-slate-300 hover:border-white/20 hover:text-white transition-all duration-200 glass backdrop-blur-sm"
          >
            Our Vision
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          {[
            { value: '3', label: 'AI Products' },
            { value: '∞', label: 'Learning Systems' },
            { value: '1', label: 'Mission' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-gradient">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-400/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
      </div>
    </section>
  )
}
