import { useState } from 'react'

// import './App.css'
import HeroSection from './Hero.jsx'
import Fcard from './FeatureCards.jsx'
import FeatureSection from './FeaturesSection.jsx'
import HowItWorks from './HowitWorks.jsx'
import Footer from './Footer.jsx'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
function Home() {

  const canonicalUrl = `${window.location.href}`;
  const originUrl = `${window.location.origin}`;

return(
  <>
  <Helmet>
  <title>Expo-Tracey | Budget Smarter, Spend Wiser</title>

  {/* Additional Tags */}
  <meta name="author" content="Expo-Tracey Team" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta charset="UTF-8" />

  {/* SEO Meta Tags */}
  <meta
    name="description"
    content="Welcome to Expo-Tracey! Track your finances, set budgets, and monitor your expenses effortlessly. Manage multiple accounts, visualize balance trends, and achieve your financial goals with ease."
  />
  <meta
    name="keywords"
    content="Budget Tracker, Expense Tracker, Personal Finance, Financial Management, Track Spending, Set Budget, Manage Accounts, Financial Goals"
  />
  <meta name="robots" content="index, follow" />

  <link rel="canonical" href={canonicalUrl} />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    property="og:description"
    content="Expo-Tracey helps you manage your finances with ease. Track spending, set and monitor budgets, and manage your accounts for better financial control."
  />
  <meta property="og:image" content={`${originUrl}/images/Home.png`} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Expo-Tracey | Budget Smarter, Spend Wiser" />
  <meta
    name="twitter:description"
    content="Take control of your finances with Expo-Tracey. Track expenses, set budgets, and gain insights into your financial health easily."
  />
  <meta name="twitter:image" content={`${originUrl}/images/Home.png`} />
</Helmet>

  <HeroSection />
  <FeatureSection />
  <Fcard />
  <HowItWorks />
  <Footer />
  </>
)
}

export default Home;
