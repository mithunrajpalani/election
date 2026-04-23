import React from 'react';
import { Check } from 'lucide-react';
import './ProgressTracker.css';

interface ProgressTrackerProps {
  progress: {
    timeline: boolean;
    explainers: boolean;
    quiz: boolean;
  };
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const steps = [
    { id: 'timeline', label: 'Timeline', completed: progress.timeline },
    { id: 'explainers', label: 'Key Concepts', completed: progress.explainers },
    { id: 'quiz', label: 'Quiz', completed: progress.quiz },
  ];

  const completedCount = steps.filter(step => step.completed).length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <span className="progress-title">Your Civic Journey</span>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="progress-steps">
        {steps.map((step) => (
          <div key={step.id} className={`progress-step ${step.completed ? 'completed' : ''}`}>
            <div className="step-indicator">
              {step.completed && <Check size={12} strokeWidth={3} />}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
