import React, { useState, useEffect } from 'react';
import { User, Briefcase, Code, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { profileService } from '../../service/profile';

export default function Profile() {
  const [fullName, setFullName] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [skills, setSkills] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  // 1. Fetch profile from database on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        if (data) {
          setFullName(data.fullName || '');
          setCurrentRole(data.currentRole || '');
          setSkills(data.skills || '');
        }
      } catch (err) {
        console.error("No existing profile found or failed to load. Ready for setup.");
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Save profile handler
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await profileService.saveProfile({
        fullName,
        currentRole,
        skills
      });
      setStatus({ 
        type: 'success', 
        message: 'Your professional profile has been securely saved to your PostgreSQL workspace!' 
      });
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to sync your profile. Please check your backend connection.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
        <p className="text-sm font-medium text-brand-text-muted">Loading your workspace profile...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-start animate-fade-in">
      
      {/* LEFT COLUMN: Profile Form */}
      <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-brand-border shadow-2xl shadow-emerald-950/[0.02]">
        <div className="space-y-1 mb-8">
          <h2 className="text-2xl font-black text-brand-text-dark tracking-tight">Professional Profile</h2>
          <p className="text-sm text-brand-text-muted">Configure your background details to align the Gemini tailoring pipeline.</p>
        </div>

        {/* Success/Error Alerts */}
        {status.message && (
          <div className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 text-xs font-medium animate-fade-in ${
            status.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
              : 'bg-rose-50 border-rose-100 text-rose-800'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-dark/70 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Mujtaba Hassan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-brand-light border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm text-brand-text-dark placeholder:text-slate-400 shadow-xs"
              />
            </div>
          </div>

          {/* Current/Target Role Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-dark/70 uppercase tracking-wider">Current or Target Role</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Full Stack Java Developer"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 bg-brand-light border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm text-brand-text-dark placeholder:text-slate-400 shadow-xs"
              />
            </div>
          </div>

          {/* Skills Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-dark/70 uppercase tracking-wider">Technical Skills</label>
            <div className="relative">
              <Code className="absolute left-4 top-5 w-5 h-5 text-slate-400" />
              <textarea
                placeholder="List your core technologies separated by commas (e.g., Java, Spring Boot, Hibernate, React, PostgreSQL)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
                rows="4"
                className="w-full pl-12 pr-4 py-4 bg-brand-light border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm text-brand-text-dark placeholder:text-slate-400 leading-relaxed shadow-xs"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full md:w-auto px-8 py-3.5 bg-linear-to-r from-[#064e3b] to-[#0f766e] hover:from-[#022c22] hover:to-[#115e59] disabled:opacity-50 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-950/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{loading ? "Saving Workspace..." : "Save Profile Details"}</span>
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Interactive Card Live Preview */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
        <h3 className="text-xs font-bold text-brand-text-dark/50 uppercase tracking-widest pl-2">Live Recruiter Card Preview</h3>
        
        {/* Dynamic Glassmorphic Card */}
        <div className="relative overflow-hidden bg-linear-to-br from-[#064e3b] via-[#022c22] to-[#115e59] p-6 md:p-8 rounded-3xl border border-[#ffffff]/10 text-white shadow-2xl shadow-emerald-950/20">
          {/* Subtle design details */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

          <div className="relative z-10 space-y-6">
            {/* Card Header Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-400/15 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/20">
                Active Applicant Node
              </span>
              <span className="text-[10px] font-semibold text-emerald-300">Verified Secure</span>
            </div>

            {/* Profile Avatar and Title */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-lg font-black tracking-wider border border-white/20 text-amber-300 shadow-inner">
                {fullName ? fullName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'UI'}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold tracking-tight text-white line-clamp-1">
                  {fullName || "Your Full Name"}
                </h4>
                <p className="text-xs font-medium text-emerald-200/80 line-clamp-1">
                  {currentRole || "Your Target/Current Role"}
                </p>
              </div>
            </div>

            {/* Skills Tags Grid */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">Matched Vector Database Keywords:</span>
              <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                {skills ? (
                  skills.split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0)
                    .map((skill, index) => (
                      <span key={index} className="text-[10px] font-medium bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 text-emerald-50">
                        {skill}
                      </span>
                    ))
                ) : (
                  <p className="text-xs text-emerald-200/40 italic">Type your technical stack above to watch dynamic tag mapping...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}