import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatAssistant } from '../components/ChatAssistant';

// Mock the Gemini API
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(function() {
      return {
        models: {
          generateContent: vi.fn().mockResolvedValue({
            text: 'This is a mocked AI response.',
          }),
        },
      };
    }),
  };
});

describe('ChatAssistant Component', () => {
  it('opens and closes the chat widget', () => {
    render(<ChatAssistant />);
    const toggleBtn = screen.getByRole('button', { name: /open election assistant chat/i });
    expect(toggleBtn).toBeInTheDocument();
  });
});
