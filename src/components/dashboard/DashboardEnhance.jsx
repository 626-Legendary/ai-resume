'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash2, Loader2 } from 'lucide-react';

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '../ui/button';
import ResumePreview from './ResumePreview';
import AILongProcessSimulator from './AILongProcessSimulator';

/**
 * 向导步骤常量
 */
const STEP_UPLOAD = 0;
const STEP_JD = 1;
const STEP_REVIEW = 2;
const STEP_PROCESSING = 3;

/**
 * 本地调试用的假数据
 * 结构与后端 /api/v1/resume/optimize 返回格式保持一致
 */
const sampleApiResponse = {
  approved: false,
  iteration_count: 5,
  resume_blocks: {
    summary: '',
    education: [
      {
        institution: 'University of California, San Diego',
        degree: 'M.S.',
        major: 'Computer Engineering',
        start_date: '2025-09',
        end_date: '2027-03',
        gpa: '',
        description: '',
      },
      {
        institution: 'South China University of Technology',
        degree: 'B.S.',
        major: 'Computer Science',
        start_date: '2021-09',
        end_date: '2025-06',
        gpa: '3.9/4.0',
        description: '',
      },
    ],
    work_experience: [
      {
        company: 'Siemens',
        position: 'Software Engineer (Intern)',
        start_date: '2025-04',
        end_date: '2025-08',
        location: 'Siemens Healthineers Shanghai CT R&D',
        responsibilities: [
          "Developed backend services for Siemens Healthineers' LLM-powered RAG QA system enabling CT technicians to self-onboard, reducing annual training costs by $500K",
          'Built ETL data pipeline with 15+ Flask RESTful APIs for document processing. Extract XML manuals from S3, performed asynchronous transformation and embedding, stored vectors in Milvus',
          'Implemented Milvus batch insert (3K-5K vectors) reducing indexing time from 25min to 12min. Configured HNSW index with partition strategy improving query latency from 800ms to 150ms',
          'Built admin console with React (useState, useEffect, custom hooks) for document upload/delete, embedding model selection, vector database configuration, and document retrieve testing',
          'Containerized services with Docker Compose, deployed React app on Nginx, configured Gunicorn workers, automated CI/CD via GitLab',
        ],
      },
      {
        company: 'Yonyou Network (Shanghai Stock Exchange: 600588)',
        position: 'Software Engineer (Intern)',
        start_date: '2024-07',
        end_date: '2024-09',
        location: 'HK HCM',
        responsibilities: [
          'Developed backend services for customized HR system serving China Telecom Global with 8K+ employees, supporting 2K-3K daily active users across multi-language interfaces',
          'Built data migration service: developed Pandas scripts for ETL processing and Spring Boot backend for batch insertion. Migrated 50K+ employee records into PostgreSQL using JDBC batch operations, reducing total migration time by 35%',
          'Implemented incremental sync API using PostgreSQL FDW to identify delta records across legacy and target databases',
          'Developed validation logic comparing critical fields, achieving 99.5% data accuracy in sync operations',
        ],
      },
    ],
    projects: [
      {
        name: 'Yelp-like Application Reviews',
        description:
          'Built a microservices platform with Spring Cloud covering 7 modules (Login, Payment, etc.)',
        technologies: ['MySQL', 'Redis', 'RabbitMQ', 'Elasticsearch'],
        role: '',
        duration: 'Sep 2024 – Jan 2025',
        achievements: [
          'Implemented Eureka for service discovery, OpenFeign for 20+ inter-service calls, and Sentinel for rate limiting and circuit breaking',
          'Designed asynchronous flash-sale system. Prevented overselling with Redis optimistic locking. Used RabbitMQ + Redis Lua for atomic stock reservation and async persistence to MySQL. Implemented auto-cancellation via DLQ. Achieved 2,000 QPS with latency reduced from 400ms to 100ms',
          'Ensured distributed transaction consistency across Order, Inventory, and Payment services using Seata AT mode with automatic rollback',
          'Integrated Elasticsearch for product search with multi-facet filtering and aggregation analytics',
        ],
      },
    ],
    skills: [
      {
        category: 'Languages',
        items: ['Java', 'C/C++', 'Python', 'HTML/CSS', 'JavaScript/TypeScript'],
      },
      {
        category: 'Tools & Framework',
        items: [
          'Git',
          'Docker',
          'Nginx',
          'Linux',
          'AWS',
          'Azure',
          'Maven',
          'MySQL',
          'PostgreSQL',
          'Redis',
          'MongoDB',
          'RabbitMQ',
          'Elasticsearch',
          'React',
          'SpringBoot',
          'SpringCloud',
          'Mybatis-Plus',
          'Ollama',
          'LangChain',
        ],
      },
    ],
    certificates: [],
    languages: [],
  },
  optimized_blocks: {
    summary:
      'Software Engineer with expertise in backend development, microservices architecture, and scalable systems. Proven track record of building high-performance applications using Java, Python, Spring Boot, and cloud technologies to deliver measurable business impact.',
    education: [
      {
        institution: 'University of California, San Diego',
        degree: 'M.S.',
        major: 'Computer Engineering',
        start_date: '2025-09',
        end_date: '2027-03',
        gpa: '',
        description: '',
      },
      {
        institution: 'South China University of Technology',
        degree: 'B.S.',
        major: 'Computer Science',
        start_date: '2021-09',
        end_date: '2025-06',
        gpa: '3.9/4.0',
        description: '',
      },
    ],
    work_experience: [
      {
        company: 'Siemens',
        position: 'Software Engineer (Intern)',
        start_date: '2025-04',
        end_date: '2025-08',
        location: 'Siemens Healthineers Shanghai CT R&D',
        responsibilities: [
          'Developed backend services using Python and Flask for LLM-powered RAG system, enabling CT technician self-onboarding and reducing annual training costs by $500K',
          'Built ETL data pipeline with 15+ RESTful APIs for document processing, extracting XML manuals from S3 and performing asynchronous transformation with vector embedding into Milvus',
          'Optimized Milvus batch insert operations handling 3K-5K vectors, cutting indexing time from 25min to 12min and improving query latency from 800ms to 150ms',
          'Created admin console using React for document management and vector database configuration, streamlining system administration workflows',
          'Containerized services with Docker Compose and deployed React app on Nginx, implementing automated CI/CD pipeline via GitLab',
        ],
      },
      {
        company: 'Yonyou Network (Shanghai Stock Exchange: 600588)',
        position: 'Software Engineer (Intern)',
        start_date: '2024-07',
        end_date: '2024-09',
        location: 'HK HCM',
        responsibilities: [
          'Developed backend services using Spring Boot for customized HR system serving China Telecom Global with 8K+ employees and 2K-3K daily active users',
          'Built data migration service with Pandas ETL scripts and Spring Boot backend, migrating 50K+ employee records into PostgreSQL and reducing total migration time by 35%',
          'Implemented incremental sync API using PostgreSQL FDW to identify delta records across legacy and target databases',
          'Developed validation logic comparing critical fields, achieving 99.5% data accuracy in sync operations',
        ],
      },
    ],
    projects: [
      {
        name: 'Yelp-like Application Reviews',
        description:
          'Built microservices platform with Spring Cloud covering 7 modules including Login and Payment systems',
        technologies: [
          'Java',
          'Spring Boot',
          'MySQL',
          'Redis',
          'RabbitMQ',
          'Elasticsearch',
        ],
        role: 'Backend Developer',
        duration: 'Sep 2024 – Jan 2025',
        achievements: [
          'Implemented Eureka service discovery and OpenFeign for 20+ inter-service calls with Sentinel rate limiting',
          'Designed asynchronous flash-sale system using Redis optimistic locking and RabbitMQ, achieving 2,000 QPS with latency reduced from 400ms to 100ms',
          'Ensured distributed transaction consistency across services using Seata AT mode with automatic rollback',
          'Integrated Elasticsearch for product search with multi-facet filtering and aggregation analytics',
        ],
      },
    ],
    skills: [
      {
        category: 'Languages',
        items: ['Java', 'Python', 'JavaScript', 'TypeScript'],
      },
      {
        category: 'Frameworks & Tools',
        items: [
          'Spring Boot',
          'Spring Cloud',
          'React',
          'Docker',
          'Git',
          'MySQL',
          'PostgreSQL',
          'Redis',
          'RabbitMQ',
          'Elasticsearch',
          'AWS',
          'Azure',
        ],
      },
    ],
    certificates: [],
    languages: [],
  },
  hm_feedback:
    'The résumé shows strong technical skills in backend development and relevant technologies, but the candidate appears to be applying for an internship role while the résumé content suggests they are seeking full-time positions. The dates in education and experience indicate the candidate is still in school (MS program 2025-2027) but the résumé presents as an experienced software engineer.',
  summary: {
    education: '',
    work_experience:
      "Work Experience (Siemens Healthineers - Software Engineer): Modified bullet point 1. Before: 'Developed backend services for Siemens Healthineers' LLM-powered RAG QA system enabling CT technicians to self-onboard, reducing annual training costs by $500K'. After: 'Developed backend services using Python and Flask for LLM-powered RAG system, enabling CT technician self-onboarding and reducing annual training costs by $500K'. Changes: added specific technologies: Python, Flask. Reason: Better aligns with JD's focus on technical skills and project details. | Modified bullet point 2. Before: 'Built ETL data pipeline with 15+ Flask RESTful APIs for document processing. Extract XML manuals from S3, performed asynchronous transformation and embedding, stored vectors in Milvus'. After: 'Built ETL data pipeline with 15+ RESTful APIs for document processing, extracting XML manuals from S3 and performing asynchronous transformation with vector embedding into Milvus'. Changes: removed 'Flask' (already mentioned in previous bullet), improved sentence structure for clarity. Reason: Avoids repetition and enhances readability. | Modified bullet point 3. Before: 'Implemented Milvus batch insert (3K-5K vectors) reducing indexing time from 25min to 12min. Configured HNSW index with partition strategy improving query latency from 800ms to 150ms'. After: 'Optimized Milvus batch insert operations handling 3K-5K vectors, cutting indexing time from 25min to 12min and improving query latency from 800ms to 150ms'. Changes: rephrased for better flow, changed 'reducing' to 'cutting' for stronger action verb. Reason: Enhances impact and professionalism. | Modified bullet point 4. Before: 'Built admin console with React (useState, useEffect, custom hooks) for document upload/delete, embedding model selection, vector database configuration, and document retrieve testing'. After: 'Created admin console using React for document management and vector database configuration, streamlining system administration workflows'. Changes: removed specific React hooks (useState, useEffect, custom hooks), simplified description, added business benefit 'streamlining system administration workflows'. Reason: Focuses on high-level impact rather than implementation details, better aligns with business value. | Modified bullet point 5. Before: 'Containerized services with Docker Compose, deployed React app on Nginx, configured Gunicorn workers, automated CI/CD via GitLab'. After: 'Containerized services with Docker Compose and deployed React app on Nginx, implementing automated CI/CD pipeline via GitLab'. Changes: removed 'configured Gunicorn workers', improved sentence structure. Reason: Streamlines technical details while maintaining key DevOps skills. | Work Experience (Yonyou Network - Software Engineer): Modified bullet point 1. Before: 'Developed backend services for customized HR system serving China Telecom Global with 8K+ employees, supporting 2K-3K daily active users across multi-language interfaces'. After: 'Developed backend services using Spring Boot for customized HR system serving China Telecom Global with 8K+ employees and 2K-3K daily active users'. Changes: added specific technology: Spring Boot, removed 'across multi-language interfaces'. Reason: Emphasizes key framework expertise, removes less relevant detail. | Modified bullet point 2. Before: 'Built data migration service: developed Pandas scripts for ETL processing and Spring Boot backend for batch insertion. Migrated 50K+ employee records into PostgreSQL using JDBC batch operations, reducing total migration time by 35%'. After: 'Built data migration service with Pandas ETL scripts and Spring Boot backend, migrating 50K+ employee records into PostgreSQL and reducing total migration time by 35%'. Changes: improved sentence structure, removed 'JDBC batch operations'. Reason: Enhances readability while maintaining key metrics.",
    projects:
      "Modified project description. Before: 'Built a microservices platform with Spring Cloud covering 7 modules (Login, Payment, etc.)'. After: 'Built microservices platform with Spring Cloud covering 7 modules including Login and Payment systems'. Changes: removed 'a', specified module examples, improved professional tone. Reason: Better clarity and professionalism. | Added role field: 'Backend Developer'. Before: empty. After: 'Backend Developer'. Reason: Clearly defines contribution role. | Modified technologies list. Before: ['MySQL', 'Redis', 'RabbitMQ', 'Elasticsearch']. After: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'RabbitMQ', 'Elasticsearch']. Changes: added 'Java', 'Spring Boot' as primary technologies. Reason: Highlights core technical stack upfront. | Modified achievement 1. Before: 'Implemented Eureka for service discovery, OpenFeign for 20+ inter-service calls, and Sentinel for rate limiting and circuit breaking'. After: 'Implemented Eureka service discovery and OpenFeign for 20+ inter-service calls with Sentinel rate limiting'. Changes: simplified description, removed 'circuit breaking'. Reason: Streamlines technical details while maintaining key concepts. | Modified achievement 2. Before: 'Designed asynchronous flash-sale system. Prevented overselling with Redis optimistic locking. Used RabbitMQ + Redis Lua for atomic stock reservation and async persistence to MySQL. Implemented auto-cancellation via DLQ. Achieved 2,000 QPS with latency reduced from 400ms to 100ms'. After: 'Designed asynchronous flash-sale system using Redis optimistic locking and RabbitMQ, achieving 2,000 QPS with latency reduced from 400ms to 100ms'. Changes: consolidated multiple sentences, removed implementation details (Redis Lua, async persistence, auto-cancellation via DLQ). Reason: Focuses on high-level architecture and key performance metrics.",
    skills:
      "Added Professional Summary section. Before: empty. After: 'Software Engineer with expertise in backend development, microservices architecture, and scalable systems. Proven track record of building high-performance applications using Java, Python, Spring Boot, and cloud technologies to deliver measurable business impact.'. Reason: Provides strong opening statement highlighting key JD-relevant skills. | Modified Languages category. Before: ['Java', 'C/C++', 'Python', 'HTML/CSS', 'JavaScript/TypeScript']. After: ['Java', 'Python', 'JavaScript', 'TypeScript']. Changes: removed 'C/C++', 'HTML/CSS', consolidated 'JavaScript/TypeScript' into separate items. Reason: Focuses on most relevant programming languages for backend development. | Modified Tools & Framework category. Before: ['Git', 'Docker', 'Nginx', 'Linux', 'AWS', 'Azure', 'Maven', 'MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'RabbitMQ', 'Elasticsearch', 'React', 'SpringBoot', 'SpringCloud', 'Mybatis-Plus', 'Ollama', 'LangChain']. After: ['Spring Boot', 'Spring Cloud', 'React', 'Docker', 'Git', 'MySQL', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Elasticsearch', 'AWS', 'Azure']. Changes: reordered to prioritize key frameworks (Spring Boot, Spring Cloud), removed less relevant technologies (Nginx, Linux, Maven, MongoDB, Mybatis-Plus, Ollama, LangChain), changed category name to 'Frameworks & Tools'. Reason: Streamlines skills to most relevant technologies, emphasizes core frameworks mentioned in work experience.",
    certificates: '',
    languages: '',
  },
};

