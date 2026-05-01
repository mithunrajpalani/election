import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders a skeleton loader initially', () => {
    render(<App />);
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });
});
