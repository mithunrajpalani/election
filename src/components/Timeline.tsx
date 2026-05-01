import React, { useState } from 'react';
import { DATA } from '../data/electionData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Timeline.css';

interface TimelineProps {
  onInteract?: () => void;
}

const Timeline: React.FC<TimelineProps> = React.memo(({ onInteract }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (onInteract) onInteract();
  };

  return (
    <div className="timeline-container">
      <h2 id="timeline-heading" className="section-title">The Election Process</h2>
      <div className="timeline" role="list">
        {DATA.timeline.map((item, index) => {
          const isExpanded = expandedId === item.id;
          
          return (
            <div key={item.id} className="timeline-item" role="listitem">
              <div className="timeline-marker" aria-hidden="true">{index + 1}</div>
              <div 
                className={`timeline-content ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpand(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                aria-controls={`timeline-panel-${item.id}`}
              >
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-step-title">{item.title}</h3>
                    <p className="timeline-date">{item.date}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="timeline-icon" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="timeline-icon" aria-hidden="true" />
                  )}
                </div>
                
                {isExpanded && (
                  <div id={`timeline-panel-${item.id}`} className="timeline-details animate-fade-in" role="region" aria-labelledby="timeline-heading">
                    <p>{item.details}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Timeline;
