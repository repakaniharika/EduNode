import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Globe, 
  GraduationCap, 
  ChevronDown, 
  Check, 
  BookOpen
} from 'lucide-react';
import { CURRICULUM_BOARDS, CLASSES, LANGUAGES } from '../data/mockData';
import { getTranslation } from '../data/translations';

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

  const t = getTranslation(selectedLang);
  const currentBoardObj = CURRICULUM_BOARDS.find(b => b.id === selectedBoard) || CURRICULUM_BOARDS[0];
  const currentLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  const notifications = [
    { id: 1, title: 'Misconception drill ready', desc: 'Quadratic Formula signs (-b)', unread: true, time: '10m' },
    { id: 2, title: 'Concept Map updated', desc: 'Life Processes dependencies linked', unread: true, time: '1h' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/70 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onOpenAskModal();
              }
            }}
          />
        </div>
      </div>

      {/* Selectors and Profile */}
      <div className="flex items-center gap-2.5">
        {/* Board Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBoardMenu(!showBoardMenu);
              setShowLangMenu(false);
              setShowClassMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>{currentBoardObj.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showBoardMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 z-50">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                {t.selectCurriculum}
              </div>
              {CURRICULUM_BOARDS.map((board) => (
                <button
                  key={board.id}
                  onClick={() => {
                    setSelectedBoard(board.id);
                    setShowBoardMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    selectedBoard === board.id ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div>
                    <div>{board.name}</div>
                    <div className="text-[10px] text-slate-400">{board.badge}</div>
                  </div>
                  {selectedBoard === board.id && <Check className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Class Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowClassMenu(!showClassMenu);
              setShowBoardMenu(false);
              setShowLangMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
            <span>{selectedClass}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showClassMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 p-1 z-50">
              {CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setShowClassMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    selectedClass === cls ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span>{cls}</span>
                  {selectedClass === cls && <Check className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowBoardMenu(false);
              setShowClassMenu(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-slate-200" />
            <span>{currentLangObj.native}</span>
            <ChevronDown className="w-3 h-3 text-slate-300" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                {t.selectLanguage}
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                    selectedLang === lang.code ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{lang.native}</div>
                    <div className="text-[10px] text-slate-400">{lang.name}</div>
                  </div>
                  {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-slate-900" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowBoardMenu(false);
              setShowLangMenu(false);
              setShowClassMenu(false);
            }}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center relative transition-colors text-slate-600"
          >
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-2 right-2"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-2.5 z-50">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 px-1">
                <span className="text-xs font-bold text-slate-800">{t.notifications}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">{t.newBadge}</span>
              </div>
              <div className="divide-y divide-slate-100 mt-1">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2 px-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
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

        {/* Divider */}
        <div className="h-4 w-px bg-slate-200 mx-1"></div>

        {/* Student Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-8 h-8 rounded-xl bg-slate-100 object-cover border border-slate-200"
          />
          <div className="hidden sm:block leading-none">
            <span className="text-xs font-bold text-slate-800">{student.name}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{t.studentBadge}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
