const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 to-violet-600 opacity-70" />
            <div className="absolute inset-[2px] rounded-[4px] bg-[#050508] flex items-center justify-center">
              <span className="text-[10px] font-black text-gradient">Z</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Zelkyrus</div>
            <div className="text-xs text-slate-500">Intelligence, Engineered.</div>
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
