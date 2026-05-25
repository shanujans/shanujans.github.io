import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

const WORKER_URL = 'https://gemini-proxy.shanujansh.workers.dev';

const SYSTEM_CONTEXT = `You are ARIA — the AI assistant on Shanujan Suresh's portfolio website.

IMPORTANT: Be honest at all times. Never overclaim Shanujan's skills.

ABOUT SHANUJAN SURESH (honest profile):
- IT Support professional from Sri Lanka with 4+ years of hands-on experience
- His IT support was at a small construction company (Pravin Construct Works)
- His strongest emerging technical skill is AI tools — specifically Google Gemini API and Cloudflare Workers (this chatbot is proof)
- Currently studying BSc Computer Science at University of the People (2025–present)
- Target roles: IT Support Specialist, Service Desk Analyst, AI Tools Specialist, QA Manual Tester, Junior SRE Intern

HONEST SKILL LEVELS:
- IT Support & Troubleshooting: ✅ Real experience — 4+ years
- Google Gemini API & AI Studio: ✅ Genuine skill — deployed this chatbot himself
- Cloudflare Workers & API proxying: ✅ Deployed and working
- Git & GitHub: ✅ Uses regularly
- Python: ⚠️ Beginner — needs AI assistance
- Linux: ⚠️ Beginner — basic commands only
- Web Development (React): ⚠️ AI-assisted
- Cybersecurity: ❌ Interest only
- Quantum Computing: ❌ Followed IBM tutorial — not a real skill

PROJECTS:
- ARIA Chatbot (this site): ✅ Real — Gemini API + Cloudflare Workers + React
- Q-Optima: Autonomous quantum logistics AI agent built for Milan AI Week 2026
- Loan Risk Predictor PyPI: Learning project, Decision Tree, 87.5% accuracy
- Student Management System C#: ESoft final year project

CONTACT: GitHub: shanujans | LinkedIn: shanujansuresh | Telegram: @Revmatrix | Portfolio: shanujan.is-a.dev

RESPONSE RULES:
1. Be warm, honest, and professional
2. Never claim skills Shanujan doesn't have
3. Keep replies to 2-3 sentences unless more detail asked
4. Highlight ARIA itself as his strongest AI tools proof point`;

const SUGGESTED = [
  'What are your real skills?',
  'Tell me about Q-Optima',
  'Are you available for hire?',
  'What is ARIA and how was it built?',
];

// Purple/pink accent colours
const ACCENT  = '#B600A8';
const ACCENT2 = '#7621B0';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm **ARIA** 👋 — Shanujan's AI portfolio assistant.\nAsk me anything about his skills, experience, or how to get in touch!" },
  ]);
  const [input, setInput]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [error, setError]         = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) { setHasUnread(false); setTimeout(() => inputRef.current?.focus(), 150); }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const escapeHtml = (t: string) =>
    t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
     .replace(/"/g,'&quot;').replace(/'/g,'&#39;');

  const renderMessage = (content: string) =>
    escapeHtml(content)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError('');
    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const contents = [...messages, userMsg].map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
          contents,
          generationConfig: { maxOutputTokens: 350, temperature: 0.7 },
        }),
      });
      if (!res.ok) throw new Error('Error ' + res.status + ': ' + await res.text().catch(() => ''));
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!isOpen) setHasUnread(true);
    } catch (err) {
      setError('⚠️ ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const chatBg    = 'rgba(12,12,12,0.97)';
  const borderCol = `rgba(182,0,168,0.2)`;

  return (
    <>
      {/* Chat window */}
      <div
        className="fixed bottom-20 right-4 md:right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: 'min(340px, calc(100vw - 32px))',
          height: '500px',
          background: chatBg,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${borderCol}`,
          boxShadow: `0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(182,0,168,0.08)`,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
          style={{ background: `rgba(182,0,168,0.06)`, borderColor: borderCol }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: `rgba(182,0,168,0.15)`, border: `1px solid rgba(182,0,168,0.3)` }}
            >
              🤖
            </div>
            <div>
              <div className="text-sm font-bold text-white font-jetbrains-mono">ARIA</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                <span className="text-[10px] text-[#D7E2EA]/40 font-jetbrains-mono">Portfolio Assistant · Secure</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[#D7E2EA]/40 hover:text-white transition-colors">
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5 text-xs"
                  style={{ background: `rgba(182,0,168,0.15)`, border: `1px solid rgba(182,0,168,0.25)` }}
                >
                  🤖
                </div>
              )}
              <div
                className="max-w-[80%] px-3 py-2.5 rounded-xl text-sm leading-relaxed"
                style={msg.role === 'user' ? {
                  background: `rgba(182,0,168,0.12)`,
                  color: 'white',
                  border: `1px solid rgba(182,0,168,0.2)`,
                  borderBottomRightRadius: '4px',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  color: '#D7E2EA',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderBottomLeftRadius: '4px',
                }}
                dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }}
              />
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs"
                style={{ background: 'rgba(182,0,168,0.15)', border: '1px solid rgba(182,0,168,0.25)' }}>🤖</div>
              <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex gap-1 items-center">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: ACCENT, animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="px-3 py-2 rounded-lg text-xs font-jetbrains-mono"
              style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171' }}>
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested */}
        {messages.length <= 1 && !isLoading && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => sendMessage(q)}
                className="text-xs px-2.5 py-1 rounded-full transition-all font-jetbrains-mono"
                style={{
                  border: `1px solid rgba(182,0,168,0.25)`,
                  background: 'rgba(182,0,168,0.05)',
                  color: '#D7E2EA',
                }}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: borderCol }}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Ask me anything..."
              className="flex-1 text-sm px-3 py-2.5 rounded-lg text-white placeholder-[#D7E2EA]/30 focus:outline-none font-jetbrains-mono transition-colors"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(182,0,168,0.15)`,
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(182,0,168,0.5)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(182,0,168,0.15)'; }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-40"
              style={{ background: `linear-gradient(123deg, #B600A8, #7621B0)` }}
            >
              <i className="fas fa-paper-plane text-sm text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setIsOpen(s => !s)}
        className="fixed bottom-6 right-4 md:right-20 z-50 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: isOpen
            ? 'rgba(12,12,12,0.9)'
            : 'linear-gradient(123deg, #B600A8, #7621B0)',
          border: isOpen ? `1px solid rgba(182,0,168,0.3)` : 'none',
          boxShadow: isOpen
            ? '0 0 20px rgba(182,0,168,0.15)'
            : '0 0 25px rgba(182,0,168,0.45)',
          color: isOpen ? ACCENT : '#fff',
        }}
        aria-label="Open AI assistant"
      >
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2"
            style={{ borderColor: '#0C0C0C' }} />
        )}
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-lg`} />
      </button>
    </>
  );
};

export default AIChatBot;