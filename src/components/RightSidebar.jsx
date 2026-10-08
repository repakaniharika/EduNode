import React from 'react';
import { 
  Clock, 
  Mic, 
  CheckSquare, 
  BookOpen, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { UPCOMING_SCHEDULE } from '../data/mockData';
import { getTranslation } from '../data/translations';

export default function RightSidebar({ 
  selectedLang, 
  onOpenAskModal, 
  onOpenConceptMap, 
  onOpenMisconceptions 
}) {
  const t = getTranslation(selectedLang);

  const practiceItems = [
    {
      id: 's1',
      title: selectedLang === 'ta' ? 'இருபடி சமன்பாடு பயிற்சி' : selectedLang === 'te' ? 'వర్గ సమీకరణాల సాధన' : selectedLang === 'ml' ? 'രണ്ടാം കൃതി സമവാക്യ പരിശീലനം' : selectedLang === 'hi' ? 'द्विघात समीकरण अभ्यास' : 'Quadratic Equation Drill',
      time: '4:30 PM',
      type: 'AI Practice',
    },
    {
      id: 's2',
      title: selectedLang === 'ta' ? 'ஒளிச்சேர்க்கை திருப்புதல்' : selectedLang === 'te' ? 'కిరణజన్య సంయోగక్రియ సమీక్ష' : selectedLang === 'ml' ? 'പ്രകാശസംശ്ലേഷണ പുനരവലോകനം' : selectedLang === 'hi' ? 'प्रकाश संश्लेषण पुनरावलोकन' : 'Photosynthesis Review',
      time: 'Tomorrow, 5:00 PM',
      type: 'Concept Revision',
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Upcoming Practice Schedule */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              {selectedLang === 'ta' ? 'அடுத்த பயிற்சிகள்' : selectedLang === 'te' ? 'రాబోయే సాధన' : selectedLang === 'ml' ? 'അടുത്ത പരിശീലനം' : selectedLang === 'hi' ? 'आगामी अभ्यास' : 'Upcoming Practice'}
            </h3>
            <span className="text-[10px] text-slate-400">
              {selectedLang === 'ta' ? 'EduNode AI மூலம் பரிந்துரைக்கப்பட்டது' : 'Recommended by AI'}
            </span>
          </div>
          <button 
            onClick={onOpenMisconceptions}
            className="text-[11px] font-medium text-slate-600 hover:text-slate-900"
          >
            {t.practiceNow}
          </button>
        </div>

        <div className="space-y-2">
          {practiceItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenAskModal()}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div>
                <h4 className="text-xs font-semibold text-slate-800 group-hover:text-slate-950 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                    {item.type}
                  </span>
                </div>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Sleek Quick Action Tools */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 mb-2.5">
          {selectedLang === 'ta' ? 'விரைவு கருவிகள்' : selectedLang === 'te' ? 'త్వరిత సాధనాలు' : selectedLang === 'ml' ? 'ദ്രുത ഉപകരണങ്ങൾ' : selectedLang === 'hi' ? 'त्वरित उपकरण' : 'Learning Tools'}
        </h3>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => onOpenAskModal()}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-left transition-colors flex flex-col justify-between"
          >
            <Mic className="w-4 h-4 text-slate-600 mb-1.5" />
            <span className="font-semibold text-slate-800 text-[11px]">{t.voiceButton}</span>
            <span className="text-[10px] text-slate-400">5 Languages</span>
          </button>

          <button
            onClick={onOpenConceptMap}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-left transition-colors flex flex-col justify-between"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 mb-1.5" />
            <span className="font-semibold text-slate-800 text-[11px]">{t.conceptMap}</span>
            <span className="text-[10px] text-slate-400">Knowledge Graph</span>
          </button>

          <button
            onClick={onOpenMisconceptions}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-left transition-colors flex flex-col justify-between"
          >
            <CheckSquare className="w-4 h-4 text-amber-600 mb-1.5" />
            <span className="font-semibold text-slate-800 text-[11px]">{t.misconceptionRadar}</span>
            <span className="text-[10px] text-slate-400">Targeted Drills</span>
          </button>

          <button
            onClick={() => onOpenAskModal()}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-left transition-colors flex flex-col justify-between"
          >
            <BookOpen className="w-4 h-4 text-blue-600 mb-1.5" />
            <span className="font-semibold text-slate-800 text-[11px]">{t.syllabusChapters}</span>
            <span className="text-[10px] text-slate-400">Curriculum RAG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
