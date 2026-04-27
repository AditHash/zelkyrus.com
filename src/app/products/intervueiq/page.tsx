import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Users, Brain, BarChart3, Shield, Clock, CheckCircle } from 'lucide-react'

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

const showcase = [
  {
    src: '/Images/onboarding.png',
    title: 'Candidate Onboarding',
    desc: 'Candidates set up in seconds — select role, experience level, and interview type to get a personalised AI session.',
  },
  {
    src: '/Images/ai-to-human-interview.png',
    title: 'AI Interview Mode',
    desc: 'Candidates face an AI interviewer that listens, asks follow-ups, and evaluates responses in real time.',
  },
  {
    src: '/Images/human-to-human-interview.png',
    title: 'Live Interview Assist',
    desc: 'During human-led interviews, IntervueIQ surfaces suggested questions and analyses the conversation live.',
  },
  {
    src: '/Images/admin-portal.png',
    title: 'Recruiter Portal',
    desc: 'Review all interviews, AI scores, and candidate summaries in one organised dashboard.',
  },
]

const pills = ['AI-Powered', 'Bias-Free', 'Role-Specific', 'Scalable']

export default function IntervueIQPage() {
  return (
    <div>
      {/* Hero — split layout matching mockup */}
      <section className="min-h-screen flex items-center px-4 max-w-6xl mx-auto pt-28 pb-20">
        <div className="flex flex-col md:flex-row gap-12 items-center w-full">

          {/* Left */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] border border-[#1e293b] text-[#00d4ff] text-xs font-medium mb-6">
              AI-POWERED INTERVIEW PLATFORM
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              AI Interviews{' '}
              <span className="text-gradient">that understand</span>{' '}
              people, not just resumes.
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">
              Conduct intelligent, bias-free interviews with real-time AI analysis to identify true talent beyond keywords.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all"
              >
                Start AI Interview <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl border border-[#1e293b] text-white/70 hover:border-white/30 hover:text-white transition-all"
              >
                Book a Demo
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {pills.map(p => (
                <span key={p} className="flex items-center gap-1.5 text-sm text-white/50">
                  <CheckCircle className="w-4 h-4 text-[#00d4ff]" />
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right — interview card */}
          <div className="flex-1 w-full">
            <div className="rounded-2xl overflow-hidden border border-[#1e293b] bg-[#0f172a]/70 backdrop-blur-sm shadow-2xl shadow-[#2563eb]/10">
              <Image
                src="/Images/ai-to-human-interview.png"
                alt="IntervueIQ AI Interview"
                width={700}
                height={440}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard screenshot */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#2563eb]/10">
          <Image
            src="/Images/dashboard.png"
            alt="IntervueIQ Dashboard"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-14">
          <Badge>Features</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">Everything your team needs</h2>
          <p className="mt-3 text-white/45 max-w-md mx-auto">One platform for recruiters, hiring managers, and candidates.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title} className="p-5 rounded-xl border border-white/10 glass hover:border-[#2563eb]/30 transition-colors flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#2563eb]/15 border border-[#2563eb]/20 text-[#00d4ff]">
                <f.icon size={18} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product showcase grid */}
      <section className="px-4 max-w-5xl mx-auto pb-28">
        <div className="text-center mb-14">
          <Badge>In Action</Badge>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">See every part of the platform</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcase.map(item => (
            <div key={item.title} className="rounded-2xl overflow-hidden border border-white/10 glass-strong">
              <div className="overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={600}
                  height={380}
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all"
            >
              Request Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
