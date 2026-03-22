const techs = [
  {
    name: 'Multi-Agent Systems',
    short: 'A2A',
    description: 'Autonomous agents collaborating across architectures to solve complex, multi-step problems at scale.',
    color: 'cyan',
  },
  {
    name: 'Model Context Protocol',
    short: 'MCP',
    description: 'Standardized context exchange enabling seamless integration between models, tools, and data sources.',
    color: 'violet',
  },
  {
    name: 'Retrieval-Augmented Generation',
    short: 'RAG',
    description: 'Grounding AI responses in real, up-to-date knowledge bases for accurate, verifiable intelligence.',
    color: 'blue',
  },
  {
    name: 'Real-Time Data Pipelines',
    short: 'RT',
    description: 'High-throughput streaming pipelines that feed live market and operational data into AI decision loops.',
    color: 'emerald',
  },
  {
    name: 'Scalable Cloud Infrastructure',
    short: 'SCI',
    description: 'Elastic, distributed infrastructure designed to scale intelligence from prototype to production.',
    color: 'orange',
  },
]

const colorMap: Record<string, { badge: string; glow: string; text: string; border: string; bg: string }> = {
  cyan:    { badge: 'bg-cyan-400/10 text-cyan-400',    glow: 'shadow-cyan-500/10',    text: 'text-cyan-400',    border: 'border-cyan-500/20',    bg: 'from-cyan-500/5 to-transparent' },
  violet:  { badge: 'bg-violet-400/10 text-violet-400', glow: 'shadow-violet-500/10', text: 'text-violet-400',  border: 'border-violet-500/20',  bg: 'from-violet-500/5 to-transparent' },
  blue:    { badge: 'bg-blue-400/10 text-blue-400',    glow: 'shadow-blue-500/10',    text: 'text-blue-400',    border: 'border-blue-500/20',    bg: 'from-blue-500/5 to-transparent' },
  emerald: { badge: 'bg-emerald-400/10 text-emerald-400', glow: 'shadow-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'from-emerald-500/5 to-transparent' },
  orange:  { badge: 'bg-orange-400/10 text-orange-400', glow: 'shadow-orange-500/10', text: 'text-orange-400',  border: 'border-orange-500/20',  bg: 'from-orange-500/5 to-transparent' },
}

export default function Tech() {
  return (
    <section id="tech" className="py-32 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-blue-500/5 top-1/2 left-0 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-blue-400 border border-blue-400/20 bg-blue-400/5 mb-6 uppercase tracking-widest">
            Core Technologies
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Built on{' '}
            <span className="text-gradient">Modern AI</span>
            {' '}Architecture
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Every Zelkyrus product is grounded in cutting-edge distributed system
            design and AI principles — not trends, but fundamentals.
          </p>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techs.map((tech, i) => {
            const c = colorMap[tech.color]
            return (
              <div
                key={tech.short}
                className={`group relative rounded-2xl border ${c.border} bg-gradient-to-br ${c.bg} glass p-6 flex gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.glow} ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {/* Short code */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm ${c.badge} border border-current/20`}>
                  {tech.short}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1.5">{tech.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{tech.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom tagline */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm font-mono">
            <span className="text-cyan-400">// </span>
            Zelkyrus systems are designed as evolving intelligence layers, not fixed applications.
          </p>
        </div>
      </div>
    </section>
  )
}
