import React, { useState } from 'react';
import { ArrowUpRight, BrainCircuit, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function ProgressAndActivity({ 
  selectedLang, 
  onOpenAskModal, 
  onOpenMisconceptions, 
  onOpenConceptMap 
}) {
  const t = getTranslation(selectedLang);
  const activeM = t.activeMisconception;
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDrillSuccess, setIsDrillSuccess] = useState(false);

  const handleOptionClick = (opt) => {
    setSelectedAnswer(opt);
    if (opt === activeM.correct) {
      setIsDrillSuccess(true);
    } else {
      setIsDrillSuccess(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
      {/* 1. Misconception Radar Panel (7 cols on lg) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  {t.misconceptionRadarTitle}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {t.needsDrill}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.misconceptionRadarSubtitle}
              </p>
            </div>

            <button
              onClick={onOpenMisconceptions}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <span>{t.practiceNow}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Active Misconception Card */}
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500">
                {activeM.subject} • {t.activeDrillTitle}
              </span>
              <span className="text-[10px] text-slate-400">{t.caughtToday}</span>
            </div>

            <h4 className="text-xs font-bold text-slate-900">
              {activeM.concept}
            </h4>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              {activeM.description}
            </p>

            {/* Quick Interactive Drill */}
            <div className="mt-3 pt-3 border-t border-slate-200/70">
              <div className="text-[11px] font-semibold text-slate-700 mb-2">
                🎯 {activeM.question}
              </div>

              <div className="flex flex-wrap gap-2">
                {activeM.options.map((opt) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === activeM.correct;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <div className={`mt-2.5 p-2 rounded-lg text-[11px] font-medium flex items-center gap-1.5 ${
                  isDrillSuccess ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                  {isDrillSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                  <span>{isDrillSuccess ? t.drillSuccess : t.drillFailed}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cleared Misconceptions preview */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">14 {t.clearedLabel}</span>
          <button
            onClick={onOpenMisconceptions}
            className="text-slate-700 font-medium hover:underline"
          >
            {t.clearedMisconceptionsTitle}
          </button>
        </div>
      </div>

      {/* 2. Recent Learning Trail Panel (5 cols on lg) */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/70 shadow-sm flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {t.recentActivityTitle}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {t.recentActivitySubtitle}
              </p>
            </div>

            <button
              onClick={() => onOpenAskModal()}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors"
            >
              <span>{t.askButton}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Activity items list */}
          <div className="space-y-2 mt-3">
            {t.activities.map((act, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (act.tag === 'AI Tutor') onOpenAskModal();
                  else if (act.tag === 'Knowledge Graph') onOpenConceptMap();
                  else onOpenMisconceptions();
                }}
                className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {act.title}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2 shrink-0">{act.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Concept Map Link */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Curriculum RAG Grounding</span>
          <button
            onClick={onOpenConceptMap}
            className="text-xs font-medium text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            <span>{t.conceptMap}</span>
            <Sparkles className="w-3 h-3 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
