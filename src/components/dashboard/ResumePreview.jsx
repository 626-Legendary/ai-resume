'use client';

import React, { memo, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Button } from '../ui/button';
import { Ghost } from 'lucide-react';

/** 把任意值安全地转成数组 */
const ensureArray = (value) => (Array.isArray(value) ? value : []);

/** 判断对象是否有非空字段，用于过滤空的工作经历等 */
const isArrayItemMeaningful = (item) =>
  item && typeof item === 'object'
    ? Object.values(item).some(
        (value) => value !== null && value !== undefined && value !== '',
      )
    : false;

/** 将字符串或字符串数组按换行符切行，渲染为带 <br /> 的多行 React 节点（仅用于网页展示 / PDF 截图） */
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

/** HTML escape，避免导出 Word 时出现非法字符 */
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** 拆成多行（去掉空行） */
const splitLines = (str) =>
  String(str || '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

/**
 * 简历预览组件
 * data 结构：
 * {
 *   PersonalInfo: {},
 *   Summary: string,
 *   Education: [...],
 *   WorkExperience: [...],
 *   Projects: [...],
 *   Skills: string | string[],
 *   Certificates: [...],
 *   hmFeedbackMain: string,
 *   hmFeedbackSummary: string,
 * }
 */
const ResumePreviewComponent = ({ data }) => {
  const {
    PersonalInfo = {},
    Summary = '',
    WorkExperience = [],
    Education = [],
    Projects = [],
    Skills = '',
    Certificates = [],
    hmFeedbackMain,
    hmFeedbackSummary,
  } = data || {};

  const {
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    phone,
    email,
    linkedin,
    portfolio,
    other,
  } = PersonalInfo;

  /** 页面中简历区域的 DOM（网页展示 + PDF 截图用） */
  const resumeRef = useRef(null);

  /** 把 Skills 转成统一字符串展示（网页 / PDF 用） */
  const renderSkillsText = () => {
    const skillsString = Array.isArray(Skills)
      ? Skills.join(', ')
      : typeof Skills === 'string'
      ? Skills
      : String(Skills || '');
    const parts = skillsString
      .split(/, ?|\n/)
      .filter((text) => text && text.trim());
    if (parts.length === 0) return null;
    return <p className="text-sm text-gray-700">{parts.join(' | ')}</p>;
  };

  /** -------- PDF 导出：保持你现在已经 OK 的效果 -------- */
  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return;

    try {
      const resumeHtml = resumeRef.current.innerHTML;

      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-9999px';
      iframe.style.top = '0';
      iframe.style.width = '794px';
      iframe.style.height = '1123px';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      const iframeCss = `
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 12px;
          line-height: 1.5;
          background-color: #ffffff;
          color: #111827;
        }
        .resume-wrapper {
          width: 794px;
          height: 1123px;
          padding: 32px;
          background-color: #ffffff;
          color: #111827;
        }
        h1 {
          font-size: 24px;
          margin: 0 0 6px 0;
          text-transform: uppercase;
        }
        h2 {
          font-size: 16px;
          margin: 0 0 4px 0;
        }
        h3 {
          font-size: 14px;
          margin: 12px 0 6px 0;
          border-bottom: 1px solid #4b5563;
          padding-bottom: 2px;
        }
        p { margin: 2px 0; }
        ul {
          margin: 2px 0 2px 18px;
          padding: 0;
        }
        li { margin-bottom: 2px; }
        .mb-6 { margin-bottom: 24px; }
        .mb-5 { margin-bottom: 20px; }
        .mb-3 { margin-bottom: 12px; }
        .border-b { border-bottom: 1px solid #9ca3af; padding-bottom: 4px; }
      `;

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Resume PDF</title>
            <style>${iframeCss}</style>
          </head>
          <body>
            <div class="resume-wrapper">
              ${resumeHtml}
            </div>
          </body>
        </html>
      `);
      iframeDoc.close();

      await new Promise((resolve) => {
        if (iframe.contentWindow.document.readyState === 'complete') {
          resolve();
        } else {
          iframe.onload = () => resolve();
        }
      });

      const target =
        iframe.contentDocument.querySelector('.resume-wrapper') ||
        iframe.contentDocument.body;

      const canvas = await html2canvas(target, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const y = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

      pdf.addImage(
        imgData,
        'PNG',
        0,
        Math.max(0, y),
        imgWidth,
        imgHeight,
        undefined,
        'FAST',
      );

      pdf.save('resume.pdf');
      document.body.removeChild(iframe);
    } catch (err) {
      console.error('PDF 导出失败:', err);
      alert('导出 PDF 失败，请查看控制台错误信息。');
    }
  };

  /** -------- Word 导出：完全用 data 重建 HTML，避免 <br /> 带来的 ↲ 问题 -------- */

  /** 把当前 data 生成一个专门给 Word 用的 HTML 字符串 */
  const buildWordHtmlDocument = () => {
    // Summary：每一行一个 <p>，不使用 <br />
    const summaryHtml = splitLines(Summary)
      .map((line) => `<p>${escapeHtml(line)}</p>`)
      .join('');

    // Skills：复用 render 逻辑，最后变成一个长段落
    const skillsString = Array.isArray(Skills)
      ? Skills.join(', ')
      : typeof Skills === 'string'
      ? Skills
      : String(Skills || '');
    const skillParts = skillsString
      .split(/, ?|\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    const skillsHtml = skillParts.length
      ? `<p>${escapeHtml(skillParts.join(' | '))}</p>`
      : '';

    // Experience：每条经历一个块，每一行 description 作为一个 <li>
    const workHtml = ensureArray(WorkExperience)
      .filter(isArrayItemMeaningful)
      .map((job) => {
        const lines = splitLines(job.description || '');
        const bullets = lines
          .map((line) => `<li>${escapeHtml(line)}</li>`)
          .join('');
        const location =
          job.city && job.country
            ? `${job.city}, ${job.country}`
            : job.city || job.country || '';
        return `
          <div class="section">
            <p><strong>${escapeHtml(
              job.jobTitle || '[Job Title]',
            )}</strong> at ${escapeHtml(job.company || '[Company]')}</p>
            <p class="muted">${escapeHtml(
              job.startDate || '',
            )} - ${escapeHtml(job.endDate || 'Current')}</p>
            ${
              location
                ? `<p class="muted">${escapeHtml(location)}</p>`
                : ''
            }
            ${
              bullets
                ? `<ul>${bullets}</ul>`
                : ''
            }
          </div>
        `;
      })
      .join('');

    // Education
    const eduHtml = ensureArray(Education)
      .filter(isArrayItemMeaningful)
      .map((edu) => {
        const location =
          edu.city && edu.country
            ? `${edu.city}, ${edu.country}`
            : edu.city || edu.country || '';
        return `
          <div class="section">
            <p><strong>${escapeHtml(edu.institution || '[Institution]')}</strong></p>
            <p>${escapeHtml(edu.degree || '')} in ${escapeHtml(
          edu.fieldOfStudy || '',
        )} ${
          edu.gpa ? `(GPA: ${escapeHtml(edu.gpa)})` : ''
        }</p>
            ${
              location
                ? `<p class="muted">${escapeHtml(location)}</p>`
                : ''
            }
            <p class="muted">${escapeHtml(
              edu.startDate || '',
            )} - ${escapeHtml(edu.endDate || '')}</p>
          </div>
        `;
      })
      .join('');

    // Projects
    const projectsHtml = ensureArray(Projects)
      .filter(isArrayItemMeaningful)
      .map((project) => {
        const lines = splitLines(project.description || '');
        const bullets = lines
          .map((line) => `<li>${escapeHtml(line)}</li>`)
          .join('');
        return `
          <div class="section">
            <p><strong>${escapeHtml(
              project.projectName || '[Project Name]',
            )}</strong></p>
            ${
              project.organization
                ? `<p class="muted">${escapeHtml(project.organization)}</p>`
                : ''
            }
            ${
              (project.startDate || project.endDate) &&
              `<p class="muted">${escapeHtml(
                project.startDate || '',
              )} - ${escapeHtml(project.endDate || 'Current')}</p>`
            }
            ${
              bullets
                ? `<ul>${bullets}</ul>`
                : ''
            }
          </div>
        `;
      })
      .join('');

    // Certificates
    const certHtml = ensureArray(Certificates)
      .filter(isArrayItemMeaningful)
      .map((cert) => {
        const dates = [
          cert.issueDate ? `Issued: ${cert.issueDate}` : '',
          cert.expirationDate ? `Expires: ${cert.expirationDate}` : '',
        ]
          .filter(Boolean)
          .join(' | ');
        const bottomLine = [
          cert.issuingOrg || '',
          cert.credentialID ? `ID: ${cert.credentialID}` : '',
          cert.credentialURL ? `URL: ${cert.credentialURL}` : '',
        ]
          .filter(Boolean)
          .join(' | ');

        return `
          <div class="section">
            <p><strong>${escapeHtml(cert.name || '[Certificate Name]')}</strong></p>
            ${dates ? `<p class="muted">${escapeHtml(dates)}</p>` : ''}
            ${bottomLine ? `<p class="muted">${escapeHtml(bottomLine)}</p>` : ''}
          </div>
        `;
      })
      .join('');

    // 顶部姓名 / 联系方式
    const locationLine =
      city && country ? `${city}, ${country}` : city || country || '';

    const headerHtml = `
      <h1>${escapeHtml(firstName || '[First Name]')} ${escapeHtml(
      lastName || '[Last Name]',
    )}</h1>
      <h2>${escapeHtml(jobTitle || '[Job Title]')}</h2>
      <p class="muted">
        ${escapeHtml(locationLine)}
        ${
          phone || email || linkedin
            ? ` ${
                locationLine ? '| ' : ''
              }${escapeHtml(
                [phone && `Tel: ${phone}`, email && `Email: ${email}`, linkedin && `LinkedIn: ${linkedin}`]
                  .filter(Boolean)
                  .join(' | '),
              )}`
            : ''
        }
      </p>
    `;

    // Word 专用 CSS（不含 Tailwind、不用 CSS3）
    const wordStyle = `
  <style>
    /* 让 Word 把页面边距固定到 0.8cm */
    @page {
      margin: 0.8cm 0.8cm 0.8cm 0.8cm;
    }

    body {
      margin: 0;  /* 不在 body 再加 margin，避免双层边距 */
      font-family: Arial, "Microsoft YaHei", sans-serif;
      font-size: 11pt;
      color: #333333;
      line-height: 1.35;
    }

    /* 简历主体宽度靠近整页：18cm 左右基本占满 */
    .resume {
      width: 20cm;      /* A4 宽度 21cm，减掉左右 1.5~2cm 的边距刚好 */
      margin: 0 auto;
    }

    h1 {
      font-size: 20pt;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      margin-top: 0;
      margin-bottom: 10pt;
    }
    h2 {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin-top: 0;
      margin-bottom: 8pt;
    }
    h3 {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 14pt;
      margin-bottom: 6pt;
      border-bottom: 1px solid #555;
      padding-bottom: 2pt;
    }
    p {
      margin: 5pt 0;
    }
    ul {
      margin: 6pt 0 6pt 14pt;
      padding: 0;
    }
    li {
      margin-bottom: 4pt;
    }
    .section {
      margin-bottom: 10pt;
    }
    .muted {
      color: #555555;
      font-size: 10.5pt;
    }
  </style>
`;
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Resume</title>
          ${wordStyle}
        </head>
        <body>
          <div class="resume">
            ${headerHtml}

            ${
              Summary
                ? `<h3>Summary</h3>${summaryHtml}`
                : ''
            }

            ${
              Skills
                ? `<h3>Skills</h3>${skillsHtml}`
                : ''
            }

            ${
              workHtml
                ? `<h3>Experience</h3>${workHtml}`
                : ''
            }

            ${
              projectsHtml
                ? `<h3>Projects</h3>${projectsHtml}`
                : ''
            }

            ${
              eduHtml
                ? `<h3>Education</h3>${eduHtml}`
                : ''
            }

            ${
              certHtml
                ? `<h3>Certificates</h3>${certHtml}`
                : ''
            }
          </div>
        </body>
      </html>
    `;
  };

  /** 真正的 Word 导出：使用上面的 buildWordHtmlDocument */
  const handleDownloadWord = () => {
    const fullHtml = buildWordHtmlDocument();

    const blob = new Blob([fullHtml], {
      type: 'application/msword;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* 导出按钮（不在 resumeRef 内，不会被导出） */}
      <div className="flex mx-auto justify-end mb-3 gap-2">
        <Button
          variant="outline"
          type="button"
          onClick={handleDownloadPdf}
          className=""
        >
          Download as PDF
        </Button>
        <Button
          type="button"
          onClick={handleDownloadWord}
          className=""
        >
          Download as Word
        </Button>
      </div>

      {/* 简历主体（网页展示 + PDF 源） */}
      <div
        ref={resumeRef}
        className="resume p-8 bg-white shadow-sm rounded overflow-auto font-sans text-gray-800"
        style={{
          width: '8.27in',
          height: '11.69in',
          margin: '0 auto',
          fontSize: '12px',
          boxSizing: 'border-box',
          lineHeight: '1.5',
        }}
      >
        <header className="text-center pb-4 mb-6 border-b border-gray-400">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {firstName || '[First Name]'} {lastName || '[Last Name]'}
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-1">
            {jobTitle || '[Job Title]'}
          </h2>
          <p className="text-sm text-gray-600">
            {city && country ? `${city}, ${country}` : city || country}
            {(phone || email || linkedin) && ' | '}
            {phone && `Tel: ${phone}`}
            {phone && (email || linkedin) && ' | '}
            {email && `Email: ${email}`}
            {email && linkedin && ' | '}
            {linkedin && `LinkedIn: ${linkedin}`}
            {(portfolio || other) && <br />}
            {portfolio && `Portfolio: ${portfolio}`}
            {portfolio && other && ' | '}
            {other && `Other: ${other}`}
          </p>
        </header>

        {Summary && (
          <section className="mb-5">
            <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
              Summary
            </h3>
            <p className="text-sm text-gray-700">{formatText(Summary)}</p>
          </section>
        )}

        {Skills && (
          <section className="mb-5">
            <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
              Skills
            </h3>
            {renderSkillsText()}
          </section>
        )}

        {ensureArray(WorkExperience).length > 0 &&
          ensureArray(WorkExperience).some(isArrayItemMeaningful) && (
            <section className="mb-5">
              <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
                Experience
              </h3>
              {ensureArray(WorkExperience)
                .filter(isArrayItemMeaningful)
                .map((job, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between font-semibold text-sm">
                      <span>
                        {job.jobTitle || '[Job Title]'} at{' '}
                        {job.company || '[Company]'}
                      </span>
                      <span className="text-gray-600">
                        {job.startDate} - {job.endDate || 'Current'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {job.city && job.country
                        ? `${job.city}, ${job.country}`
                        : job.city || job.country}
                    </div>
                    <ul className="list-disc ml-5 text-sm text-gray-700">
                      {formatText(job.description || '').map(
                        (line, lineIndex) => (
                          <li key={lineIndex}>{line}</li>
                        ),
                      )}
                    </ul>
                  </div>
                ))}
            </section>
          )}

        {ensureArray(Projects).length > 0 &&
  ensureArray(Projects).some(isArrayItemMeaningful) && (
    <section className="mb-5">
      <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
        Projects
      </h3>
      {ensureArray(Projects)
        .filter(isArrayItemMeaningful)
        .map((project, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between font-semibold text-sm">
              <span>
                {project.projectName || '[Project Name]'}
                {project.projectLink && (
                  <span className="ml-2 text-xs font-normal">
                    ({project.projectLink})
                  </span>
                )}
              </span>
              <span className="text-gray-600">
                {project.startDate} - {project.endDate || 'Current'}
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-1">
              {project.organization}
            </div>
            
            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
              {/* Split the string by line breaks, filter out empty lines, and map to <li> */}
              {project.description 
                && project.description // Ensure description exists before splitting
                .split(/\r?\n/) // Split by line break
                .filter(line => line.trim() !== '') // Remove empty lines
                .map((line, lineIndex) => (
                  <li key={lineIndex} className="list-item-style">
                    
                    {line.trim()}
                  </li>
                ))}
            </ul>
            
          </div>
        ))}
    </section>
  )}

        {ensureArray(Education).length > 0 &&
          ensureArray(Education).some(isArrayItemMeaningful) && (
            <section className="mb-5">
              <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
                Education
              </h3>
              {ensureArray(Education)
                .filter(isArrayItemMeaningful)
                .map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between font-semibold text-sm">
                      <span>{edu.institution || '[Institution]'}</span>
                      <span className="text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700">
                      {edu.degree} in {edu.fieldOfStudy}{' '}
                      {edu.gpa && `(GPA: ${edu.gpa})`}
                    </div>
                    <div className="text-xs text-gray-600">
                      {edu.city && edu.country
                        ? `${edu.city}, ${edu.country}`
                        : edu.city || edu.country}
                    </div>
                  </div>
                ))}
            </section>
          )}

        {ensureArray(Certificates).length > 0 &&
          ensureArray(Certificates).some(isArrayItemMeaningful) && (
            <section>
              <h3 className="text-lg font-semibold border-b border-gray-700 mb-2">
                Certificates
              </h3>
              {ensureArray(Certificates)
                .filter(isArrayItemMeaningful)
                .map((cert, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between font-semibold text-sm">
                      <span>{cert.name || '[Certificate Name]'}</span>
                      <span className="text-gray-600">
                        Issued: {cert.issueDate}{' '}
                        {cert.expirationDate &&
                          `(Expires: ${cert.expirationDate})`}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {cert.issuingOrg}
                      {cert.credentialID && ` | ID: ${cert.credentialID}`}
                      {cert.credentialURL && (
                        <span className="ml-2">
                          URL: {cert.credentialURL}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </section>
          )}
      </div>

      {/* AI / Hiring Manager 的反馈区域（不导出到 PDF/Word） */}
      {(hmFeedbackMain || hmFeedbackSummary) && (
        <div className="hidden lg:block mt-4 p-4 rounded text-justify bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">
            AI Hiring Manager Feedback
          </h3>

          {hmFeedbackMain && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Overall Feedback:
              </p>
              <p className="text-sm font-thin text-gray-700">
                {formatText(hmFeedbackMain)}
              </p>
            </div>
          )}

          {hmFeedbackSummary && (
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Edit Suggestions &amp; History:
              </p>
              <p className="text-sm font-thin text-gray-700">
                {formatText(hmFeedbackSummary)}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default memo(ResumePreviewComponent);
