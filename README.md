## EduNode

EduNode is a multilingual, curriculum-aware AI tutor that detects student misconceptions and adapts its teaching in real time to improve learning outcomes.


## Team Banger 



| Member | Contribution   |
| ------ | -------------- |
| Niharika |Team Lead|
| Pavitra | Team member |
| Daphna  |Team member |
| Harini |Team member |


## Problem Statement
Students receive answers, but not truly personalized learning.

 ## The Problem

Most existing learning platforms provide generic, English-first answers without understanding a student’s curriculum, misconceptions, learning level, or regional language, making personalized education difficult—especially in low-connectivity environments.

### Why We Chose This Problem

Because every student learns differently, but most educational tools teach everyone the same way. We wanted to build an AI tutor that understands the student, not just the question.

## Solution

EduNode is a multilingual, curriculum-grounded AI tutor that identifies a student’s misconceptions and adapts its teaching to their individual learning needs.

It works through a simple cycle:

Student asks → EduNode understands → retrieves the relevant curriculum → explains → evaluates the student’s response → detects misconceptions → adapts the next explanation.

It also supports regional languages, voice interaction, teacher-uploaded study material, and learner progress tracking, giving both students and teachers a more personalized learning experience.

### Key Features

- [Adaptive AI Tutor — Understands each student’s responses and dynamically adjusts explanations and difficulty.]
- [Curriculum-Grounded RAG — Answers are based on the student’s specific curriculum, textbooks, and teacher-uploaded materials.]
- [Multilingual Voice Learning — Enables students to learn and interact naturally through regional languages and voice.]
- [Misconception & Learner Tracking — Detects why a student is struggling, builds a learning profile, and provides teachers with insights into common class-level gaps.]

## Innovation and Differentiation

[1.  Misconception-Aware Learning

Most AI tutors answer questions. EduNode identifies why a student is wrong and changes its teaching strategy accordingly.

Wrong answer → identify misconception → targeted explanation → re-test.

2.  Knowledge Graph + RAG

EduNode doesn't just retrieve textbook paragraphs. It understands relationships between concepts and prerequisites.

Quadratic Equations → Factorisation → Algebraic Expressions

This allows it to trace a student's knowledge gap back to the underlying concept.

3. 🇮🇳 True Multilingual Learning

The entire learning experience can switch between:

English • Hindi • Telugu • Tamil • Malayalam

—not just the chatbot response.

The UI, curriculum explanations, interaction and eventually voice experience can all follow the student's preferred language.

4.  Curriculum-First AI

Instead of giving generic internet-style answers, EduNode grounds learning in Class 10 NCERT curriculum and teacher-provided material.

So:

"Explain photosynthesis"

becomes:

"Explain photosynthesis according to my Class 10 curriculum, in my language, at my learning level."

5.  Designed for Low-Connectivity Education

EduNode is designed around the reality of rural classrooms:

Internet available → AI-powered personalized tutoring

Internet unavailable → cached curriculum + quizzes + Knowledge Graph + learner progress remain available

The system doesn't become useless when connectivity disappears.]

## Technical Implementation

### Architecture

[Add the system architecture or workflow Mermaid diagram here.]

### Technology Stack


| Category        | Technologies                |
| --------------- | --------------------------- |
| Frontend        | React 18, Vite, Tailwind CSS, Lucide Icons |
| Backend         |  Python, FastAPI , Pydantic |
| Database        | [Technologies / N/A]        |
| AI / ML         | Gemma 2B, RAG               |
| Infrastructure  | [Technologies / N/A]        |
| APIs / Services | [Services / N/A]            |


If a category or technology is not implemented in the project, specify `N/A` instead of leaving the field blank.

### How It Works

[Explain the major components of the system and how they interact.]

### Technical Decisions

[Explain important architectural, algorithmic, or engineering decisions made during development.]

## Implementation During the Hackathon

[Describe what the team built during the Hack Day and the major functionality or components completed during the event.]

### Team Contributions

- **Pavitra:** Designed & developed the Student Dashboard UI using React, Vite, and Tailwind CSS; implemented Curriculum Board/Language switchers, Subject Mastery cards, Misconception Radar, and interactive AI Tutor modal.
- **Niharika:** Voice & Language integration.
- **Daphna:** Curriculum Grounding & RAG pipeline.
- **Harini:** Gemma AI Model & Misconception Detection logic.

## Working Application

**Live Application:** http://localhost:5173

## Open Source and AI Usage

### AI / Models

- **Gemma 2B:** Light-weight instruction tuned model used for adaptive student explanations and misconception detection.

### Open Source Components

- **React 18:** Modern declarative UI library.
- **Vite:** High performance frontend build tool and dev server.
- **Tailwind CSS:** Utility-first styling framework.
- **Lucide React:** Icons for educational categories and dashboard navigation.

## Setup and Usage

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/repakaniharika/EduNode.git
cd EduNode
npm install
```

### Environment Variables

```env
VITE_APP_TITLE=EduNode
VITE_API_BASE_URL=http://localhost:8000
```

### Running the Project

```bash
npm run dev
```

### Usage

[Explain the basic steps required to use the project.]

## Devpost Submission

**Devpost Project:** [Devpost Project URL]

[Add the link to the team's Devpost submission. Ensure the Devpost project page is complete and contains the required project information, links, media, and team details.]

## Credits and License

### Credits

[Credit libraries, frameworks, datasets, models, APIs, contributors, and other external resources used.]

### License

[License name and/or link.]

## Submission Checklist

- [ ] Project title and description added
- [ ] All team members listed
- [ ] Problem clearly explained
- [ ] Reason for choosing the problem explained
- [ ] Solution and key features documented
- [ ] Innovation and differentiation explained
- [ ] Architecture included
- [ ] Technical implementation documented
- [ ] Work completed during the hackathon documented
- [ ] Team contributions documented
- [ ] Working application is functional
- [ ] Live application link added where applicable
- [ ] Demo video added
- [ ] AI and open-source components documented
- [ ] Setup and usage instructions tested
- [ ] Challenges and learnings documented
- [ ] Devpost submission completed
- [ ] Devpost link added
- [ ] Credits added
- [ ] License added
- [ ] Repository is organized and complete
