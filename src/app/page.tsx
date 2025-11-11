import HeaderNew from '@/components/HeaderNew'
import HeroSection from '@/components/HeroSection'
import SolutionsSectionNew from '@/components/SolutionsSectionNew'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Background Shapes */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      
      <HeaderNew />
      
      <div className="container">
        <HeroSection />
        <SolutionsSectionNew />
      </div>
    </main>
  )
}
