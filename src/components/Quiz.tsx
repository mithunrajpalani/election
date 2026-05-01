import React, { useState, useCallback, useMemo } from 'react';
import { DATA } from '../data/electionData';
import { trackEvent } from '../utils/analytics';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import './Quiz.css';

interface QuizProps {
  onInteract?: () => void;
}

/**
 * Quiz Component
 * Renders an interactive multiple-choice quiz about the election process.
 * Optimized with React.memo and hooks for performance and accessibility.
 */
const Quiz: React.FC<QuizProps> = React.memo(({ onInteract }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const quizQuestions = DATA.quiz;
  const question = useMemo(() => quizQuestions[currentQuestionIndex], [currentQuestionIndex, quizQuestions]);

  const handleAnswerClick = useCallback((index: number) => {
    if (isAnswerRevealed) return;
    
    if (onInteract) onInteract();
    
    setSelectedAnswer(index);
    setIsAnswerRevealed(true);

    if (index === question.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  }, [isAnswerRevealed, onInteract, question.correctAnswerIndex]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      setShowResults(true);
      trackEvent('quiz_completed', 'Quiz', `Score: ${score}`, score);
    }
  }, [currentQuestionIndex, quizQuestions.length, score]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setShowResults(false);
  }, []);

  if (showResults) {
    return (
      <div className="quiz-container card" role="status" aria-live="polite">
        <div className="quiz-results text-center animate-fade-in">
          <h2 id="quiz-completed-heading" className="quiz-heading">Quiz Completed!</h2>
          <div className="score-display">
            <span className="score-number text-gold">{score}</span>
            <span className="score-total">/ {quizQuestions.length}</span>
          </div>
          <p className="score-message">
            {score === quizQuestions.length ? "Perfect score! You're an election expert." : "Good effort! Keep learning about the election process."}
          </p>
          <button className="btn-primary" onClick={resetQuiz} aria-label="Retake Quiz">
            <RotateCcw size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} aria-hidden="true" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container card">
      <h2 id="quiz-heading" className="text-center quiz-heading">Test Your Knowledge</h2>
      
      <div 
        className="quiz-progress-bar" 
        role="progressbar" 
        aria-valuenow={Math.round((currentQuestionIndex / quizQuestions.length) * 100)} 
        aria-valuemin={0} 
        aria-valuemax={100} 
        aria-label="Quiz progress"
      >
        <div 
          className="quiz-progress-fill" 
          style={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
        ></div>
      </div>
      
      <p className="question-count" aria-live="polite">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
      
      <div className="quiz-question-section animate-fade-in" key={currentQuestionIndex}>
        <h3 className="question-text">{question.question}</h3>
        
        <div className="options-grid" role="radiogroup" aria-labelledby="quiz-heading">
          {question.options.map((option, index) => {
            let optionClass = "quiz-option";
            const isCorrect = index === question.correctAnswerIndex;
            const isSelected = selectedAnswer === index;
            
            if (isAnswerRevealed) {
              if (isCorrect) {
                optionClass += " correct";
              } else if (isSelected) {
                optionClass += " incorrect";
              } else {
                optionClass += " disabled";
              }
            } else if (isSelected) {
              optionClass += " selected";
            }

            return (
              <button 
                key={index} 
                className={optionClass}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswerRevealed}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isAnswerRevealed && !isSelected && !isCorrect ? -1 : 0}
                aria-label={`${option}${isAnswerRevealed ? (isCorrect ? ' - Correct Answer' : (isSelected ? ' - Incorrect Answer' : '')) : ''}`}
              >
                <span>{option}</span>
                {isAnswerRevealed && isCorrect && <CheckCircle2 className="result-icon" size={20} aria-hidden="true" />}
                {isAnswerRevealed && isSelected && !isCorrect && <XCircle className="result-icon" size={20} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
        
        {isAnswerRevealed && (
          <div className="explanation-section animate-fade-in" role="alert" aria-live="assertive">
            <p className="explanation-text"><strong>Explanation:</strong> {question.explanation}</p>
            <button className="btn-primary next-btn" onClick={handleNextQuestion}>
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Quiz;
