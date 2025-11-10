import React from 'react'
import ChromaGrid from '../ui/chroma-grid.jsx'
import { Linkedin } from "lucide-react";
const Team = () => {

  const items = [
    {
      image: "https://media.licdn.com/dms/image/v2/D5603AQEpT4XOgoEX1Q/profile-displayphoto-shrink_200_200/B56ZTzZCFZGoAY-/0/1739250213696?e=1764201600&v=beta&t=pWNyzIR0hJ1O2RDyY_YiTEnvNkDh6ESWgh7E8EKZgoI",
      title: "Zexiang Zhang",
      subtitle: "Frontend Developer",
      handle: "@",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/zexiang-zhang-9842b6160/"
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D5635AQH8BMhvDLutDg/profile-framedphoto-shrink_200_200/B56ZiefS1ZHQAc-/0/1755005660873?e=1763247600&v=beta&t=7vODr6JqOWVXiZo3mErSHhUcjuNh8HsSntrqnTqmm2U",
      title: "Yanfeng Tan",
      subtitle: "Backend Engineer",
      handle: "@tanyanfeng",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(210deg, #4F46E5, #000)",
      url: "https://www.linkedin.com/in/yanfeng-tan/"
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D4E35AQHe3R8bGywDQg/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1732828594748?e=1763247600&v=beta&t=4lfk49C2WFL9nryAPfMJVOz7qog27ps4f3M9JM5MyeU",
      title: "Yanyi He",
      subtitle: "MLE",
      handle: "@Heyanyi",
      borderColor: "#10B981",
      gradient: "linear-gradient(165deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/yanyi-he-76b730328/"
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D5603AQGbVpJCOHkTbg/profile-displayphoto-shrink_200_200/B56ZOS76xZGoAY-/0/1733337001452?e=1764201600&v=beta&t=emPCk9ybTFB-Ryg1dcS-brKMfo43KXoSPEQKpETqyAw",
      title: "Chunyu Huang",
      subtitle: "Hardware Engineer",
      handle: "@",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(195deg, #F59E0B, #000)",
      url: "https://www.linkedin.com/in/chun-yu-huang-8b194b167/"
    }
  ];

  return (
    <div className='mx-auto px-6 py-20 lg:py-30 border-b border-gray-800'>

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Meet our Team
      </h2>
      <p className='text-lg text-gray-400 mb-10 max-w-4xl mx-auto  text-center'>
        We are a small, passionate team of engineers and designers dedicated to building the future of AI-driven career tools. We value collaboration, open source, and meticulous design.
      </p>
      <div className='w-fit mx-auto' style={{ position: 'relative' }}>
        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.8}
          ease="power3.out"
        />
      </div>


    </div>
  )
}

export default Team