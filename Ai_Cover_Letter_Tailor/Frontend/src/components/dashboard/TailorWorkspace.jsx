import React, { useState } from 'react';
import { Building2, Briefcase, FileText, Sparkles, Loader2, Copy, Check, Download } from 'lucide-react';
import { tailorService } from '../../service/tailorService';

export default function TailorWorkspace() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [rawJobDescription, setRawJobDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedLetter('');

    try {
      const data = await tailorService.generateLetter({
        companyName,
        jobTitle,
        rawJobDescription
      });
      // Assuming your backend response payload returns the text in a 'generatedText' property
      setGeneratedLetter(data.generatedText || data);
    } catch (err) {
      console.error(err);
      setGeneratedLetter("⚠️ Failed to communicate with Gemini. Ensure your Spring Boot backend is active and your Ollama/Gemini configurations match.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto animate-fade-in">
      
      {/* LEFT COLUMN: Input Control Panel */}
      <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-2xl shadow-emerald-950/[0.02]">
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-black text-brand-text-dark tracking-tight flex items-center gap-2">
            Target Target Parameters
          </h2>
          <p className="text-xs text-brand-text-muted">Provide target job posting constraints to contextualize the layout algorithm.</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-text-dark/70 uppercase tracking-wider">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Askari Bank"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-brand-light border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm text-brand-text-dark placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-text-dark/70 uppercase tracking-wider">Target Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Emerge Internship Trainee"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-brand-light border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm text-brand-text-dark placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-text-dark/70 uppercase tracking-wider">Raw Job Description</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4.5 w-4 h-4 text-slate-400" />
              <textarea
                placeholder="Paste the full job specification details here to enable alignment filtering..."
                value={rawJobDescription}
                onChange={(e) => setRawJobDescription(e.target.value)}
                required
                rows="6"
                className="w-full pl-11 pr-4 py-4 bg-brand-light border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm text-brand-text-dark placeholder:text-slate-400 leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-linear-to-r from-[#064e3b] to-[#0f766e] hover:from-[#022c22] hover:to-[#115e59] disabled:opacity-50 text-white font-semibold py-3.5 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-950/10 flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/20" />
            )}
            <span>{loading ? "Engaging Gemini Pipeline..." : "Generate Tailored Cover Letter"}</span>
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Premium Document Studio */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold text-brand-text-dark/50 uppercase tracking-widest">Output Workspace</h3>
          
          {generatedLetter && !loading && (
            <div className="flex items-center gap-2 animate-fade-in">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-border text-xs font-semibold text-brand-text-dark rounded-xl hover:bg-brand-light transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          )}
        </div>

        {/* The Document Sheet */}
        <div className="relative min-h-[480px] bg-white rounded-3xl border border-brand-border shadow-xl shadow-slate-200/40 p-8 md:p-12 overflow-hidden flex flex-col justify-between">
          {/* Decorative subtle sheet fold watermark */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-brand-light to-transparent opacity-40 pointer-events-none" />

          {loading ? (
            /* Premium Shimmer Loading State Blueprint */
            <div className="space-y-4 animate-pulse flex-1 justify-center flex flex-col">
              <div className="w-1/3 h-4 bg-slate-100 rounded-lg" />
              <div className="w-1/4 h-3 bg-slate-100 rounded-lg" />
              <div className="w-full h-24 bg-brand-light rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
                <p className="text-xs font-medium text-brand-text-muted flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-primary" />
                  Analyzing keywords and assembling alignment structure...
                </p>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-lg" />
              <div className="w-11/12 h-4 bg-slate-100 rounded-lg" />
              <div className="w-full h-4 bg-slate-100 rounded-lg" />
              <div className="w-10/12 h-4 bg-slate-100 rounded-lg" />
            </div>
          ) : generatedLetter ? (
            /* Render actual document response */
            <div className="flex-1 text-sm text-brand-text-dark leading-relaxed whitespace-pre-wrap font-sans select-text">
              {generatedLetter}
            </div>
          ) : (
            /* Clean Initial Empty Workspace Slate */
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-light border border-brand-border flex items-center justify-center text-brand-primary shadow-inner">
                <FileText className="w-5 h-5 text-brand-primary" />
              </div>
              <h4 className="font-bold text-sm text-brand-text-dark">Your document is empty</h4>
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Fill in the job parameter matrix on the left and trigger generation to output a context-aligned professional cover letter.
              </p>
            </div>
          )}

          {/* Bottom Document footer notation line */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-brand-text-muted/60 tracking-wider uppercase font-semibold">
            <span>TailorAI Core Generation Engine</span>
            <span>Document Page 1</span>
          </div>
        </div>
      </div>

    </div>
  );
}