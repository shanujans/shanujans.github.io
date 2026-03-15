import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

const WORKER_URL = 'https://gemini-proxy.shanujansh.workers.dev';

const SYSTEM_CONTEXT = `You are Shanujan's portfolio AI assistant. Your name is "ARIA".

About Shanujan Suresh:
- IT professional transitioning into AI/ML, based in Sri Lanka
- Skills: Python, IT Support, System Administration, Cloud Platforms, Cybersecurity, Quantum Computing, Blockchain, Web Development, Telegram Bots
- Projects:
  * Quantum Random Number Generator (IBM Quantum computers, cryptography)
  * Loan Risk Predictor — PyPI package (Decision Tree, 87.5% accuracy, CI/CD, GitHub Actions)
  * Loan Risk Prediction IBM AutoAI (Watson Studio, SnapML, 77% accuracy)
  * Telegram File Uploader Bot (AsyncIO, VirusTotal API, user tiers)
  * Academic Ally Telegram Bot (NLP, plagiarism detection)
  * Student Management System C# (SQL Server, .NET, desktop app)
  * Instagram Profile Tracker (Python, Tor, educational)
  * Student Management System Java (JavaFX, OOP)
- Contact: GitHub: shanujans | LinkedIn: shanujansuresh | Telegram: @Revmatrix | Instagram: shanujan_29
- Email available via the Contact section copy button
- Available for work and open to collaboration

Answer questions about Shanujan's skills, projects, experience, and how to contact him.
Be concise (2-3 sentences max unless asked for detail). Be friendly and professional.
If asked something unrelated to the portfolio, politely redirect.`;

const SUGGESTED = [
  'What are your top skills?',
  'Tell me about your projects',
  'Are you available for hire?',
  'What tech stack do you use?',
];

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm **ARIA** 👋 — Shanujan's portfolio assistant.\nAsk me anything about his skills, projects, or how to get in touch!" },
  ]);
  const [input, setInput]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [error, setError]       = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) { setHasUnread(false); setTimeout(() => inputRef.current?.focus(), 150); }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError('');

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for Gemini
      const contents = [...messages, userMsg].map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // Call Cloudflare Worker proxy — no API key in browser
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents,
          generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as {error?: string}).error || `Error ${res.status}`);
      }

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?? "Sorry, I couldn't generate a response. Please try again.";

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!isOpen) setHasUnread(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';

      // Friendly message if Worker URL not configured yet
      const isMisconfigured = WORKER_URL.includes('YOUR_WORKER_NAME');
      setError(isMisconfigured
        ? '⚙️ Worker URL not configured yet. See worker/gemini-proxy.js setup guide.'
        : `⚠️ ${msg}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Safely escape HTML before applying minimal markdown formatting
  const escapeHtml = (text: string): string =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  // Render simple markdown bold + newlines on escaped text
  const renderMessage = (content: string) =>
    escapeHtml(content)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');

  return (
    <>
      {/* ── Chat window ───────────────────────────────────── */}
      <div
        className="fixed bottom-20 right-6 z-50 flex flex-col rounded-2xl overflow-hidden border border-white/10"
        style={{
          width: '340px', height: '500px',
          background: 'rgba(10,10,20,0.97)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,255,157,0.06)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10"
          style={{ background: 'rgba(0,255,157,0.04)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00ff9d]/15 border border-[#00ff9d]/30 flex items-center justify-center text-sm">🤖</div>
            <div>
              <div className="text-sm font-bold text-white font-jetbrains-mono">ARIA</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                <span className="text-[10px] text-gray-500 font-jetbrains-mono">Powered by Gemini • Secure Proxy</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-white transition-colors">
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-[#00ff9d]/15 border border-[#00ff9d]/25 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs">🤖</div>
              )}
              <div
                className={`max-w-[80%] px-3 py-2.5 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#00ff9d]/12 text-white border border-[#00ff9d]/20 rounded-br-sm'
                    : 'bg-white/5 text-gray-200 border border-white/8 rounded-bl-sm'
                }`}
                dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }}
              />
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-[#00ff9d]/15 border border-[#00ff9d]/25 flex items-center justify-center mr-2 flex-shrink-0 text-xs">🤖</div>
              <div className="px-4 py-3 rounded-xl rounded-bl-sm bg-white/5 border border-white/8">
                <div className="flex gap-1 items-center">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]"
                      style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-jetbrains-mono">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions — only at start */}
        {messages.length <= 1 && !isLoading && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => sendMessage(q)}
                className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:border-[#00ff9d]/40 hover:text-white transition-all font-jetbrains-mono">
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask me anything..."
              className="flex-1 text-sm px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff9d]/50 font-jetbrains-mono transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-lg bg-[#00ff9d] text-[#0a0a14] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <i className="fas fa-paper-plane text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* ── FAB ───────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(s => !s)}
        className="fixed bottom-6 right-20 z-50 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: isOpen ? 'rgba(10,10,20,0.9)' : 'linear-gradient(135deg,#00ff9d,#00b3ff)',
          border: isOpen ? '1px solid rgba(0,255,157,0.3)' : 'none',
          boxShadow: isOpen ? '0 0 20px rgba(0,255,157,0.15)' : '0 0 25px rgba(0,255,157,0.35)',
          color: isOpen ? '#00ff9d' : '#0a0a14',
        }}
        aria-label="Open AI assistant"
      >
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#0a0a14]" />
        )}
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-lg`} />
      </button>
    </>
  );
};

export default AIChatBot;
