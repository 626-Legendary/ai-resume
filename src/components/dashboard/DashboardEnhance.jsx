import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, MessagesSquare } from 'lucide-react';

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
 * 本地调试用的假数据（保持不动）
 */
const sampleApiResponse = {

  approved: true,
  iteration_count: 1,
  resume_blocks: {
    contact_info: {
      name: "Alex Johnson",
      phone: "+1 555-987-6543",
      email: "alex.johnson.dev@example.com",
      github: "https://github.com/alexjohnson-dev",
      linkedin: "https://linkedin.com/in/alexjohnson-dev",
      address: "Seattle, WA",
      website: "https://alexjohnson.dev",
    },
    summary:
      "Full-stack software engineer pursuing MS in Computer Science with hands-on experience building scalable applications and automation tools. Proficient in JavaScript, Python, and Java with a strong foundation in backend services, cloud technologies, and distributed system design. Experienced collaborating with cross-functional teams to deliver user-focused products in agile environments.",
    education: [
      {
        institution: "University of Washington",
        degree: "Master of Science in Computer Science",
        major: null,
        start_date: "2025",
        end_date: "2027",
        gpa: null,
        description: null,
      },
    ],
    work_experience: [
      {
        company: "Northbridge Software Solutions",
        position: "Software Engineering Intern",
        start_date: "2025-06",
        end_date: "2025-09",
        location: "Bellevue, WA",
        responsibilities: [
          "Participated in full development lifecycle from design to deployment, implementing RESTful APIs and Node.js microservices that reduced operational workload by 40%",
          "Wrote unit and integration tests achieving high coverage, deployed containerized applications to AWS EC2 maintaining 99.5% uptime",
          "Collaborated across design and QA teams, reducing deployment failures by 30% via improved CI/CD validation flows",
        ],
      },
    ],
    projects: [
      {
        name: "Automated Commerce Platform",
        description:
          "Developed a full-stack automation system integrating multiple APIs to process over 12,000 monthly transactions",
        technologies: ["JavaScript", "Python", "React", "Node.js", "AWS"],
        role: null,
        duration: null,
        achievements: [
          "Created a responsive React UI allowing non-technical users to manage automated workflows",
          "Implemented event-driven architecture and anomaly detection using Python on AWS Lambda",
        ],
      },
      {
        name: "Team Productivity Dashboard",
        description:
          "Built internal productivity tool improving cross-team throughput by 20% through automated task analysis",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"],
        role: null,
        duration: null,
        achievements: [
          "Designed dashboards with real-time metrics backed by a scalable Node.js/MongoDB service",
          "Set up CI/CD pipelines for automated testing and deployment to AWS EC2",
        ],
      },
    ],
    skills: [
      { category: "Languages", items: ["JavaScript", "Python", "Java", "TypeScript", "SQL"] },
      { category: "Frameworks & Runtime", items: ["React", "Node.js", "Express", "Next.js"] },
      { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL"] },
      { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
      { category: "Practices", items: ["Agile", "TDD", "Version Control (Git)"] }
    ],
    certificates: [
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        date: null,
      },
      {
        name: "Meta Full-Stack Developer Certificate",
        issuer: "Meta",
        date: null,
      },
    ],
    languages: [],
  },

  optimized_blocks: {
    contact_info: {
      name: "Alex Johnson",
      phone: "+1 555-111-2222",
      email: "alex.johnson.dev@example.com",
      github: "https://github.com/alexjohnson-dev",
      linkedin: "https://linkedin.com/in/alexjohnson-dev",
      address: "Seattle, WA",
      website: "https://alexjohnson.dev",
    },
    summary:
      "Full-stack engineer with experience delivering scalable, user-centric applications across the full development lifecycle. Skilled in JavaScript, Python, and Java with strong backend and cloud engineering expertise. Proven ability to enhance system performance and support production-grade applications in agile environments.",
    education: [
      {
        institution: "University of Washington",
        degree: "Master of Science in Computer Science",
        major: null,
        start_date: "2025",
        end_date: "2027",
        gpa: null,
        description: null,
      },
    ],
    work_experience: [
      {
        company: "Northbridge Software Solutions",
        position: "Software Engineering Intern",
        start_date: "2025-06",
        end_date: "2025-09",
        location: "Bellevue, WA",
        responsibilities: [
          "Developed RESTful APIs and Node.js microservices using JavaScript and Python, reducing operational time by 40% and improving engineering efficiency",
          "Wrote comprehensive test suites with high coverage and deployed services to AWS EC2 achieving 99.5% uptime",
          "Improved cross-team collaboration and reduced deployment failures by 30% via automated CI/CD pipelines",
        ],
      },
    ],
    projects: [
      {
        name: "Automated Marketplace Platform",
        description:
          "Designed a full-stack marketplace system integrating multiple APIs to automate large-scale monthly operations using smart matching algorithms",
        technologies: ["JavaScript", "Python", "React", "Node.js", "AWS", "Kubernetes"],
        achievements: [
          "Delivered an intuitive React interface enabling non-technical users to operate automated workflows",
          "Added AWS Lambda–based anomaly detection and GraphQL service integrations",
        ],
      },
      {
        name: "Internal Efficiency Platform",
        description:
          "Built scalable productivity platform improving team efficiency by 20% through architecture modernization",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"],
        achievements: [
          "Built real-time dashboards using WebSocket data streams",
          "Developed CI/CD deployment system for auto-scaling workloads on AWS",
        ],
      },
    ],
    skills: [
      { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"] },
      { category: "Full-Stack Development", items: ["React", "Node.js", "Express", "GraphQL", "HTML/CSS"] },
      { category: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
      { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
      { category: "Development Practices", items: ["Agile", "TDD", "Code Instrumentation", "Version Control"] }
    ],
    certificates: [
      {
        name: "AWS Certified Developer – Associate",
        issuer: "Amazon Web Services",
        date: null,
      },
      {
        name: "Meta Full-Stack Developer Certificate",
        issuer: "Meta",
        date: null,
      },
    ],
    languages: [],
  },

  hm_feedback:
    "Strong alignment with requirements for backend and full-stack engineering. Excellent experience with cloud infrastructure, scalable systems, and React/Node.js stack. Demonstrates direct experience with CI/CD and production-level services, making this candidate a strong match.",

  summary: {
    education: "",
    work_experience:
      "Work Experience (Northbridge Software Solutions - Software Engineering Intern): Modified bullet point 1. Before: 'Participated in full development lifecycle from design to deployment, implementing RESTful APIs and Node.js microservices that reduced operational workload by 40%'. After: 'Developed RESTful APIs and Node.js microservices using JavaScript and Python, reducing operational time by 40% and improving engineering efficiency'. Changes: added specific technologies, added quantified impact. | Modified bullet point 2. ...",
    projects:
      "Project 1 (Automated Commerce Platform → Automated Marketplace Platform): Modified name for alignment with marketplace-based JD. Added 'smart matching algorithms' to description. | Added Kubernetes to technologies. | Project 2 (Team Productivity Dashboard → Internal Efficiency Platform): ...",
    skills:
      "Databases category: Removed descriptive tags (e.g., non-relational). Cloud category: Updated 'Kubernetes-ready' wording to 'Kubernetes' for accuracy.",
    certificates:
      "Removed one certificate to streamline section and keep only the most relevant credentials.",
    languages: "",
  },


};

/**
 * summary 各模块 配色（work_experience 红，projects 蓝，其它自动分组）
 */
const SUMMARY_SECTION_STYLES = {
  work_experience: {
    label: 'Work Experience',
    bg: 'bg-red-50',
    border: 'border-red-200',
    dot: 'bg-red-400',
    text: 'text-red-800',
  },
  projects: {
    label: 'Projects',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    dot: 'bg-blue-400',
    text: 'text-blue-800',
  },
  skills: {
    label: 'Skills',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
    text: 'text-amber-800',
  },
  certificates: {
    label: 'Certificates',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    dot: 'bg-emerald-400',
    text: 'text-emerald-800',
  },
  education: {
    label: 'Education',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
    text: 'text-slate-800',
  },
  languages: {
    label: 'Languages',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    dot: 'bg-sky-400',
    text: 'text-sky-800',
  },
};

const getSummarySectionStyle = (key) => {
  if (SUMMARY_SECTION_STYLES[key]) return SUMMARY_SECTION_STYLES[key];

  const pretty = key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

  return {
    label: pretty,
    bg: 'bg-neutral-50',
    border: 'border-neutral-200',
    dot: 'bg-neutral-400',
    text: 'text-neutral-800',
  };
};

/**
 * 将后端 optimized_blocks + hm_feedback + summary 中的修改历史映射为前端结构
 */
const mapApiResponseToResumePreviewData = (apiData) => {
  if (!apiData) return {};

  const optimizedBlocks = apiData.optimized_blocks || {};
  const resumeBlocks = apiData.resume_blocks || {};
  const hasOptimized = Object.keys(optimizedBlocks || {}).length > 0;
  const sourceBlocks = hasOptimized ? optimizedBlocks : resumeBlocks;

  const {
    contact_info: contactInfoRaw = {},
    summary = '',
    education = [],
    work_experience: workExperience = [],
    projects = [],
    skills = [],
    certificates = [],
  } = sourceBlocks || {};

  // contact_info → PersonalInfo
  const buildPersonalInfoFromContactInfo = (contactInfo = {}) => {
    if (!contactInfo || typeof contactInfo !== 'object') return {};

    const {
      name,
      phone,
      email,
      github,
      linkedin,
      address,
      website,
    } = contactInfo;

    let firstName = '';
    let lastName = '';

    if (name) {
      const parts = String(name).trim().split(/\s+/);
      if (parts.length === 1) {
        firstName = parts[0];
      } else {
        firstName = parts[0];
        lastName = parts.slice(1).join(' ');
      }
    }

    let city = '';
    let country = '';
    if (address) {
      const parts = String(address).split(',');
      city = parts[0]?.trim() || '';
      if (parts.length > 1) {
        country = parts.slice(1).join(',').trim();
      }
    }

    const portfolio = website || '';
    const otherParts = [];
    if (github) otherParts.push(`GitHub: ${github}`);

    return {
      firstName,
      lastName,
      jobTitle: '',
      city,
      country,
      phone: phone || '',
      email: email || '',
      linkedin: linkedin || '',
      portfolio,
      other: otherParts.join(' | '),
    };
  };

  const personalInfo =
    Object.keys(contactInfoRaw || {}).length > 0
      ? buildPersonalInfoFromContactInfo(contactInfoRaw)
      : buildPersonalInfoFromContactInfo(resumeBlocks.contact_info || {});

  // Education
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

  // Work Experience
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

  // Projects
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

  // Skills → 多行字符串
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

  // Certificates
  const mappedCertificates = (certificates || []).map((cert) => ({
    name: cert.name || '',
    issuingOrg: cert.issuingOrg || cert.organization || cert.issuer || '',
    issueDate: cert.issueDate || cert.start_date || cert.date || '',
    expirationDate: cert.expirationDate || cert.end_date || '',
    credentialID: cert.credentialID || '',
    credentialURL: cert.credentialURL || '',
  }));

  /**
   * 解析 summary: { education, work_experience, projects, skills, certificates, languages }
   * 每个字段内部用 ' | ' 分隔成多个修改说明
   */
  let summarySuggestionsText = '';
  const summarySectionsParsed = {};

  if (apiData.summary && typeof apiData.summary === 'object') {
    Object.entries(apiData.summary).forEach(([sectionKey, rawContent]) => {
      if (!rawContent || !String(rawContent).trim()) return;

      const parts = String(rawContent)
        .split(' | ')
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts.length > 0) {
        summarySectionsParsed[sectionKey] = parts;
      }
    });

    const merged = Object.entries(summarySectionsParsed).map(
      ([sectionKey, parts]) => {
        const humanReadableTitle = sectionKey
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (ch) => ch.toUpperCase());
        return `${humanReadableTitle}:\n${parts.join('\n')}`;
      },
    );

    if (merged.length > 0) {
      summarySuggestionsText = merged.join('\n\n');
    }
  }

  const hmFeedbackMain = apiData.hm_feedback
    ? String(apiData.hm_feedback).trim()
    : '';

  const hmFeedbackSummary = summarySuggestionsText
    ? String(summarySuggestionsText).trim()
    : '';

  return {
    PersonalInfo: personalInfo,
    Summary: summary,
    Education: mappedEducation,
    WorkExperience: mappedWorkExperience,
    Projects: mappedProjects,
    Skills: mappedSkills,
    Certificates: mappedCertificates,
    hmFeedbackMain,
    hmFeedbackSummary,
    hmFeedbackSummarySections: summarySectionsParsed,
  };
};

/** 文本 → <br /> 换行（用于 overall feedback 和 fallback summary） */
const formatText = (text) => {
  if (text == null) return [];

  const normalizeToLines = (value) => {
    const result = [];
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item == null) return;
        String(item)
          .split('\n')
          .forEach((line) => result.push(line));
      });
      return result;
    }
    return String(value).split('\n');
  };

  const lines = normalizeToLines(text);

  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </React.Fragment>
  ));
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE:', API_BASE);

