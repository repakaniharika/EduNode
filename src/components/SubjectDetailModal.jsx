import React from 'react';
import { X, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function SubjectDetailModal({ 
  subject, 
  isOpen, 
  onClose, 
  selectedLang, 
  onAskDoubt 
}) {
  if (!isOpen || !subject) return null;
  const t = getTranslation(selectedLang);

  const sampleChapters = [
    { num: 1, title: `${t.chapter} 1: Foundations & Core Concepts`, status: 'completed', score: '92%' },
    { num: 2, title: `${t.chapter} 2: Structural Theorems & Analysis`, status: 'completed', score: '88%' },
    { num: 3, title: `${t.chapter} 3: Equations & Representations`, status: 'completed', score: '84%' },
    { num: 4, title: `${subject.activeChapter} (${subject.chapterNumber})`, status: 'in_progress', score: '72%', isCurrent: true },
    { num: 5, title: `${t.chapter} 5: Advanced Applications`, status: 'upcoming', score: '-' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl h-[520px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Minimal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{subject.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-outfit">{subject.name}</h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                  {subject.progress}% {t.mastery}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {subject.completedChapters} / {subject.totalChapters} {t.chapter}s
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
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-slate-50">
          
          {/* Active Chapter Spotlight */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
              {t.currentFocusChapter}
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              {subject.activeChapter} ({subject.chapterNumber})
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.activeTopic}: {subject.recentTopic}
            </p>

            {subject.misconceptionNote && (
              <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                <strong>EduNode AI:</strong> {subject.misconceptionNote}
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                onAskDoubt(subject.activeChapter);
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.askDoubtChapter}</span>
            </button>
          </div>

          {/* Chapters List */}
          <div>
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              {t.syllabusChapters}
            </h5>

            <div className="space-y-1.5">
              {sampleChapters.map((ch) => (
                <div
                  key={ch.num}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    ch.isCurrent 
                      ? 'bg-white border-slate-900 font-semibold text-slate-900'
                      : 'bg-white border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {ch.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span>{ch.title}</span>
                  </div>
                  <span className="text-slate-400 font-outfit text-[11px]">{ch.score}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
