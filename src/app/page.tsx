import Link from 'next/link'
import { ArrowRight, Globe, Smartphone, Sparkles, Lightbulb, Compass } from 'lucide-react'

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
    title: 'Websites',
    desc: 'Fast, clean marketing sites and web presence that actually convert.',
  },
  {
    icon: Smartphone,
    title: 'Products & Apps',
    desc: 'Web and mobile applications built end-to-end, from idea to shipped product.',
  },
  {
    icon: Sparkles,
    title: 'GenAI Apps',
    desc: 'AI-native features and full products — agents, copilots, automation.',
  },
  {
    icon: Lightbulb,
    title: 'Consulting',
    desc: 'Stuck on architecture, AI strategy, or build-vs-buy? We think it through with you.',
  },
]

const steps = [
  { n: 1, title: 'Talk', desc: 'Tell us what you’re trying to build. No decks, just a real conversation.' },
  { n: 2, title: 'Plan', desc: 'We scope it fast — what to build, how, and what it’ll take.' },
  { n: 3, title: 'Build', desc: 'Small team, hands-on. You see progress every week, not every quarter.' },
  { n: 4, title: 'Ship & Iterate', desc: 'We launch, then keep improving based on what actually happens.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-20">
        <Badge>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
          Small team. Real ownership.
        </Badge>

        <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          We Build<span className="text-gradient">.</span>
        </h1>

        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          Zelkyrus is a small studio that builds websites, products, applications, and GenAI apps —
          and consults when you need a sharp technical opinion instead of another line of code.
        </p>

        <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/services"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all"
          >
            Explore Services <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all"
          >
            Start a Project
          </Link>
        </div>
      </section>

      {/* Services overview */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-12">
          <Badge>What We Do</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">One team, whatever you need built</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(s => (
            <div key={s.title} className="p-6 rounded-2xl border border-white/10 glass flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff]">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors font-medium text-sm"
          >
            See all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How we work */}
      <section className="px-4 max-w-4xl mx-auto pb-28 text-center">
        <Badge>
          <Compass className="w-3 h-3" />
          How We Work
        </Badge>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white mb-16">No layers. Just building.</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map(step => (
            <div key={step.n} className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] font-bold text-sm shrink-0">
                {step.n}
              </div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 max-w-4xl mx-auto pb-24">
        <div className="glass-strong border border-white/10 rounded-2xl p-12 text-center">
          <Badge>Let&apos;s Talk</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Ready to build something?</h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
            Whether it&apos;s a website, a product, a GenAI feature, or just an hour of advice — we&apos;re in.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all"
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all"
            >
              See our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
