import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-5">
      <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-[#6e6e73]">© {new Date().getFullYear()} Zelkyrus. All rights reserved.</p>
        <div className="flex items-center gap-6 text-[12px] text-[#6e6e73]">
          <Link href="/services" className="hover:text-[#1d1d1f] transition-colors">Services</Link>
          <Link href="/about" className="hover:text-[#1d1d1f] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#1d1d1f] transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
