import React, { useState } from 'react';

const CV_GATEWAY_URL = 'https://cv-gateway.shanujansh.workers.dev';

type Step = 'details' | 'otp' | 'processing' | 'success' | 'error';

const ACCENT  = '#B600A8';
const ACCENT2 = '#7621B0';
const BG      = '#0C0C0C';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1.5px solid rgba(182,0,168,0.2)',
  borderRadius: '8px',
  padding: '1.4rem 1rem 0.6rem',
  color: '#D7E2EA',
  fontSize: '0.9rem',
  fontFamily: 'Kanit, sans-serif',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const FloatInput: React.FC<{
  type?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  maxLength?: number;
  extra?: React.CSSProperties;
}> = ({ type = 'text', label, value, onChange, required, maxLength, extra }) => {
  const [focused, setFocused] = React.useState(false);
  const lifted = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        placeholder=" "
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          ...extra,
          borderColor: focused ? ACCENT : 'rgba(182,0,168,0.2)',
          boxShadow: focused ? `0 0 0 3px rgba(182,0,168,0.08)` : 'none',
        }}
      />
      <label
        style={{
          position: 'absolute',
          top: lifted ? '0.25rem' : '1rem',
          left: '1rem',
          fontSize: lifted ? '0.62rem' : '0.82rem',
          color: lifted ? ACCENT : 'rgba(215,226,234,0.4)',
          background: BG,
          padding: '0 4px',
          pointerEvents: 'none',
          transition: 'all 0.2s ease',
          fontFamily: 'Kanit, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </label>
    </div>
  );
};

const CVRequestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep]       = useState<Step>('details');
  const [name, setName]       = useState('');
  const [org, setOrg]         = useState('');
  const [email, setEmail]     = useState('');
  const [otp, setOtp]         = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setStep('details'); setName(''); setOrg('');
    setEmail(''); setOtp(''); setMessage(''); setLoading(false);
  };
  const handleClose = () => { reset(); onClose(); };

  const submitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(CV_GATEWAY_URL + '/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, organization: org, email }),
      });
      const data = await res.json();
      if (!res.ok) { setMessage(data.error || 'Something went wrong.'); setStep('error'); }
      else setStep('otp');
    } catch { setMessage('Network error. Please try again.'); setStep('error'); }
    finally { setLoading(false); }
  };

  const submitOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStep('processing');
    try {
      const res = await fetch(CV_GATEWAY_URL + '/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) { setMessage(data.error || 'Verification failed.'); setStep('error'); }
      else { setMessage(data.message); setStep('success'); }
    } catch { setMessage('Network error. Please try again.'); setStep('error'); }
    finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: BG,
          border: `1px solid rgba(182,0,168,0.2)`,
          boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(182,0,168,0.08)`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ background: 'rgba(182,0,168,0.05)', borderColor: 'rgba(182,0,168,0.15)' }}
        >
          <div>
            <div className="text-white font-bold uppercase tracking-widest text-sm">Request CV Access</div>
            <div className="text-[#D7E2EA]/40 text-xs mt-0.5 font-light">Work email required · AI verified</div>
          </div>
          <button onClick={handleClose} className="text-[#D7E2EA]/40 hover:text-white transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-6">

          {/* Details step */}
          {step === 'details' && (
            <form onSubmit={submitDetails} className="space-y-4">
              <div
                className="p-3 rounded-xl text-xs font-light"
                style={{ background: 'rgba(182,0,168,0.06)', border: '1px solid rgba(182,0,168,0.15)', color: 'rgba(215,226,234,0.6)' }}
              >
                📋 Your details are AI-verified before the CV is delivered. Personal emails (Gmail, Outlook) are not accepted.
              </div>
              <FloatInput label="Your Full Name" value={name} onChange={setName} required />
              <FloatInput label="Company / Organization" value={org} onChange={setOrg} required />
              <FloatInput type="email" label="Work Email (you@company.com)" value={email} onChange={setEmail} required />
              <button
                type="submit"
                disabled={loading}
                className="w-full contact-btn flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending OTP...</>
                  : <>Send Verification Code <i className="fas fa-arrow-right text-sm" /></>}
              </button>
            </form>
          )}

          {/* OTP step */}
          {step === 'otp' && (
            <form onSubmit={submitOTP} className="space-y-4">
              <div
                className="p-3 rounded-xl text-xs font-light"
                style={{ background: 'rgba(118,33,176,0.07)', border: '1px solid rgba(118,33,176,0.2)', color: 'rgba(215,226,234,0.6)' }}
              >
                ✉️ A 6-digit code was sent to <span className="text-white font-medium">{email}</span>. Valid for 10 minutes.
              </div>
              <FloatInput
                label="6-Digit Code"
                value={otp}
                onChange={v => setOtp(v.replace(/\D/g, ''))}
                maxLength={6}
                required
                extra={{ textAlign: 'center', fontSize: '1.6rem', letterSpacing: '0.5em', fontFamily: 'monospace' }}
              />
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full contact-btn flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Verifying...</>
                  : <>Verify &amp; Request CV <i className="fas fa-shield-halved text-sm" /></>}
              </button>
              <button type="button" onClick={() => setStep('details')}
                className="w-full text-center text-xs font-light transition-colors"
                style={{ color: 'rgba(215,226,234,0.4)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D7E2EA')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(215,226,234,0.4)'}}>
                ← Back / Change email
              </button>
            </form>
          )}

          {/* Processing */}
          {step === 'processing' && (
            <div className="text-center py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(118,33,176,0.1)', border: '1px solid rgba(118,33,176,0.3)' }}
              >
                <i className="fas fa-brain text-2xl animate-pulse" style={{ color: ACCENT2 }} />
              </div>
              <p className="text-white font-bold mb-2">AI Agent Validating...</p>
              <p className="text-[#D7E2EA]/50 text-sm font-light">Analysing your details. This takes a few seconds.</p>
              <div className="flex justify-center gap-1 mt-4">
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full"
                    style={{ background: ACCENT2, animation: `bounce 1s ease-in-out ${i*0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="text-center py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(182,0,168,0.1)', border: `1px solid rgba(182,0,168,0.3)` }}
              >
                <i className="fas fa-check text-2xl" style={{ color: ACCENT }} />
              </div>
              <p className="text-white font-bold text-lg mb-2">CV Sent! 🎉</p>
              <p className="text-[#D7E2EA]/50 text-sm font-light mb-6">{message}</p>
              <button onClick={handleClose} className="contact-btn">Close</button>
            </div>
          )}

          {/* Error */}
          {step === 'error' && (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}>
                <i className="fas fa-times text-2xl text-red-400" />
              </div>
              <p className="text-white font-bold text-lg mb-2">Verification Failed</p>
              <p className="text-[#D7E2EA]/50 text-sm font-light mb-6">{message}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={reset} className="contact-btn text-sm">Try Again</button>
                <button onClick={handleClose}
                  className="rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/60 font-medium uppercase tracking-widest px-6 py-3 hover:bg-[#D7E2EA]/5 transition-all text-sm">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVRequestModal;