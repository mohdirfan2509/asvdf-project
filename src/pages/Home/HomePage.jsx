import Navbar from '@components/Navbar/Navbar'
import Hero from '@components/Hero/Hero'
import FeatureCards from '@components/FeatureCards/FeatureCards'
import Statistics from '@components/Statistics/Statistics'
import './HomePage.css'

export default function HomePage() {
  return (
    <main className="home-page">
      {/* 1. Premium Floating Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Feature Cards — floats over hero bottom */}
      <FeatureCards />

      {/* 4. Statistics */}
      <Statistics />
    </main>
  )
}