const DashboardEnhance = () => {
  const [activeStep, setActiveStep] = useState(STEP_UPLOAD);
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [jobDescriptionError, setJobDescriptionError] = useState('');
  const [uploadPercent, setUploadPercent] = useState(0);

  /**
   * 初始化从 localStorage 读取上次 AI 结果
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

  /** Dropzone 上传 PDF */
  const handleDrop = (droppedFiles) => {
    const allowedType = 'application/pdf';
    const acceptedFiles = droppedFiles.filter(
      (file) => file.type === allowedType || /\.pdf$/i.test(file.name),
    );

    if (acceptedFiles.length === 0) {
      alert('仅支持上传 PDF 文件');
      return;
    }

    setFiles([acceptedFiles[0]]);
  };

  const removeFile = () => setFiles([]);

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

  const handleJobDescChange = (e) => {
    const value = e.target.value;
    setJobDescription(value);
    validateJobDescription(value);
  };

  const goNext = () => {
    if (activeStep === STEP_UPLOAD && files.length === 0) {
      alert('请先上传一个 PDF 文件');
      return;
    }
    if (activeStep === STEP_JD && !validateJobDescription(jobDescription)) {
      return;
    }
    setActiveStep((cur) => Math.min(cur + 1, STEP_REVIEW));
  };

  const goPrevious = () =>
    setActiveStep((cur) => Math.max(cur - 1, STEP_UPLOAD));

  const handleProcessComplete = () => {
    console.log('--- AI Process Simulation Completed/Aborted ---');
    setActiveStep(STEP_REVIEW);
  };

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

      const newPreviewData = mapApiResponseToResumePreviewData(response.data);

      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('ai-resume-data', JSON.stringify(newPreviewData));
      }
      setPreviewData(newPreviewData);

      setTimeout(() => {
        setActiveStep(STEP_REVIEW);
      }, 1500);
    } catch (error) {
      console.error('❌Network error or request timeout. ❌', error);
      alert(error.message || 'Network error or request timeout. Please try again later.');
      setActiveStep(STEP_REVIEW);
      setIsRequestDone(true);
    }
  };

  const handleLocalPreview = () => {
    const newPreviewData = mapApiResponseToResumePreviewData(sampleApiResponse);
    setPreviewData(newPreviewData);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('ai-resume-data', JSON.stringify(newPreviewData));
    }
    setActiveStep(STEP_REVIEW);
    setIsRequestDone(true);
  };

  const handleResetFlow = () => {
    setActiveStep(STEP_UPLOAD);
    setFiles([]);
    setJobDescription('');
    setJobDescriptionError('');
    setPreviewData({});
    setIsRequestDone(false);
    setUploadPercent(0);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('ai-resume-data');
    }
  };

  const isSubmitting = activeStep === STEP_PROCESSING;

  const hmFeedbackMain = previewData?.hmFeedbackMain;
  const hmFeedbackSummary = previewData?.hmFeedbackSummary;
  const hmFeedbackSummarySections =
    previewData?.hmFeedbackSummarySections || {};

  const hasSummarySections =
    hmFeedbackSummarySections &&
    Object.keys(hmFeedbackSummarySections).length > 0;

  const hasAiResult =
    !!hmFeedbackMain || hasSummarySections || !!hmFeedbackSummary;

  return (
    <div className="flex gap-4 w-full h-full p-4 border-gray-200 border-t">
      {/* 左侧流程区 */}
      <div className="w-full p-4 lg:w-2/5 bg-white rounded shadow-sm">
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

            {isSubmitting && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Loader2 className="h-4 w-4 animate-spin text-primary mr-1" />
                  <span className="font-semibold text-primary">
                    Processing...
                  </span>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 border-t pt-6">
          {/* Step 1 */}
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

          {/* Step 2 */}
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

          {/* Step 3 */}
          {activeStep === STEP_REVIEW && (
            <div>
              <h3 className="font-medium mb-2">
                <span className="font-bold">Step 3 </span>
                {hasAiResult ? 'AI Results' : 'Review & Submit'}
              </h3>
              {!hasAiResult && (
                <p className="text-sm text-gray-600 mb-3">
                  Please review your uploaded file and job description before submitting.
                </p>
              )}
              {hasAiResult && (
                <p className="text-sm text-gray-600 mb-3">
                  Your resume has been optimized. Review the AI hiring manager feedback below.
                </p>
              )}

              {/* 文件摘要 */}
              <div className="my-8">
                <div className="text-sm font-bold">Uploaded File</div>
                <ul className="list-disc ml-5 text-sm">
                  {files.map((file, index) => (
                    <li className="font-semibold" key={index}>
                      {file.name} — {Math.round(file.size / 1024)} KB
                    </li>
                  ))}
                  {files.length === 0 && (
                    <li className="text-xs text-gray-500">
                      No file in current session (you may be viewing cached AI results).
                    </li>
                  )}
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

              {/* AI Feedback 区域 */}

              {hasAiResult && (
                <div className="border-t border-gray-300">
                  <div className="mt-8 p-4 rounded text-justify bg-neutral-50 border">
                    <h3 className="mb-2 font-bold">
                      <MessagesSquare className="inline-block mr-2" />
                      AI Hiring Manager Feedback
                    </h3>

                    {hmFeedbackMain && (
                      <div className="mt-8">
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          Overall Feedback:
                        </p>
                        <p className="text-sm font-thin text-gray-700">
                          {formatText(hmFeedbackMain)}
                        </p>
                      </div>
                    )}

                    {/* 彩色 summary 模块（work_experience 红，projects 蓝，其它自动） */}
                    {hasSummarySections && (
                      <div className="mt-8">
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          Edit Suggestions &amp; History:
                        </p>
                        <div className="grid grid-cols-1 gap-6 mt-6">
                          {Object.entries(hmFeedbackSummarySections).map(
                            ([sectionKey, entries]) => {
                              const style = getSummarySectionStyle(sectionKey);
                              return (
                                <div
                                  key={sectionKey}
                                  className={`rounded-lg border px-3 py-2 text-xs ${style.bg} ${style.border}`}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <span
                                      className={`inline-block h-2 w-2 rounded-full ${style.dot}`}
                                    />
                                    <span
                                      className={`uppercase tracking-wide font-semibold text-[10px] ${style.text}`}
                                    >
                                      {style.label}
                                    </span>
                                  </div>
                                  <ul className="list-disc ml-4 space-y-1 text-[11px] text-gray-800">
                                    {entries.map((entry, idx) => (
                                      <li key={idx}>{entry}</li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    )}

                    {/* 解析不到时兜底 */}
                    {!hasSummarySections && hmFeedbackSummary && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold text-gray-800 mb-1">
                          Edit Suggestions &amp; History:
                        </p>
                        <p className="text-sm font-thin text-gray-700">
                          {formatText(hmFeedbackSummary)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4 处理中 */}
          {activeStep === STEP_PROCESSING && (
            <div>
              <AILongProcessSimulator
                initialStart
                externalAbort={isRequestDone}
                onFinish={handleProcessComplete}
              />
              <p className="text-sm text-muted-foreground pt-4">
                Processing in progress...
              </p>
              {uploadPercent > 0 && (
                <p className="text-medium font-bold pt-4">
                  The page will automatically update upon completion. Please maintain the current session.
                </p>
              )}
            </div>
          )}

          {/* 底部按钮 */}
          <div className="mt-4 flex gap-2 flex-wrap">
            {!isSubmitting && (
              <Button
                onClick={goPrevious}
                disabled={activeStep === STEP_UPLOAD}
                variant="outline"
              >
                &lt;&lt; Previous
              </Button>
            )}

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

            {activeStep === STEP_REVIEW && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLocalPreview}
                >
                  Preview Using Sample Data
                </Button>

                {!hasAiResult && (
                  <Button
                    onClick={handleSubmitToBackend}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Submit to AI
                  </Button>
                )}

                {hasAiResult && (
                  <Button
                    type="button"
                    onClick={handleResetFlow}
                  >
                    Re-submit
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 右侧简历预览 */}
      <div className="hidden lg:block lg:w-3/5 bg-neutral-200 p-4 rounded overflow-auto shadow-lg border">
        <ResumePreview data={previewData} />
      </div>
    </div>
  );
};

export default DashboardEnhance;
