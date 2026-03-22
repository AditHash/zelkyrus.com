import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Products from '@/components/Products'
import Tech from '@/components/Tech'
import WhyZelkyrus from '@/components/WhyZelkyrus'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Aurora from '@/components/Aurora'
import SplashCursor from '@/components/SplashCursor'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      {/* Global Aurora background — fixed, behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={['#00d4ff', '#7c3aed', '#3b82f6']}
          amplitude={1.2}
          blend={0.6}
          speed={0.4}
        />
      </div>

      {/* Fluid cursor splashes */}
      <SplashCursor />

      <div className="relative z-10">
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
    </div>
  )
}
