'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { X, Send, Bot, User } from 'lucide-react';

const MAX_REQUESTS_PER_SESSION = 5;
const STORAGE_KEY = 'kapil-ai-chat-count';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function getRequestCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementRequestCount(): number {
  const current = getRequestCount() + 1;
  try {
    localStorage.setItem(STORAGE_KEY, String(current));
  } catch {}
  return current;
}

interface ChatDrawerProps {
  onClose: () => void;
}

export function ChatDrawer({ onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = MAX_REQUESTS_PER_SESSION - requestCount;

  useEffect(() => {
    setRequestCount(getRequestCount());
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming || remaining <= 0) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);

    const newCount = incrementRequestCount();
    setRequestCount(newCount);

    const assistantMessage: ChatMessage = { role: 'assistant', content: '' };
    setMessages([...updatedMessages, assistantMessage]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: error || 'Something went wrong. Please try again.',
          };
          return updated;
        });
        setIsStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: fullContent,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Failed to connect. Please try again later.',
        };
        return updated;
      });
    }

    setIsStreaming(false);
  }, [input, isStreaming, remaining, messages]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-4 right-4 z-[60] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden"
      style={{
        background: 'var(--bg-overlay)',
        border: '1px solid var(--border-strong)',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded flex items-center justify-center"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
          >
            <Bot size={15} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
            >
              Ask Kapil AI
            </p>
            <p
              className="text-[11px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}
            >
              {remaining > 0 ? `${remaining} question${remaining !== 1 ? 's' : ''} remaining` : 'Limit reached'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded flex items-center justify-center transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
            >
              <Bot size={20} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
              >
                Hi! I know everything about Kapil.
              </p>
              <p
                className="text-xs mt-1"
                style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-tertiary)' }}
              >
                Ask about skills, projects, experience, or anything else.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center mt-2">
              {['What does Kapil do?', 'Tell me about his projects', 'What tech does he use?'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  className="text-[11px] px-2.5 py-1 rounded transition-colors"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-tertiary)',
                    border: '1px solid var(--border-default)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div
                className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
              >
                <Bot size={12} style={{ color: 'var(--text-secondary)' }} />
              </div>
            )}
            <div
              className="max-w-[80%] rounded px-3 py-2 text-sm leading-relaxed"
              style={
                msg.role === 'user'
                  ? {
                      background: 'var(--accent)',
                      color: 'var(--text-inverse)',
                      fontFamily: 'var(--font-ui)',
                    }
                  : {
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-ui)',
                    }
              }
            >
              {msg.content || (
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: 'var(--text-tertiary)', animationDelay: '300ms' }} />
                </span>
              )}
            </div>
            {msg.role === 'user' && (
              <div
                className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}
              >
                <User size={12} style={{ color: 'var(--text-secondary)' }} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        {remaining <= 0 ? (
          <div className="text-center py-3">
            <p className="text-xs" style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-tertiary)' }}>
              You&apos;ve used all 5 questions this session.
            </p>
            <p className="text-[11px] mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
              Refresh the page for a new session.
            </p>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 rounded px-3 py-1.5 transition-colors"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
            }}
            onFocusCapture={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-border)';
            }}
            onBlurCapture={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Kapil..."
              disabled={isStreaming}
              className="flex-1 bg-transparent text-sm outline-none py-1.5"
              style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-primary)' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="w-7 h-7 rounded flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Send size={14} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
