import { useState } from 'react';
import ProgressTracker from './components/ProgressTracker';
import Timeline from './components/Timeline';
import ExplainerCards from './components/ExplainerCards';
import Quiz from './components/Quiz';
import ChatAssistant from './components/ChatAssistant';
import './App.css';

function App() {
  const [progress, setProgress] = useState({
    timeline: false,
    explainers: false,
    quiz: false,
  });

  const updateProgress = (section: keyof typeof progress) => {
    if (!progress[section]) {
      setProgress(prev => ({ ...prev, [section]: true }));
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <h1 className="hero-title">ElectionGuide</h1>
          <p className="hero-subtitle">Your guide to understanding how India elects its leaders</p>
        </div>
      </header>

      <main className="container">
        <ProgressTracker progress={progress} />

        <section id="timeline" className="section">
          <Timeline onInteract={() => updateProgress('timeline')} />
        </section>

        <section id="explainers" className="section bg-light">
          <ExplainerCards onInteract={() => updateProgress('explainers')} />
        </section>

        <section id="quiz" className="section">
          <Quiz onInteract={() => updateProgress('quiz')} />
        </section>
      </main>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} ElectionGuide. For educational purposes.</p>
        </div>
      </footer>

      <ChatAssistant />
    </div>
  );
}

export default App;
