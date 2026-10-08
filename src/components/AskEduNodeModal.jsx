import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { LANGUAGES, CURRICULUM_BOARDS } from '../data/mockData';
import { getTranslation } from '../data/translations';

export default function AskEduNodeModal({ 
  isOpen, 
  onClose, 
  selectedLang, 
  setSelectedLang, 
  selectedBoard,
  initialQuery 
}) {
  const t = getTranslation(selectedLang);
  const currentBoard = CURRICULUM_BOARDS.find(b => b.id === selectedBoard) || CURRICULUM_BOARDS[0];

  const getInitialMessages = (lang) => {
    switch (lang) {
      case 'ta':
        return [
          {
            role: 'ai',
            message: `வணக்கம்! 🌱 நான் EduNode AI ஆசிரியர். உங்கள் ${currentBoard.name} பாடத்திட்டம் தொடர்பான எந்த சந்தேகத்தையும் கேளுங்கள், எளிய முறையில் விளக்குகிறேன்!`,
            timestamp: '11:45 AM',
          },
          {
            role: 'user',
            message: 'இருபடி சமன்பாடுகளில் எதிர்மறை மூலங்கள் ஏன் கிடைக்கின்றன? தூரம் அல்லது நேரம் எதிர்மறையாக இருக்க முடியுமா?',
            timestamp: '11:46 AM',
          },
          {
            role: 'ai',
            message: `சிறந்த கேள்வி! 💡\n\n1. **கணிதக் கோட்பாடு:** இயற்கணித ரீதியாக ax² + bx + c = 0 சமன்பாட்டிற்கு நேர்மறை மற்றும் எதிர்மறை ஆகிய இரண்டு தீர்வுகளும் சாத்தியமாகும்.\n2. **நடைமுறை உண்மை:** தூரம், நீளம் அல்லது வேகம் போன்ற உண்மையான அளவீடுகளில் எதிர்மறை எண்கள் செல்லாது.\n\n**விரைவு வினா:** ஒரு தோட்டத்தின் பக்க நீளம் x = 7 அல்லது x = -3 எனில், தோட்டத்தின் உண்மையான நீளம் என்ன?`,
            timestamp: '11:47 AM',
            hasQuickOptions: true,
            quickOptions: ['7 அலகுகள்', '-3 அலகுகள்', '7 மற்றும் -3 இரண்டுமே'],
          }
        ];
      case 'te':
        return [
          {
            role: 'ai',
            message: `నమస్కారం! 🌱 నేను EduNode AI ట్యూటర్‌ని. మీ ${currentBoard.name} సిలబస్ నుండి ఏదైనా సందేహం అడగండి, వివరంగా వివరిస్తాను!`,
            timestamp: '11:45 AM',
          },
          {
            role: 'user',
            message: 'వర్గ సమీకరణాలలో రుణాత్మక మూలాలు ఎందుకు వస్తాయి? దూరం లేదా సమయం రుణాత్మకంగా ఉండవచ్చా?',
            timestamp: '11:46 AM',
          },
          {
            role: 'ai',
            message: `మంచి ప్రశ్న! 💡\n\n1. **గణిత సూత్రం:** బీజగణిత పరంగా ax² + bx + c = 0 కు ధన మరియు రుణ విలువలు రెండూ వస్తాయి.\n2. **భౌతిక పరిమితి:** పొడవు, వేగం లేదా సమయం వంటి కొలతలు ఎప్పటికీ రుణాత్మకం కావు. కాబట్టి రుణ మూలాన్ని తిరస్కరించాలి.\n\n**చిన్న ప్రశ్న:** తోట కొలత సమీకరణంలో x = 7 లేదా x = -3 వస్తే, తోట పొడవు ఎంత?`,
            timestamp: '11:47 AM',
            hasQuickOptions: true,
            quickOptions: ['7 యూనిట్లు', '-3 యూనిట్లు', '7 మరియు -3 రెండూ'],
          }
        ];
      case 'ml':
        return [
          {
            role: 'ai',
            message: `നമസ്കാരം! 🌱 ഞാൻ EduNode AI ട്യൂട്ടറാണ്. നിങ്ങളുടെ ${currentBoard.name} സിലബസ് സംബന്ധിച്ച ഏത് സംശയവും ചോദിക്കൂ, ലളിതമായി പറഞ്ഞുതരാം!`,
            timestamp: '11:45 AM',
          },
          {
            role: 'user',
            message: 'രണ്ടാം കൃതി സമവാക്യങ്ങളിൽ നെഗറ്റീവ് മൂലങ്ങൾ വരുന്നത് എന്തുകൊണ്ട്? ദൂരമോ സമയമോ നെഗറ്റീവ് ആകുമോ?',
            timestamp: '11:46 AM',
          },
          {
            role: 'ai',
            message: `നല്ല ചോദ്യം! 💡\n\n1. **ഗണിത നിയമം:** ബീജഗണിത സമവാക്യം ax² + bx + c = 0 പരിഹരിക്കുമ്പോൾ പോസിറ്റീവ്, നെഗറ്റീവ് സംഖ്യകൾ ലഭിക്കാം.\n2. **പ്രായോഗിക യാഥാർത്ഥ്യം:** ദൂരം, സമയം, വേഗത എന്നിവ ഒരിക്കലും നെഗറ്റീവ് ആകില്ല. അതിനാൽ നെഗറ്റീവ് മൂല്യം ഒഴിവാക്കണം.\n\n**ഒരു ചോദ്യം:** ഒരു പൂന്തോട്ടത്തിന്റെ നീളം x = 7 അല്ലെങ്കിൽ x = -3 ആണെങ്കിൽ, യഥാർത്ഥ നീളം എത്ര?`,
            timestamp: '11:47 AM',
            hasQuickOptions: true,
            quickOptions: ['7 യൂണിറ്റ്', '-3 യൂണിറ്റ്', '7 ഉം -3 ഉം'],
          }
        ];
      case 'hi':
        return [
          {
            role: 'ai',
            message: `नमस्ते! 🌱 मैं EduNode AI शिक्षक हूँ। अपने ${currentBoard.name} पाठ्यक्रम से संबंधित कोई भी शंका पूछें, मैं इसे सरल भाषा में समझाऊँगा!`,
            timestamp: '11:45 AM',
          },
          {
            role: 'user',
            message: 'द्विघात समीकरणों में ऋणात्मक मूल क्यों आते हैं? क्या लंबाई या समय कभी ऋणात्मक हो सकते हैं?',
            timestamp: '11:46 AM',
          },
          {
            role: 'ai',
            message: `बहुत अच्छा प्रश्न! 💡\n\n1. **गणितीय नियम:** बीजगणितीय रूप से ax² + bx + c = 0 को हल करने पर धनात्मक और ऋणात्मक दोनों मूल संभव हैं।\n2. **वास्तविक सीमा:** वास्तविक जीवन में दूरी, लंबाई या गति ऋणात्मक नहीं हो सकती। इसलिए हम ऋणात्मक मूल को अमान्य मानते हैं।\n\n**त्वरित प्रश्न:** यदि बगीचे की भुजा x = 7 या x = -3 आती है, तो सही लंबाई क्या होगी?`,
            timestamp: '11:47 AM',
            hasQuickOptions: true,
            quickOptions: ['7 इकाइयां', '-3 इकाइयां', 'दोनों 7 और -3'],
          }
        ];
      default:
        return [
          {
            role: 'ai',
            message: `Hi there! 🌱 I'm EduNode, your AI learning tutor. Ask me any doubt from your ${currentBoard.name} syllabus!`,
            timestamp: '11:45 AM',
          },
          {
            role: 'user',
            message: 'Why do we get negative roots in quadratic equations? Can length or time ever be negative?',
            timestamp: '11:46 AM',
          },
          {
            role: 'ai',
            message: `Great question! 💡\n\n1. **The Math part:** Algebraically, ax² + bx + c = 0 can yield both positive and negative roots.\n2. **Real-world constraint:** In geometry and physical problems, length, distance, or time cannot be negative, so we discard the negative root.\n\n**Quick check for you:** If a garden side equation gives x = 7 or x = -3, what is the valid length of the garden?`,
            timestamp: '11:47 AM',
            hasQuickOptions: true,
            quickOptions: ['7 units', '-3 units', 'Both 7 and -3 units'],
          }
        ];
    }
  };

  const [messages, setMessages] = useState(() => getInitialMessages(selectedLang));
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    setMessages(getInitialMessages(selectedLang));
  }, [selectedLang, selectedBoard]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      role: 'user',
      message: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const isCorrectOption = textToSend.includes('7');
      const isNegativeOption = textToSend.includes('-3');

      if (isCorrectOption) {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            message: selectedLang === 'ta'
              ? `🎉 **மிகச் சரியான விடை!** நீளம் எதிர்மறையாக (-3) இருக்க முடியாது என்பதால் 7 அலகுகளே சரியான விடை.\n\n✨ **EduNode கற்றல் சுயவிவரம் புதுப்பிக்கப்பட்டது:**\n• தீர்க்கப்பட்ட தவறான புரிதல்: இயற்பியல் அளவீடுகளில் எதிர்மறை மூலங்களை நீக்குதல்.\n• இருபடி சமன்பாடுகளில் தேர்ச்சி +2% அதிகரித்தது!`
              : selectedLang === 'te'
              ? `🎉 **ఖచ్చితమైన సమాధానం!** తోట పొడవు -3 ఉండదు కాబట్టి 7 యూనిట్లే సరైన సమాధానం.\n\n✨ **EduNode లెర్నర్ ప్రొఫైల్ అప్‌డేట్:**\n• అపోహ పరిష్కరించబడింది: వాస్తవ సమస్యలలో రుణ మూలాలను తొలగించడం.\n• నైపుణ్యం +2% పెరిగింది!`
              : selectedLang === 'ml'
              ? `🎉 **ശരിയായ ഉത്തരം!** പൂന്തോട്ടത്തിന്റെ നീളം -3 ആകാൻ കഴിയില്ല, അതിനാൽ 7 യൂണിറ്റാണ് ശരിയായ ഉത്തരം.\n\n✨ **EduNode ലേണിംഗ് പ്രൊഫൈൽ:**\n• തെറ്റിദ്ധാരണ പരിഹരിച്ചു.\n• പ്രാവീണ്യം +2% വർദ്ധിച്ചു!`
              : selectedLang === 'hi'
              ? `🎉 **बिल्कुल सही उत्तर!** दूरी या लंबाई -3 नहीं हो सकती, इसलिए 7 इकाइयां ही मान्य उत्तर है।\n\n✨ **EduNode प्रोफ़ाइल अपडेट:**\n• भ्रांति का निवारण हुआ।\n• द्विघात समीकरणों में निपुणता +2% बढ़ी!`
              : `🎉 **Spot on!** Length cannot be -3 units, so we reject -3 and take 7 units as the real answer.\n\n✨ **EduNode Profile Updated:**\n• Misconception cleared: Discarding extraneous negative roots in word problems.\n• Mastery increased by +2%!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSuccess: true,
          }
        ]);
      } else if (isNegativeOption) {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            message: selectedLang === 'ta'
              ? `⚠️ **கவனம்!** ஒரு தோட்டத்தின் நீளம் -3 மீட்டராக இருக்க முடியுமா? இயற்பியல் அளவீடுகள் எப்போதும் நேர்மறையாகவே இருக்கும். எனவே எதிர்மறை எண்ணை நிராகரிக்க வேண்டும்!`
              : selectedLang === 'te'
              ? `⚠️ **గమనించండి!** భౌతిక వస్తువు లేదా తోట పొడవు -3 మీటర్లు ఉండదు. దూరం ఎల్లప్పుడూ ధనాత్మకమే. కాబట్టి రుణ మూలాన్ని తీసివేయాలి!`
              : selectedLang === 'ml'
              ? `⚠️ **ശ്രദ്ധിക്കുക!** ഒരു വസ്തുവിന്റെ നീളം -3 മീറ്റർ ആകുമോ? ഇല്ല, ദൂരം എല്ലായ്പ്പോഴും പോസിറ്റീവ് ആയിരിക്കും!`
              : selectedLang === 'hi'
              ? `⚠️ **ध्यान दें!** क्या किसी बगीचे की लंबाई -3 मीटर हो सकती है? दूरी सदैव धनात्मक होती है, इसलिए ऋणात्मक मूल को छोड़ दें!`
              : `⚠️ **Notice this key point:** Can an actual garden measure -3 meters long? No, distance is always non-negative. Always discard the negative root!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isWarning: true,
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            message: selectedLang === 'ta'
              ? `நல்ல கேள்வி! "${textToSend}" குறித்து ${currentBoard.name} பாடத்திட்டத்தின்படி எளிமையான விளக்கம்:\n\n1. அடிப்படை விதியை முதலில் புரிந்து கொள்ளுங்கள்.\n2. முந்தைய அத்தியாயத்துடனான தொடர்பைக் கவனியுங்கள்.\n\nமேலும் எளிய உதாரணம் அல்லது பயிற்சி வேண்டுமா?`
              : selectedLang === 'te'
              ? `మంచి ప్రశ్న! "${textToSend}" పై ${currentBoard.name} సిలబస్ ప్రకారం వివరణ:\n\n1. ప్రాథమిక భావనను అర్థం చేసుకోండి.\n2. మునుపటి అధ్యాయంతో ఉన్న సంబంధాన్ని గమనించండి.\n\nమీకు ఉదాహరణ లేదా సాధన ప్రశ్న కావాలా?`
              : selectedLang === 'ml'
              ? `നല്ല സംശയം! "${textToSend}" സംബന്ധിച്ച് ${currentBoard.name} പാഠ്യപദ്ധതി പ്രകാരമുള്ള വിശദീകരണം:\n\n1. അടിസ്ഥാന തത്വം മനസ്സിലാക്കുക.\n2. മുൻ അധ്യായവുമായുള്ള ബന്ധം ശ്രദ്ധിക്കുക.`
              : selectedLang === 'hi'
              ? `उत्कृष्ट प्रश्न! "${textToSend}" पर ${currentBoard.name} पाठ्यक्रम के अनुसार संक्षिप्त विवरण:\n\n1. पहले मूल सिद्धांत को समझें।\n2. पिछले अध्याय से इसके संबंध को देखें।\n\nक्या आप एक सरल उदाहरण या अभ्यास प्रश्न चाहते हैं?`
              : `Great question regarding "${textToSend}"! According to your ${currentBoard.name} syllabus:\n\n1. Understand the foundational principle first.\n2. Notice how it builds upon your earlier concepts.\n\nWould you like a quick intuitive analogy or a 2-minute practice drill?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
      }
    }, 1200);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const sampleVoiceQuery = selectedLang === 'ta'
          ? "இருபடி சமன்பாட்டின் மூலங்களின் தன்மையை எவ்வாறு கண்டறிவது?"
          : selectedLang === 'te'
          ? "వర్గ సమీకరణాల మూలాల స్వభావాన్ని ఎలా కనుగొనాలి?"
          : selectedLang === 'ml'
          ? "രണ്ടാം കൃതി സമവാക്യങ്ങളുടെ മൂലങ്ങളുടെ സ്വഭാവം എങ്ങനെ നിർണ്ണയിക്കും?"
          : selectedLang === 'hi'
          ? "विविक्तकर b² - 4ac से मूलों की प्रकृति कैसे ज्ञात करें?"
          : "How do I find the nature of roots using discriminant b² - 4ac?";
        setInput(sampleVoiceQuery);
      }, 1500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Minimal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-outfit">
                  {t.askModalTitle}
                </h3>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {currentBoard.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {t.askModalSubtitle.replace('{board}', currentBoard.name)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-slate-50 text-slate-700 text-xs font-medium rounded-lg px-2 py-1 border border-slate-200 focus:outline-none"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>

            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Pipeline status banner */}
        <div className="bg-slate-50 px-5 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Gemma 2B • RAG Grounded</span>
          </span>
          <span className="text-slate-400 font-mono text-[10px]">
            IndicConformer & IndicF5
          </span>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-white">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 text-xs">
                  🌱
                </div>
              )}

              <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : m.isSuccess
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : m.isWarning
                  ? 'bg-amber-50 border border-amber-200 text-amber-900'
                  : 'bg-slate-50 border border-slate-100 text-slate-800'
              }`}>
                <div className="whitespace-pre-line">{m.message}</div>

                {m.hasQuickOptions && (
                  <div className="mt-2.5 pt-2 border-t border-slate-200/60">
                    <p className="text-[10px] font-bold text-slate-400 mb-1.5">
                      {selectedLang === 'ta' ? 'விடையைத் தேர்ந்தெடுக்கவும்:' : selectedLang === 'te' ? 'సమాధానం ఎంచుకోండి:' : selectedLang === 'hi' ? 'उत्तर चुनें:' : 'Select your answer:'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {m.quickOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSend(opt)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-medium text-[11px] border border-slate-200 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
                  <span>{m.timestamp}</span>
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>EduNode reasoning with Gemma 2B & {currentBoard.name} RAG...</span>
            </div>
          )}
        </div>

        {/* Minimal Input Bar */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={isListening ? t.listeningVoice : t.voiceButton}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? t.listeningVoice : t.typeYourDoubt}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>{t.send}</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
