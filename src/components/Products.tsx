import { BarChart3, MessageSquareCode, TrendingUp, Lock, ArrowUpRight } from 'lucide-react'

const products = [
  {
    id: 'stratifiq',
    name: 'StratifIQ',
    badge: 'Private',
    tagline: 'Company Intelligence Engine',
    description:
      'Turn Data into Strategy with AI-Driven Company Intelligence. StratifIQ transforms fragmented company data into actionable strategic insights through AI-powered analysis, research automation, and decision intelligence.',
    capabilities: [
      'Company research automation',
      'Financial and operational insights',
      'Market and competitor analysis',
      'AI-powered summarization',
    ],
    icon: BarChart3,
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/20',
    border: 'border-cyan-500/20',
    bg: 'from-cyan-500/8 to-blue-600/5',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
  },
  {
    id: 'intervueiq',
    name: 'IntervueIQ',
    badge: 'Private',
    tagline: 'AI Interview Intelligence Platform',
    description:
      'A comprehensive platform designed to enhance technical interview preparation and streamline hiring using intelligent evaluation, adaptive questioning, and real-time feedback powered by AI agents.',
    capabilities: [
      'Mock interviews with AI agents',
      'Real-time feedback and evaluation',
      'Coding and system design assessment',
      'Adaptive question generation',
    ],
    icon: MessageSquareCode,
    gradient: 'from-violet-500 to-purple-700',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/20',
    bg: 'from-violet-500/8 to-purple-700/5',
    accent: 'text-violet-400',
    accentBg: 'bg-violet-400/10',
  },
  {
    id: 'optiwealthiq',
    name: 'OptiWealthIQ Alpha',
    badge: 'Private',
    tagline: 'Agentic Portfolio Optimization System',
    description:
      'An AI-driven portfolio optimization system leveraging autonomous agents to continuously analyze market data, adapt strategies, and optimize asset allocation for better risk-adjusted returns.',
    capabilities: [
      'Real-time market data integration',
      'Iterative portfolio optimization',
      'Risk-aware allocation strategies',
      'AI-driven financial decision making',
    ],
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/20',
    bg: 'from-emerald-500/8 to-teal-600/5',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-400/10',
  },
]

export default function Products() {
  return (
    <section id="products" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="orb w-[500px] h-[500px] bg-cyan-500/5 top-0 right-0 translate-x-1/2" />
      <div className="orb w-[400px] h-[400px] bg-violet-600/5 bottom-0 left-0 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-violet-400 border border-violet-400/20 bg-violet-400/5 mb-6 uppercase tracking-widest">
            Products
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Intelligence{' '}
            <span className="text-gradient">Engineered</span>
            {' '}for Every Domain
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Three flagship products, each a self-evolving intelligence layer
            built to solve real-world complexity at scale.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className={`group relative rounded-2xl border ${product.border} bg-gradient-to-br ${product.bg} p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${product.glow}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${product.gradient} shadow-lg`}>
                  <product.icon size={22} className="text-white" />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${product.accentBg} ${product.accent} border border-current/20`}>
                  <Lock size={10} />
                  {product.badge}
                </div>
              </div>

              {/* Name & tagline */}
              <h3 className="text-xl font-black text-white mb-1">{product.name}</h3>
              <p className={`text-sm font-medium ${product.accent} mb-4`}>{product.tagline}</p>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                {product.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                  Key Capabilities
                </p>
                {product.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2.5">
                    <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${product.gradient}`} />
                    <span className="text-sm text-slate-300">{cap}</span>
                  </div>
                ))}
              </div>

              {/* Hover indicator */}
              <div className={`mt-6 pt-5 border-t border-white/5 flex items-center gap-2 ${product.accent} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                <span className="text-xs font-medium">Coming Soon</span>
                <ArrowUpRight size={14} />
              </div>

              {/* Glow on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${product.bg}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
