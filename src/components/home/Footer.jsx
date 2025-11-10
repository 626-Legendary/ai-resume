import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // 假设你使用了 react-icons

const Footer = () => {
  // 定义一个常量用于当前年份，保持代码干净
  const currentYear = new Date().getFullYear();

  return (
    // 1. 整体容器：深色背景、足够的垂直填充
    <footer className='bg-gray-900 text-gray-400 py-16 md:py-20'>
      
      {/* 2. 主内容区域：限制宽度并居中 */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* 上半部分：链接和品牌信息 */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-b border-gray-700 pb-10 mb-8'>
          
          {/* 品牌信息/Logo 区域 */}
          <div className='col-span-2 md:col-span-1'>
            <div className='text-2xl font-bold text-white mb-4'>
              <span className="text-blue-400">FairStart</span> AI Resume
            </div>
            <p className='text-sm mb-4 max-w-xs'>
              AI-Powered Resumes that gets you hired. Build your future faster.
            </p>
            {/* 社交媒体图标 */}
            <div className='flex space-x-4 mt-6'>
              <a href="#" aria-label="Twitter" className='hover:text-white transition duration-300'>
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className='hover:text-white transition duration-300'>
                <FaLinkedin size={20} />
              </a>
              <a href="#" aria-label="GitHub" className='hover:text-white transition duration-300'>
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* 导航列 1：产品 */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Product</h3>
            <ul className='space-y-3 text-sm'>
              <li><a href="#" className='hover:text-white transition duration-300'>Resume Builder</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Resume Editor</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Cover Letter Writer</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>AI Optimization</a></li>
            </ul>
          </div>

          {/* 导航列 2：公司 */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Company</h3>
            <ul className='space-y-3 text-sm'>
              <li><a href="#" className='hover:text-white transition duration-300'>About Us</a></li> 
              <li><a href="#" className='hover:text-white transition duration-300'>Careers</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Blog</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Contact</a></li>
            </ul>
          </div>
          
          {/* 导航列 3：资源/支持 */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-4'>Support</h3>
            <ul className='space-y-3 text-sm'>
              <li><a href="#" className='hover:text-white transition duration-300'>FAQ</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Help Center</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Terms of Service</a></li>
              <li><a href="#" className='hover:text-white transition duration-300'>Privacy Policy</a></li>
            </ul>
          </div>

        </div>
        
<div className='flex flex-col md:flex-row justify-center md:justify-between items-center text-sm  border-gray-700 pt-6 mt-8'>
    


    {/* 版权信息：在移动端 (默认) 位于下方居中 */}
    <p className='text-gray-400 order-2 md:order-1 text-center'>
        &copy; {currentYear} Resumate. All rights reserved.
    </p>

</div>

      </div>

    </footer>
  )
}

export default Footer