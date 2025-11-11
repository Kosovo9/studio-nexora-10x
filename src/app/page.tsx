import Header from '@/components/Header'
import HeroStats from '@/components/HeroStats'
import SolutionsSection from '@/components/SolutionsSection'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0d102a] via-[#1a1f4c] to-[#2c327c] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0b90b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Radial Gradients for Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#f0b90b]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#3a4a9f]/20 to-transparent blur-3xl" />
      </div>
      
      <Header />
      <HeroStats />
      <SolutionsSection />
    </main>
  )
}
