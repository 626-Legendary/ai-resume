import React, { useEffect, useState } from "react";
import { Button } from '../ui/button.jsx';
import TechLogos from './TechLogos.jsx';
import { Link } from 'react-router-dom';
import Siliconflow from '../../assets/siliconflow.svg'
import Gemini from '../../assets/gemini.svg'

const Hero = () => {
  const [appServer, setAppServer] = useState(null);
  const [dbServer, setDbServer] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      const healthUrl = import.meta.env.VITE_API_HEALTH_URL;
      try {
        const res = await fetch(healthUrl);

        if (!res.ok) {
          setAppServer(false)
          setDbServer(false)
        } else {
          setTimeout(() => {
            setAppServer(true);


          }, 1500);

          setTimeout(() => {

            setDbServer(true);

          }, 2500);
        }

        const data = await res.json();
        console.log("app status: " + data[0].db)
        console.log("db status: " + data[0].db)


      } catch (err) {
        console.error(err.message);
        setAppServer(false);
        setDbServer(false);
      } finally {



      }
    };

    checkHealth();
  }, []);

  return (

    <div className='mx-auto px-4 pt-20 sm:py-28 lg:py-40 border-b border-gray-800 text-center text-white'>


      <div className='flex justify-center flex-wrap gap-x-3 gap-y-3 mb-8'>


        <div className='inline-flex items-center bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-300'>
          <span
            className={`
            h-2 w-2 rounded-full mr-2
            transition-colors duration-1000 ease-in-out
            ${appServer ? "bg-green-500" : "bg-red-500"}
        `}
          />
          Application Server
        </div>


        <div className='inline-flex items-center bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-300'>
          <span
            className={`
            h-2 w-2 rounded-full mr-2
            transition-colors duration-1000 ease-in-out
            ${dbServer ? "bg-green-500" : "bg-red-500"}
        `}
          />
          Database Server
        </div>



        <div className='inline-flex items-center bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-300'>
          <span
            className={`
            h-2 w-2 rounded-full mr-2
            transition-colors duration-1000 ease-in-out
            ${dbServer && appServer ? "bg-green-500" : "bg-red-500"}
        `}
          />
          AI Inference Engine
        </div>
      </div>


      {/* 主标题 */}
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-snug sm:leading-tight mb-10'>
        AI-Powered Resumes<br />
        <span className='bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-green-500'>
          That Gets You Hired
        </span>
      </h1>

      {/* 描述 */}
      <p className='sm:text-xs md:text-lg text-gray-400 mb-10 max-w-3xl mx-auto text-justify px-4'>
        Harnessing advanced LLMs, our platform analyzes job postings to optimize your resume, fully match job requirements, and make you a highly competitive candidate.
      </p>

      <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>

        <Link to="/dashboard">
          {appServer ? (
            <Button
              className={`
            h-12 px-8 text-lg bg-white text-gray-900 font-semibold rounded-lg shadow-md
            border border-transparent
            transition-all duration-700 ease-in-out 
            animate-fadeIn
           hover:bg-gray-200
            `}
            >
              Get Started &gt;&gt;
            </Button>
          ) : (
            <span className="text-gray-400 animate-pulse">Connecting...</span>
          )}


        </Link>
      </div>
      {/*赞助商*/}
      <div className="flex mx-auto justify-evenly mt-24 lg:mt-32">
        <a href="https://siliconflow.cn/" target="_blank">
          <img className="w-30 lg:w-40 transition-transform duration-300 
           hover:scale-110 cursor-pointer" src={Siliconflow} alt="Siliconflow Logo" />
        </a>
        <a href="https://gemini.google.com/" target="_blank">
          <img className="w-30 lg:w-40 transition-transform duration-300 
           hover:scale-110 cursor-pointer" src={Gemini} alt="Siliconflow Logo" />
        </a>
      </div>
      
      {/* 技术栈 Logo 循环组件 */}
      <div className='my-8 lg:mt-16'>
        <TechLogos />
      </div>
    </div >
  );
}

export default Hero;