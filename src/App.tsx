import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import ProgressTracker from './components/ProgressTracker';
import Timeline from './components/Timeline';
import ExplainerCards from './components/ExplainerCards';
import Quiz from './components/Quiz';
import './App.css';

const ChatAssistant = lazy(() => import('./components/ChatAssistant').then(module => ({ default: module.ChatAssistant })));

// Wrap components in React.memo for efficiency
const MemoizedProgressTracker = React.memo(ProgressTracker);
const MemoizedTimeline = React.memo(Timeline);
const MemoizedExplainerCards = React.memo(ExplainerCards);
const MemoizedQuiz = React.memo(Quiz);

function App() {
  const [progress, setProgress] = useState({
    timeline: false,
    explainers: false,
    quiz: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Use useCallback to memoize progress update function
  const updateProgress = useCallback((section: keyof typeof progress) => {
    setProgress(prev => {
      if (!prev[section]) {
        return { ...prev, [section]: true };
      }
      return prev;
    });
  }, []);

  if (isLoading) {
    return (
      <div data-testid="skeleton-loader" className="skeleton-loader" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ width: '60%', height: '40px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '20px', animation: 'pulse 1.5s infinite' }}></div>
        <div style={{ width: '40%', height: '20px', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app animate-fade-in">
      <header className="hero" role="banner">
        <div className="container">
          <h1 className="hero-title">ElectionGuide</h1>
          <p className="hero-subtitle">Your guide to understanding how India elects its leaders</p>
        </div>
      </header>

      <main id="main-content" className="container" role="main">
        <MemoizedProgressTracker progress={progress} />

        <section id="timeline" className="section" aria-labelledby="timeline-heading">
          <MemoizedTimeline onInteract={() => updateProgress('timeline')} />
        </section>

        <section id="explainers" className="section bg-light" aria-labelledby="explainers-heading">
          <MemoizedExplainerCards onInteract={() => updateProgress('explainers')} />
        </section>

        <section id="quiz" className="section" aria-labelledby="quiz-heading">
          <MemoizedQuiz onInteract={() => updateProgress('quiz')} />
        </section>
      </main>

      <footer className="footer" role="contentinfo">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} ElectionGuide. For educational purposes.</p>
        </div>
      </footer>

      <Suspense fallback={null}>
        <ChatAssistant />
      </Suspense>
    </div>
  );
}

export default App;
