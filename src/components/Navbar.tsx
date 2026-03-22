import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Technology', href: '#tech' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong border-b border-white/5 py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/icon.png"
            alt="Zelkyrus"
            className="w-10 h-10 object-contain group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] transition-all duration-300"
          />
          <img
            src="/branding-transparent.png"
            alt="Zelkyrus"
            className="h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="mailto:contact@zelkyrus.com"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-white transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-400 hover:text-white transition-colors p-1"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass-strong border-t border-white/5 px-6 py-4">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-400 hover:text-white transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:contact@zelkyrus.com"
              className="mt-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/10 text-slate-300 hover:border-cyan-400/40 text-center transition-all"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
