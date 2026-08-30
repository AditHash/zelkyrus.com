import Link from 'next/link'
import Image from 'next/image'
import { Globe, Layers, Sparkles, Lightbulb, Code, Brain, Cloud, FileText, Repeat, Clock } from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Websites',
    desc: 'Fast, no-bloat marketing sites and web presence that loads quick and says what you do.',
    included: ['Marketing sites & landing pages', 'Content and copy structure', 'SEO fundamentals & analytics'],
    image: '/Images/service-websites.png',
    tile: 'light',
  },
  {
    icon: Layers,
    title: 'Full-stack applications',
    desc: 'Web and mobile applications built end to end, database to UI. Full products, not prototypes.',
    included: ['Web & mobile applications', 'API and database design', 'Auth, payments, integrations'],
    image: '/Images/service-fullstack.png',
    tile: 'dark',
  },
  {
    icon: Sparkles,
    title: 'GenAI-powered apps',
    desc: 'Agents, copilots, and RAG systems built into the product core, not bolted on after launch.',
    included: ['AI agents & copilots', 'RAG and retrieval pipelines', 'Model selection & evaluation'],
    image: '/Images/service-genai.png',
    tile: 'dark',
  },
  {
    icon: Lightbulb,
    title: 'Consulting',
    desc: 'Technical advisory across three areas:',
    image: '/Images/service-consulting.png',
    tile: 'light',
    subitems: [
      { icon: Code, label: 'Application development' },
      { icon: Brain, label: 'AI/ML & GenAI' },
      { icon: Cloud, label: 'DevOps & Cloud' },
    ],
  },
]

const engagements = [
  {
    icon: FileText,
    title: 'Fixed-scope project',
    desc: 'A defined build with a fixed quote. You know the scope and the price before we start.',
  },
  {
    icon: Repeat,
    title: 'Ongoing retainer',
    desc: 'Continued development or support, billed monthly for a set amount of dedicated time.',
  },
  {
    icon: Clock,
    title: 'Consulting hours',
    desc: 'Advisory time on architecture, AI strategy, or DevOps, billed by the hour or in blocks.',
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
            We're a small team, so we stay picky about what we take on. These four areas cover most of what clients ask for, from a first website to a full GenAI product.
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
                className={`rounded-2xl overflow-hidden flex flex-col border ${
                  dark
                    ? 'bg-[#1d1d1f] dark:bg-[#2c2c2e] text-white border-black/5 dark:border-white/10'
                    : 'bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white border-black/5 dark:border-white/10'
                }`}
              >
                <div className="aspect-[4/3] relative">
                  <Image src={s.image} alt={s.title} fill className="object-cover" />
                </div>

                <div className="p-8 flex flex-col gap-4">
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

                  {s.included && (
                    <ul className={`flex flex-col gap-1.5 text-[13px] ${dark ? 'text-white/70' : 'text-[#1d1d1f]/80 dark:text-white/70'}`}>
                      {s.included.map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#0066cc] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

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
              </div>
            )
          })}
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-[#f5f5f7] dark:bg-[#1c1c1e] py-20 px-5 transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-3 text-center">
            How engagements work.
          </h2>
          <p className="text-[15px] text-[#6e6e73] dark:text-[#a1a1a6] text-center max-w-lg mx-auto mb-10">
            We fit the arrangement to the work, not the other way around.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {engagements.map(e => (
              <div key={e.title} className="p-6 rounded-2xl bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10">
                <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-4">
                  <e.icon size={17} />
                </div>
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-1.5">{e.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{e.desc}</p>
              </div>
            ))}
          </div>
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
