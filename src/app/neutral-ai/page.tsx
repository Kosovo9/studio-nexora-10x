import Header from '@/components/neutral-ai/Header'
import HeroStats from '@/components/neutral-ai/HeroStats'
import ChatTestimonials from '@/components/neutral-ai/ChatTestimonials'
import SolutionsSection from '@/components/neutral-ai/SolutionsSection'

export default function NeutralAIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nexora-deepBlue via-nexora-midBlue to-nexora-darkBlue relative overflow-hidden">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <Header />
      
      <main className="relative z-10 pb-32">
        <HeroStats />
        <ChatTestimonials />
        <SolutionsSection />
        
        {/* Contact Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button className="bg-nexora-gold text-nexora-deepBlue px-8 py-4 rounded-full font-semibold hover:bg-nexora-lightGold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            CONTACTO
          </button>
        </div>
      </main>
    </div>
  )
}

