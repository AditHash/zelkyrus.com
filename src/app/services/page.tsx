import Link from 'next/link'
import { Globe, Smartphone, Sparkles, Layers, Lightbulb, Wrench } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Websites & marketing sites',
    desc: 'Fast, no-bloat sites that load quick and say what you actually do.',
    tile: 'light',
  },
  {
    icon: Smartphone,
    title: 'Web & mobile applications',
    desc: 'Full products, not prototypes. Dashboards, internal tools, customer apps.',
    tile: 'dark',
  },
  {
    icon: Sparkles,
    title: 'GenAI & AI-powered products',
    desc: 'Agents, copilots, and RAG systems built into the product, not bolted on.',
    tile: 'dark',
  },
  {
    icon: Layers,
    title: 'Product design & MVP',
    desc: 'Idea and nothing else? We scope, design, and ship a real MVP fast.',
    tile: 'light',
  },
  {
    icon: Lightbulb,
    title: 'Consulting & technical advisory',
    desc: 'Architecture reviews, AI strategy, build-vs-buy calls, fractional-CTO guidance.',
    tile: 'dark',
  },
  {
    icon: Wrench,
    title: 'Ongoing support',
    desc: 'Shipped isn\'t done. We stick around for fixes and iteration.',
    tile: 'light',
  },
]

export default function ServicesPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-[40px] leading-[1.1] md:text-[48px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            What we build.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.47] text-[#1d1d1f]/70 max-w-xl mx-auto">
            We're a small team, so we stay picky about what we take on, but the range is wide.
          </p>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => {
            const dark = s.tile === 'dark'
            return (
              <div
                key={s.title}
                className={`rounded-2xl p-8 flex flex-col gap-4 ${
                  dark ? 'bg-[#1d1d1f] text-white' : 'bg-[#f5f5f7] text-[#1d1d1f]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    dark ? 'bg-white/10 text-white' : 'bg-[#0066cc]/10 text-[#0066cc]'
                  }`}
                >
                  <s.icon size={19} />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold mb-1.5">{s.title}</h3>
                  <p className={`text-[14px] leading-relaxed ${dark ? 'text-white/60' : 'text-[#6e6e73]'}`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-[#1d1d1f] py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-white">
            Not sure which of these you need?
          </h2>
          <p className="mt-3 text-[17px] text-white/60">
            Tell us what you're trying to do and we'll figure out the shape together.
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
