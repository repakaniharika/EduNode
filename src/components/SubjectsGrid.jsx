import React from 'react';
import { ArrowUpRight, HelpCircle, BookOpen } from 'lucide-react';
import { SUBJECTS_DATA } from '../data/mockData';
import { getTranslation } from '../data/translations';

export default function SubjectsGrid({ selectedLang, onSubjectClick, onAskDoubtForSubject }) {
  const t = getTranslation(selectedLang);

  return (
    <div className="mb-6">
      {/* Clean Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {t.mySubjectsTitle}
          </h2>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {t.enrolledCount}
          </span>
        </div>

        <button 
          onClick={() => onSubjectClick(SUBJECTS_DATA[0])}
          className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
        >
          <span>{t.viewAllChapters}</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Minimalist Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SUBJECTS_DATA.map((subject) => {
          const localizedSubject = t.subjectsData?.[subject.id] || {
            name: subject.name,
            activeChapter: subject.activeChapter,
            chapterNumber: subject.chapterNumber,
            recentTopic: subject.recentTopic,
          };

          return (
            <div
              key={subject.id}
              onClick={() => onSubjectClick({ ...subject, ...localizedSubject })}
              className="bg-white rounded-xl p-4 border border-slate-200/70 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Icon & Mastery */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xl">{subject.icon}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900 font-outfit">
                      {subject.progress}%
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5">{t.mastery}</span>
                  </div>
                </div>

                {/* Subject Name & Active Chapter */}
                <h3 className="font-bold text-slate-800 text-xs group-hover:text-slate-950 transition-colors truncate">
                  {localizedSubject.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {localizedSubject.activeChapter}
                </p>
                <div className="text-[10px] text-slate-400 mt-1 font-medium">
                  {localizedSubject.chapterNumber} • {subject.completedChapters}/{subject.totalChapters} Ch
                </div>
              </div>

              {/* Minimal Progress Bar & Quick Action */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2.5 text-[10px]">
                  <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                    {t.clickToStudy}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAskDoubtForSubject({ ...subject, ...localizedSubject });
                    }}
                    title={t.askSubjectDoubt}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
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
