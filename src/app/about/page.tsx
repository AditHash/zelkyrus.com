import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

const values = [
  { title: 'AI-native', desc: 'We build with AI at the core when it earns its place, not bolted on for a headline.' },
  { title: 'Outcome-driven', desc: 'We ship things that create real value, not features for the sake of a roadmap.' },
  { title: 'Straight talk', desc: 'Honest scoping and honest timelines. No agency-speak, no padding.' },
  { title: 'Move fast', desc: 'Small teams die from slowness too. We ship, learn, and iterate.' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-product order-2 md:order-1">
            <Image
              src="/Images/people.png"
              alt="The Zelkyrus team"
              width={900}
              height={700}
              className="w-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h1 className="text-[36px] leading-[1.1] md:text-[44px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              A small studio that turns ideas into shipped products.
            </h1>
            <div className="flex items-center gap-1.5 mt-4 text-[#6e6e73] text-[14px]">
              <MapPin size={14} />
              <span>Remote-first</span>
            </div>

            <div className="mt-6 space-y-4 text-[17px] leading-[1.47] text-[#1d1d1f]/75">
              <p>
                Zelkyrus started because we kept seeing the same thing: good ideas stuck in decks, slowed down by teams too big to move and too process-heavy to just build.
              </p>
              <p>
                We're a small, hands-on team that builds websites, products, applications, and GenAI apps end to end. When you don't need more code, just a clear technical opinion, we do that too, as consultants.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0066cc] text-white text-[15px] font-medium hover:bg-[#0071e3] transition-colors"
              >
                See services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] mb-10 text-center">
            How we work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(v => (
              <div key={v.title} className="p-6 rounded-2xl bg-white border border-[#d2d2d7]">
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">{v.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1d1d1f] py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-white">
            Want to build with us?
          </h2>
          <p className="mt-3 text-[17px] text-white/60">
            We're a small team with big ambitions. If you want to move fast, let's talk.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#0066cc] text-white text-[15px] font-medium hover:bg-[#0071e3] transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
