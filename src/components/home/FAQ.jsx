import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"; // Assuming these are custom/shadcn-style components

const FAQ = () => {
  return (
    // 强制使用你要求的背景和文本颜色
    <section className='mx-auto px-6 py-20 lg:py-30 border-b border-gray-800 text-center'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            
            {/* Title Section */}
            <header className='text-center mb-16'>
                <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight mb-4'>
                    
                    
                        Frequently Asked Questions
                    
                </h2>
                {/* 副标题使用 text-gray-400，提供柔和的层次感 */}
                <p className="text-lg text-gray-400">
                    Everything you need to know about our AI resume builder.
                </p>
            </header>

            {/* Accordion Container */}
            <Accordion
                type="single"
                collapsible
                className="w-full space-y-4" // Use space-y-4 for separation between items
                defaultValue="item-1"
            >
                {/* FAQ Item 1 */}
                <AccordionItem 
                    value="item-1" 
                    // 背景使用略浅的 bg-gray-800，边框使用更浅的 gray-700
                    className='border-b border-gray-700 bg-gray-800 px-4 rounded-lg overflow-hidden' 
                >
                    {/* 触发器文本为白色，悬停时使用亮蓝色 */}
                    <AccordionTrigger className='text-lg font-semibold text-white hover:text-blue-400 transition-colors py-4'>
                        Why should I use an AI resume builder tool?
                    </AccordionTrigger>
                    {/* 内容文本使用 text-gray-300，比纯白更柔和 */}
                    <AccordionContent className="text-base text-gray-300 space-y-4 pt-2 pb-4">
                        <p>
                            An AI resume builder helps you craft the most optimized resume for your dream job. Our AI is designed to adopt the phrasing that hiring managers are looking for, increasing your chances of standing out.
                        </p>
                        <p>
                            Key features include advanced processing capabilities and an intuitive UI designed for both beginners and experts.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 2 */}
                <AccordionItem 
                    value="item-2" 
                    className='border-b border-gray-700 bg-gray-800 px-4 rounded-lg overflow-hidden'
                >
                    <AccordionTrigger className='text-lg font-semibold text-white hover:text-blue-400 transition-colors py-4'>
                        Will employers know I used AI to write my resume?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-300 pt-2 pb-4">
                        <p>
                            Employers may guess you used AI, but this is generally not an issue. What they truly care about is a well-written resume that accurately showcases your skills and experience. A top-tier resume tailored to their needs speaks volumes.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 3 */}
                <AccordionItem 
                    value="item-3" 
                    className='border-b border-gray-700 bg-gray-800 px-4 rounded-lg overflow-hidden'
                >
                    <AccordionTrigger className='text-lg font-semibold text-white hover:text-blue-400 transition-colors py-4'>
                        How does Resumate tailor my resume to a specific job description?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-300 pt-2 pb-4">
                        <p>
                            Resumate uses AI Keyword Targeting to scan the job description for key terms and seamlessly integrates them into your resume. This gives your resume the right focus without keyword stuffing and boosts its ATS compatibility.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 4 */}
                <AccordionItem 
                    value="item-4" 
                    // 最后一个项目通常移除底部边框，但保留背景和圆角
                    className='border-b-0 bg-gray-800 px-4 rounded-lg overflow-hidden' 
                >
                    <AccordionTrigger className='text-lg font-semibold text-white hover:text-blue-400 transition-colors py-4'>
                        Can I use the AI to optimize an existing resume?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-300 pt-2 pb-4">
                        <p>
                            Absolutely. You can upload your current resume, share your career goals and target job, and let our AI refine everything to boost your document's impact and Applicant Tracking System (ATS) compatibility.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </section>
  );
};

export default FAQ;