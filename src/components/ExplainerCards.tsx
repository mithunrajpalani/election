import React from 'react';
import { explainerData } from '../data/explainerData';
import './ExplainerCards.css';

interface ExplainerCardsProps {
  onInteract?: () => void;
}

const ExplainerCards: React.FC<ExplainerCardsProps> = ({ onInteract }) => {
  return (
    <div className="explainer-container">
      <h2 className="text-center explainer-heading">Key Election Concepts</h2>
      <div className="cards-grid">
        {explainerData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className="explainer-card animate-fade-in" 
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={onInteract}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="icon-wrapper">
                    <Icon size={40} className="explainer-icon" strokeWidth={1.5} />
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-instruction">Hover to learn more</p>
                </div>
                <div className="card-back">
                  <h3 className="card-title-back">{item.title}</h3>
                  <p className="card-content">{item.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExplainerCards;
