import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import { trackEvent } from '../utils/analytics';
import './ChatAssistant.css';

/** 
 * WARNING: Do not hardcode or expose your API key in client-side code in production.
 * This implementation relies on Vite's environment variables. 
 * For production, consider using a backend proxy to securely call the Gemini API.
 */
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const MAX_CHARS = 500;
const RATE_LIMIT_MSGS = 5;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

/**
 * ChatAssistant Component
 * An AI-powered chat widget to answer user questions about the election.
 * @returns {JSX.Element} The ChatAssistant component.
 */
export const ChatAssistant: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: 'Hi! I am the ElectionGuide Assistant. Ask me anything about the Indian election process, voting methods, or eligibility!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageTimestamps, setMessageTimestamps] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Sanitizes input by removing basic HTML tags.
   * @param {string} str - Raw input string.
   * @returns {string} Sanitized string.
   */
  const sanitizeInput = useCallback((str: string) => {
    return DOMPurify.sanitize(str.replace(/<[^>]*>?/gm, '').substring(0, MAX_CHARS));
  }, []);

  /**
   * Handles sending a message to the AI and processing the response.
   * @param {React.FormEvent} [e] - Optional form submit event.
   */
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const now = Date.now();
    const recentMessages = messageTimestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    
    if (recentMessages.length >= RATE_LIMIT_MSGS) {
      setMessages(prev => [...prev, { role: 'model', content: '⏳ You are sending messages too fast. Please wait a minute and try again.' }]);
      return;
    }

    setMessageTimestamps([...recentMessages, now]);

    const sanitizedMessage = sanitizeInput(input.trim());
    setMessages(prev => [...prev, { role: 'user', content: sanitizedMessage }]);
    setInput('');
    setIsLoading(true);
    trackEvent('send_message', 'Chat', sanitizedMessage);

    // Check Cache
    const cacheKey = `chat_cache_${sanitizedMessage.toLowerCase()}`;
    const cachedResponse = sessionStorage.getItem(cacheKey);
    
    if (cachedResponse) {
      setMessages(prev => [...prev, { role: 'model', content: cachedResponse }]);
      setIsLoading(false);
      return;
    }

    try {
      if (!GEMINI_API_KEY) {
         setMessages(prev => [...prev, { 
           role: 'model', 
           content: '⚠️ No Gemini API key found. Please add VITE_GEMINI_API_KEY to your .env file to enable chat.' 
         }]);
         setIsLoading(false);
         return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: [
            {
                role: 'user',
                parts: [{ 
                    text: `SYSTEM INSTRUCTION: You are an expert on India's election process and the Election Commission of India. Answer questions about Indian elections, voter rights, EVM machines, constituency types, Lok Sabha vs Rajya Sabha, the role of the ECI, and civic participation in a clear, neutral, and helpful way.\n\nUSER QUESTION: ${sanitizedMessage}` 
                }]
            }
        ],
      });

      const rawResponseText = response.text || 'Sorry, I could not process that request.';
      // Use DOMPurify to sanitize markdown output securely
      const responseText = DOMPurify.sanitize(rawResponseText);
      
      // Save to cache
      sessionStorage.setItem(cacheKey, responseText);
      
      setMessages(prev => [...prev, { role: 'model', content: responseText }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${error.message || 'An error occurred while communicating with the AI. Please try again later.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget" aria-live="polite">
      {isOpen ? (
        <div className="chat-container" role="dialog" aria-labelledby="chat-title">
          <div className="chat-header">
            <div>
              <h3 id="chat-title" className="chat-title">Election Assistant</h3>
              <p className="chat-subtitle">Powered by Gemini AI</p>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat window">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          
          <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role === 'user' ? 'message-user' : 'message-model'}`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message message-model loading" aria-busy="true">
                <Loader2 size={16} className="spin" aria-hidden="true" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} tabIndex={-1} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
              aria-label="Type your message"
              maxLength={MAX_CHARS}
            />
            <button type="submit" className="chat-submit" disabled={!input.trim() || isLoading} aria-label="Send message">
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      ) : (
        <button 
          className="chat-toggle" 
          onClick={() => setIsOpen(true)}
          aria-label="Open Election Assistant Chat"
          aria-expanded="false"
        >
          <MessageCircle size={28} aria-hidden="true" />
        </button>
      )}
    </div>
  );
});

export default ChatAssistant;
