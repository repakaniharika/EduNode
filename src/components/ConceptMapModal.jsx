import React, { useState } from 'react';
import { X, Network, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

export default function ConceptMapModal({ isOpen, onClose, onAskAboutConcept }) {
  const [selectedSubject, setSelectedSubject] = useState('math');
  const [activeConcept, setActiveConcept] = useState('quadratic_roots');

  if (!isOpen) return null;

  const conceptNodes = {
    math: [
      {
        id: 'real_numbers',
        name: 'Real Numbers & Primes',
        chapter: 'Chapter 1',
        mastery: 95,
        status: 'mastered',
        prereqs: ['Basic Arithmetic'],
        leadsTo: ['Polynomials'],
        desc: 'Fundamental theorem of arithmetic and irrationality proofs.',
      },
      {
        id: 'polynomials',
        name: 'Polynomials & Zeroes',
        chapter: 'Chapter 2',
        mastery: 85,
        status: 'mastered',
        prereqs: ['Real Numbers'],
        leadsTo: ['Quadratic Equations'],
        desc: 'Geometrical meaning of zeroes and relationship between coefficients.',
      },
      {
        id: 'quadratic_eq',
        name: 'Quadratic Equations Formation',
        chapter: 'Chapter 4',
        mastery: 78,
        status: 'in_progress',
        prereqs: ['Polynomials'],
        leadsTo: ['quadratic_roots'],
        desc: 'Standard form ax² + bx + c = 0 and word problem modeling.',
      },
      {
        id: 'quadratic_roots',
        name: 'Nature of Roots & Discriminant',
        chapter: 'Chapter 4',
        mastery: 65,
        status: 'needs_attention',
        prereqs: ['quadratic_eq'],
        leadsTo: ['Applied Word Problems'],
        desc: 'Discriminant D = b² - 4ac. EduNode detected confusion on sign reversals when b < 0.',
        misconceptionAlert: true,
      },
      {
        id: 'triangles',
        name: 'Similar Triangles & BPT',
        chapter: 'Chapter 6',
        mastery: 70,
        status: 'in_progress',
        prereqs: ['Basic Geometry'],
        leadsTo: ['Coordinate Geometry'],
        desc: 'Basic Proportionality Theorem and similarity criteria AAA, SSS, SAS.',
      },
    ],
    science: [
      {
        id: 'chemical_rxns',
        name: 'Chemical Reactions & Balancing',
        chapter: 'Chapter 1',
        mastery: 80,
        status: 'mastered',
        prereqs: ['Atomic Mass'],
        leadsTo: ['Acids, Bases & Salts'],
        desc: 'Combination, decomposition, displacement, and redox reactions.',
      },
      {
        id: 'life_processes',
        name: 'Life Processes & Nutrition',
        chapter: 'Chapter 6',
        mastery: 64,
        status: 'in_progress',
        prereqs: ['Cell Structure'],
        leadsTo: ['Respiration & Transport'],
        desc: 'Autotrophic and heterotrophic nutrition; stomatal regulation.',
      },
      {
        id: 'respiration',
        name: 'Cellular Respiration in Plants',
        chapter: 'Chapter 6',
        mastery: 90,
        status: 'mastered',
        prereqs: ['Life Processes'],
        leadsTo: ['Human Circulatory System'],
        desc: 'Misconception cleared: Plants respire continuously day and night.',
      },
      {
        id: 'electricity',
        name: 'Ohm’s Law & Electric Current',
        chapter: 'Chapter 12',
        mastery: 72,
        status: 'in_progress',
        prereqs: ['Electric Potential'],
        leadsTo: ['Magnetic Effects of Current'],
        desc: 'Conventional current vs electron flow; series and parallel circuits.',
      },
    ]
  };

  const currentNodes = conceptNodes[selectedSubject] || conceptNodes.math;
  const currentSelected = currentNodes.find(n => n.id === activeConcept) || currentNodes[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[650px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1e2749] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl">
              🔗
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-outfit">
                EduNode Knowledge Graph
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-300 font-bold border border-indigo-400/30">
                  Concept Dependencies
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Visualizing prerequisite pathways and your misconception radar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Subject Toggle */}
            <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => {
                  setSelectedSubject('math');
                  setActiveConcept('quadratic_roots');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedSubject === 'math' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                📐 Mathematics
              </button>
              <button
                onClick={() => {
                  setSelectedSubject('science');
                  setActiveConcept('life_processes');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedSubject === 'science' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                🔬 Science
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body: Left is Graph Nodes, Right is Details Panel */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-slate-50">
          
          {/* Left: Concept Nodes Pathway */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-4 border-r border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Learning Path & Prerequisites
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Mastered
                </span>
                <span className="flex items-center gap-1 text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> In Progress
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Misconception Alert
                </span>
              </div>
            </div>

            <div className="space-y-3 relative before:absolute before:left-5 before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-200">
              {currentNodes.map((node, i) => {
                const isSelected = activeConcept === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveConcept(node.id)}
                    className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-sm'
                    }`}
                  >
                    {/* Node status dot */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-sm z-10 ${
                      node.status === 'mastered'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : node.status === 'needs_attention'
                        ? 'bg-amber-100 text-amber-700 border border-amber-300 ring-2 ring-amber-400/30'
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {node.status === 'mastered' ? '✓' : i + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-800">
                          {node.name}
                        </h4>
                        <span className="text-xs font-black text-slate-600 font-outfit">
                          {node.mastery}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{node.desc}</p>
                      
                      {node.misconceptionAlert && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>EduNode Misconception Detected</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Concept Details & Action */}
          <div className="md:col-span-5 p-6 bg-white flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-2">
                {currentSelected.chapter}
              </div>

              <h3 className="text-lg font-extrabold text-slate-800">
                {currentSelected.name}
              </h3>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-700">Concept Overview:</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentSelected.desc}
                </p>
              </div>

              {currentSelected.misconceptionAlert && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Active Misconception Flag</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Student answered with -(-5) as -5 instead of +5 in the discriminant step. Gemma has queued a 3-step sign drill.
                  </p>
                </div>
              )}

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                  <span className="font-medium">Prerequisites:</span>
                  <span className="font-bold text-slate-800">{currentSelected.prereqs.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                  <span className="font-medium">Next Concept:</span>
                  <span className="font-bold text-slate-800">{currentSelected.leadsTo.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  onClose();
                  onAskAboutConcept(currentSelected.name);
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask EduNode about this Concept</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
