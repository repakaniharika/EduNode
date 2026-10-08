import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function MisconceptionsModal({ 
  isOpen, 
  onClose, 
  selectedLang, 
  onOpenAskModal 
}) {
  const t = getTranslation(selectedLang);
  const activeM = t.activeMisconception;

  const [drillAnswer, setDrillAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleDrillOption = (val) => {
    setDrillAnswer(val);
    if (val === activeM.correct) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[560px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Minimal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
              🧠
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-outfit">
                  {t.misconceptionRadarTitle}
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                  14 {t.resolved} • 1 {t.needsDrill}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {t.misconceptionRadarSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50">
          {/* Active Drill Card */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">
                {activeM.subject} • {t.activeDrillTitle}
              </span>
              <span className="text-[10px] text-slate-400">{t.caughtToday}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">
              {activeM.concept}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {activeM.description}
            </p>

            {/* Drill options */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 mb-2">
                🎯 {activeM.question}
              </div>

              <div className="flex flex-wrap gap-2">
                {activeM.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleDrillOption(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      drillAnswer === opt
                        ? opt === activeM.correct
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {isCompleted && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t.drillSuccess}</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 shrink-0">+5 XP</span>
                </div>
              )}
            </div>
          </div>

          {/* Cleared Misconceptions list */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              {t.clearedMisconceptionsTitle}
            </h5>

            <div className="space-y-2">
              {t.clearedList.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-sm flex items-start justify-between"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{item.concept}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {item.subject}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">
            Learner profile continuously syncs with Gemma
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenAskModal();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{t.askTutor}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
