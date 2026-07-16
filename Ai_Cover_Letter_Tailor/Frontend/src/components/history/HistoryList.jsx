import React, { useState, useEffect } from 'react';
import { Calendar, Building2, Briefcase, Eye, Copy, Check, Loader2, Inbox, X } from 'lucide-react';
import { tailorService } from '../../service/tailorService';

export default function HistoryList() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal State
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // 1. Fetch historical logs on component mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await tailorService.getHistory();
        // Assuming your backend returns an array of records
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to retrieve your generation history. Check if your Spring Boot backend is running.");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
        <p className="text-sm font-medium text-brand-text-muted">Retrieving your saved records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-brand-text-dark tracking-tight">Generation History</h2>
        <p className="text-sm text-brand-text-muted">Review, read, and copy previously aligned documents secure in your database.</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-100 text-rose-700 text-sm py-4 px-5 rounded-2xl font-medium">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        /* Empty History State */
        <div className="bg-white border border-brand-border rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-2xl shadow-emerald-950/[0.01]">
          <div className="w-14 h-14 rounded-2xl bg-brand-light border border-brand-border flex items-center justify-center text-brand-primary mx-auto shadow-inner">
            <Inbox className="w-6 h-6 text-brand-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base text-brand-text-dark">No records found</h4>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              Your tailored documents will assemble here once you run your first pipeline execution in the workspace.
            </p>
          </div>
        </div>
      ) : (
        /* Grid of Saved Generations */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((record) => (
            <div 
              key={record.id} 
              className="group bg-white p-6 rounded-2xl border border-brand-border hover:border-brand-primary/30 hover:shadow-lg hover:shadow-emerald-950/[0.02] transition-all duration-300 flex flex-col justify-between h-[220px]"
            >
              <div className="space-y-4">
                {/* Upper Metadata Block */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-muted font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(record.createdAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-brand-light text-brand-primary border border-brand-border px-2 py-0.5 rounded-md">
                    Aligned
                  </span>
                </div>

                {/* Main Identity Info */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-brand-text-dark text-base tracking-tight flex items-center gap-2 line-clamp-1">
                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                    {record.jobTitle}
                  </h3>
                  <p className="text-xs font-semibold text-brand-primary flex items-center gap-1.5 line-clamp-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {record.companyName}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedRecord(record)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#0f766e] hover:text-[#115e59] transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View Letter
                </button>

                <button
                  onClick={() => handleCopy(record.generatedText || record.documentContent, record.id)}
                  className="p-2 text-slate-400 hover:text-brand-primary hover:bg-brand-light rounded-xl transition-all cursor-pointer"
                  title="Copy Content"
                >
                  {copiedId === record.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILED READER MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setSelectedRecord(null)} 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
          />

          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-brand-border overflow-hidden animate-zoom-in max-h-[85vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-light">
              <div>
                <h3 className="font-black text-lg text-brand-text-dark tracking-tight leading-tight">
                  {selectedRecord.jobTitle}
                </h3>
                <p className="text-xs font-semibold text-brand-primary flex items-center gap-1 mt-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {selectedRecord.companyName}
                </p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-xl transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable Text Area */}
            <div className="p-8 md:p-10 overflow-y-auto flex-1 select-text whitespace-pre-wrap text-sm leading-relaxed text-brand-text-dark font-sans bg-white">
              {selectedRecord.generatedText || selectedRecord.documentContent}
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-brand-border bg-brand-light/50 flex items-center justify-between">
              <span className="text-[10px] text-brand-text-muted font-bold tracking-wider uppercase pl-2">
                Created: {new Date(selectedRecord.createdAt || Date.now()).toLocaleDateString()}
              </span>
              
              <button
                onClick={() => handleCopy(selectedRecord.generatedText || selectedRecord.documentContent, 'modal')}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary-hover transition-colors shadow-xs cursor-pointer"
              >
                {copiedId === 'modal' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-amber-300" />
                    <span>Copied Code!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Document</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}