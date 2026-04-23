import React, { useState } from 'react';
import { timelineData } from '../data/timelineData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Timeline.css';

interface TimelineProps {
  onInteract?: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onInteract }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (onInteract && expandedId !== id) {
      onInteract();
    }
  };

  return (
    <div className="timeline-container">
      <h2 className="text-center timeline-heading">The Election Process</h2>
      <div className="timeline">
        {timelineData.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="timeline-item animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="timeline-marker"></div>
              <div className="timeline-content card" onClick={() => toggleExpand(item.id)}>
                <div className="timeline-header">
                  <div>
                    <span className="timeline-date">{item.date}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                  </div>
                  <button className="expand-btn">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                <p className="timeline-description">{item.description}</p>
                <div className={`timeline-details ${isExpanded ? 'expanded' : ''}`}>
                  <p>{item.details}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
