'use client'

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// 导入所有表单组件
import PersonalInfoForm from "./PersonalInfoForm";
import WorkExperienceForm from "./WorkExperienceForm";
import ProjectsForm from "./ProjectsForm";
import CertificatesForm from "./CertificatesForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import Summary from "./Summary";

// 导入新的简历预览组件
import ResumePreview from "./ResumePreview"; // <--- 新增导入

// 1. 定义所有步骤、对应的组件和初始数据类型
const FORM_STEPS = [
  { name: 'Personal Info', component: PersonalInfoForm, initialData: {} },
  { name: 'Work Experience', component: WorkExperienceForm, initialData: [] },
  { name: 'Education', component: EducationForm, initialData: [] },
  { name: 'Projects', component: ProjectsForm, initialData: [] },
  { name: 'Skills', component: SkillsForm, initialData: '' },
  { name: 'Certificates', component: CertificatesForm, initialData: [] },
  { name: 'Summary', component: Summary, initialData: '' },
];

// 用于导航和迭代的步骤名称列表
const BREADCRUMB_LINKS = FORM_STEPS.map(step => step.name);

// 辅助函数：将 'Personal Info' 转换为 'PersonalInfo'
const getStepKey = (name) => name.replace(/\s/g, '');


const DashboardCreate = () => {
  const [activeForm, setActiveForm] = useState(FORM_STEPS[0].name); 

  // 状态：用于存储所有表单的全局数据 (最终的简历 JSON 对象)
  const [formData, setFormData] = useState(() => {
    // 基于步骤创建默认结构
    const defaults = FORM_STEPS.reduce((acc, step) => {
      acc[getStepKey(step.name)] = step.initialData;
      return acc;
    }, {});

    // 检查浏览器环境并尝试从 localStorage 恢复已保存的简历
    try {
      // 检查 localStorage 是否可用
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        console.warn('localStorage is not available in this environment');
        return defaults;
      }

      const raw = localStorage.getItem('ai-resume-data');
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...defaults, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to read saved resume from localStorage', e);
    }

    return defaults;
  });

  // 🌟 核心状态：用于存储子组件输入数据的本地缓冲区 (使用 ref 避免在输入时触发父组件重渲染导致失去焦点)
  const localStepDataRef = React.useRef({});

  // 如果你仍然希望在右侧预览看到变化，可以用这个小状态去触发预览更新（可选，默认不频繁更新）
  const [previewTick, setPreviewTick] = useState(0);

  const activeIndex = BREADCRUMB_LINKS.indexOf(activeForm);
  const isFirstStep = activeIndex === 0;
  const isLastStep = activeIndex === BREADCRUMB_LINKS.length - 1;

  // 🚀 通用数据更新函数：只更新当前步骤的本地缓冲区 (稳定)
  const updateLocalStepData = useCallback((key, newData, shouldPreview = false) => {
    localStepDataRef.current = {
      ...localStepDataRef.current,
      [key]: newData,
    };
    if (shouldPreview) {
      // 仅在需要时触发一次小的状态更新以刷新右侧预览
      setPreviewTick(t => t + 1);
    }
  }, []);


  // ✅ 新增：为每个表单步骤创建专用的 setLocalData 回调，避免时序问题
  const setLocalDataCallbacks = useMemo(() => {
    const callbacks = {};
    FORM_STEPS.forEach(step => {
      callbacks[step.name] = (newData) => {
        updateLocalStepData(step.name, newData);
      };
    });
    return callbacks;
  }, [updateLocalStepData]);

  // 构建最终合并数据：把 formData 和 localStepDataRef 合并，给每个步骤打上默认结构
  const buildFinalData = useCallback(() => {
    const combined = { ...formData };
    const local = localStepDataRef.current || {};
    // 对所有定义的步骤确保键值存在
    FORM_STEPS.forEach(step => {
      const key = getStepKey(step.name);
      const localForStep = local[step.name];
      if (localForStep !== undefined) {
        combined[key] = localForStep;
      } else if (combined[key] === undefined) {
        combined[key] = step.initialData;
      }
    });
    return combined;
  }, [formData]);

  // 生成一个适合下载/打开的 HTML 字符串（基本样式，容错空字段）
  const generateResumeHTML = useCallback((data) => {
    const safe = (v) => (v === undefined || v === null) ? '' : v;

    const personal = data.PersonalInfo || {};
    const fullName = `${safe(personal.firstName)} ${safe(personal.lastName)}`.trim() || 'Your Name';
    const jobTitle = safe(personal.jobTitle) || '';
    
    // 生成联系方式
    const contactParts = [];
    const city = safe(personal.city);
    const country = safe(personal.country);
    if (city && country) {
      contactParts.push(`${city}, ${country}`);
    } else if (city || country) {
      contactParts.push(city || country);
    }
    
    const phone = safe(personal.phone);
    if (phone) {
      contactParts.push(`Tel: ${phone}`);
    }
    
    const email = safe(personal.email);
    if (email) {
      contactParts.push(`Email: ${email}`);
    }
    
    const linkedin = safe(personal.linkedin);
    if (linkedin) {
      contactParts.push(`LinkedIn: ${linkedin}`);
    }
    
    const portfolio = safe(personal.portfolio);
    if (portfolio) {
      contactParts.push(`Portfolio: ${portfolio}`);
    }
    
    const other = safe(personal.other);
    if (other) {
      contactParts.push(`Other: ${other}`);
    }
    
    const contactHtml = contactParts.join(' | ');

    const sectionRows = (items, renderItem) => {
      if (!Array.isArray(items) || items.length === 0) return '';
      return items.map((it) => `<div class="item">${renderItem(it)}</div>`).join('');
    };

    const workHtml = sectionRows(data.WorkExperience, job => {
      return `<div class="row"><div class="title">${safe(job.jobTitle) || '[Job Title]'}</div><div class="meta">${safe(job.company) || ''} ${safe(job.startDate) || ''} - ${safe(job.endDate) || ''}</div><div class="desc">${(safe(job.description)||'').replace(/\n/g, '<br/>')}</div></div>`;
    });

    const educationHtml = sectionRows(data.Education, ed => {
      return `<div class="row"><div class="title">${safe(ed.institution)||'[Institution]'}</div><div class="meta">${safe(ed.degree)||''} ${safe(ed.startDate)||''} - ${safe(ed.endDate)||''}</div></div>`;
    });

    const projectsHtml = sectionRows(data.Projects, p => {
      return `<div class="row"><div class="title">${safe(p.projectName)||'[Project]'}${safe(p.projectLink) ? ` (${safe(p.projectLink)})` : ''}</div><div class="meta">${safe(p.startDate)||''} - ${safe(p.endDate)||''}</div><div class="desc">${(safe(p.description)||'').replace(/\n/g,'<br/>')}</div></div>`;
    });

    const skillsHtml = safe(data.Skills) ? `<div class="skills">${safe(data.Skills).toString().split(/, ?|\n/).filter(s=>s.trim()).join(' | ')}</div>` : '';

    const certsHtml = sectionRows(data.Certificates, c => `<div class="row"><div class="title">${safe(c.name)||'[Certificate]'}</div><div class="meta">${safe(c.issuingOrg)||''} ${safe(c.issueDate)||''}${safe(c.credentialID) ? ` | ID: ${safe(c.credentialID)}` : ''}${safe(c.credentialURL) ? ` | ${safe(c.credentialURL)}` : ''}</div></div>`);

    const summaryHtml = (safe(data.Summary) || '').replace(/\n/g, '<br/>');

    const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${fullName} - Resume</title>
    <style>
      body{font-family:Inter,system-ui,Arial,Helvetica,sans-serif;color:#111;padding:20px;margin:0;line-height:1.5;}
      .header{text-align:center;margin-bottom:16px;border-bottom:2px solid #222;padding-bottom:12px;}
      .header h1{margin:0 0 8px 0;font-size:24px;font-weight:700;}
      .header .job-title{margin:0 0 6px 0;font-size:14px;font-weight:600;color:#333;}
      .header .contact{margin:0;font-size:11px;color:#555;}
      .section{margin-bottom:12px;}
      .section h3{margin:0 0 8px 0;font-size:13px;font-weight:700;border-bottom:1px solid #333;padding-bottom:4px;text-transform:uppercase;letter-spacing:0.5px;}
      .row{margin-bottom:8px;}
      .title{font-weight:600;font-size:12px;}
      .meta{color:#666;font-size:11px;margin-top:2px;}
      .desc{color:#444;font-size:11px;margin-top:4px;white-space:pre-wrap;}
      .skills{color:#444;font-size:11px;}
      ul{margin:4px 0;padding-left:20px;}
      li{margin:2px 0;font-size:11px;}
    </style>
  </head>
  <body>
    <div class="header">
      <h1>${fullName}</h1>
      ${jobTitle ? `<div class="job-title">${jobTitle}</div>` : ''}
      ${contactHtml ? `<div class="contact">${contactHtml}</div>` : ''}
    </div>

    ${summaryHtml ? `<div class="section"><h3>Summary</h3><div class="desc">${summaryHtml}</div></div>` : ''}

    ${workHtml ? `<div class="section"><h3>Work Experience</h3>${workHtml}</div>` : ''}
    ${educationHtml ? `<div class="section"><h3>Education</h3>${educationHtml}</div>` : ''}
    ${projectsHtml ? `<div class="section"><h3>Projects</h3>${projectsHtml}</div>` : ''}
    ${skillsHtml ? `<div class="section"><h3>Skills</h3>${skillsHtml}</div>` : ''}
    ${certsHtml ? `<div class="section"><h3>Certificates</h3>${certsHtml}</div>` : ''}

  </body>
</html>`;

    return html;
  }, []);

  const downloadHTML = useCallback((filename, htmlString) => {
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  // 打印简历
  const printResume = useCallback((htmlString) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(htmlString);
      printWindow.document.close();
      // 等待内容加载完成后触发打印
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  }, []);
  
  // 🌟 计算合并后的实时数据用于预览 (localStepData 优先)
  const previewData = useMemo(() => {
    const combinedData = { ...formData };
    const local = localStepDataRef.current || {};
    // 仅在本地缓冲有"有意义"的值时覆盖全局数据，避免空数组/空字符串不小心清空预览
    Object.keys(local).forEach(formName => {
      const key = getStepKey(formName);
      const val = local[formName];
      const isEmptyArray = Array.isArray(val) && val.length === 0;
      const isEmptyString = typeof val === 'string' && val.trim() === '';
      const isNullish = val === undefined || val === null;

      // 覆盖逻辑：只有当本地值不是 undefined/null 且不是空数组/空字符串时，才覆盖全局数据。
      // 这样能避免某些表单在 mount 时把空默认值同步到 local，从而把已填数据意外清空的问题。
      if (!isNullish && !isEmptyArray && !isEmptyString) {
        combinedData[key] = val;
      }
    });
    console.log('✅ previewData updated - PersonalInfo in preview:', !!combinedData.PersonalInfo);
    return combinedData;
  }, [formData, previewTick, activeForm]);


  // 🚀 处理"下一个"按钮点击
  const handleNext = useCallback(() => {
    const currentFormName = activeForm;
    const currentDataKey = getStepKey(currentFormName);

    // 1. 从 ref 中读取当前步骤的本地缓冲
    const local = localStepDataRef.current || {};

    // 2. 立即将当前步骤的本地数据合并到全局 formData
    let newFormData = { ...formData };
    if (local[currentFormName] !== undefined) {
      newFormData[currentDataKey] = local[currentFormName];
    }
    
    // 3. 同步更新 formData（这会触发右侧预览更新）
    setFormData(newFormData);

    // 4. 导航到下一步或完成
    if (isLastStep) {
      // 最后一步：生成最终数据、持久化和下载
      // 构建最终数据：把所有本地缓冲合并进 newFormData
      const finalData = { ...newFormData };
      Object.keys(local).forEach(formName => {
        const key = getStepKey(formName);
        if (local[formName] !== undefined && local[formName] !== null) {
          finalData[key] = local[formName];
        }
      });
      // 确保所有步骤都有默认值
      FORM_STEPS.forEach(step => {
        const key = getStepKey(step.name);
        if (finalData[key] === undefined) {
          finalData[key] = step.initialData;
        }
      });

      // persist to localStorage
      try {
        // 检查 localStorage 是否可用
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('ai-resume-data', JSON.stringify(finalData));
          console.log("Submitting final CV data:", finalData);
          alert("CV Data saved locally. You can now print or download.");
        } else {
          console.warn('localStorage is not available, but data can still be printed');
          alert("Your resume is ready to print!");
        }
      } catch (e) {
        console.error('Failed to save resume to localStorage', e);
        alert("Note: Data could not be saved locally, but you can still print your resume.");
      }

      // 生成 HTML 并调用打印
      try {
        const html = generateResumeHTML(finalData);
        printResume(html);
      } catch (e) {
        console.error('Failed to generate/print resume HTML', e);
      }
    } else {
      // 非最后一步：导航到下一个表单
      const nextFormName = BREADCRUMB_LINKS[activeIndex + 1];
      // ✅ 不删除本地缓冲，保留以便返回时使用
      setActiveForm(nextFormName);
    }
  }, [activeForm, activeIndex, isLastStep, formData, generateResumeHTML, printResume]);

  // 🚀 处理"上一个"按钮点击
  const handlePrevious = useCallback(() => {
    if (!isFirstStep) {
      const previousFormName = BREADCRUMB_LINKS[activeIndex - 1];
      // ✅ 不删除本地缓冲，保留以便返回时使用
      setActiveForm(previousFormName);
    }
  }, [activeIndex, isFirstStep]);


  // 5. 渲染当前激活的表单组件（使用 RenderActiveForm 函数）
  const RenderActiveForm = () => {
    const activeStep = FORM_STEPS[activeIndex];
    if (!activeStep) return <p>Select a section to begin.</p>;

    const ComponentToRender = activeStep.component;
    const dataKey = getStepKey(activeStep.name);
    
    // 🌟 改进的数据加载逻辑：优先使用本地缓冲，其次使用全局 formData
    // 这确保了用户返回某个步骤时能看到之前的输入
    const localData = localStepDataRef.current[activeStep.name];
    const globalData = formData[dataKey];
    const initialData = localData !== undefined ? localData : globalData;
    
    return (
      <ComponentToRender
        key={activeForm} // 关键：确保组件在切换步骤时重新挂载
        initialData={initialData}
        setLocalData={setLocalDataCallbacks[activeStep.name]} // 使用专用回调而不是 ref-backed
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    );
  };
  

  return (
    <div className="flex gap-4 w-full h-full p-4 border-gray-200 border-t">
      
      {/* 左侧 表单区 (W-2/5) */}
      <div className="w-full p-4 lg:w-2/5">

        <Breadcrumb>
          <BreadcrumbList className="flex flex-wrap gap-x-2"> 
            {BREADCRUMB_LINKS.map((linkName, index) => (
              <React.Fragment key={linkName}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className={
                      activeForm === linkName
                        ? "font-semibold text-primary cursor-pointer" 
                        : "text-muted-foreground hover:text-foreground cursor-pointer"
                    }
                    onClick={() => setActiveForm(linkName)}
                  >
                    {linkName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                {index < BREADCRUMB_LINKS.length - 1 && (
                  <BreadcrumbSeparator className="" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="mt-6 border-t">
          <RenderActiveForm />
        </div>
      </div>

      {/* 🌟 核心修改: 右侧预览 (W-3/5) */}
      <div className="hidden lg:block lg:w-3/5 bg-neutral-200 p-4 rounded overflow-auto shadow-lg border">
        {/* 传入实时合并的数据进行渲染 */}
        <ResumePreview data={previewData} />
      </div>
    </div>
  );
};

export default DashboardCreate;