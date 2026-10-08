import React from 'react';
import { ArrowRight, Bot, Flame, Sparkles, Award, CheckCircle2, BookOpen } from 'lucide-react';

export default function WelcomeBanner({ student, onOpenAskModal, onContinueLearning }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      {/* Main Greeting Banner (Takes 8 cols) */}
      <div className="lg:col-span-8 bg-gradient-to-r from-[#eef4ff] via-[#f3f9f7] to-[#e8fbf3] rounded-3xl p-7 border border-emerald-100/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-36 h-36 bg-blue-200/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Adaptive Tutor Active • NCERT Class 10
          </div>

          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight font-outfit">
            Good Morning, {student.name}! ☀️
          </h2>

          <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">
            Keep going! Your hard work today builds a brighter future tomorrow. EduNode detected 
            <span className="text-emerald-700 font-bold mx-1 underline decoration-emerald-300">1 sign misconception in Math</span> 
            and adapted your practice drill!
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={onContinueLearning}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:gap-3"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenAskModal}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 border border-slate-200/80 shadow-sm transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Ask EduNode AI</span>
            </button>
          </div>
        </div>

        {/* Cute Mascot & Motto on Right */}
        <div className="hidden sm:flex absolute right-6 bottom-4 flex-col items-center pointer-events-none select-none">
          <div className="text-6xl filter drop-shadow-md transform hover:rotate-6 transition-transform">
            🌱
          </div>
          <div className="mt-2 text-center">
            <span className="text-[11px] font-bold text-slate-700 font-handwriting block">
              Learn Anytime, Anywhere
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">
              Gemma-powered ✨
            </span>
          </div>
        </div>
      </div>

      {/* Top 3 Quick Stats Cards (Takes 4 cols, like reference image) */}
      <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3.5">
        {/* Stat 1: Subjects */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Enrolled Subjects</div>
              <div className="text-lg font-extrabold text-slate-800">5</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-blue-600 hidden sm:inline">Active</span>
        </div>

        {/* Stat 2: Misconceptions Cleared */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Cleared Doubts</div>
              <div className="text-lg font-extrabold text-slate-800">14</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 hidden sm:inline">+2 this week</span>
        </div>

        {/* Stat 3: Streak / Mastery */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Daily Streak</div>
              <div className="text-lg font-extrabold text-slate-800">5 Days</div>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-amber-600 hidden sm:inline">🔥 Superb</span>
        </div>
      </div>
    </div>
  );
}
