'use client'

import { useState } from 'react'
import { Mail, MessageSquare, Building2, Check } from 'lucide-react'

const reasons = [
  { icon: Building2, label: 'Start a new project' },
  { icon: MessageSquare, label: 'General inquiry' },
  { icon: Mail, label: 'Partnership or investment' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-16 md:pt-24 pb-24 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-[36px] md:text-[44px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            Let's talk.
          </h1>
          <p className="mt-4 text-[17px] leading-[1.47] text-[#1d1d1f]/70 max-w-md mx-auto">
            Whether you want to start a project, explore a partnership, or just say hi, we're here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            {reasons.map(r => (
              <div key={r.label} className="flex items-center gap-3 p-4 rounded-2xl bg-[#f5f5f7]">
                <div className="w-9 h-9 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center shrink-0">
                  <r.icon size={17} />
                </div>
                <span className="text-[14px] font-medium text-[#1d1d1f]">{r.label}</span>
              </div>
            ))}

            <div className="mt-1 p-4 rounded-2xl border border-[#d2d2d7]">
              <p className="text-[13px] text-[#6e6e73] leading-relaxed">
                We typically respond within 24 hours. For urgent requests, mention it in your message.
              </p>
              <a
                href="mailto:hello@zelkyrus.com"
                className="mt-3 flex items-center gap-1.5 text-[14px] text-[#0066cc] hover:text-[#0071e3] transition-colors"
              >
                <Mail size={14} />
                hello@zelkyrus.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-[#f5f5f7]">
                <div className="w-12 h-12 rounded-full bg-[#0066cc]/10 flex items-center justify-center mb-4">
                  <Check size={20} className="text-[#0066cc]" />
                </div>
                <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">Message sent</h3>
                <p className="text-[#6e6e73] text-[14px]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#f5f5f7] flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#1d1d1f]/70" htmlFor="name">Name</label>
                    <input
                      id="name"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Chen"
                      className="px-4 py-2.5 rounded-xl bg-white border border-[#d2d2d7] text-[#1d1d1f] text-[14px] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0066cc] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#1d1d1f]/70" htmlFor="email">Email</label>
                    <input
                      id="email"
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="px-4 py-2.5 rounded-xl bg-white border border-[#d2d2d7] text-[#1d1d1f] text-[14px] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0066cc] transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1d1d1f]/70" htmlFor="company">
                    Company <span className="text-[#6e6e73]">(optional)</span>
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#d2d2d7] text-[#1d1d1f] text-[14px] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0066cc] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#1d1d1f]/70" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#d2d2d7] text-[#1d1d1f] text-[14px] placeholder:text-[#6e6e73] focus:outline-none focus:border-[#0066cc] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center px-6 py-3 rounded-full bg-[#0066cc] text-white text-[15px] font-medium hover:bg-[#0071e3] transition-colors mt-2"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
