import { Layers, Target, RefreshCw, Rocket } from 'lucide-react'

const reasons = [
  {
    icon: Rocket,
    title: 'AI-First Architecture',
    description: 'Intelligence baked into the foundation — not retrofitted on top of legacy systems.',
  },
  {
    icon: Target,
    title: 'Real-World Problem Solving',
    description: 'Products built around genuine complexity in finance, research, and talent evaluation.',
  },
  {
    icon: Layers,
    title: 'Scalable & Modular Design',
    description: 'Every component is composable. Systems grow with your needs without architectural rewrites.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Learning Systems',
    description: 'Models and agents that improve autonomously over time, not just on scheduled retraining.',
  },
]

export default function WhyZelkyrus() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-violet-600/5 bottom-0 right-0 translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 mb-6 uppercase tracking-widest">
              Why Zelkyrus
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Not just another{' '}
              <span className="text-gradient">AI company</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              The market is full of wrappers around foundation models. Zelkyrus builds
              the layer beneath — adaptive infrastructure that thinks, learns, and
              evolves as a first-class system property.
            </p>

            {/* Approach bullets */}
            <div className="space-y-4">
              {['Learn from data', 'Adapt to change', 'Improve over time'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-cyan-400/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </div>
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — reasons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-white/5 glass p-6 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex p-2.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 mb-4 group-hover:text-white transition-colors">
                  <r.icon size={18} />
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{r.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
