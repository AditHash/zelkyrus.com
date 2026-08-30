import Link from 'next/link'
import { ArrowRight, Globe, Smartphone, Sparkles, Layers, Lightbulb, Wrench } from 'lucide-react'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10">
      {children}
    </span>
  )
}

const services = [
  {
    icon: Globe,
    title: 'Websites & Marketing Sites',
    desc: 'Fast, clean, no-bloat sites that load quick and say what you actually do — landing pages, portfolios, full marketing sites.',
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Applications',
    desc: 'Full products, not prototypes. We build the real thing — dashboards, internal tools, customer-facing apps, mobile included.',
  },
  {
    icon: Sparkles,
    title: 'GenAI & AI-Powered Products',
    desc: 'Agents, copilots, RAG systems, automation — AI baked into the product, not a chatbot bolted on at the end.',
  },
  {
    icon: Layers,
    title: 'Product Design & MVP',
    desc: 'Got an idea and nothing else? We scope it, design it, and ship a real MVP fast enough to get in front of users.',
  },
  {
    icon: Lightbulb,
    title: 'Consulting & Technical Advisory',
    desc: 'Architecture reviews, AI strategy, build-vs-buy calls, fractional-CTO-style guidance. Sometimes you just need a sharp second opinion before you write code.',
  },
  {
    icon: Wrench,
    title: 'Ongoing Support',
    desc: 'Shipped isn’t done. We stick around for fixes, iteration, and scaling as your product grows.',
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto pt-28 pb-20">
        <Badge>Services</Badge>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
          What we <span className="text-gradient">build</span>
        </h1>
        <p className="mt-6 text-white/55 leading-relaxed max-w-xl">
          We&apos;re a small team, so we stay picky about what we take on — but the range is wide.
          Websites, products, GenAI apps, or just an hour of straight advice on whether to build at all.
        </p>
      </section>

      {/* Services grid */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <div key={s.title} className="p-6 rounded-2xl border border-white/10 glass flex flex-col gap-4 hover:border-[#2563eb]/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 max-w-4xl mx-auto pb-24">
        <div className="glass-strong border border-white/10 rounded-2xl p-12 text-center">
          <Badge>Let&apos;s Talk</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Not sure which of these you need?</h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
            That&apos;s fine — tell us what you&apos;re trying to do and we&apos;ll figure out the right shape for it together.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
