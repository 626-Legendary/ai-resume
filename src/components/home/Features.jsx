import React from 'react';
import ReactCompareImage from 'react-compare-image';

const Features = () => {
  return (

    <div id='featuresSection' className="mx-auto px-6 py-20 lg:py-30 border-b border-gray-800 text-center">
      <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-16 '>
        The smartest AI for resume writing
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">

        {/* --- 功能模块 1: AI Keyword Targeting --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">

            <div className="p-3 rounded-full bg-indigo-700/50 mr-4">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2a3 3 0 00-3 3v2m8-3a7 7 0 10-14 0h14z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-left">AI Keyword Insight</h3>
          </div>
          <p className="text-gray-400 mb-6 text-justify">
            Our AI extracts the most important keywords from job descriptions, evaluates their relevance across your industry, and fine-tunes your resume to maximize alignment with recruiter expectations and increase your interview potential.
          </p>


          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="text-sm font-medium text-indigo-400 mb-6">
              Great job! Your resume is strong in these essential skills for the role:
            </div>
            <div className="flex flex-wrap gap-4">
              {['Strategic Planning', 'Project Management', 'Analytical Thinking', 'Team Leadership', 'Effective Communication'].map(keyword => (
                <span key={keyword} className="px-4 py-2 font-light text-sm bg-blue-600/50 text-blue-200 rounded-full ">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- 功能模块 2: AI Content Writer --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">

            <div className="p-3 rounded-full bg-green-700/50 mr-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-left">AI Content Writer</h3>
          </div>
          <p className="text-gray-400 mb-6 text-justify">
            Leverage AI to generate metrics-driven, recruiter-focused resume content that highlights your skills and accomplishments with precision and impact.
          </p>

          {/* 模拟内容卡片 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="text-sm font-medium text-green-400 mb-6">
              What did you accomplish at the company?
            </div>
            <ul className="text-gray-400 font-light list-disc ml-5 space-y-2 text-left">
              <li>Led the development of a cloud-based data analytics platform, coordinating a cross-functional team of 8 engineers. Delivered the project 3 weeks ahead of schedule, increasing data processing efficiency by 45% and enabling actionable insights for business stakeholders, resulting in a 12% boost in quarterly revenue.</li>
              <li>Implemented automated testing pipelines for the web application, reducing deployment errors by 60% and cutting release cycles from two weeks to four days. Optimized key data processing algorithms, improving system response time by 35% and enhancing overall user experience.</li>
              </ul>
          </div>
        </div>

        {/* --- 功能模块 3: Design Control --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">

            <div className="p-3 rounded-full bg-purple-700/50 mr-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.515-.515 1.348-.515 1.863 0l.51.51c.324.324.77.49 1.226.49h1.016c.86 0 1.558.698 1.558 1.558v1.016c0 .456.166.902.49 1.226l.51.51c.515.515.515 1.348 0 1.863l-.51.51c-.324.324-.49.77-.49 1.226v1.016c0 .86-.698 1.558-1.558 1.558h-1.016c-.456 0-.902.166-1.226.49l-.51.51c-.515.515-1.348.515-1.863 0l-.51-.51c-.324-.324-.77-.49-1.226-.49h-1.016c-.86 0-1.558-.698-1.558-1.558v-1.016c0-.456-.166-.902-.49-1.226l-.51-.51c-.515-.515-.515-1.348 0-1.863l.51-.51c.324-.324.49-.77.49-1.226v-1.016c0-.86.698-1.558 1.558-1.558h1.016c.456 0 .902-.166 1.226-.49l.51-.51z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-left">Smart Resume Formatting</h3>
          </div>
          <p className="text-gray-400 mb-6 text-justify">
            Enter your info and instantly get a professional, ATS-friendly resume—no templates or manual tweaks needed.
          </p>


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
            <ul className="text-gray-400 font-light mt-4 list-disc ml-5 space-y-2 text-left">
                <li>Automatic Layouts</li>
                <li>ATS-Friendly</li>
                <li>Template-Free</li>
                <li>Time-Saving</li>
              </ul>
          </div>
        </div>

        {/* --- 功能模块 4: Resume Score --- */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">

            <div className="p-3 rounded-full bg-yellow-700/50 mr-4">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold text-left">Resume Score</h3>
          </div>
          <p className="text-gray-400 mb-6 text-justify">
            While you wait, hundreds of AI “experts” tirelessly analyze your resume through hundreds of model iterations, evaluating <span className='font-bold'>102</span> key metrics to ensure ATS compliance and maximize recruiter impact.
          </p>


          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-300">
                Resume Score
              </div>
              <div className="font-semibold text-lg">
                95/100
              </div>
            </div>

            {/* 进度条 */}
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: '95%' }}
              ></div>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full max-w-2xl mx-auto pt-20 px-4">
    <ReactCompareImage 
        leftImage="/resumebad.jpg" 
        rightImage="/resumegood.jpg" 
        loading="lazy" 
    />
</div>
    </div>
  );
};

export default Features;