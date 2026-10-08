import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const askTutor = () => {
    if (!message.trim()) return;
    setResponse(
      "EduNode is analyzing your question and adapting the explanation to your learning level."
    );
  };

  return (
    <div className="app">
      <header>
        <div>
          <h1>EduNode</h1>
          <p>Adaptive Multilingual AI Tutor</p>
        </div>
        <span className="badge">Gemma 2B • AI Tutor</span>
      </header>

      <main>
        <section className="hero">
          <h2>Learn smarter. Learn your way.</h2>
          <p>
            EduNode detects misconceptions, understands your curriculum,
            and adapts explanations to your learning needs.
          </p>
        </section>

        <section className="cards">
          <div className="card">
            <h3>🎯 Adaptive Learning</h3>
            <p>Explanations dynamically adapt to your mastery level.</p>
          </div>

          <div className="card">
            <h3>🧠 Misconception Detection</h3>
            <p>Identify gaps in understanding and receive targeted guidance.</p>
          </div>

          <div className="card">
            <h3>🌐 Multilingual</h3>
            <p>Learn using English and regional Indian languages.</p>
          </div>

          <div className="card">
            <h3>🎤 Voice Learning</h3>
            <p>Interact with EduNode using speech.</p>
          </div>
        </section>

        <section className="tutor">
          <h2>Ask EduNode</h2>

          <textarea
            placeholder="Ask a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={askTutor}>Ask Tutor</button>

          {response && (
            <div className="response">
              <strong>EduNode:</strong>
              <p>{response}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
