'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Mic, Brain, BarChart3 } from 'lucide-react'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10">
      {children}
    </span>
  )
}

const roles = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Executive',
  'Other',
]

const levels = ['Entry-level', 'Mid-level', 'Senior', 'Lead / Staff', 'Manager+']

const interviewTypes = [
  { label: 'AI Interview', desc: 'Practice with our AI interviewer', icon: Brain },
  { label: 'Live Assist', desc: 'Get AI help during real interviews', icon: Mic },
  { label: 'Full Assessment', desc: 'End-to-end hiring evaluation', icon: BarChart3 },
]

const steps = [
  { n: 1, label: 'Pick your role & level' },
  { n: 2, label: 'Choose interview type' },
  { n: 3, label: 'Start your AI session' },
]

export default function TryPage() {
  const [form, setForm] = useState({ name: '', email: '', role: '', level: '', type: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12">
          <Badge>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            Beta Access
          </Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Try <span className="text-gradient">IntervueIQ</span>
          </h1>
          <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
            Experience AI-powered interviews firsthand — as a candidate or a recruiter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Left — candidate preview + what to expect */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/Images/candidate.png"
                alt="IntervueIQ candidate experience"
                width={560}
                height={380}
                className="w-full object-cover"
                priority
              />
            </div>

            <div className="p-5 rounded-xl border border-white/10 glass flex flex-col gap-4">
              <p className="text-xs text-white/40 uppercase tracking-widest">What happens next</p>
              {steps.map((s, i) => (
                <div key={s.n} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border border-[#00d4ff]/40 bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff] font-bold text-xs shrink-0">
                    {s.n}
                  </div>
                  <span className="text-sm text-white/60">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 glass overflow-hidden">
              <Image
                src="/Images/onboarding.png"
                alt="Onboarding flow"
                width={560}
                height={300}
                className="w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs text-white/40">You&apos;ll see this onboarding screen when your session begins — tailored to your role and level.</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-[#00d4ff]/20 glass-strong">
                <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">You&apos;re on the list</h3>
                <p className="text-white/50 text-sm max-w-xs">
                  We&apos;ll send your access link to <span className="text-white/70">{form.email}</span> within 24 hours. Get ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/10 glass-strong flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/40">Your Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Chen"
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/40">Work Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/40">Role you&apos;re interviewing for</label>
                  <select
                    required
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00d4ff]/40 transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-[#020617]">Select a role...</option>
                    {roles.map(r => (
                      <option key={r} value={r} className="bg-[#020617]">{r}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40">Experience level</label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map(l => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setForm({ ...form, level: l })}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                          form.level === l
                            ? 'border-[#00d4ff]/50 bg-[#00d4ff]/10 text-[#00d4ff]'
                            : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40">Interview type</label>
                  <div className="flex flex-col gap-2">
                    {interviewTypes.map(t => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setForm({ ...form, type: t.label })}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                          form.type === t.label
                            ? 'border-[#00d4ff]/40 bg-[#00d4ff]/8 text-white'
                            : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white/80'
                        }`}
                      >
                        <t.icon className={`w-4 h-4 shrink-0 ${form.type === t.label ? 'text-[#00d4ff]' : 'text-white/30'}`} />
                        <div>
                          <div className="text-sm font-medium">{t.label}</div>
                          <div className="text-xs text-white/35">{t.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all mt-1"
                >
                  Request Access <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-xs text-white/25">
                  We&apos;re onboarding select users. Spots are limited.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
