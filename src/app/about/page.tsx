import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10">
      {children}
    </span>
  )
}

const values = [
  { title: 'AI-native', desc: 'We build with AI at the core when it earns its place — not bolted on for a headline.' },
  { title: 'Outcome-driven', desc: 'We ship things that create real value, not features for the sake of a roadmap.' },
  { title: 'Straight talk', desc: 'You get honest scoping and honest timelines — no agency-speak, no padding.' },
  { title: 'Move fast', desc: 'Small teams die from slowness too. We ship, learn, and iterate relentlessly.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center gap-12 px-4 max-w-6xl mx-auto pt-28 pb-20">
        {/* Team photo */}
        <div className="w-full md:w-[480px] shrink-0 rounded-2xl overflow-hidden border border-white/10">
          <Image
            src="/Images/people.png"
            alt="Zelkyrus team"
            width={480}
            height={360}
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <Badge>About Zelkyrus</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
            We&apos;re a small studio that{' '}
            <span className="text-gradient">turns ideas into shipped products</span>.
          </h1>
          <div className="flex items-center gap-1.5 mt-4 text-white/40 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Remote-first</span>
          </div>

          <div className="mt-6 space-y-4 text-white/55 leading-relaxed">
            <p>
              Zelkyrus started because we kept seeing the same thing: good ideas stuck in decks, slowed down by teams too big to move and too process-heavy to just build.
            </p>
            <p>
              We&apos;re a small, hands-on team that builds websites, products, applications, and GenAI apps — end to end. And when you don&apos;t need more code, just a clear technical opinion, we do that too, as consultants.
            </p>
            <p>
              No account managers, no layers between you and the people actually building. Just a small team with real ownership over what we ship.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/services"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white text-sm font-semibold hover:opacity-90 transition-all"
            >
              See our Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-12">
          <Badge>Principles</Badge>
          <h2 className="mt-4 text-3xl font-bold text-white">How we work</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map(v => (
            <div key={v.title} className="p-6 rounded-2xl border border-white/10 glass">
              <h3 className="font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 max-w-4xl mx-auto pb-24">
        <div className="glass-strong border border-white/10 rounded-2xl p-12 text-center">
          <Badge>We&apos;re hiring</Badge>
          <h2 className="mt-4 text-3xl font-bold text-white">Want to build with us?</h2>
          <p className="mt-4 text-white/50 max-w-sm mx-auto leading-relaxed">
            We&apos;re a small team with big ambitions. If you care about building real things and want to move fast, let&apos;s talk.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
