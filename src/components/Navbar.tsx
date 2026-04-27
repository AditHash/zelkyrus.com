'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products/intervueiq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-1 px-3 py-2 rounded-full glass-strong border border-white/10 shadow-2xl">
          <Link href="/" className="flex items-center gap-2 px-2 py-1 mr-2">
            <div className="w-7 h-7 rounded-md overflow-hidden bg-white shrink-0 flex items-center justify-center">
              <Image src="/Images/logo.png" alt="Zelkyrus" width={28} height={28} className="object-contain" />
            </div>
            <span className="font-bold text-white text-sm tracking-widest hidden sm:block">ZELKYRUS</span>
          </Link>

          <div className="hidden md:flex items-center">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                  pathname === link.href
                    ? 'text-[#00d4ff]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span className={pathname === link.href ? 'border-b border-[#00d4ff] pb-0.5' : ''}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <Link
            href="/try"
            className="hidden md:block ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white text-sm font-semibold hover:opacity-90 transition-colors whitespace-nowrap"
          >
            Try IntervueIQ
          </Link>

          <button
            className="md:hidden ml-2 p-1.5 text-white/60 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 pt-24 px-4 glass-strong md:hidden" onClick={() => setOpen(false)}>
          <div className="flex flex-col gap-2 p-4 rounded-2xl border border-white/10 glass-strong">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                  pathname === link.href ? 'text-[#00d4ff] bg-[#00d4ff]/10' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/try"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#00d4ff] text-white text-sm font-semibold text-center"
            >
              Try IntervueIQ
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
