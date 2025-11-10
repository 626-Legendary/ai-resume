import React from 'react';


const Features = () => {
  return (

    <div className="mx-auto px-6 py-20 lg:py-30 border-b border-gray-800 text-center">
      <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-16 '>
        The smartest AI for resume writing
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">

        {/* --- 功能模块 1: AI Keyword Targeting --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            {/* 模拟图标 */}
            <div className="p-3 rounded-full bg-indigo-700/50 mr-4">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2a3 3 0 00-3 3v2m8-3a7 7 0 10-14 0h14z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold">AI Keyword Targeting</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Instantly improve your chances of being selected for an interview by optimizing your resume with keywords from the job description.
          </p>

          {/* 模拟内容卡片 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="text-sm font-medium text-green-400 mb-3">
              Great work! You're ranking well for these keywords in the job description:
            </div>
            <div className="flex flex-wrap gap-2">
              {['Strategic Planning', 'Project Management', 'Team Leadership', 'Data Analysis', 'Client Relations'].map(keyword => (
                <span key={keyword} className="px-3 py-1 text-sm bg-blue-600/50 text-blue-300 rounded-full font-medium">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- 功能模块 2: AI Content Writer --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            {/* 模拟图标 */}
            <div className="p-3 rounded-full bg-green-700/50 mr-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold">AI Content Writer</h3>
          </div>
          <p className="text-gray-400 mb-6">
            AI writes metrics-driven resume content for you, focused on the skills and experience that recruiters are actually looking for.
          </p>

          {/* 模拟内容卡片 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="text-sm font-medium text-gray-300 mb-3">
              What did you accomplish at the company?
            </div>
            <ul className="text-gray-400 list-disc ml-5 space-y-2">
              <li>Increased team productivity by 37% through implementation of agile methodologies and streamlined workflows</li>
            </ul>
          </div>
        </div>

        {/* --- 功能模块 3: Design Control --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            {/* 模拟图标 */}
            <div className="p-3 rounded-full bg-purple-700/50 mr-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.515-.515 1.348-.515 1.863 0l.51.51c.324.324.77.49 1.226.49h1.016c.86 0 1.558.698 1.558 1.558v1.016c0 .456.166.902.49 1.226l.51.51c.515.515.515 1.348 0 1.863l-.51.51c-.324.324-.49.77-.49 1.226v1.016c0 .86-.698 1.558-1.558 1.558h-1.016c-.456 0-.902.166-1.226.49l-.51.51c-.515.515-1.348.515-1.863 0l-.51-.51c-.324-.324-.77-.49-1.226-.49h-1.016c-.86 0-1.558-.698-1.558-1.558v-1.016c0-.456-.166-.902-.49-1.226l-.51-.51c-.515-.515-.515-1.348 0-1.863l.51-.51c.324-.324.49-.77.49-1.226v-1.016c0-.86.698-1.558 1.558-1.558h1.016c.456 0 .902-.166 1.226-.49l.51-.51z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold">Design Control</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Easily design a fully ATS-optimized resume in a few clicks. Choose colors, formatting, font sizing, pictures, and more.
          </p>

          {/* 模拟颜色选择器 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
              <div className="w-8 h-8 rounded-full bg-red-500"></div>
              <div className="w-8 h-8 rounded-full bg-purple-500"></div>
              <div className="w-8 h-8 rounded-full bg-orange-500"></div>
              <div className="w-8 h-8 rounded-full bg-yellow-500"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>

        {/* --- 功能模块 4: Resumate Score --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            {/* 模拟图标 */}
            <div className="p-3 rounded-full bg-yellow-700/50 mr-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold">Resumate Score</h3>
          </div>
          <p className="text-gray-400 mb-6">
            Get your resume rated across 23 key metrics that help you pass Applicant Tracking Systems and impress recruiters.
          </p>

          {/* 模拟内容卡片 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-300">
                Resume Score
              </div>
              <div className="font-semibold text-lg">
                86/100
              </div>
            </div>
            {/* 进度条 */}
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: '86%' }}
              ></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Features;