/**
 * 将后端 optimized_blocks + hm_feedback + summary 中的修改历史
 * 映射成 ResumePreview 组件渲染所需要的结构。
 */
const mapApiResponseToResumePreviewData = (apiData) => {
  if (!apiData) return {};

  // 如果有 optimized_blocks 优先用；否则退回 resume_blocks
  const optimized = apiData.optimized_blocks || apiData.resume_blocks || {};
  const {
    summary = '',
    education = [],
    work_experience: workExperience = [],
    projects = [],
    skills = [],
    certificates = [],
  } = optimized;

  // Education 映射
  const mappedEducation = (education || []).map((item) => ({
    institution: item.institution || '',
    degree: item.degree || '',
    fieldOfStudy: item.major || '',
    gpa: item.gpa || '',
    startDate: item.start_date || '',
    endDate: item.end_date || '',
    description: item.description || '',
    city: item.city || '',
    country: item.country || '',
  }));

  // Work Experience 映射
  const mappedWorkExperience = (workExperience || []).map((item) => ({
    jobTitle: item.position || '',
    company: item.company || '',
    startDate: item.start_date || '',
    endDate: item.end_date || '',
    city: item.location || '',
    country: '',
    description: Array.isArray(item.responsibilities)
      ? item.responsibilities.join('\n')
      : item.responsibilities || '',
  }));

  // Projects 映射
  const mappedProjects = (projects || []).map((project) => {
    const descriptionParts = [];
    if (project.description) descriptionParts.push(project.description);
    if (Array.isArray(project.achievements) && project.achievements.length) {
      descriptionParts.push(...project.achievements);
    }
    if (Array.isArray(project.technologies) && project.technologies.length) {
      descriptionParts.push(`Tech: ${project.technologies.join(', ')}`);
    }

    return {
      projectName: project.name || '',
      projectLink: '',
      organization: '',
      startDate: project.duration || '',
      endDate: '',
      description: descriptionParts.join('\n'),
    };
  });

  // Skills 映射为字符串 (按行展示)
  const mappedSkills = (skills || [])
    .map((group) => {
      const categoryLabel = group.category || '';
      const itemsString = Array.isArray(group.items)
        ? group.items.join(', ')
        : '';
      return `${categoryLabel}: ${itemsString}`;
    })
    .filter((text) => text.trim())
    .join('\n');

  // Certificates 映射
  const mappedCertificates = (certificates || []).map((cert) => ({
    name: cert.name || '',
    issuingOrg: cert.issuingOrg || cert.organization || '',
    issueDate: cert.issueDate || cert.start_date || '',
    expirationDate: cert.expirationDate || cert.end_date || '',
    credentialID: cert.credentialID || '',
    credentialURL: cert.credentialURL || '',
  }));

  /**
   * 把 apiData.summary 里的各个 section 的修改说明合并为一段文字，
   * 用于展示在「AI Hiring Manager Feedback」的“修改历史”部分
   */
  let summarySuggestionsText = '';
  if (apiData.summary && typeof apiData.summary === 'object') {
    const sections = Object.entries(apiData.summary)
      .filter(([, value]) => value && String(value).trim())
      .map(([sectionKey, content]) => {
        const humanReadableTitle = sectionKey
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (ch) => ch.toUpperCase());
        return `${humanReadableTitle}:\n${content}`;
      });

    if (sections.length > 0) {
      summarySuggestionsText = sections.join('\n\n');
    }
  }

  /**
   * hmFeedbackMain: 直接来自后端的 hm_feedback
   * hmFeedbackSummary: 来自 summary 各 section 的修改建议，拼成一段
   */
  const hmFeedbackMain = apiData.hm_feedback
    ? String(apiData.hm_feedback).trim()
    : '';

  const hmFeedbackSummary = summarySuggestionsText
    ? String(summarySuggestionsText).trim()
    : '';

  return {
    PersonalInfo: {}, // 后端目前不返回个人信息，这里留空
    Summary: summary,
    Education: mappedEducation,
    WorkExperience: mappedWorkExperience,
    Projects: mappedProjects,
    Skills: mappedSkills,
    Certificates: mappedCertificates,
    hmFeedbackMain,
    hmFeedbackSummary,
  };
};

