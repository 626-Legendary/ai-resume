## Inspiration

As university students actively going through the internship and job-hunting process, we repeatedly faced the same problem: **most candidates get rejected before ever reaching the interview stage.**  
Not because they lack ability—but because their resumes fail to communicate their strengths in a professional, ATS-friendly format.

We experienced these challenges ourselves:
- Not knowing what a “professional resume” should actually look like  
- Difficulty aligning our content with job descriptions  
- Confusion about quantifying achievements  
- No access to expert guidance  
- Getting filtered out by ATS systems even before a human review  

We realized this is not an individual issue—**it’s a universal GAP for young job seekers**.  
In the AI era, we believe technology should help close this gap.  
That's why we built **FairStart**.

---

## What it does

FairStart is an **AI-powered resume optimization workspace** that guides users from start to finish:

1. **Upload or input resume + job description**  
2. **AI parses and reconstructs structured resume data**  
3. **Multi-agent workflow optimizes the content**  
4. **HR-style evaluation provides actionable feedback**  
5. **Users preview an ATS-friendly resume format**  
6. **Export to PDF, Word, or Markdown**

The result:  
A resume that is clearer, more tailored, more professional, and more likely to pass ATS filters.

---

## How we built it

We combined a modern frontend with a multi-agent AI backend:

### **Frontend**
- React + Vite + Tailwind + Shadcn UI  
- Dynamic, ATS-friendly ResumePreview component  
- Dual input modes: form mode + upload mode  
- Progress simulation for long AI tasks  
- JWT authentication and protected dashboards  

### **Backend**
- FastAPI + Python  
- LangGraph orchestrating 4 AI agents:  
  - Parser Agent  
  - Editor Agent  
  - HR Evaluator Agent  
  - Summary Agent  
- DeepSeek + Qwen models for reasoning and content generation  
- Structured Pydantic schemas for stable output  
- Dockerized for multi-platform deployment  

### **Deployment**
- Frontend: Vercel  
- Backend: AWS cloud instance  
- Self-hosted backup deployment: Raspberry Pi + DuckDNS  
- Reverse proxy & SSL via Caddy  
- Unified environment/variable configuration across platforms  

---

## Challenges we ran into

### 🔥 **1. Long AI workflow execution (up to 300 seconds)**  
Resulting in:
- Proxy timeouts  
- CORS errors  
- 504 Gateway Timeout  
We solved this through improved workflow efficiency and proxy configuration.

### 🔥 **2. Controlling AI output structure**  
LLMs tend to hallucinate or break formatting.  
We built strict prompt templates + agent-level self-correction loops.

### 🔥 **3. Rendering consistent ATS-friendly layouts**  
Pagination, spacing, line-height, and export formatting required careful tuning.

### 🔥 **4. Multi-environment deployment complexity**  
Synchronizing Vercel, AWS, and a Raspberry Pi server introduced CORS, DNS, and SSL challenges.

### 🔥 **5. Creating a smooth user experience during long-running tasks**  
We implemented:
- Fake progress bar  
- Stage-based loading messages  
- Skeleton screens  

---

## Accomplishments that we're proud of

- Built a **fully working AI resume optimization pipeline**  
- Implemented a **true end-to-end LangGraph multi-agent workflow**  
- Designed a **clean, professional, ATS-friendly resume preview UI**  
- Deployed **three working environments** (Vercel + AWS + Raspberry Pi)  
- Achieved **stable AI content output with minimal formatting errors**  
- Created a tool that genuinely helps job seekers overcome resume challenges  

Most importantly, we built something that **we ourselves wished we had when applying for jobs**.

---

## What we learned

- How to design reliable multi-agent AI workflows  
- How ATS actually parses and ranks resumes  
- How to handle CORS, HTTPS, DNS, and reverse proxy deployment  
- How to structure complex frontend UI for real users  
- How to manage long-running backend tasks in production environments  
- How collaboration, iteration, and debugging shape real engineering projects  

We learned that building an AI product is not just “calling an API”—  
it requires architecture, precision, and deep understanding of user needs.

---

## What's next for FairStart – AI Resume

We plan to continue developing FairStart into a comprehensive career toolkit:

### 🚀 Upcoming features
- Advanced resume scoring and benchmarking  
- Mock HR review simulation  
- Job-fit analysis reports  
- Portfolio builder  
- Job match engine  
- Simulated ATS parsing (how a resume is scored by real ATS systems)  
- Multi-language support (English, Chinese, more)  
- Theme-based resume templates  

### 🌟 Vision
FairStart aims to give every job seeker—especially students and early-career applicants—  
a **fair starting point**, where their resume reflects their true ability.

**Your experience shouldn’t depend on luck or insider knowledge.  
With AI, we can make resume building more fair, accessible, and empowering.**

