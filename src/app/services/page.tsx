import Link from 'next/link'
import { Globe, Layers, Sparkles, Lightbulb, Code, Brain, Cloud } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Websites',
    desc: 'Fast, no-bloat marketing sites and web presence that loads quick and says what you do.',
    tile: 'light',
  },
  {
    icon: Layers,
    title: 'Full-stack applications',
    desc: 'Web and mobile applications built end to end, database to UI. Full products, not prototypes.',
    tile: 'dark',
  },
  {
    icon: Sparkles,
    title: 'GenAI-powered apps',
    desc: 'Agents, copilots, and RAG systems built into the product core, not bolted on after launch.',
    tile: 'dark',
  },
  {
    icon: Lightbulb,
    title: 'Consulting',
    desc: 'Technical advisory across three areas:',
    tile: 'light',
    subitems: [
      { icon: Code, label: 'Application development' },
      { icon: Brain, label: 'AI/ML & GenAI' },
      { icon: Cloud, label: 'DevOps & Cloud' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-16 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-[40px] leading-[1.1] md:text-[48px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
            What we build.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.47] text-[#1d1d1f]/70 dark:text-white/60 max-w-xl mx-auto">
            We're a small team, so we stay picky about what we take on, but the range is wide.
          </p>
        </div>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map(s => {
            const dark = s.tile === 'dark'
            return (
              <div
                key={s.title}
                className={`rounded-2xl p-8 flex flex-col gap-4 border ${
                  dark
                    ? 'bg-[#1d1d1f] dark:bg-[#2c2c2e] text-white border-black/5 dark:border-white/10'
                    : 'bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white border-black/5 dark:border-white/10'
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
                  <p className={`text-[14px] leading-relaxed ${dark ? 'text-white/60' : 'text-[#6e6e73] dark:text-[#a1a1a6]'}`}>
                    {s.desc}
                  </p>
                </div>

                {s.subitems && (
                  <div className="mt-1 flex flex-col gap-2.5">
                    {s.subitems.map(item => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
                          <item.icon size={13} />
                        </div>
                        <span className="text-[14px] font-medium text-[#1d1d1f] dark:text-white">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
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
