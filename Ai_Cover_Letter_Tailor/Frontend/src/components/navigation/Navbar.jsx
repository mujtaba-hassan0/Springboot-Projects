import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // <-- React Router Hooks
import { Sparkles, FileText, User, History, LogOut, Menu, X } from 'lucide-react';

export default function Navbar({ userName = "Mujtaba Hassan", onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Links configuration mapped directly to real browser routes
  const navItems = [
    { path: '/dashboard', label: 'Tailor AI', icon: FileText },
    { path: '/profile', label: 'My Profile', icon: User },
    { path: '/history', label: 'Generation History', icon: History },
  ];

  // Helper to extract user initials for avatar badge
  const getInitials = (name) => {
    if (!name) return 'UI';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo & Click to return Home */}
          <div 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#064e3b]/10 p-2 rounded-xl border border-[#064e3b]/5 transition-colors group-hover:bg-[#064e3b]/15">
              <Sparkles className="w-5 h-5 text-brand-primary fill-brand-primary/10" />
            </div>
            <span className="font-extrabold text-lg text-brand-text-dark tracking-tight">
              TailorAI
            </span>
          </div>

          {/* Center: Desktop Route Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Check if the current browser URL matches this navigation item's path
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)} // <-- Changes URL Route cleanly
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#064e3b]/5 text-brand-primary border-b-2 border-brand-accent rounded-b-none'
                      : 'text-brand-text-muted hover:text-brand-primary hover:bg-[#f4fcf7]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-accent' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right: User Session Details & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2.5 pl-4 border-l border-brand-border">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#064e3b] to-[#0f766e] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {getInitials(userName)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-brand-text-dark leading-tight">{userName}</span>
                <span className="text-[10px] font-medium text-brand-text-muted">Pro Developer</span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-text-muted hover:text-brand-primary hover:bg-brand-light transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown View Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-1 bg-white border-b border-brand-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#064e3b]/5 text-brand-primary border-l-4 border-brand-accent'
                    : 'text-brand-text-muted hover:text-brand-primary hover:bg-brand-light'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-brand-border px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-bold">
                {getInitials(userName)}
              </div>
              <span className="text-sm font-bold text-brand-text-dark">{userName}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}