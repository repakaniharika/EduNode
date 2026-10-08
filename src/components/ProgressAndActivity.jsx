import React from 'react';
import { ArrowUpRight, Sparkles, BrainCircuit, CheckCircle2, AlertCircle } from 'lucide-react';
import { RECENT_ACTIVITY_DATA, MISCONCEPTIONS_DATA } from '../data/mockData';

export default function ProgressAndActivity({ onOpenAskModal, onOpenMisconceptions, onOpenConceptMap }) {
  const activeMisconception = MISCONCEPTIONS_DATA.find(m => m.status === 'needs_drill') || MISCONCEPTIONS_DATA[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      {/* Learning Progress & Misconception Radar (7 Cols) */}
      <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
                Learning Progress
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Overall NCERT Class 10 Syllabus Mastery
              </p>
            </div>
            <button
              onClick={onOpenMisconceptions}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Misconception Radar
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
            {/* Donut Chart Simulation with SVG */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray="74, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-800 font-outfit">74%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Overall</span>
              </div>
            </div>

            {/* Legend Stats */}
            <div className="space-y-2 w-full text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-semibold text-slate-700">Concepts Mastered</span>
                </div>
                <span className="font-bold text-slate-800">24 Chapters</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="font-semibold text-slate-700">In Progress</span>
                </div>
                <span className="font-bold text-slate-800">8 Chapters</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="font-semibold text-amber-900">Needs Review</span>
                </div>
                <span className="font-bold text-amber-800">1 Misconception</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivating Encouragement box at bottom */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-800 font-medium">
            <span className="text-base">🏆</span>
            <span>You're doing great! Keep it up!</span>
          </div>

          <button
            onClick={onOpenMisconceptions}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Practice Misconception</span>
          </button>
        </div>
      </div>

      {/* Recent Activity / AI Journey (5 Cols) */}
      <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight">
                Recent Activity
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Your AI learning trail with EduNode & Gemma
              </p>
            </div>
            <button
              onClick={onOpenAskModal}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Ask AI
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_ACTIVITY_DATA.map((act) => (
              <div 
                key={act.id} 
                onClick={() => {
                  if (act.tag === 'AI Tutor') onOpenAskModal();
                  else if (act.tag === 'Misconception Cleared') onOpenMisconceptions();
                  else if (act.tag === 'Knowledge Graph') onOpenConceptMap();
                }}
                className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-700 flex items-center justify-center shrink-0 text-base transition-colors">
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                      {act.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">{act.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{act.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Knowledge Graph CTA */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Connected via EduNode Knowledge Graph</span>
          <button 
            onClick={onOpenConceptMap}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Open Concept Map</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
