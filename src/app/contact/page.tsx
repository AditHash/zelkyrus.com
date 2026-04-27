'use client'

import { useState } from 'react'
import { ArrowRight, Mail, MessageSquare, Building2 } from 'lucide-react'
import GlassIcons from '@/components/GlassIcons'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/10">
      {children}
    </span>
  )
}

const reasons = [
  { icon: Building2, color: 'cyan', label: 'Early access to IntervueIQ' },
  { icon: MessageSquare, color: 'sky', label: 'General inquiry' },
  { icon: Mail, color: 'blue', label: 'Partnership or investment' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-20">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <Badge>Contact</Badge>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">Let&apos;s talk</h1>
            <p className="mt-4 text-white/50 max-w-md mx-auto leading-relaxed">
              Whether you want early access to IntervueIQ, a partnership, or just want to say hi — we&apos;re here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left info */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <GlassIcons
                items={reasons.map(r => ({
                  icon: <r.icon size={20} />,
                  label: r.label,
                  color: r.color,
                }))}
              />

              <div className="mt-2 p-4 rounded-xl border border-white/10 glass">
                <p className="text-xs text-white/40 leading-relaxed">
                  We typically respond within 24 hours. For urgent requests, mention it in your message.
                </p>
                <a
                  href="mailto:hello@zelkyrus.com"
                  className="mt-3 flex items-center gap-1.5 text-sm text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  hello@zelkyrus.com
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-[#00d4ff]/20 glass-strong">
                  <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-4">
                    <ArrowRight className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message sent</h3>
                  <p className="text-white/50 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/10 glass-strong flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-white/40">Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Alex Chen"
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-white/40">Email</label>
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
                    <label className="text-xs text-white/40">Company <span className="text-white/25">(optional)</span></label>
                    <input
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/40">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you're looking for..."
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#00d4ff]/40 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white font-semibold hover:opacity-90 transition-all mt-2"
                  >
                    Send Message <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
