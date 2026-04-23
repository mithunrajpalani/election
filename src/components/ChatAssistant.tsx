import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import './ChatAssistant.css';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: 'Hi! I am the ElectionGuide Assistant. Ask me anything about the Indian election process, voting methods, or eligibility!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
         setMessages(prev => [...prev, { 
           role: 'model', 
           content: '⚠️ No Gemini API key found. Please add VITE_GEMINI_API_KEY to your .env file to enable chat.' 
         }]);
         setIsLoading(false);
         return;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                role: 'user',
                parts: [{ 
                    text: `SYSTEM INSTRUCTION: You are an expert on India's election process and the Election Commission of India. Answer questions about Indian elections, voter rights, EVM machines, constituency types, Lok Sabha vs Rajya Sabha, the role of the ECI, and civic participation in a clear, neutral, and helpful way.\n\nUSER QUESTION: ${userMessage}` 
                }]
            }
        ],
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || 'Sorry, I could not process that request.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', content: 'An error occurred while communicating with the AI. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      {isOpen ? (
        <div className="chat-container">
          <div className="chat-header">
            <div>
              <h3 className="chat-title">Election Assistant</h3>
              <p className="chat-subtitle">Powered by Gemini AI</p>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-messages">
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
              <div className="message message-model loading">
                <Loader2 size={16} className="spin" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={isLoading}
            />
            <button type="submit" className="chat-submit" disabled={!input.trim() || isLoading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;
