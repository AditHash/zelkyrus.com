import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Tech from '@/components/Tech'
import WhyZelkyrus from '@/components/WhyZelkyrus'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Tech />
        <WhyZelkyrus />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
