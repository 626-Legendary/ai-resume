import React from 'react'
import { Button } from '../ui/button.jsx';
import TechLogos from './TechLogos.jsx';

const Hero = () => {
  return (
    // 容器：垂直内边距调整为 sm:py-24 和 lg:py-40，提供更优的视觉平衡
    <div className='mx-auto px-4 py-20 sm:py-28 lg:py-40 border-b border-gray-800 text-center text-white'>

      {/* 标签组：在小屏幕上使用 flex-wrap 换行，并调整间距 */}
      <div className='flex justify-center flex-wrap gap-x-3 gap-y-3 mb-8'>

        {/* Tag 1: Application Server */}
        <div className='inline-flex items-center bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-300'>
          <span className='bg-green-500 h-2 w-2 rounded-full mr-2'></span>Application Server
        </div>

        {/* Tag 2: Database Server */}
        <div className='inline-flex items-center bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-300'>
          <span className='bg-amber-500 h-2 w-2 rounded-full mr-2'></span>Database Server
        </div>

        {/* Tag 3: AI Inference Engine */}
        <div className='inline-flex items-center bg-gray-800 rounded-full px-3 py-1 text-xs text-gray-300'>
          <span className='bg-red-500 h-2 w-2 rounded-full mr-2'></span>AI Inference Engine
        </div>
      </div>


      {/* 主标题：移动端 4xl，中屏幕 md:text-6xl，大屏幕 lg:text-7xl */}
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-snug sm:leading-tight'>
        AI-Powered Resumes <br />
        <span className='bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-green-500'>
          That Gets You Hired
        </span>
      </h1>

      {/* 描述：max-w-3xl 更紧凑，文本大小保持不变 */}
      <p className='sm:text-xs md:text-lg text-gray-400 mb-10 max-w-3xl mx-auto'>
        Community-driven resume builder for software engineers with AI-powered optimization. Own your data, customize every template, and land your dream job.
      </p>

      {/* 按钮组：使用 Flex 布局居中，并在移动端堆叠或居中 */}
      <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>


        <Button className="h-12 px-8 text-lg bg-white text-gray-900 font-semibold rounded-lg shadow-md transition-colors duration-200 hover:bg-gray-200 border border-transparent">
          Get Started &gt;&gt;
        </Button>


        <Button className="h-12 px-8 text-lg bg-transparent text-white font-semibold rounded-lg transition-colors duration-200 hover:bg-gray-800 border border-gray-700">
          View Templates
        </Button>
      </div>

      {/* 技术栈 Logo 循环组件 */}
      <div className='mt-32'>
        <TechLogos />
      </div>  
    </div>
  );
}

export default Hero;