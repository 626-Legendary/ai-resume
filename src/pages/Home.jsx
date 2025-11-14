import React from 'react'
import Navbar from '../components/home/Navbar.jsx'
import Hero from '../components/home/Hero.jsx'
import Features from '../components/home/Features.jsx'
import FAQ from '../components/home/FAQ.jsx'
import Plans from '../components/home/Plans.jsx'
import Team from '../components/home/Team.jsx'
import Footer from '../components/home/Footer.jsx'
import Contact from '../components/home/Contact.jsx'
import ToolLogos from '@/components/home/ToolLogos.jsx'


const Home = () => {
  return (
   
    <div className='bg-gray-900 font-sans text-white w-full min-h-screen'>
     
      <Navbar /> 
      
      {/* 主内容 */}
      <main className="mx-auto"> 
        <Hero />
        <Features />
        {/* <Plans /> */}
        <FAQ />
        <Team />
        {/* <Contact /> */}
        <ToolLogos />
      </main>
      
      <Footer />
    </div>
  )
}

export default Home