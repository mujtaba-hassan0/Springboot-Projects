import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight, Shield, Database, Cpu, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../service/authservice'; // <-- Import our new service

export default function AuthGateway({ onLoginSuccess }) { // <-- Accept success callback
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // 1. Run Registration flow
        await authService.register(username, password, fullName);
        // On registration success, auto-switch to sign-in or auto-login.
        // Let's sign them in directly right after:
        const data = await authService.login(username, password);
        onLoginSuccess(data.username, data.token);
      } else {
        // 2. Run Sign-In flow
        const data = await authService.login(username, password);
        onLoginSuccess(data.username, data.token);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "Authentication failed. Please verify your connection or credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 flex items-center justify-center p-4 md:p-8 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Soft natural ambient glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Panel */}
      <div className="relative w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl border border-brand-border shadow-2xl shadow-emerald-950/5 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        
        {/* Left Section: Deep Pine Forest & Clean Gold Accents */}
        <div className="md:col-span-5 bg-linear-to-br from-[#064e3b] via-[#022c22] to-[#115e59] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs border border-white/10">
              <Sparkles className="w-6 h-6 text-amber-300 fill-amber-300/10 animate-pulse" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-emerald-100">
              TailorAI
            </span>
          </div>

          <div className="relative z-10 my-8 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Refined, accurate, professional.
            </h2>
            <p className="text-emerald-100/70 text-sm leading-relaxed">
              Align your engineering profile beautifully with any technical target using precision artificial intelligence.
            </p>

            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                  <Cpu className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-sm font-medium text-emerald-50/90">Gemini 2.5 Flash Pipeline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                  <Database className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-sm font-medium text-emerald-50/90">PostgreSQL Transaction History</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/5 p-1.5 rounded-lg border border-white/10">
                  <Shield className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-sm font-medium text-emerald-50/90">Cryptographic JWT Security</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/60">
            <span>Spring Boot & React 18</span>
            <span className="bg-amber-400/10 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold border border-amber-400/20">v1.0.0</span>
          </div>
        </div>

        {/* Right Section: Form Fields */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white/40">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-brand-text-dark">
                {isSignUp ? "Register workspace" : "Welcome back"}
              </h3>
              <p className="text-sm text-brand-text-muted">
                {isSignUp ? "Configure your credentials to get started" : "Sign in to unlock tailored profile generations"}
              </p>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs py-3 px-4 rounded-xl font-medium animate-pulse">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-text-dark/70 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. Mujtaba Hassan" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm placeholder:text-slate-400 text-brand-text-dark shadow-xs"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-text-dark/70 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Enter your username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm placeholder:text-slate-400 text-brand-text-dark shadow-xs"
                  />
                </div>
              </div>

            <div className="space-y-1.5">
  <div className="flex items-center justify-between">
    <label className="text-xs font-semibold text-brand-text-dark/70 uppercase tracking-wider">Password</label>
    {!isSignUp && (
      <a href="#" className="text-xs font-medium text-brand-primary hover:text-brand-primary-hover hover:underline">Forgot?</a>
    )}
  </div>
  <div className="relative">
    {/* Lock icon on the left */}
    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
    
    <input 
      type={showPassword ? "text" : "password"} // <-- Dynamically swaps the type!
      placeholder="••••••••" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      // Note the changed padding right 'pr-12' so long text doesn't overlap the eye icon
      className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-2xl focus:border-brand-primary focus:ring-2 focus:ring-emerald-100 transition-all outline-hidden text-sm placeholder:text-slate-400 text-brand-text-dark shadow-xs"
    />

    {/* Dynamic Eye Toggle Button on the right */}
    <button
      type="button" // Must be type="button" so it doesn't accidentally submit the form!
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors p-1 rounded-lg hover:bg-slate-50 cursor-pointer"
    >
      {showPassword ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
    </button>
  </div>
</div>
              <button 
                type="submit" 
                disabled={loading}
                className="group relative w-full bg-linear-to-r from-[#064e3b] to-[#0f766e] hover:from-[#022c22] hover:to-[#115e59] disabled:opacity-50 text-white font-medium py-3 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{loading ? "Authenticating..." : isSignUp ? "Register Account" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-brand-text-muted">
                {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{' '}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-semibold text-brand-primary hover:text-brand-primary-hover hover:underline focus:outline-hidden cursor-pointer"
                >
                  {isSignUp ? "Sign In" : "Create one"}
                </button>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}