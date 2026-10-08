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
  Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenAskModal, onOpenConceptMap, onOpenMisconceptions }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'ask', label: 'Ask EduNode', icon: Bot, badge: 'AI', isSpecial: true },
    { id: 'misconceptions', label: 'Misconception Radar', icon: BrainCircuit, badge: 'Adaptive' },
    { id: 'concept-map', label: 'Concept Map', icon: Network },
    { id: 'assignments', label: 'Assignments', icon: ClipboardCheck },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
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
    <aside className="w-64 bg-[#1e2749] text-white flex flex-col shrink-0 min-h-screen select-none transition-all duration-200">
      {/* Brand Header */}
      <div className="p-6 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
            🌱
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-outfit">
              EduNode
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                AI
              </span>
            </h1>
            <p className="text-xs text-slate-300 font-medium">Learn • Understand • Grow</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group text-left ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${
                  item.badge === 'AI' 
                    ? 'bg-emerald-400 text-emerald-950 shadow-sm animate-pulse' 
                    : 'bg-white/15 text-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Cute Motivational Box at Bottom (Inspired by Reference) */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-emerald-900/60 to-slate-900/80 border border-emerald-500/30 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-sm">
            🌱
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-200 flex items-center gap-1">
              Small steps make big progress!
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              5-day streak active. EduNode has adapted 3 topics for you today.
            </p>
          </div>
        </div>
        <button 
          onClick={onOpenAskModal}
          className="mt-3 w-full py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Ask Doubts to EduNode
        </button>
      </div>
    </aside>
  );
}
