import React from 'react';
import { X, CheckCircle2, Clock, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

export default function SubjectDetailModal({ subject, isOpen, onClose, onAskDoubt }) {
  if (!isOpen || !subject) return null;

  const sampleChapters = [
    { num: 1, title: 'Chapter 1: Foundations & Core Concepts', status: 'completed', score: '92%' },
    { num: 2, title: 'Chapter 2: Structural Theorems & Analysis', status: 'completed', score: '88%' },
    { num: 3, title: `Chapter 3: Equations & Representation`, status: 'completed', score: '84%' },
    { num: 4, title: `${subject.activeChapter} (${subject.chapterNumber})`, status: 'in_progress', score: '72%', isCurrent: true },
    { num: 5, title: 'Chapter 5: Arithmetic Progressions & Applications', status: 'upcoming', score: '-' },
    { num: 6, title: 'Chapter 6: Geometry & Triangle Similarity', status: 'upcoming', score: '-' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl h-[580px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1e2749] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-white/10">
              {subject.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-outfit">{subject.name}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {subject.progress}% Mastered
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Class 10 Syllabus • {subject.completedChapters} of {subject.totalChapters} Chapters Completed
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

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
          
          {/* Active Chapter Spotlight */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-blue-600 uppercase tracking-wider">Current Focus Chapter</span>
              <span className="font-semibold text-emerald-600">Active</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-800">
              {subject.activeChapter} ({subject.chapterNumber})
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Recent Topic: {subject.recentTopic}
            </p>

            {subject.misconceptionNote && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">EduNode Tutor Note:</strong> {subject.misconceptionNote}
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  onClose();
                  onAskDoubt(subject.activeChapter);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ask Doubt on this Chapter</span>
              </button>
            </div>
          </div>

          {/* Chapter Syllabus list */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              Curriculum Chapters
            </h5>

            <div className="space-y-2">
              {sampleChapters.map((ch) => (
                <div
                  key={ch.num}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    ch.isCurrent 
                      ? 'bg-blue-50/60 border-blue-200 font-semibold text-slate-800'
                      : 'bg-white border-slate-100 hover:border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ch.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : ch.status === 'in_progress' ? (
                      <Clock className="w-4 h-4 text-blue-500 shrink-0 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="text-xs font-semibold">{ch.title}</span>
                  </div>

                  <span className="text-xs font-bold text-slate-500 font-outfit">{ch.score}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
