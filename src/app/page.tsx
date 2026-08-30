import Link from 'next/link'
import Image from 'next/image'
import { Globe as GlobeIcon, Layers, Sparkles, Lightbulb as LightbulbIcon, Users, MessageCircle, DollarSign, Zap } from 'lucide-react'

const services = [
  {
    icon: GlobeIcon,
    title: 'Websites',
    desc: 'Fast, clean marketing sites and web presence, built to load quick and convert visitors into leads.',
    tile: 'light',
  },
  {
    icon: Layers,
    title: 'Full-stack applications',
    desc: 'Web and mobile applications built end to end, from the database and API layer up to the UI.',
    tile: 'dark',
  },
  {
    icon: Sparkles,
    title: 'GenAI-powered apps',
    desc: 'Agents, copilots, and automation built into the product core, using the model that fits the job.',
    tile: 'dark',
  },
  {
    icon: LightbulbIcon,
    title: 'Consulting',
    desc: 'Technical advisory on application development, AI/ML & GenAI strategy, and DevOps & Cloud.',
    tile: 'light',
  },
]

const steps = [
  { n: '01', title: 'Talk', desc: 'Tell us what you\'re trying to build and why. We ask questions until the scope is real.' },
  { n: '02', title: 'Plan', desc: 'We turn that into a concrete plan: what gets built, in what order, and roughly how long it takes.' },
  { n: '03', title: 'Build', desc: 'We build in short cycles with visible progress, not a black box that reappears at the deadline.' },
  { n: '04', title: 'Ship', desc: 'We launch, watch how it is actually used, and keep improving from there.' },
]

const reasons = [
  { icon: Users, title: 'Small by design', desc: 'You talk to the people writing the code, not a rotating account manager.' },
  { icon: MessageCircle, title: 'Direct communication', desc: 'Weekly updates, no status-report theater. If something\'s stuck, you hear it early.' },
  { icon: DollarSign, title: 'Scoped, not vague', desc: 'Fixed-scope projects get a fixed quote. Ongoing work is billed for the hours it takes.' },
  { icon: Zap, title: 'Fast to start', desc: 'No months-long sales process. Most engagements start within a couple of weeks.' },
]

const faqs = [
  {
    q: 'What size of project do you take on?',
    a: 'Anything from a single landing page to a full product build. If it\'s too small for us to do well, we\'ll say so upfront instead of taking the money.',
  },
  {
    q: 'Do you work with early-stage startups or only established companies?',
    a: 'Both. Early-stage work tends to be MVP-shaped and fast-moving; established companies more often bring us in for a specific application, GenAI feature, or a consulting engagement.',
  },
  {
    q: 'What does the consulting engagement actually look like?',
    a: 'Depends on the ask. Sometimes it\'s a short architecture review, sometimes it\'s ongoing advisory across a build. We scope it the same way we scope development work: talk first, then a concrete plan.',
  },
  {
    q: 'How fast can you start?',
    a: 'Usually within one to two weeks of agreeing on scope, depending on what else is in progress.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero: asymmetric split */}
      <section className="pt-16 md:pt-24 pb-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-[40px] leading-[1.1] md:text-[56px] md:leading-[1.07] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
              We build.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.47] text-[#1d1d1f]/70 dark:text-white/60 max-w-md">
              A small studio building websites, full-stack applications, and GenAI apps, plus consulting on app development, AI/ML, and DevOps & Cloud.
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
            <Image
              src="/Images/hero-desk.png"
              alt="A developer's workspace mid-build"
              width={900}
              height={700}
              className="w-full h-full object-cover aspect-[9/7]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services bento */}
      <section className="bg-[#f5f5f7] dark:bg-[#1c1c1e] py-20 px-5 transition-colors">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-10 max-w-lg">
            One team, whatever needs building.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map(s => {
              const dark = s.tile === 'dark'
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl p-8 flex flex-col gap-4 border ${
                    dark
                      ? 'bg-[#1d1d1f] dark:bg-[#2c2c2e] text-white border-black/5 dark:border-white/10'
                      : 'bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-white border-black/5 dark:border-white/10'
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
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process, paired with a real photo */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-product order-2 md:order-1">
            <Image
              src="/Images/office-planning.png"
              alt="Planning a build on a whiteboard"
              width={900}
              height={700}
              className="w-full h-full object-cover aspect-[9/7]"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-8">
              No layers, just building.
            </h2>
            <div className="flex flex-col gap-6">
              {steps.map(step => (
                <div key={step.n} className="flex gap-4">
                  <div className="text-[13px] font-medium text-[#0066cc] w-6 shrink-0 pt-0.5">{step.n}</div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-1">{step.title}</h3>
                    <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="bg-[#f5f5f7] dark:bg-[#1c1c1e] py-20 px-5 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-8 max-w-md">
              Why work with a small studio.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map(r => (
                <div key={r.title} className="p-6 rounded-2xl bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-4">
                    <r.icon size={17} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-1.5">{r.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-product">
            <Image
              src="/Images/team-celebrating.png"
              alt="The team celebrating a shipped release"
              width={900}
              height={700}
              className="w-full h-full object-cover aspect-[9/7]"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-10 text-center">
            Questions people actually ask.
          </h2>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {faqs.map(f => (
              <div key={f.q} className="py-6">
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-2">{f.q}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{f.a}</p>
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
            A website, a full-stack app, a GenAI feature, or a consulting call. We're in.
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
