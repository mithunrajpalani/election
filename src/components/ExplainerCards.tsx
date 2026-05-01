import React from 'react';
import { DATA } from '../data/electionData';
import './ExplainerCards.css';

interface ExplainerCardsProps {
  onInteract?: () => void;
}

/**
 * ExplainerCards Component
 * Displays key election concepts as interactive flip cards.
 * Optimized with React.memo for efficiency and enhanced with ARIA roles for accessibility.
 */
const ExplainerCards: React.FC<ExplainerCardsProps> = React.memo(({ onInteract }) => {
  return (
    <div className="explainer-container">
      <h2 id="explainers-heading" className="text-center explainer-heading">Key Election Concepts</h2>
      <div className="cards-grid" role="list" aria-labelledby="explainers-heading">
        {DATA.explainers.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className="explainer-card animate-fade-in" 
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={onInteract}
              onFocus={onInteract}
              tabIndex={0}
              role="listitem"
              aria-label={`Learn about ${item.title}. Press Enter to flip.`}
            >
              <div className="card-inner">
                <div className="card-front" aria-hidden="false">
                  <div className="icon-wrapper">
                    <Icon size={40} className="explainer-icon" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-instruction">Hover or focus to learn more</p>
                </div>
                <div className="card-back" aria-hidden="true">
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
});

export default ExplainerCards;
