import { useState } from 'react'

// import './App.css'
import HeroSection from './Component/Hero.jsx'
import Fcard from './Component/FeatureCards.jsx'
import FeatureSection from './Component/FeaturesSection.jsx'
import HowItWorks from './Component/HowitWorks.jsx'
import Footer from './Component/Footer.jsx'
import Navbar from './Component/Navbar.jsx'
import { useSelector } from 'react-redux'

function App() {
return(
  <>
  <HeroSection />
  <FeatureSection />
  <Fcard />
  <HowItWorks />
  <Footer />
  </>
)
}

export default App
