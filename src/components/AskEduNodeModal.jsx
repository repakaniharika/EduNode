import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  Sparkles, 
  BookOpen, 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle,
  Volume2
} from 'lucide-react';
import { SAMPLE_CHAT_FLOW, LANGUAGES } from '../data/mockData';

export default function AskEduNodeModal({ isOpen, onClose, selectedLang, setSelectedLang, initialSubject }) {
  const [messages, setMessages] = useState(SAMPLE_CHAT_FLOW);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(null);

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

    // Simulate the EduNode Pipeline steps
    setPipelineStep('Detecting Language & Student Intent...');
    setTimeout(() => {
      setPipelineStep('Retrieving NCERT Class 10 Textbook Content via RAG...');
    }, 600);
    setTimeout(() => {
      setPipelineStep('Querying Knowledge Graph for Concept Dependencies...');
    }, 1200);
    setTimeout(() => {
      setPipelineStep('Gemma Generating Personalized Explanation...');
    }, 1800);

    setTimeout(() => {
      setIsThinking(false);
      setPipelineStep(null);

      // Check if user answered the quiz option
      if (textToSend.includes('7 units')) {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            message: "🎉 **Spot on, Pavitra!** Exactly. A garden cannot have a length of -3 units, so we reject -3 and take 7 units as the real answer.\n\n✨ **EduNode Learner Profile Updated:**\n• Misconception cleared: Discarding extraneous negative roots in geometric word problems.\n• Mastery increased by +2% in Quadratic Equations!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSuccess: true,
          }
        ]);
      } else if (textToSend.includes('-3 units') || textToSend.includes('Both')) {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            message: "⚠️ **Almost, but here is the key catch!**\nCan a physical object like a wall or garden ever measure -3 meters long? No, distance is always non-negative.\n\n💡 **EduNode Adaptive Tip:** Whenever solving geometry or speed problems with quadratic equations, always ask yourself: *'Can this physical quantity be negative?'* If not, discard the negative root!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isWarning: true,
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'ai',
            message: `Great question regarding: "${textToSend}"!\n\nAccording to **NCERT Class 10**, this ties into your core syllabus. Let's break it down into an easy intuition:\n\n1. First understand the fundamental rule.\n2. Observe how it connects with your previous chapter.\n\nWould you like a simple real-life analogy or a 2-minute practice problem?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
      }
    }, 2400);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        setInput("How do I find the nature of roots using the discriminant b² - 4ac?");
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl h-[650px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#1e2749] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-outfit">
                  Ask EduNode AI Tutor
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                  Multilingual & Adaptive
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Grounds answers in NCERT • Catches misconceptions • Adapts to you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl px-2.5 py-1.5 border border-white/20 focus:outline-none"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} className="text-slate-800">
                  {lang.native} ({lang.name})
                </option>
              ))}
            </select>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* EduNode Adaptive Pipeline indicator */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-6 py-2 flex items-center justify-between text-xs text-emerald-900 font-medium shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>
              {pipelineStep ? pipelineStep : 'Pipeline ready: Intent -> RAG -> Knowledge Graph -> Gemma -> Misconception Check'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
            NCERT Class 10 Active
          </span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-sm text-sm">
                  🌱
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : m.isSuccess
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-tl-none'
                  : m.isWarning
                  ? 'bg-amber-50 border border-amber-200 text-amber-950 rounded-tl-none'
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-line">{m.message}</div>

                {/* Quick Interactive follow-up options */}
                {m.hasQuickOptions && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 mb-2">Choose your answer:</p>
                    <div className="flex flex-wrap gap-2">
                      {m.quickOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSend(opt)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-2 text-[10px] opacity-70">
                  <span>{m.timestamp}</span>
                  {m.role === 'ai' && (
                    <span className="flex items-center gap-1 font-semibold">
                      <Bot className="w-3 h-3" />
                      Gemma 2B + RAG
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm animate-bounce">
                🌱
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>EduNode is reasoning with Gemma & checking NCERT RAG...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
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
              className={`p-3 rounded-2xl border transition-all ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Click to speak doubt'}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening to your voice..." : "Ask your NCERT doubt (e.g. Why is discriminant b²-4ac important?)..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
