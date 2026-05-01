import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Quiz from '../components/Quiz';
import { DATA } from '../data/electionData';

describe('Quiz Component', () => {
  it('renders the first question', () => {
    render(<Quiz />);
    expect(screen.getByText('Test Your Knowledge')).toBeInTheDocument();
    expect(screen.getByText(DATA.quiz[0].question)).toBeInTheDocument();
  });
});
