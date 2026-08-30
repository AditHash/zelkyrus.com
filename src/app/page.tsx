import Link from 'next/link'
import { Globe as GlobeIcon, Smartphone, Sparkles, Lightbulb as LightbulbIcon } from 'lucide-react'

const services = [
  {
    icon: GlobeIcon,
    title: 'Websites',
    desc: 'Fast, clean marketing sites that load quick and convert.',
    tile: 'light',
  },
  {
    icon: Smartphone,
    title: 'Products & apps',
    desc: 'Web and mobile applications, built end to end.',
    tile: 'dark',
  },
  {
    icon: Sparkles,
    title: 'GenAI apps',
    desc: 'Agents, copilots, and automation built into the product.',
    tile: 'dark',
  },
  {
    icon: LightbulbIcon,
    title: 'Consulting',
    desc: 'Architecture, AI strategy, and build-vs-buy calls.',
    tile: 'light',
  },
]

const steps = [
  { n: '01', title: 'Talk', desc: 'Tell us what you\'re trying to build.' },
  { n: '02', title: 'Plan', desc: 'We scope it fast, no decks required.' },
  { n: '03', title: 'Build', desc: 'Small team, hands-on, weekly progress.' },
  { n: '04', title: 'Ship', desc: 'Launch, then keep improving.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero: asymmetric split */}
      <section className="pt-16 md:pt-24 pb-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-[40px] leading-[1.1] md:text-[56px] md:leading-[1.07] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              We build.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.47] text-[#1d1d1f]/70 max-w-md">
              A small studio that builds websites, products, applications, and GenAI apps, and consults when you need a straight technical opinion.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0066cc] text-white text-[15px] font-medium hover:bg-[#0071e3] transition-colors"
              >
                Contact us
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-[#0066cc] text-[#0066cc] text-[15px] font-medium hover:bg-[#0066cc]/5 transition-colors"
              >
                See services
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-product">
            <img
              src="https://picsum.photos/seed/zelkyrus-studio-desk/900/700"
              alt="A developer's workspace mid-build"
              className="w-full h-full object-cover aspect-[9/7]"
            />
          </div>
        </div>
      </section>

      {/* Services bento */}
      <section className="bg-[#f5f5f7] py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] mb-10 max-w-lg">
            One team, whatever needs building.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map(s => {
              const dark = s.tile === 'dark'
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl p-8 flex flex-col gap-4 ${
                    dark ? 'bg-[#1d1d1f] text-white' : 'bg-white text-[#1d1d1f]'
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
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] mb-14 text-center">
            No layers, just building.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map(step => (
              <div key={step.n} className="text-center">
                <div className="text-[13px] font-medium text-[#0066cc] mb-2">{step.n}</div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1.5">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1f] py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-white">
            Ready to build something?
          </h2>
          <p className="mt-3 text-[17px] text-white/60">
            A website, a product, a GenAI feature, or an hour of advice. We're in.
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
