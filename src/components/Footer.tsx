import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#1c1c1e] px-5 transition-colors">
      <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-[#6e6e73] dark:text-[#a1a1a6]">© {new Date().getFullYear()} Zelkyrus. All rights reserved.</p>
        <div className="flex items-center gap-6 text-[12px] text-[#6e6e73] dark:text-[#a1a1a6]">
          <Link href="/services" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">Services</Link>
          <Link href="/about" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
