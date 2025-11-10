import React from 'react'
import ChromaGrid from '../ui/chroma-grid.jsx'
import { Linkedin } from "lucide-react";


import TextType from '../ui/text-type.jsx';


const Team = () => {

  const items = [
    {
      image: "/team/zexiang.jpg",
      title: "Zexiang Zhang",
      subtitle: "Full Stack Engineer",
      handle: "@Trevor",

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
      image: "/team/yanyi.jpg",
      title: "Yanyi He",
      subtitle: "Machine Learning Engineer",
      handle: "@Ashley",
      borderColor: "#10B981",
      gradient: "linear-gradient(165deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/yanyi-he-76b730328/"
    },
    {
      image: "https://media.licdn.com/dms/image/v2/D5603AQGbVpJCOHkTbg/profile-displayphoto-shrink_200_200/B56ZOS76xZGoAY-/0/1733337001452?e=1764201600&v=beta&t=emPCk9ybTFB-Ryg1dcS-brKMfo43KXoSPEQKpETqyAw",
      title: "Chunyu Huang",
      subtitle: "System Engineer",
      handle: "@Jack",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(195deg, #F59E0B, #000)",
      url: "https://www.linkedin.com/in/chun-yu-huang-8b194b167/"
    }
  ];

  return (
    <div className='mx-auto px-6 py-20 lg:py-30 border-b border-gray-800'
      id='teamSection'
    >

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Meet Our Team
      </h2>
      <div className=' text-gray-400 mb-8 max-w-4xl mx-auto text-center'>
        <TextType
          text={[
            "We are a cross-functional squad of four.",
            "We thrive on rapid iteration and creative problem-solving.",
            "Our mission: to combine full-stack efficiency, robust backend architecture, and advanced machine learning.",
            "The result — seamless, stable, and innovative products."
          ]}
          typingSpeed={80}
          pauseDuration={2500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>

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