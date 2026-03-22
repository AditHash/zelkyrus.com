const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="Zelkyrus" className="w-7 h-7 object-contain opacity-80" />
          <div>
            <img src="/branding-transparent.png" alt="Zelkyrus" className="h-4 object-contain opacity-70" />
            <div className="text-xs text-slate-500 mt-0.5">Intelligence, Engineered.</div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6 text-sm text-slate-500">
          {[
            { label: 'About', href: '#about' },
            { label: 'Products', href: '#products' },
            { label: 'Technology', href: '#tech' },
            { label: 'Contact', href: '#contact' },
          ].map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-600">
          © {year} Zelkyrus. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
