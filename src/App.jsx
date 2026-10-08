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
  const [askInitialQuery, setAskInitialQuery] = useState('');
  const [isConceptMapOpen, setIsConceptMapOpen] = useState(false);
  const [isMisconceptionsOpen, setIsMisconceptionsOpen] = useState(false);
  const [activeSubjectModal, setActiveSubjectModal] = useState(null);

  const handleOpenAskModal = (initialText = '') => {
    setAskInitialQuery(initialText);
    setIsAskModalOpen(true);
  };

  const handleOpenSubject = (subject) => {
    setActiveSubjectModal(subject);
  };

  const handleAskDoubtForSubject = (subject) => {
    handleOpenAskModal(`I have a doubt regarding ${subject.name}: ${subject.activeChapter}`);
  };

  const handleAskAboutConcept = (conceptName) => {
    handleOpenAskModal(`Can you explain the intuition behind: ${conceptName}?`);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex text-slate-800 antialiased font-sans">
      {/* Minimal Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLang={selectedLang}
        onOpenAskModal={() => handleOpenAskModal()}
        onOpenConceptMap={() => setIsConceptMapOpen(true)}
        onOpenMisconceptions={() => setIsMisconceptionsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Minimal Top Header */}
        <TopHeader
          student={student}
          selectedBoard={selectedBoard}
          setSelectedBoard={setSelectedBoard}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          onOpenAskModal={() => handleOpenAskModal()}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1500px] w-full mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* Primary Main Content (8 cols on XL screens) */}
            <div className="xl:col-span-8 space-y-2">
              {/* 1. Minimalist Hero + Doubt Bar + Clean Metrics */}
              <WelcomeBanner
                student={student}
                selectedLang={selectedLang}
                selectedBoard={selectedBoard}
                onOpenAskModal={handleOpenAskModal}
                onContinueLearning={() => handleOpenSubject(SUBJECTS_DATA[0])}
              />

              {/* 2. Sleek Subjects Overview */}
              <SubjectsGrid
                selectedLang={selectedLang}
                onSubjectClick={handleOpenSubject}
                onAskDoubtForSubject={handleAskDoubtForSubject}
              />

              {/* 3. Balanced Learning Focus (Misconceptions + Activity) */}
              <ProgressAndActivity
                selectedLang={selectedLang}
                onOpenAskModal={() => handleOpenAskModal()}
                onOpenMisconceptions={() => setIsMisconceptionsOpen(true)}
                onOpenConceptMap={() => setIsConceptMapOpen(true)}
              />
            </div>

            {/* Streamlined Right Sidebar (4 cols on XL screens) */}
            <div className="xl:col-span-4">
              <RightSidebar
                selectedLang={selectedLang}
                onOpenAskModal={() => handleOpenAskModal()}
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
        onClose={() => {
          setIsAskModalOpen(false);
          setAskInitialQuery('');
        }}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        selectedBoard={selectedBoard}
        initialQuery={askInitialQuery}
      />

      <ConceptMapModal
        isOpen={isConceptMapOpen}
        onClose={() => setIsConceptMapOpen(false)}
        selectedLang={selectedLang}
        onAskAboutConcept={handleAskAboutConcept}
      />

      <MisconceptionsModal
        isOpen={isMisconceptionsOpen}
        onClose={() => setIsMisconceptionsOpen(false)}
        selectedLang={selectedLang}
        onOpenAskModal={() => {
          setIsMisconceptionsOpen(false);
          handleOpenAskModal();
        }}
      />

      <SubjectDetailModal
        subject={activeSubjectModal}
        isOpen={Boolean(activeSubjectModal)}
        onClose={() => setActiveSubjectModal(null)}
        selectedLang={selectedLang}
        onAskDoubt={(chap) => {
          setActiveSubjectModal(null);
          handleOpenAskModal(`Help me with ${chap}`);
        }}
      />
    </div>
  );
}
