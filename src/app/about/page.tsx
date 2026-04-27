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
  { title: 'AI-first', desc: 'We build with AI at the core, not as an afterthought.' },
  { title: 'Outcome-driven', desc: 'Features ship when they create real value for users.' },
  { title: 'Transparent', desc: 'Candidates and companies both deserve to understand how decisions are made.' },
  { title: 'Move fast', desc: 'Startups die from slowness. We ship, learn, and iterate relentlessly.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center gap-12 px-4 max-w-6xl mx-auto pt-28 pb-20">
        {/* Product screenshots grid */}
        <div className="w-full md:w-[480px] shrink-0 grid grid-cols-2 gap-3">
          {[
            { src: '/Images/dashboard.png', alt: 'Dashboard' },
            { src: '/Images/onboarding.png', alt: 'Onboarding' },
            { src: '/Images/ai-to-human-interview.png', alt: 'AI Interview' },
            { src: '/Images/admin-portal.png', alt: 'Admin Portal' },
          ].map(img => (
            <div key={img.alt} className="rounded-xl overflow-hidden border border-white/10">
              <Image
                src={img.src}
                alt={img.alt}
                width={240}
                height={150}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <Badge>About Zelkyrus</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white leading-tight">
            We&apos;re building{' '}
            <span className="text-gradient">intelligent infrastructure</span>{' '}
            for human work.
          </h1>
          <div className="flex items-center gap-1.5 mt-4 text-white/40 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Remote-first</span>
          </div>

          <div className="mt-6 space-y-4 text-white/55 leading-relaxed">
            <p>
              Zelkyrus was founded on a simple observation: hiring is broken on both sides. Companies waste weeks on manual screening. Candidates show up to interviews unprepared. Everyone loses time and money.
            </p>
            <p>
              We&apos;re an AI-first company building tools that bring intelligence to the parts of work that matter most. Our flagship product, IntervueIQ, is an end-to-end hiring and interview intelligence platform that makes the entire process smarter — from first application to final offer.
            </p>
            <p>
              We believe that better hiring leads to better companies, better careers, and ultimately a better economy. That&apos;s the mission we&apos;re building toward.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/products/intervueiq"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00d4ff] text-black text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all"
            >
              See IntervueIQ <ArrowRight className="w-4 h-4" />
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
            We&apos;re a small team with big ambitions. If you care about AI and want to shape the future of work, let&apos;s talk.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-black font-semibold hover:bg-[#00d4ff]/90 transition-all"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
