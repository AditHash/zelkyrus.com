import Link from 'next/link'
import { ArrowRight, Zap, Users, Brain, BarChart3, Shield, Clock, ImageIcon } from 'lucide-react'
import GlassIcons from '@/components/GlassIcons'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10">
      {children}
    </span>
  )
}

const features = [
  {
    icon: Brain,
    color: 'cyan',
    title: 'AI-Powered Screening',
    desc: 'Automatically evaluate resumes and applications against your role requirements. No keyword matching — real semantic understanding.',
  },
  {
    icon: Zap,
    color: 'sky',
    title: 'Real-Time Interview Analysis',
    desc: 'During live interviews, IntervueIQ analyzes responses, suggests follow-up questions, and scores candidates on the fly.',
  },
  {
    icon: Users,
    color: 'blue',
    title: 'Candidate Prep Platform',
    desc: 'Candidates get personalized mock interviews, role-specific question banks, and instant feedback to arrive interview-ready.',
  },
  {
    icon: BarChart3,
    color: 'indigo',
    title: 'Hiring Analytics',
    desc: 'Track pipeline health, time-to-hire, source quality, and interviewer consistency — all in a single dashboard.',
  },
  {
    icon: Shield,
    color: 'purple',
    title: 'Bias Detection',
    desc: 'Structured scoring and blind review modes reduce unconscious bias and improve diversity in your candidate pipeline.',
  },
  {
    icon: Clock,
    color: 'sky',
    title: 'ATS Integration',
    desc: 'Plug IntervueIQ directly into your existing ATS. Works with Greenhouse, Lever, Workday, and more.',
  },
]

const steps = [
  { n: 1, title: 'Connect your ATS', desc: 'Link IntervueIQ to your existing hiring stack in under 2 minutes.' },
  { n: 2, title: 'Define the role', desc: 'Describe what great looks like. Our AI generates screening criteria and interview guides.' },
  { n: 3, title: 'Let AI screen', desc: 'Candidates are evaluated automatically. You only review the ones that matter.' },
  { n: 4, title: 'Interview with confidence', desc: 'Real-time AI guidance during interviews. Structured scoring. Zero guesswork.' },
  { n: 5, title: 'Decide & hire', desc: 'Side-by-side comparisons, data-backed recommendations, and audit trails for every decision.' },
]

export default function IntervueIQPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-20">
        <Badge>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
          IntervueIQ — Now in Beta
        </Badge>

        <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          Hire Smarter.{' '}
          <span className="text-gradient">Interview Better.</span>
        </h1>

        <p className="mt-6 text-lg text-white/50 max-w-xl leading-relaxed">
          The AI platform that handles both sides of the hiring equation — helping companies find the right people and helping candidates land the right roles.
        </p>

        <div className="mt-10 flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-black font-semibold hover:bg-[#00d4ff]/90 transition-all"
          >
            Request Early Access <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all"
          >
            Talk to Sales
          </Link>
        </div>
      </section>

      {/* Product screenshot */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 glass-strong flex flex-col items-center justify-center gap-3 text-white/20">
          {/* Replace with: <Image src="/intervueiq-screenshot.png" alt="IntervueIQ dashboard" fill className="object-cover" /> */}
          <ImageIcon className="w-10 h-10" />
          <span className="text-xs">Product screenshot / demo image</span>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-14">
          <Badge>Features</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Everything your team needs</h2>
          <p className="mt-3 text-white/45 max-w-md mx-auto">One platform for recruiters, hiring managers, and candidates.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="shrink-0">
            <GlassIcons
              items={features.map(f => ({
                icon: <f.icon size={22} />,
                label: f.title,
                color: f.color,
              }))}
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {features.map(f => (
              <div key={f.title} className="p-5 rounded-xl border border-white/10 glass hover:border-[#00d4ff]/20 transition-colors">
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 max-w-3xl mx-auto pb-28">
        <div className="text-center mb-14">
          <Badge>Workflow</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">From open role to offer</h2>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <div key={step.n} className="flex gap-5 items-start">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-9 h-9 rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] font-bold text-sm">
                  {step.n}
                </div>
                {i < steps.length - 1 && <div className="w-px h-10 bg-[#00d4ff]/15 mt-2" />}
              </div>
              <div className="pb-6">
                <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 max-w-4xl mx-auto pb-24">
        <div className="glass-strong border border-white/10 rounded-2xl p-12 text-center">
          <Badge>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Limited Beta Access
          </Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Join the waitlist</h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
            We&apos;re onboarding a select group of companies. Get early access and shape the product.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-black font-semibold hover:bg-[#00d4ff]/90 transition-all"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
