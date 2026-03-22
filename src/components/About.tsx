import { Brain, TrendingUp, Cpu } from 'lucide-react'

const pillars = [
  {
    icon: Brain,
    title: 'Think Independently',
    description: 'Systems that reason autonomously without constant human intervention, making intelligent decisions at scale.',
    color: 'from-cyan-500/10 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: TrendingUp,
    title: 'Learn Continuously',
    description: 'Adaptive architectures that evolve from every data point, becoming more precise with each interaction.',
    color: 'from-violet-500/10 to-violet-500/5',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Cpu,
    title: 'Optimize Dynamically',
    description: 'Real-time optimization engines that continuously improve outcomes across complex, changing environments.',
    color: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
]

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="orb w-[400px] h-[400px] bg-violet-600/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 mb-6 uppercase tracking-widest">
            Our Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Intelligence as a{' '}
            <span className="text-gradient">Foundational Layer</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We don't build static tools. We build systems that evolve — treating intelligence
            not as a feature bolt-on, but as the very infrastructure that powers every decision.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p) => (
            <div
              key={p.title}
              className={`group relative rounded-2xl p-8 border ${p.border} bg-gradient-to-br ${p.color} glow-border transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`inline-flex p-3 rounded-xl bg-white/5 border border-white/5 ${p.iconColor} mb-5`}>
                <p.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`absolute top-0 right-0 w-px h-full ${p.iconColor} opacity-20`} />
                <div className={`absolute top-0 right-0 w-full h-px ${p.iconColor} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        {/* Mission statement */}
        <div className="relative rounded-2xl border border-white/5 glass p-10 text-center overflow-hidden">
          <div className="orb w-[300px] h-[200px] bg-cyan-500/5 top-0 left-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-light text-slate-200 leading-relaxed">
              "We are building a world where intelligence is not just a feature,
              but the{' '}
              <span className="text-gradient font-semibold">foundational layer</span>
              {' '}of every system."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
