import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    
    <footer className='bg-gray-900 text-gray-400 py-12 md:py-16'>
      

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        

        <div className='mb-6'>
          <div className='text-3xl sm:text-4xl font-bold text-center mb-4 text-white'>
            <span className="text-blue-400">FairStart</span> AI Resume
          </div>
          <p className='text-sm mb-6 text-gray-500'>
            AI-Powered Resumes that gets you hired.
          </p>
        </div>
        

        <div className='flex justify-center space-x-6 mb-8 border-b border-gray-700 pb-8'>
          
          <a href="https://github.com/Hackathon-AI-Resume" target='blank' aria-label="GitHub" className='hover:text-white transition duration-300'>
            <Github size={24} />
          </a>
        </div>
        

        <div className='text-xs text-gray-500'>
          <p>
            &copy; {currentYear} FairStart. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer;