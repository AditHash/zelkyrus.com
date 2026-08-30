import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <p>
          Built by{' '}
          <Link href="/about" className="text-white/60 hover:text-white transition-colors underline underline-offset-2">
            Zelkyrus
          </Link>{' '}
          — We Build.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <span>© {new Date().getFullYear()} Zelkyrus</span>
        </div>
      </div>
    </footer>
  )
}
