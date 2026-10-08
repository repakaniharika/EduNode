import React from 'react';
import { 
  Home, 
  BookOpen, 
  Bot, 
  BrainCircuit, 
  Network, 
  ClipboardCheck, 
  Calendar as CalendarIcon, 
  Settings,
  Sparkles,
  Flame
} from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  selectedLang, 
  onOpenAskModal, 
  onOpenConceptMap, 
  onOpenMisconceptions 
}) {
  const t = getTranslation(selectedLang);

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: Home },
    { id: 'subjects', label: t.subjects, icon: BookOpen },
    { id: 'ask', label: t.askTutor, icon: Bot, badge: t.aiBadge, isSpecial: true },
    { id: 'misconceptions', label: t.misconceptionRadar, icon: BrainCircuit, badge: t.adaptiveBadge },
    { id: 'concept-map', label: t.conceptMap, icon: Network },
    { id: 'assignments', label: t.assignments, icon: ClipboardCheck },
    { id: 'calendar', label: t.calendar, icon: CalendarIcon },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  const handleNavClick = (id) => {
    if (id === 'ask') {
      onOpenAskModal();
      return;
    }
    if (id === 'concept-map') {
      onOpenConceptMap();
      return;
    }
    if (id === 'misconceptions') {
      onOpenMisconceptions();
      return;
    }
    setActiveTab(id);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/70 flex flex-col shrink-0 min-h-screen select-none">
      {/* Brand Header */}
      <div className="p-6 pb-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-slate-900 font-outfit">
                EduNode
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                {t.aiBadge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Curriculum AI Tutor</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          {t.menu}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-colors text-left ${
                isActive 
                  ? 'bg-slate-900 text-white font-semibold shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : item.badge === t.aiBadge
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Minimal Footer Info */}
      <div className="p-4 m-3 rounded-2xl bg-slate-50 border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-slate-700">{t.streakLabel}</span>
          </div>
          <span className="text-xs font-extrabold text-slate-900">5 Days</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Gemma 2B + Curriculum RAG
        </p>
      </div>
    </aside>
  );
}
