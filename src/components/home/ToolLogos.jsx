// src/components/your-path/ToolLogos.jsx
import React from "react";

import AwsLogo from "../../assets/tools/aws.png";
import DeepseekLogo from "../../assets/tools/deepseek.png";
import FastapiLogo from "../../assets/tools/fastapi.svg";
import FigmaLogo from "../../assets/tools/figma.svg";
import InsomniaLogo from "../../assets/tools/insomnia.svg";
import LangchainLogo from "../../assets/tools/langchain.png";
import LanggraphLogo from "../../assets/tools/langgraph.png";
import LangsmithLogo from "../../assets/tools/langsmith.png";
import LinuxLogo from "../../assets/tools/linux.svg";
import PostgresqlLogo from "../../assets/tools/postgresql.svg";
import PydanticAiLogo from "../../assets/tools/pydanticai.svg";
import PythonLogo from "../../assets/tools/python.svg";
import RaspberryPiLogo from "../../assets/tools/raspberry-pi.svg";
import ReactLogo from "../../assets/tools/react.svg";
import TailwindLogo from "../../assets/tools/tailwindcss.svg";
import VercelLogo from "../../assets/tools/vercel.png";

const tools = [
  { name: "React", logo: ReactLogo },
  { name: "Tailwind CSS", logo: TailwindLogo },
  { name: "FastAPI", logo: FastapiLogo },
  { name: "Python", logo: PythonLogo },
  { name: "LangChain", logo: LangchainLogo },
  { name: "LangGraph", logo: LanggraphLogo },
  { name: "LangSmith", logo: LangsmithLogo },
  { name: "DeepSeek", logo: DeepseekLogo },
  { name: "PostgreSQL", logo: PostgresqlLogo },
  { name: "AWS", logo: AwsLogo },
  { name: "Vercel", logo: VercelLogo },
  { name: "Linux", logo: LinuxLogo },
  { name: "Insomnia", logo: InsomniaLogo },
  { name: "Figma", logo: FigmaLogo },
  { name: "Pydantic AI", logo: PydanticAiLogo },
  { name: "Raspberry Pi", logo: RaspberryPiLogo },
];

const ToolLogos = () => {
  return (
    <div className="py-10 px-4 lg:p-20 border-b border-gray-800">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
        Our Tech Stack
      </h2>

      <div
        className="
          mt-12
          grid 
          grid-cols-3 
          sm:grid-cols-4 
          md:grid-cols-8
          lg:grid-cols-10
          gap-4 
          sm:gap-6 
          place-items-center
        "
      >
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="
              flex flex-col items-center justify-center 
              gap-2 
              text-[10px] sm:text-xs md:text-sm 
              text-gray-400
            "
          >
            <div
              className="
                flex items-center justify-center
                w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                rounded-xl 

                border-2 border-gray-400
                shadow-lg
                hover:border-blue-400
                hover:shadow-sky-500/40 
                transition
              "
            >
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-center leading-tight">{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolLogos;
