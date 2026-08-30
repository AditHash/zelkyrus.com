import Link from 'next/link'
import Image from 'next/image'
import { MapPin, MessageSquare, FileCheck, Hammer, Rocket } from 'lucide-react'

const values = [
  { title: 'AI-native', desc: 'We build with AI at the core when it earns its place, not bolted on for a headline.' },
  { title: 'Outcome-driven', desc: 'We ship things that create real value, not features for the sake of a roadmap.' },
  { title: 'Straight talk', desc: 'Honest scoping and honest timelines. No agency-speak, no padding.' },
  { title: 'Move fast', desc: 'Small teams die from slowness too. We ship, learn, and iterate.' },
]

const approach = [
  { icon: MessageSquare, title: 'We listen before we scope', desc: 'A kickoff call is about understanding the actual problem, not pitching a package.' },
  { icon: FileCheck, title: 'We write the plan down', desc: 'What gets built, in what order, and what "done" looks like, before any code ships.' },
  { icon: Hammer, title: 'We build in the open', desc: 'You see progress every week. Nothing disappears into a black box until launch day.' },
  { icon: Rocket, title: 'We stay past launch', desc: 'Shipping is the start of the feedback loop, not the end of the engagement.' },
]

const stack = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL',
  'AWS', 'Docker', 'Claude & GPT APIs', 'LangChain', 'Terraform', 'CI/CD',
]

export default function AboutPage() {
  return (
    <div>
      <section className="pt-16 md:pt-24 pb-20 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-product order-2 md:order-1">
            <Image
              src="/Images/team.png"
              alt="The Zelkyrus team"
              width={900}
              height={700}
              className="w-full object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h1 className="text-[36px] leading-[1.1] md:text-[44px] font-semibold tracking-[-0.02em] text-[#1d1d1f] dark:text-white">
              A small studio that turns ideas into shipped products.
            </h1>
            <div className="flex items-center gap-1.5 mt-4 text-[#6e6e73] dark:text-[#a1a1a6] text-[14px]">
              <MapPin size={14} />
              <span>Remote-first</span>
            </div>

            <div className="mt-6 space-y-4 text-[17px] leading-[1.47] text-[#1d1d1f]/75 dark:text-white/70">
              <p>
                Zelkyrus started because we kept seeing the same thing: good ideas stuck in decks, slowed down by teams too big to move and too process-heavy to just build.
              </p>
              <p>
                We're a small, hands-on team that builds websites, full-stack applications, and GenAI-powered apps end to end. When you need a clear technical opinion instead of more code, we consult on application development, AI/ML & GenAI, and DevOps & Cloud.
              </p>
              <p>
                We stay deliberately small. Every project gets people who actually write the code, not a layer of account management between you and the work. That's slower to scale, and it's why the work holds up.
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

      {/* How a project actually flows */}
      <section className="bg-[#f5f5f7] dark:bg-[#1c1c1e] py-20 px-5 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-8 max-w-md">
              How we actually work together
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {approach.map(a => (
                <div key={a.title} className="p-6 rounded-2xl bg-white dark:bg-[#2c2c2e] border border-black/5 dark:border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center mb-4">
                    <a.icon size={17} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white mb-1.5">{a.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-product">
            <Image
              src="/Images/consulting-desk.png"
              alt="Talking through a project with a client"
              width={900}
              height={700}
              className="w-full h-full object-cover aspect-[9/7]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-10 text-center">
            What that looks like in practice
          </h2>
          <div className="divide-y divide-black/10 dark:divide-white/10">
            {values.map(v => (
              <div key={v.title} className="py-6 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] dark:text-white sm:w-44 shrink-0">{v.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#6e6e73] dark:text-[#a1a1a6]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="bg-[#f5f5f7] dark:bg-[#1c1c1e] py-16 px-5 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-[#1d1d1f] dark:text-white mb-6">
            What we build with
          </h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {stack.map(item => (
              <span
                key={item}
                className="px-4 py-2 rounded-full text-[13px] font-medium bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white border border-black/5 dark:border-white/10"
              >
                {item}
              </span>
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
