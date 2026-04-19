import React, { useState } from 'react';

// ✏️ After deploying cv-gateway Worker, paste your Worker URL here:
const CV_GATEWAY_URL = 'https://cv-gateway.shanujansh.workers.dev';

type Step = 'details' | 'otp' | 'processing' | 'success' | 'error';

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
    } catch {
      setMessage('Network error. Please try again.'); setStep('error');
    } finally { setLoading(false); }
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
    } catch {
      setMessage('Network error. Please try again.'); setStep('error');
    } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl border border-white/10 overflow-hidden"
        style={{ background: 'rgba(10,10,20,0.98)', boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,255,157,0.08)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10"
          style={{ background: 'rgba(0,255,157,0.04)' }}>
          <div>
            <div className="text-white font-bold font-jetbrains-mono">Request CV Access</div>
            <div className="text-xs text-gray-500 font-jetbrains-mono mt-0.5">Work email required — verified delivery only</div>
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors">
            <i className="fas fa-times text-lg" />
          </button>
        </div>

        <div className="p-6">

          {/* Step: details */}
          {step === 'details' && (
            <form onSubmit={submitDetails} className="space-y-4">
              <div className="p-3 rounded-lg border border-[#00ff9d]/20 bg-[#00ff9d]/5 text-xs text-gray-400 font-jetbrains-mono">
                📋 Your details will be verified by AI before the CV is sent. Personal emails (Gmail, Outlook, etc.) are not accepted.
              </div>
              <div className="relative">
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder=" " className="contact-input peer w-full" />
                <label className="contact-label">Your Full Name</label>
              </div>
              <div className="relative">
                <input type="text" required value={org} onChange={e => setOrg(e.target.value)}
                  placeholder=" " className="contact-input peer w-full" />
                <label className="contact-label">Company / Organization</label>
              </div>
              <div className="relative">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder=" " className="contact-input peer w-full" />
                <label className="contact-label">Work Email (e.g. you@company.com)</label>
              </div>
              <button type="submit" disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Sending OTP...</>
                  : <>Send Verification Code <i className="fas fa-arrow-right text-sm" /></>}
              </button>
            </form>
          )}

          {/* Step: OTP */}
          {step === 'otp' && (
            <form onSubmit={submitOTP} className="space-y-4">
              <div className="p-3 rounded-lg border border-[#00b3ff]/20 bg-[#00b3ff]/5 text-xs text-gray-400 font-jetbrains-mono">
                ✉️ A 6-digit code was sent to <span className="text-white">{email}</span>. Check your inbox (and spam folder). Valid for 10 minutes.
              </div>
              <div className="relative">
                <input type="text" required maxLength={6} value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder=" " className="contact-input peer w-full text-center text-2xl tracking-[0.5em] font-jetbrains-mono" />
                <label className="contact-label">6-Digit Code</label>
              </div>
              <button type="submit" disabled={loading || otp.length !== 6}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                {loading
                  ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Verifying...</>
                  : <>Verify & Request CV <i className="fas fa-shield-halved text-sm" /></>}
              </button>
              <button type="button" onClick={() => setStep('details')}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-300 transition-colors font-jetbrains-mono">
                ← Back / Change email
              </button>
            </form>
          )}

          {/* Step: AI processing */}
          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#7700ff]/10 border border-[#7700ff]/30 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-brain text-2xl text-[#7700ff] animate-pulse" />
              </div>
              <p className="text-white font-bold mb-2">AI Agent Validating...</p>
              <p className="text-gray-400 text-sm">Analyzing your details. This takes a few seconds.</p>
              <div className="flex justify-center gap-1 mt-4">
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[#7700ff]"
                    style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {/* Step: success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-2xl text-[#00ff9d]" />
              </div>
              <p className="text-white font-bold text-lg mb-2">CV Sent! 🎉</p>
              <p className="text-gray-400 text-sm mb-6">{message}</p>
              <button onClick={handleClose} className="btn-secondary">Close</button>
            </div>
          )}

          {/* Step: error */}
          {step === 'error' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-times text-2xl text-red-400" />
              </div>
              <p className="text-white font-bold text-lg mb-2">Verification Failed</p>
              <p className="text-gray-400 text-sm mb-6">{message}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={reset} className="btn-secondary text-sm">Try Again</button>
                <button onClick={handleClose} className="btn-tertiary text-sm">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVRequestModal;
