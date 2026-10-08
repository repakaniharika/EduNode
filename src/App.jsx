import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import WelcomeBanner from './components/WelcomeBanner';
import SubjectsGrid from './components/SubjectsGrid';
import ProgressAndActivity from './components/ProgressAndActivity';
import RightSidebar from './components/RightSidebar';
import AskEduNodeModal from './components/AskEduNodeModal';
import ConceptMapModal from './components/ConceptMapModal';
import MisconceptionsModal from './components/MisconceptionsModal';
import SubjectDetailModal from './components/SubjectDetailModal';
import { INITIAL_STUDENT, SUBJECTS_DATA } from './data/mockData';

export default function App() {
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBoard, setSelectedBoard] = useState('ncert');
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedLang, setSelectedLang] = useState('en');

  // Modals state
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isConceptMapOpen, setIsConceptMapOpen] = useState(false);
  const [isMisconceptionsOpen, setIsMisconceptionsOpen] = useState(false);
  const [activeSubjectModal, setActiveSubjectModal] = useState(null);

  const handleOpenSubject = (subject) => {
    setActiveSubjectModal(subject);
  };

  const handleAskDoubtForSubject = (subject) => {
    setIsAskModalOpen(true);
  };

  const handleAskAboutConcept = (conceptName) => {
    setIsAskModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex text-slate-800 antialiased font-sans">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAskModal={() => setIsAskModalOpen(true)}
        onOpenConceptMap={() => setIsConceptMapOpen(true)}
        onOpenMisconceptions={() => setIsMisconceptionsOpen(true)}
      />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <TopHeader
          student={student}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          onOpenAskModal={() => setIsAskModalOpen(true)}
        />

        {/* Dashboard Body with 2-Column layout (Main grid + Right sidebar) */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Center Main Stage (8 cols on XL screens) */}
            <div className="xl:col-span-8 space-y-2">
              {/* 1. Welcome Greeting Banner + Quick Stat Cards */}
              <WelcomeBanner
                student={student}
                onOpenAskModal={() => setIsAskModalOpen(true)}
                onContinueLearning={() => handleOpenSubject(SUBJECTS_DATA[0])}
              />

              {/* 2. My Subjects Grid (The 5 Subjects) */}
              <SubjectsGrid
                onSubjectClick={handleOpenSubject}
                onAskDoubtForSubject={handleAskDoubtForSubject}
              />

              {/* 3. Learning Progress Donut + Recent Activity Trail */}
              <ProgressAndActivity
                onOpenAskModal={() => setIsAskModalOpen(true)}
                onOpenMisconceptions={() => setIsMisconceptionsOpen(true)}
                onOpenConceptMap={() => setIsConceptMapOpen(true)}
              />
            </div>

            {/* Right Column Widget Area (4 cols on XL screens) */}
            <div className="xl:col-span-4">
              <RightSidebar
                onOpenAskModal={() => setIsAskModalOpen(true)}
                onOpenConceptMap={() => setIsConceptMapOpen(true)}
                onOpenMisconceptions={() => setIsMisconceptionsOpen(true)}
              />
            </div>

          </div>
        </main>
      </div>

      {/* Modals & Dialogs */}
      <AskEduNodeModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />

      <ConceptMapModal
        isOpen={isConceptMapOpen}
        onClose={() => setIsConceptMapOpen(false)}
        onAskAboutConcept={handleAskAboutConcept}
      />

      <MisconceptionsModal
        isOpen={isMisconceptionsOpen}
        onClose={() => setIsMisconceptionsOpen(false)}
        onOpenAskModal={() => {
          setIsMisconceptionsOpen(false);
          setIsAskModalOpen(true);
        }}
      />

      <SubjectDetailModal
        subject={activeSubjectModal}
        isOpen={Boolean(activeSubjectModal)}
        onClose={() => setActiveSubjectModal(null)}
        onAskDoubt={(chap) => {
          setActiveSubjectModal(null);
          setIsAskModalOpen(true);
        }}
      />
    </div>
  );
}
