import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  GraduationCap, 
  ChevronDown, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CURRICULUM_BOARDS, CLASSES, LANGUAGES } from '../data/mockData';

export default function TopHeader({ 
  student, 
  selectedBoard, 
  setSelectedBoard, 
  selectedClass, 
  setSelectedClass, 
  selectedLang, 
  setSelectedLang,
  onOpenAskModal 
}) {
  const [showBoardMenu, setShowBoardMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showClassMenu, setShowClassMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentBoardObj = CURRICULUM_BOARDS.find(b => b.id === selectedBoard) || CURRICULUM_BOARDS[0];
  const currentLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  const notifications = [
    { id: 1, title: 'Misconception drill ready', desc: 'Math: Quadratic Formula signs (-b)', unread: true, time: '10m ago' },
    { id: 2, title: 'Concept Map updated', desc: 'Science: Life Processes links added', unread: true, time: '1h ago' },
    { id: 3, title: 'Streak milestone reached!', desc: '5 days in a row! Keep learning 🌱', unread: false, time: '1d ago' },
  ];

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search NCERT chapters, concepts, or ask doubt..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onOpenAskModal();
              }
            }}
          />
        </div>
      </div>

      {/* Selectors and User profile on the right */}
      <div className="flex items-center gap-3">
        {/* Board Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBoardMenu(!showBoardMenu);
              setShowLangMenu(false);
              setShowClassMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{currentBoardObj.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showBoardMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                Select Curriculum
              </div>
              {CURRICULUM_BOARDS.map((board) => (
                <button
                  key={board.id}
                  onClick={() => {
                    setSelectedBoard(board.id);
                    setShowBoardMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                    selectedBoard === board.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{board.name}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{board.full}</div>
                  </div>
                  {selectedBoard === board.id && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Class / Standard Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowClassMenu(!showClassMenu);
              setShowBoardMenu(false);
              setShowLangMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>{selectedClass}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showClassMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 p-1.5 z-50">
              {CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setShowClassMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-colors ${
                    selectedClass === cls ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{cls}</span>
                  {selectedClass === cls && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Multilingual Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowBoardMenu(false);
              setShowClassMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>{currentLangObj.native}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Language / மொழி / భాష
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                    selectedLang === lang.code ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{lang.native}</div>
                    <div className="text-[10px] text-slate-400">{lang.name}</div>
                  </div>
                  {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowBoardMenu(false);
              setShowLangMenu(false);
              setShowClassMenu(false);
            }}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center relative transition-colors"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <span className="text-[10px] text-emerald-600 font-semibold">2 New</span>
              </div>
              <div className="divide-y divide-slate-100 mt-1">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        {/* Student Avatar & Identity */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5 shadow-sm">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-full h-full rounded-2xl bg-white object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              {student.name}
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            </div>
            <div className="text-xs text-slate-400 font-medium">{selectedClass} • Student</div>
          </div>
        </div>
      </div>
    </header>
  );
}
