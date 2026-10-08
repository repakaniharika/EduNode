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
### Architecture Overview

EduNode follows an adaptive learning loop:

**Student → Understand → Retrieve → Teach → Evaluate → Adapt**

1. **Student Interface**  
   Students interact with EduNode through the React-based web interface using text or voice.

2. **Voice & Language Layer**  
   Voice input is converted into text using the speech recognition pipeline. The language layer supports English and Indian regional languages.

3. **FastAPI Backend**  
   The backend coordinates the tutoring, curriculum retrieval, misconception detection, adaptive learning, and voice services.

4. **Curriculum RAG**  
   The RAG pipeline retrieves relevant curriculum content and provides grounded context to the AI tutor.

5. **Gemma AI Tutor**  
   Gemma generates explanations and tutoring responses using the student's question and retrieved curriculum context.

6. **Misconception Detection**  
   The student's response is analyzed to identify potential misconceptions and determine whether their reasoning is correct.

7. **Knowledge State & Adaptive Engine**  
   The system updates the student's mastery state and selects an appropriate teaching strategy based on the student's performance.

8. **Personalized Response**  
   The AI generates the next explanation based on the student's knowledge level and detected misconceptions.

9. **Dashboards**  
   Student progress, mastery, and learning-state information are surfaced through the dashboard. Teachers can provide or manage learning material used by the curriculum pipeline.


### Technology Stack


| Category        | Technologies                |
| --------------- | --------------------------- |
| Frontend        | React 18, Vite, Tailwind CSS, Lucide Icons |
| Backend         |  Python, FastAPI , Pydantic |
| Database        | [N/A]        |
| AI / ML         | Gemma 2B, RAG               |
| Infrastructure  | local development        |
| APIs / Services | FastAPI REST API           |


If a category or technology is not implemented in the project, specify `N/A` instead of leaving the field blank.

### How It Works

### How It Works

EduNode follows an adaptive learning loop:

**Student → Understand → Retrieve → Teach → Evaluate → Adapt**

1. **Student Interaction**  
   The student interacts with EduNode through the React-based web interface using text or voice.

2. **Voice & Language Processing**  
   Voice input is converted into text through the speech-to-text pipeline. The language module identifies and routes supported languages to the appropriate speech-processing backend.

3. **FastAPI Backend**  
   The FastAPI backend coordinates the tutoring pipeline and connects the frontend with the AI, RAG, misconception detection, adaptive learning, and voice components.

4. **Curriculum Retrieval**  
   The RAG pipeline retrieves relevant curriculum content and provides grounded context for the tutor.

5. **AI Tutoring with Gemma**  
   Gemma generates a response using the student's question, curriculum context, and learning state.

6. **Misconception Detection**  
   The system analyzes the student's response to identify potential misconceptions and understand where the student is struggling.

7. **Adaptive Learning**  
   The student's knowledge state and mastery are updated. The adaptive engine selects an appropriate teaching strategy based on the student's performance.

8. **Personalized Response**  
   Gemma generates the next explanation according to the student's current understanding and detected misconceptions.

9. **Voice Output**  
   When voice interaction is enabled, the generated response can be converted back into speech using the text-to-speech pipeline.

10. **Progress Visualization**  
    Learning-state information can be surfaced through the student dashboard to help visualize mastery and progress.

### Technical Decisions

### Technical Decisions

- **FastAPI** was selected as the backend framework to provide lightweight REST APIs and allow the different AI modules to be integrated into a single backend service.
- **Gemma 2B** was selected as the core tutoring model because its relatively lightweight size makes it suitable for local and resource-constrained AI applications.
- **RAG** is used to ground tutor responses in curriculum material rather than relying only on the model's general knowledge.
- **Misconception Detection** is separated from response generation so that identifying a student's misunderstanding and generating the teaching response can be handled as distinct stages.
- **Adaptive Learning** uses the student's mastery state and detected misconceptions to determine how the next explanation should be delivered.
- **Modular Voice Architecture** separates speech-to-text, language detection, audio preprocessing, and text-to-speech so individual components can be replaced or improved independently.
- **React + Vite + Tailwind CSS** were used for the frontend to enable rapid development of an interactive dashboard during the hackathon.

## Implementation During the Hackathon

## Implementation During the Hackathon

During the hackathon, the team developed the core components of EduNode as separate modules and integrated them toward a unified adaptive tutoring platform.

The implemented components include:

- React-based student dashboard and tutoring interface.
- Curriculum-aware RAG and retrieval components.
- Gemma-based AI tutoring and response generation.
- Misconception detection and adaptive learning logic.
- Student knowledge-state and mastery tracking.
- Multilingual voice processing with speech-to-text and text-to-speech components.
- FastAPI backend structure for connecting the AI modules with the frontend.

### Team Contributions

- **Pavitra:** Designed and developed the Student Dashboard UI using React, Vite, and Tailwind CSS; implemented Curriculum Board/Language switchers, Subject Mastery cards, Misconception Radar, and interactive AI Tutor modal.
- **Niharika:** Team Lead; developed the Voice & Language integration, coordinated system integration, and managed the project repository.
- **Daphna:** Developed the Curriculum Grounding and RAG pipeline for retrieving relevant learning content.
- **Harini:** Developed the Gemma AI integration, adaptive tutoring logic, and misconception detection components.

## Working Application

The application can currently be run locally for demonstration and testing.

**Local Frontend:** `http://localhost:5173`

**Local Backend API:** `http://localhost:8000`

Deployment URL: 

**Live Application: 

## Open Source and AI Usage

### AI / Models

- **Gemma 2B:** Used as the core AI tutoring model for generating adaptive explanations and supporting misconception analysis.
- **Whisper:** Used for English speech-to-text processing.
- **IndicConformer:** Used for speech recognition for supported Indian regional languages.
- **Piper:** Used for local English text-to-speech.
- **IndicF5:** Used for Indian-language text-to-speech processing.
- **RAG Pipeline:** Used to retrieve relevant curriculum material and provide grounded context to the AI tutor.

### Open Source Components

- **React 18:** Frontend UI library.
- **Vite:** Frontend build tool and development server.
- **Tailwind CSS:** Utility-first CSS framework.
- **Lucide React:** UI icon library.
- **FastAPI:** Python backend API framework.
- **Pydantic:** Data validation and API schemas.
- **Uvicorn:** ASGI server for running the FastAPI backend.
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