const API_BASE = 'http://localhost:8000';

const DashboardEnhance = () => {
  // 当前步骤
  const [activeStep, setActiveStep] = useState(STEP_UPLOAD);
  // 上传的 PDF 文件（单个）
  const [files, setFiles] = useState([]);
  // JD 文本
  const [jobDescription, setJobDescription] = useState('');
  // 是否已完成请求（用来停止 AILongProcessSimulator）
  const [isRequestDone, setIsRequestDone] = useState(false);
  // 右侧预览所用的数据结构
  const [previewData, setPreviewData] = useState({});
  // JD 校验错误信息
  const [jobDescriptionError, setJobDescriptionError] = useState('');
  // 上传进度（仅上传阶段）
  const [uploadPercent, setUploadPercent] = useState(0);

  /**
   * 初始化时：从 localStorage 中恢复上次的 AI 生成数据
   */
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem('ai-resume-data');
        if (raw) {
          setPreviewData(JSON.parse(raw));
        }
      }
    } catch (error) {
      console.warn('Failed to load preview data from localStorage', error);
    }
  }, []);

  /**
   * 处理 PDF 文件拖拽上传
   */
  const handleDrop = (droppedFiles) => {
    const allowedType = 'application/pdf';
    const acceptedFiles = droppedFiles.filter(
      (file) => file.type === allowedType || /\.pdf$/i.test(file.name),
    );

    if (acceptedFiles.length === 0) {
      alert('仅支持上传 PDF 文件');
      return;
    }

    // 目前只支持单文件
    setFiles([acceptedFiles[0]]);
  };

  /**
   * 移除已上传文件
   */
  const removeFile = () => setFiles([]);

  /**
   * 校验 JD 内容合法性
   */
  const validateJobDescription = (text) => {
    if (text.trim().length === 0) {
      setJobDescriptionError('岗位描述不能为空');
      return false;
    }
    if (text.length < 10) {
      setJobDescriptionError('岗位描述至少需要 10 个字符');
      return false;
    }
    if (text.length > 10000) {
      setJobDescriptionError('岗位描述不能超过 10000 个字符');
      return false;
    }
    setJobDescriptionError('');
    return true;
  };

  /**
   * JD 文本框 onChange
   */
  const handleJobDescChange = (event) => {
    const value = event.target.value;
    setJobDescription(value);
    validateJobDescription(value);
  };

  /**
   * 下一步按钮
   */
  const goNext = () => {
    if (activeStep === STEP_UPLOAD && files.length === 0) {
      alert('请先上传一个 PDF 文件');
      return;
    }
    if (activeStep === STEP_JD && !validateJobDescription(jobDescription)) {
      return;
    }
    setActiveStep((current) => Math.min(current + 1, STEP_REVIEW));
  };

  /**
   * 上一步按钮
   */
  const goPrevious = () =>
    setActiveStep((current) => Math.max(current - 1, STEP_UPLOAD));

  /**
   * AILongProcessSimulator 完成或被中止时的回调
   */
  const handleProcessComplete = () => {
    console.log('--- AI Process Simulation Completed/Aborted ---');
    setActiveStep(STEP_REVIEW);
  };

  /**
   * 提交到后端，调用 /api/v1/resume/optimize
   * 成功后会把 optimized_blocks + hm_feedback + summary 映射到 ResumePreview
   */
  const handleSubmitToBackend = async () => {
    if (files.length === 0) {
      alert('Please upload a PDF file first.');
      return;
    }
    if (!validateJobDescription(jobDescription)) return;

    setIsRequestDone(false);
    setUploadPercent(0);
    setActiveStep(STEP_PROCESSING);

    try {
      console.log('Request Start');
      console.time('Request Duration');

      // Health check
      const healthResponse = await axios.get(`${API_BASE}/health`);
      if (!healthResponse.data || healthResponse.data.status !== 'ok') {
        throw new Error('Backend health check failed');
      }

      const formData = new FormData();
      formData.append('resume_pdf', files[0]);
      formData.append('job_description', jobDescription);

      const response = await axios.post(
        `${API_BASE}/api/v1/resume/optimize`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache',
          },
          // 令人头痛 0.0
          timeout: 300000,
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setUploadPercent(percent);
          },
        },
      );

      console.timeEnd('Request Duration');
      console.log('Backend Response:', response.data);
      setIsRequestDone(true);

      // 映射为预览数据结构
      const newPreviewData = mapApiResponseToResumePreviewData(response.data);

      // 持久化到 localStorage，方便刷新页面后继续查看
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('ai-resume-data', JSON.stringify(newPreviewData));
      }
      setPreviewData(newPreviewData);

      // 稍微延迟一下，让 PROCESSING 状态展示完整
      setTimeout(() => {
        setActiveStep(STEP_REVIEW);
      }, 1500);
    } catch (error) {
      console.error('❌Network error or request timeout. ❌', error);
      alert(error.message || 'Network error or request timeout. Please try again later.');
      setActiveStep(STEP_REVIEW);
    }
  };

  /**
   * 本地调试按钮：
   * 不调用后端，直接使用 sampleApiResponse 生成预览
   */
  const handleLocalPreview = () => {
    const newPreviewData = mapApiResponseToResumePreviewData(sampleApiResponse);
    setPreviewData(newPreviewData);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('ai-resume-data', JSON.stringify(newPreviewData));
    }
    setActiveStep(STEP_REVIEW);
  };

  const isSubmitting = activeStep === STEP_PROCESSING;

  return (
    <div className="flex gap-4 w-full h-full p-4 border-gray-200 border-t">
      {/* 左侧：步骤+表单区域 */}
      <div className="w-full p-4 lg:w-2/5 bg-white rounded shadow-sm">
        {/* 面包屑展示当前步骤 */}
        <Breadcrumb>
          <BreadcrumbList className="flex flex-wrap gap-x-2">
            <BreadcrumbItem>
              <BreadcrumbLink
                className={
                  activeStep <= STEP_UPLOAD
                    ? 'font-semibold text-primary cursor-pointer'
                    : 'text-muted-foreground hover:text-foreground cursor-pointer'
                }
              >
                Resume
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className={
                  activeStep === STEP_JD
                    ? 'font-semibold text-primary cursor-pointer'
                    : 'text-muted-foreground hover:text-foreground cursor-pointer'
                }
              >
                Job Description
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                className={
                  activeStep >= STEP_REVIEW
                    ? 'font-semibold text-primary cursor-pointer'
                    : 'text-muted-foreground hover:text-foreground cursor-pointer'
                }
              >
                Submit & Review
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* 提交中时显示进度 */}
            {isSubmitting && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Loader2 className="h-4 w-4 animate-spin text-primary mr-1" />
                  <span className="font-semibold text-primary">
                    Processing {uploadPercent}%
                  </span>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 border-t pt-6">
          {/* Step 1: 上传简历 PDF */}
          {activeStep === STEP_UPLOAD && (
            <div>
              <h3 className="font-medium mb-2">
                <span className="font-bold">Step 1 </span>Upload your resume
              </h3>

              <Dropzone
                maxFiles={1}
                accept={{ 'application/pdf': ['.pdf'] }}
                maxSize={1024 * 1024 * 10}
                minSize={1024}
                onDrop={handleDrop}
                onError={console.error}
                src={files}
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
              <div className="space-y-2 mt-3">
                {files.length === 0 ? (
                  <div className="text-sm text-red-500">No file selected</div>
                ) : (
                  files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border p-2 rounded"
                    >
                      <div className="truncate mr-2">
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-gray-500">
                          {Math.round(file.size / 1024)} KB
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 2: 输入 / 粘贴 JD */}
          {activeStep === STEP_JD && (
            <div>
              <h3 className="font-medium mb-2">
                <span className="font-bold">Step 2 </span>Paste the job description
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Paste the job description (10–10,000 characters)
              </p>
              <textarea
                value={jobDescription}
                onChange={handleJobDescChange}
                rows={10}
                className="w-full border rounded p-2 text-sm"
                placeholder="Paste the job description here..."
              />
              {jobDescriptionError && (
                <p className="text-red-500 text-xs mt-1">
                  {jobDescriptionError}
                </p>
              )}
              {!jobDescriptionError && jobDescription && (
                <p className="text-green-600 text-xs mt-1">
                  Characters: {jobDescription.length}
                </p>
              )}
            </div>
          )}

          {/* Step 3: 提交前预览 */}
          {activeStep === STEP_REVIEW && (
            <div>
              <h3 className="font-medium mb-2">
                <span className="font-bold">Step 3 </span>Review & Submit
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Please review your uploaded file and job description before submitting.
              </p>

              {/* 文件摘要 */}
              <div className="my-8 ">
                <div className="text-sm font-bold">Uploaded File</div>
                <ul className="list-disc ml-5 text-sm">
                  {files.map((file, index) => (
                    <li className="font-semibold" key={index}>
                      {file.name} — {Math.round(file.size / 1024)} KB
                    </li>
                  ))}
                </ul>
              </div>

              {/* JD 摘要 */}
              <div className="my-8">
                <div className="text-sm font-bold">
                  Job Description Preview
                </div>
                <div className="mt-1 p-2 border rounded text-sm whitespace-pre-wrap max-h-48 overflow-auto">
                  {jobDescription || (
                    <span className="text-gray-400">
                      No job description provided
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 处理中（AI 动画 + 进度） */}
          {activeStep === STEP_PROCESSING && (
            <div>
              <AILongProcessSimulator
                initialStart
                externalAbort={isRequestDone}
                onFinish={handleProcessComplete}
              />
              <p className="text-sm text-muted-foreground pt-4">
                请耐心等待，AI 模型正在处理...
              </p>
              {uploadPercent > 0 && (
                <p className="text-sm text-gray-500">
                  上传进度: {uploadPercent}%
                </p>
              )}
            </div>
          )}

          {/* 底部操作按钮 */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {/* 上一步按钮 */}
            {!isSubmitting && (
              <Button
                onClick={goPrevious}
                disabled={activeStep === STEP_UPLOAD}
                variant="outline"
              >
                &lt;&lt; Previous
              </Button>
            )}

            {/* 下一步按钮（仅在 Step1 / Step2 可见） */}
            {(activeStep === STEP_UPLOAD || activeStep === STEP_JD) && (
              <Button
                onClick={goNext}
                disabled={
                  (activeStep === STEP_UPLOAD && files.length === 0) ||
                  (activeStep === STEP_JD && !!jobDescriptionError)
                }
              >
                Next &gt;&gt;
              </Button>
            )}

            {/* 提交 / 本地调试按钮（仅在 Step3 可见） */}
            {activeStep === STEP_REVIEW && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLocalPreview}
                >
                  Preview Using Sample Data
                </Button>

                <Button
                  onClick={handleSubmitToBackend}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Submit to AI
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 右侧：简历预览区域 */}
      <div className="hidden lg:block lg:w-3/5 bg-neutral-200 p-4 rounded overflow-auto shadow-lg border">
        <ResumePreview data={previewData} />
      </div>
    </div>
  );
};

export default DashboardEnhance;
