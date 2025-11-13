import React from 'react'
import AILongProcessSimulator from './AILongProcessSimulator'
const DashboardHome = () => {
  return (
    <div>HOME
      <div>
        <h2>Design your resume</h2>
        <p>Follow the steps below to create your resume. Your progress will be saved automatically.</p>
      </div>
      <div className="">
        <div className="left">
          {/*表格填写基本信息*/}
        </div>
        <div className="right">
          {/* 预览简历 */}
        </div>
        <AILongProcessSimulator></AILongProcessSimulator>
      </div>
    </div>
  )
}

export default DashboardHome