import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import './Quiz.css';

interface QuizProps {
  onInteract?: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onInteract }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = quizQuestions[currentQuestionIndex];

  const handleAnswerClick = (index: number) => {
    if (isAnswerRevealed) return;
    
    if (onInteract) onInteract();
    
    setSelectedAnswer(index);
    setIsAnswerRevealed(true);

    if (index === question.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="quiz-container card">
        <div className="quiz-results text-center animate-fade-in">
          <h2 className="quiz-heading">Quiz Completed!</h2>
          <div className="score-display">
            <span className="score-number text-gold">{score}</span>
            <span className="score-total">/ {quizQuestions.length}</span>
          </div>
          <p className="score-message">
            {score === quizQuestions.length ? "Perfect score! You're an election expert." : "Good effort! Keep learning about the election process."}
          </p>
          <button className="btn-primary" onClick={resetQuiz}>
            <RotateCcw size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container card">
      <h2 className="text-center quiz-heading">Test Your Knowledge</h2>
      
      <div className="quiz-progress-bar">
        <div 
          className="quiz-progress-fill" 
          style={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
        ></div>
      </div>
      
      <p className="question-count">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
      
      <div className="quiz-question-section animate-fade-in" key={currentQuestionIndex}>
        <h3 className="question-text">{question.question}</h3>
        
        <div className="options-grid">
          {question.options.map((option, index) => {
            let optionClass = "quiz-option";
            
            if (isAnswerRevealed) {
              if (index === question.correctAnswerIndex) {
                optionClass += " correct";
              } else if (index === selectedAnswer && index !== question.correctAnswerIndex) {
                optionClass += " incorrect";
              } else {
                optionClass += " disabled";
              }
            } else if (selectedAnswer === index) {
              optionClass += " selected";
            }

            return (
              <button 
                key={index} 
                className={optionClass}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswerRevealed}
              >
                <span>{option}</span>
                {isAnswerRevealed && index === question.correctAnswerIndex && <CheckCircle2 className="result-icon" size={20} />}
                {isAnswerRevealed && index === selectedAnswer && index !== question.correctAnswerIndex && <XCircle className="result-icon" size={20} />}
              </button>
            );
          })}
        </div>
        
        {isAnswerRevealed && (
          <div className="explanation-section animate-fade-in">
            <p className="explanation-text"><strong>Explanation:</strong> {question.explanation}</p>
            <button className="btn-primary next-btn" onClick={handleNextQuestion}>
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
