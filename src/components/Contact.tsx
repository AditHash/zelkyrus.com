import { Mail, ArrowRight, Globe } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Full-width glow */}
      <div className="orb w-full h-[600px] bg-gradient-to-r from-cyan-500/5 via-violet-600/5 to-blue-500/5 top-1/2 left-0 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 mb-8 uppercase tracking-widest">
          Get in Touch
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
          Building the next generation
          <br />
          of{' '}
          <span className="text-gradient">intelligent systems</span>
        </h2>

        <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto">
          For collaborations, partnership opportunities, or early access to our products —
          we'd love to hear from you.
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-12">
          <a
            href="mailto:contact@zelkyrus.com"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 glass hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Email</p>
              <p className="text-sm font-medium text-white">contact@zelkyrus.com</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </a>

          <a
            href="https://zelkyrus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 glass hover:border-violet-400/30 transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className="p-2.5 rounded-xl bg-violet-400/10 border border-violet-400/20 text-violet-400">
              <Globe size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Website</p>
              <p className="text-sm font-medium text-white">zelkyrus.com</p>
            </div>
            <ArrowRight size={14} className="ml-auto text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* Primary CTA */}
        <a
          href="mailto:contact@zelkyrus.com"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
        >
          Start a Conversation
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}
