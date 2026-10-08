import React, { useState } from 'react';
import { X, BrainCircuit, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { MISCONCEPTIONS_DATA } from '../data/mockData';

export default function MisconceptionsModal({ isOpen, onClose, onOpenAskModal }) {
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [drillAnswer, setDrillAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleDrillOption = (val) => {
    setDrillAnswer(val);
    if (val === '+6') {
      setIsCompleted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl h-[620px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1e2749] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xl">
              🧠
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-outfit">
                Misconception Radar
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                  14 Cleared • 1 Active
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                EduNode catches why you make mistakes and adapts your explanations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-5">
          
          {/* Active Misconception Card (Interactive Drill) */}
          <div className="bg-white rounded-3xl p-5 border-2 border-amber-400/60 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Active Focus Drill: Mathematics (Class 10)
              </span>
              <span className="text-xs text-slate-400 font-medium">Caught Today</span>
            </div>

            <h4 className="text-base font-extrabold text-slate-800">
              Sign Reversal with Negative Coefficients
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              In equations where $b$ is already negative (like $2x^2 - 6x + 3 = 0$), students often forget that $-b = -(-6) = +6$.
            </p>

            {/* Micro Drill */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-slate-700 mb-2">
                🎯 Quick Drill: For $2x^2 - 6x + 3 = 0$, what is the exact value of $-b$?
              </div>

              <div className="flex flex-wrap gap-2.5">
                {['-6', '+6', '-3'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleDrillOption(opt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      drillAnswer === opt
                        ? opt === '+6'
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                          : 'bg-rose-500 text-white border-rose-600'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {isCompleted && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Excellent!</strong> Since $b = -6$, $-b = -(-6) = +6$. Misconception marked as resolved!</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 shrink-0">+5 XP</span>
                </div>
              )}
            </div>
          </div>

          {/* Recently Cleared Misconceptions */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 px-1">
              Recently Cleared Misconceptions (14 Total)
            </h4>

            <div className="space-y-3">
              {MISCONCEPTIONS_DATA.filter(m => m.status === 'resolved').map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-start justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-sm">
                      ✓
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{m.concept}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-md bg-slate-100 text-slate-600 font-semibold">
                          {m.subject}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{m.description}</p>
                      <p className="text-[10px] text-emerald-700 font-medium mt-1">{m.aiAction}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{m.detectedDate}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Learner profile continuously syncs with Gemma RAG.
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenAskModal();
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice with EduNode</span>
          </button>
        </div>

      </div>
    </div>
  );
}
