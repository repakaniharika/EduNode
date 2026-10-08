import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Mic, 
  FileText, 
  CheckSquare, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UPCOMING_SCHEDULE } from '../data/mockData';

export default function RightSidebar({ onOpenAskModal, onOpenConceptMap, onOpenMisconceptions }) {
  const [currentDate] = useState(new Date(2026, 9, 8)); // October 2026

  // Calendar days generation for October 2026
  const daysInMonth = 31;
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const startDayOffset = 4; // Thursday Oct 1st 2026

  const daysArray = [];
  for (let i = 0; i < startDayOffset; i++) {
    daysArray.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const today = 8; // Oct 8

  return (
    <div className="space-y-6">
      {/* 1. Mini Study Calendar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-extrabold text-slate-800">
            October 2026
          </h4>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((d, index) => (
            <span key={index} className="text-[11px] font-bold text-slate-400">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysArray.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="h-7" />;
            }

            const isToday = day === today;
            const hasTask = day === 8 || day === 9 || day === 12;

            return (
              <div
                key={day}
                className={`h-7 rounded-xl flex items-center justify-center text-xs font-semibold relative transition-all ${
                  isToday
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30'
                    : hasTask
                    ? 'hover:bg-slate-100 text-slate-800 font-bold'
                    : 'hover:bg-slate-50 text-slate-600'
                }`}
              >
                {day}
                {hasTask && !isToday && (
                  <span className="w-1 h-1 rounded-full bg-emerald-500 absolute bottom-1"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Upcoming Classes & AI Drills (Matches reference) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">Upcoming Practice</h4>
            <span className="text-[11px] text-slate-400">Personalized by EduNode</span>
          </div>
          <button 
            onClick={onOpenMisconceptions}
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {UPCOMING_SCHEDULE.map((item) => (
            <div
              key={item.id}
              onClick={onOpenAskModal}
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider ${item.badgeColor}`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Quick Links (Matches 4 square buttons in reference) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <h4 className="text-sm font-extrabold text-slate-800 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Action 1: Ask Voice Doubt */}
          <button
            onClick={onOpenAskModal}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 text-emerald-700 flex items-center justify-center mb-1.5 transition-colors">
              <Mic className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-800">Voice Doubt</span>
            <span className="text-[9px] text-slate-400">Ask in 5 languages</span>
          </button>

          {/* Action 2: Concept Map */}
          <button
            onClick={onOpenConceptMap}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 text-indigo-700 flex items-center justify-center mb-1.5 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-800">Concept Map</span>
            <span className="text-[9px] text-slate-400">Knowledge Graph</span>
          </button>

          {/* Action 3: Misconception Radar */}
          <button
            onClick={onOpenMisconceptions}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-100 group-hover:bg-amber-200 text-amber-700 flex items-center justify-center mb-1.5 transition-colors">
              <CheckSquare className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-amber-800">Misconceptions</span>
            <span className="text-[9px] text-slate-400">Adaptive Radar</span>
          </button>

          {/* Action 4: NCERT Solutions */}
          <button
            onClick={onOpenAskModal}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 flex flex-col items-center justify-center text-center transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-100 group-hover:bg-blue-200 text-blue-700 flex items-center justify-center mb-1.5 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-800">NCERT Book</span>
            <span className="text-[9px] text-slate-400">Curriculum RAG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
