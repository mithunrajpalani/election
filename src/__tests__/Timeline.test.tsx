import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Timeline from '../components/Timeline';
import { DATA } from '../data/electionData';

describe('Timeline Component', () => {
  it('renders all timeline steps', () => {
    render(<Timeline />);
    expect(screen.getByText('The Election Process')).toBeInTheDocument();
    
    // Check if the titles of the items are present
    DATA.timeline.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.date)).toBeInTheDocument();
    });
  });

  it('toggles expansion state when clicked', () => {
    render(<Timeline />);
    const firstItem = DATA.timeline[0];
    const contentDiv = screen.getByText(firstItem.title).closest('.timeline-content');
    
    expect(contentDiv).toHaveAttribute('aria-expanded', 'false');
    
    // Click to expand
    if (contentDiv) {
      fireEvent.click(contentDiv);
    }
    
    expect(contentDiv).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(firstItem.details)).toBeVisible();
    
    // Click again to collapse
    if (contentDiv) {
      fireEvent.click(contentDiv);
    }
    
    expect(contentDiv).toHaveAttribute('aria-expanded', 'false');
  });
});
