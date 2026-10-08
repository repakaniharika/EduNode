import React from 'react';
import { ArrowUpRight, HelpCircle, Sparkles } from 'lucide-react';
import { SUBJECTS_DATA } from '../data/mockData';

export default function SubjectsGrid({ onSubjectClick, onAskDoubtForSubject }) {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            My Subjects
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              5 Subjects Enrolled
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Personalized curriculum progress & real-time chapter mastery
          </p>
        </div>

        <button 
          onClick={() => onSubjectClick(SUBJECTS_DATA[0])}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          View All Chapters
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SUBJECTS_DATA.map((subject) => {
          return (
            <div
              key={subject.id}
              onClick={() => onSubjectClick(subject)}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm card-hover cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
                style={{ backgroundColor: subject.accentColor }}
              />

              <div>
                {/* Subject Icon & Tag */}
                <div className="flex items-start justify-between mb-3 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
                    {subject.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-800 font-outfit">
                      {subject.progress}%
                    </span>
                    <span className="text-[10px] block text-slate-400 font-medium">Mastery</span>
                  </div>
                </div>

                {/* Subject Name & Active Chapter */}
                <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                  {subject.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {subject.activeChapter}
                </p>
                <div className="text-[10px] text-slate-400 mt-1 font-semibold">
                  {subject.chapterNumber} • {subject.completedChapters}/{subject.totalChapters} Ch
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-3 border-t border-slate-100/80">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${subject.progress}%`,
                      backgroundColor: subject.accentColor
                    }}
                  />
                </div>

                {/* Action button inside card */}
                <div className="flex items-center justify-between mt-3 text-[11px]">
                  <span className="text-slate-400 font-medium group-hover:text-slate-600 transition-colors">
                    Click to study
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskDoubtForSubject(subject);
                    }}
                    title="Ask AI Doubt for this subject"
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
