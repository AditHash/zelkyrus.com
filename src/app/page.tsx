import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10">
      {children}
    </span>
  )
}

const steps = [
  { n: 1, title: 'Post a Role', desc: 'Define your requirements and let IntervueIQ generate tailored screening criteria automatically.' },
  { n: 2, title: 'AI Screens', desc: 'Candidates are assessed against your criteria with precision — no manual sifting required.' },
  { n: 3, title: 'Interview', desc: 'Conduct AI-assisted interviews with real-time analysis, scoring, and suggested follow-ups.' },
  { n: 4, title: 'Hire Smart', desc: 'Make confident, data-driven decisions with comprehensive candidate insights and comparisons.' },
]

const stats = [
  { value: '10x', label: 'Faster Screening' },
  { value: '94%', label: 'Accuracy Rate' },
  { value: '60%', label: 'Cost Reduction' },
  { value: '2 min', label: 'Avg. Setup Time' },
]

const tags = ['AI Screening', 'Interview Analysis', 'Candidate Prep', 'ATS Integration', 'Real-time Feedback']

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-20">
        <Badge>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
          Introducing IntervueIQ
        </Badge>

        <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          Where Hiring Meets{' '}
          <span className="text-gradient">Intelligence</span>
        </h1>

        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          Zelkyrus builds AI-powered infrastructure for the future of work. IntervueIQ transforms how companies hire and how candidates prepare.
        </p>

        <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/products/intervueiq"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-black font-semibold hover:bg-[#00d4ff]/90 transition-all"
          >
            Explore IntervueIQ <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all"
          >
            About Zelkyrus
          </Link>
        </div>
      </section>

      {/* Featured Product */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-12">
          <Badge>Our Product</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Built for modern hiring</h2>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-strong p-8 md:p-12">
          <div className="absolute top-0 left-0 text-[18rem] font-black text-[#00d4ff]/5 leading-none select-none pointer-events-none -translate-x-4 -translate-y-8">
            I
          </div>

          <div className="relative flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#00d4ff]/20 text-[#00d4ff] font-medium border border-[#00d4ff]/20">
                  ★ Featured
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-white/50 border border-white/10">
                  SaaS
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">IntervueIQ</h3>
              <p className="text-white/55 text-base leading-relaxed mb-6 max-w-lg">
                AI-powered interview intelligence platform. Streamlines hiring with automated screening, real-time interview analysis, and personalized candidate prep — all in one place.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs border border-white/15 text-white/50">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/products/intervueiq"
                className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors font-medium text-sm"
              >
                See all features <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:w-56 shrink-0">
              {stats.map(stat => (
                <div key={stat.label} className="p-4 rounded-xl border border-white/10 glass text-center">
                  <div className="text-2xl font-bold text-[#00d4ff]">{stat.value}</div>
                  <div className="text-xs text-white/45 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 max-w-4xl mx-auto pb-28 text-center">
        <Badge>Workflow</Badge>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white mb-16">How IntervueIQ Works</h2>

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
          <Badge>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Now in Beta
          </Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Ready to Transform Your Hiring?</h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
            Join the companies using IntervueIQ to hire smarter, faster, and with less bias.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/products/intervueiq"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-black font-semibold hover:bg-[#00d4ff]/90 transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
