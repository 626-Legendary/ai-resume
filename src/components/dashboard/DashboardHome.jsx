import React, { useCallback } from 'react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ClipboardList, Sparkles, Repeat, CheckCircle2 } from 'lucide-react';
import AILongProcessSimulator from './AILongProcessSimulator';
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const handleScrollToHowItWorks = useCallback(() => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  const navigate = useNavigate()

  const handleGetStarted = useCallback(() => {
    navigate('/dashboard/enhance');
  }, []);

  return (
    <div className="w-full h-full overflow-auto bg-neutral-50">
      <div className="max-w-6xl mx-auto py-8 px-4 lg:px-8 space-y-10">
        {/* Hero */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div className="space-y-4">
            <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px]">
              AI-Powered Resume Optimization
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Turn your resume into a <span className="text-emerald-600">job-specific upgrade</span>.
            </h1>

            <p className="text-slate-600 text-sm lg:text-base max-w-xl">
              Upload your resume, paste a job description, and let our AI Hiring Manager simulate how a recruiter reviews your profile.
              You&apos;ll get an optimized resume plus clear edit suggestions tailored to that role.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleGetStarted} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Start optimizing now
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={handleScrollToHowItWorks}
                className="gap-2 border-slate-300"
              >
                <ClipboardList className="w-4 h-4" />
                See how it works
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                PDF resumes only
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Job-description specific optimization
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                AI Hiring Manager style feedback
              </div>
            </div>
          </div>

          {/* Right side: small AI simulator preview */}
          <Card className="border-emerald-100 shadow-sm bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                What the AI is doing
              </CardTitle>
              <CardDescription className="text-xs">
                We simulate how a hiring manager would read your resume for this specific role, then rewrite key sections to match.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
                <div className="font-medium  text-slate-800">AI Review Simulation</div>
                <p>
                  Parsing your resume, matching it to the job description,
                  and generating concrete edit suggestions.
                </p>
              </div>

            </CardContent>
          </Card>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">How to use this tool</h2>
            <p className="text-sm text-slate-600">
              The workflow is intentionally simple. Follow these three steps every time you want to tailor your resume for a new role.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">
                    Step 1
                  </Badge>
                  <FileText className="w-4 h-4 text-slate-500" />
                </div>
                <CardTitle className="mt-1 text-sm">Upload your resume (PDF)</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-1">
                <p>
                  Go to the <span className="font-semibold">Resume Enhance</span> page and upload your current resume as a PDF file.
                </p>
                <p>We parse your content into structured blocks: contact info, summary, experience, projects, skills, and more.</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">
                    Step 2
                  </Badge>
                  <ClipboardList className="w-4 h-4 text-slate-500" />
                </div>
                <CardTitle className="mt-1 text-sm">Paste the job description</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-1">
                <p>
                  Paste the full job description into the text box. The more detailed it is, the better the alignment we can create.
                </p>
                <p>
                  Our model identifies key skills, keywords, and responsibilities that real hiring managers care about for this role.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">
                    Step 3
                  </Badge>
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <CardTitle className="mt-1 text-sm">Review AI results & iterate</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-1">
                <p>
                  After processing, you&apos;ll see an optimized resume preview plus an{' '}
                  <span className="font-semibold">AI Hiring Manager Feedback</span> panel.
                </p>
                <p>
                  Use the edit suggestions and change history to understand exactly what was improved and why. Download as PDF or
                  Word, or re-upload to try another role.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips / Best Practices */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900">Best practices</h2>
            <p className="text-sm text-slate-600">
              A few simple habits will make your AI-assisted resume much stronger.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Repeat className="w-4 h-4 text-sky-500" />
                  One job → one optimized resume
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-1">
                <p>
                  Don&apos;t reuse the same version for every application. Upload the same base resume but paste a new job description
                  for each role.
                </p>
                <p>
                  The summary panel will show which sections were changed (work experience, projects, skills, etc.) and why those
                  edits matter.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Keep human judgment in the loop
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-slate-600 space-y-1">
                <p>
                  Treat the AI as a smart assistant, not an autopilot. Read the suggestions, keep what feels authentic, and adjust
                  wording to match your voice.
                </p>
                <p>
                  You&apos;re always in control of the final content — we simply make it easier to get from &quot;generic&quot; to
                  &quot;job-ready&quot;.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardHome;
