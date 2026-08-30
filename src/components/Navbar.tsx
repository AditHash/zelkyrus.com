'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#000000]">
      <nav className="h-14 max-w-7xl mx-auto px-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-[6px] overflow-hidden bg-white flex items-center justify-center">
            <Image src="/Images/logo.png" alt="Zelkyrus" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-white text-[13px] font-semibold tracking-wide">Zelkyrus</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[12px] transition-colors ${
                pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#0066cc] text-white text-[12px] font-medium hover:bg-[#0071e3] transition-colors"
          >
            Contact us
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-white/80 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[#000000] border-t border-white/10 px-5 py-4 flex flex-col gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-sm ${pathname === link.href ? 'text-white' : 'text-white/60'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2.5 rounded-full bg-[#0066cc] text-white text-sm font-medium text-center"
          >
            Contact us
          </Link>
        </div>
      )}
    </header>
  )
}
