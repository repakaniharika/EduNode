import React, { useState } from 'react';
import { ArrowRight, Bot, Mic, Send, Sparkles, Flame, CheckCircle2, BookOpen } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { CURRICULUM_BOARDS } from '../data/mockData';

export default function WelcomeBanner({ 
  student, 
  selectedLang, 
  selectedBoard,
  onOpenAskModal, 
  onContinueLearning 
}) {
  const [quickInput, setQuickInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const t = getTranslation(selectedLang);

  const currentBoard = CURRICULUM_BOARDS.find(b => b.id === selectedBoard) || CURRICULUM_BOARDS[0];
  const greetingText = t.greeting.replace('{name}', student.name);
  const subtitleText = t.heroSubtitle.replace('{board}', currentBoard.name);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onOpenAskModal(quickInput);
    setQuickInput('');
  };

  const handleVoiceClick = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const sampleQuery = selectedLang === 'ta' 
          ? "இருபடி சமன்பாட்டின் மூலங்களின் தன்மையை எவ்வாறு கண்டறிவது?" 
          : selectedLang === 'te'
          ? "వర్గ సమీకరణాల మూలాల స్వభావాన్ని ఎలా కనుగొనాలి?"
          : selectedLang === 'ml'
          ? "രണ്ടാം കൃതി സമവാക്യങ്ങളുടെ മൂലങ്ങളുടെ സ്വഭാവം എങ്ങനെ നിർണ്ണയിക്കും?"
          : selectedLang === 'hi'
          ? "विविक्तकर b² - 4ac की सहायता से मूलों की प्रकृति कैसे ज्ञात करें?"
          : "How do I find the nature of roots using discriminant b² - 4ac?";
        setQuickInput(sampleQuery);
      }, 1500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Sleek Minimalist Hero Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{currentBoard.name} {student.grade} • {t.syllabusActive}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-outfit">
            {greetingText}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* Quick action button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onContinueLearning}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>{t.continueLearning}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Embedded Quick Doubt Ask Bar */}
      <form
        onSubmit={handleQuickSubmit}
        className="bg-white rounded-2xl p-2 pl-3 border border-slate-200/70 shadow-sm flex items-center gap-2"
      >
        <button
          type="button"
          onClick={handleVoiceClick}
          className={`p-2 rounded-xl transition-colors ${
            isListening
              ? 'bg-rose-50 text-rose-600 animate-pulse border border-rose-200'
              : 'hover:bg-slate-100 text-slate-500'
          }`}
          title={isListening ? t.listeningVoice : t.voiceButton}
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={quickInput}
          onChange={(e) => setQuickInput(e.target.value)}
          placeholder={isListening ? t.listeningVoice : t.quickDoubtPlaceholder}
          className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
        >
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.askButton}</span>
        </button>
      </form>

      {/* Minimal Key Metrics Bar (4 clean inline metric cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.masteryLabel}</div>
            <div className="text-lg font-bold text-slate-900 font-outfit mt-0.5">
              {student.overallMastery}%
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
            ✓
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.streakLabel}</div>
            <div className="text-lg font-bold text-slate-900 font-outfit mt-0.5">
              {student.streakDays} Days
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold">
            🔥
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.clearedLabel}</div>
            <div className="text-lg font-bold text-slate-900 font-outfit mt-0.5">
              {student.misconceptionsCleared}
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">
            🧠
          </div>
        </div>

        <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">{t.enrolledLabel}</div>
            <div className="text-lg font-bold text-slate-900 font-outfit mt-0.5">
              5
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">
            📚
          </div>
        </div>
      </div>
    </div>
  );
}
