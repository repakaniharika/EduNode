import React, { useState } from 'react';
import { X, Network, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { getTranslation } from '../data/translations';

export default function ConceptMapModal({ 
  isOpen, 
  onClose, 
  selectedLang, 
  onAskAboutConcept 
}) {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [activeConcept, setActiveConcept] = useState('quadratic_roots');
  const t = getTranslation(selectedLang);

  if (!isOpen) return null;

  const conceptNodes = {
    math: [
      {
        id: 'real_numbers',
        name: selectedLang === 'ta' ? 'மெய் எண்கள் & பகா எண்கள்' : selectedLang === 'te' ? 'వాస్తవ సంఖ్యలు' : selectedLang === 'ml' ? 'യഥാർത്ഥ സംഖ്യകൾ' : selectedLang === 'hi' ? 'वास्तविक संख्याएं' : 'Real Numbers & Primes',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 1' : 'Chapter 1',
        mastery: 95,
        status: 'mastered',
        prereqs: ['Basic Arithmetic'],
        leadsTo: ['Polynomials'],
        desc: selectedLang === 'ta' ? 'எண்கணிதத்தின் அடிப்படைக் கோட்பாடு மற்றும் விகிதமுறா எண் சான்றுகள்.' : 'Fundamental theorem of arithmetic and irrationality proofs.',
      },
      {
        id: 'polynomials',
        name: selectedLang === 'ta' ? 'பல்லுறுப்புக் கோவைகள்' : selectedLang === 'te' ? 'బహుపదులు' : selectedLang === 'ml' ? 'ബഹുപദങ്ങൾ' : selectedLang === 'hi' ? 'बहुपद' : 'Polynomials & Zeroes',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 2' : 'Chapter 2',
        mastery: 85,
        status: 'mastered',
        prereqs: ['Real Numbers'],
        leadsTo: ['Quadratic Equations'],
        desc: selectedLang === 'ta' ? 'பூச்சியங்களின் வடிவியல் பொருள் மற்றும் குணகங்களின் தொடர்பு.' : 'Geometrical meaning of zeroes and coefficient relationships.',
      },
      {
        id: 'quadratic_eq',
        name: selectedLang === 'ta' ? 'இருபடி சமன்பாடுகள் உருவாக்கம்' : selectedLang === 'te' ? 'వర్గ సమీకరణాల నిర్మాణం' : selectedLang === 'ml' ? 'രണ്ടാം കൃതി സമവാക്യ രൂപീകരണം' : selectedLang === 'hi' ? 'द्विघात समीकरण रचना' : 'Quadratic Equations Formation',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 4' : 'Chapter 4',
        mastery: 78,
        status: 'in_progress',
        prereqs: ['Polynomials'],
        leadsTo: ['quadratic_roots'],
        desc: selectedLang === 'ta' ? 'நிலையான வடிவம் ax² + bx + c = 0 மற்றும் கணித மாதிரி.' : 'Standard form ax² + bx + c = 0 and word problem modeling.',
      },
      {
        id: 'quadratic_roots',
        name: selectedLang === 'ta' ? 'மூலங்களின் தன்மை & விவேகி' : selectedLang === 'te' ? 'మూలాల స్వభావం & విచక్షణ' : selectedLang === 'ml' ? 'മൂലങ്ങളുടെ സ്വഭാവം' : selectedLang === 'hi' ? 'मूलों की प्रकृति एवं विविक्तकर' : 'Nature of Roots & Discriminant',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 4' : 'Chapter 4',
        mastery: 65,
        status: 'needs_attention',
        prereqs: ['quadratic_eq'],
        leadsTo: ['Applied Problems'],
        desc: selectedLang === 'ta' ? 'விவேகி D = b² - 4ac. b < 0 ஆகும்போது குறியீட்டு தவறுகளை EduNode கண்டறிந்துள்ளது.' : 'Discriminant D = b² - 4ac. EduNode detected sign reversal confusion when b < 0.',
        misconceptionAlert: true,
      },
    ],
    science: [
      {
        id: 'chemical_rxns',
        name: selectedLang === 'ta' ? 'வேதி வினைகள் மற்றும் சமன்பாடுகள்' : selectedLang === 'te' ? 'రసాయన చర్యలు' : selectedLang === 'ml' ? 'രാസപ്രവർത്തനങ്ങൾ' : selectedLang === 'hi' ? 'रासायनिक अभिक्रियाएं' : 'Chemical Reactions',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 1' : 'Chapter 1',
        mastery: 80,
        status: 'mastered',
        prereqs: ['Atomic Mass'],
        leadsTo: ['Acids & Bases'],
        desc: selectedLang === 'ta' ? 'சேர்க்கை, சிதைவு மற்றும் இடப்பெயர்ச்சி வினைகள்.' : 'Combination, decomposition, displacement, and redox reactions.',
      },
      {
        id: 'life_processes',
        name: selectedLang === 'ta' ? 'உயிர் செயல்முறைகள் & ஊட்டச்சத்து' : selectedLang === 'te' ? 'జీవ క్రియలు & పోషణ' : selectedLang === 'ml' ? 'ജീവൻറെ പ്രക്രിയകൾ' : selectedLang === 'hi' ? 'जैव प्रक्रम एवं पोषण' : 'Life Processes & Nutrition',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 6' : 'Chapter 6',
        mastery: 64,
        status: 'in_progress',
        prereqs: ['Cell Structure'],
        leadsTo: ['Respiration'],
        desc: selectedLang === 'ta' ? 'தற்சார்பு மற்றும் பிறசார்பு ஊட்டச்சத்து; இலைத்துளை இயக்கம்.' : 'Autotrophic and heterotrophic nutrition; stomatal regulation.',
      },
      {
        id: 'respiration',
        name: selectedLang === 'ta' ? 'தாவரங்களில் சுவாசம்' : selectedLang === 'te' ? 'మొక్కలలో శ్వాసక్రియ' : selectedLang === 'ml' ? 'സസ്യങ്ങളിലെ ശ്വസനം' : selectedLang === 'hi' ? 'पादप श्वसन' : 'Plant Respiration',
        chapter: selectedLang === 'ta' ? 'அத்தியாயம் 6' : 'Chapter 6',
        mastery: 90,
        status: 'mastered',
        prereqs: ['Life Processes'],
        leadsTo: ['Circulation'],
        desc: selectedLang === 'ta' ? 'தாவரங்களில் சுவாசம் இரவிலும் பகலிலும் தொடர்ந்து நிகழ்கிறது.' : 'Plants respire continuously day and night.',
      },
    ]
  };

  const currentNodes = conceptNodes[selectedSubject] || conceptNodes.math;
  const currentSelected = currentNodes.find(n => n.id === activeConcept) || currentNodes[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-[580px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Minimal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
              🔗
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-outfit">
                {t.conceptMapTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t.conceptMapSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => {
                  setSelectedSubject('math');
                  setActiveConcept('quadratic_roots');
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  selectedSubject === 'math' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.subjectsData.math.name}
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('science');
                  setActiveConcept('life_processes');
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  selectedSubject === 'science' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                {t.subjectsData.science.name}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body: Left is nodes list, Right is detail card */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-slate-50">
          
          {/* Left: Concept Pathway */}
          <div className="md:col-span-7 p-4 overflow-y-auto space-y-2.5 border-r border-slate-200">
            {currentNodes.map((node, i) => {
              const isSelected = activeConcept === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveConcept(node.id)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{node.name}</span>
                    <span className="text-xs font-semibold text-slate-500 font-outfit">{node.mastery}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{node.desc}</p>
                  
                  {node.misconceptionAlert && (
                    <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 text-[10px] font-semibold border border-amber-200">
                      <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                      <span>{t.needsDrill}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Selected Node Details */}
          <div className="md:col-span-5 p-4 bg-white flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {currentSelected.chapter}
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                {currentSelected.name}
              </h4>

              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                {currentSelected.desc}
              </div>

              <div className="mt-3 space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span className="font-medium">{t.prerequisites}:</span>
                  <span className="font-semibold text-slate-800">{currentSelected.prereqs.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 text-slate-600">
                  <span className="font-medium">{t.nextConcept}:</span>
                  <span className="font-semibold text-slate-800">{currentSelected.leadsTo.join(', ')}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onAskAboutConcept(currentSelected.name);
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.askAboutConcept}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
