import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import Magnet from './Magnet';
import FadeIn from './FadeIn';
import CVRequestModal from './CVRequestModal';

const LOTTIE_URL = 'https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json';

const COMMANDS = [
  { 
    cmd: 'nmap -sV -p- 192.168.1.1', 
    delay: 2200, 
    output: [
      'Starting Nmap 7.92 at 2024-05-21 10:30 EDT', 
      'Nmap scan report for 192.168.1.1 (host up)', 
      'PORT    STATE SERVICE  VERSION', 
      '22/tcp  open  ssh      OpenSSH 8.2p1 Ubuntu', 
      '80/tcp  open  http     Apache httpd 2.4.41', 
      '443/tcp open  ssl/http Apache httpd 2.4.41', 
      'Nmap done: 1 IP scanned in 5.43 seconds'
    ] 
  },
  { 
    cmd: 'python3 qrng.py --qubits 256', 
    delay: 2000, 
    output: [
      '[*] Connecting to IBM Quantum backend...', 
      '[*] Initializing 256-qubit circuit...', 
      '[+] Applying Hadamard gates to qubits...', 
      '[+] Measuring superposition states...', 
      '[+] Generated 256 truly random bits', 
      '0b1101011001010110001011001101001010101001001110010101'
    ] 
  },
  { 
    cmd: 'sudo apt-get update && apt-get upgrade -y', 
    delay: 1800, 
    output: [
      'Hit:1 http://kali.download/kali kali-rolling InRelease', 
      'Reading package lists... Done', 
      'Building dependency tree... Done', 
      '0 upgraded, 0 newly installed, 0 to remove'
    ] 
  },
  { 
    cmd: 'git clone https://github.com/shanujans/AutoAI-Loan-Risk-Predictor', 
    delay: 1500, 
    output: [
      "Cloning into 'AutoAI-Loan-Risk-Predictor'...", 
      'remote: Enumerating objects: 28, done.', 
      'Receiving objects: 100% (28/28), 12.4 KiB | 2.1 MiB/s, done.'
    ] 
  },
  { 
    cmd: 'python3 train_model.py --dataset loan_data.csv', 
    delay: 2500, 
    output: [
      '[*] Loading dataset: 1000 samples, 12 features', 
      '[*] Running AutoAI pipeline...', 
      '[*] Snap Boosting Machine selected', 
      '[+] Accuracy: 77.3% | Precision: 0.81 | Recall: 0.74', 
      '[+] Model saved: loan_risk_model.pkl'
    ] 
  },
  { 
    cmd: 'whoami', 
    delay: 700, 
    output: ['shanujan@dev'] 
  },
  { 
    cmd: 'ls ~/projects', 
    delay: 800, 
    output: [
      'QRNG/  AutoAI-Loan-Risk/  telegram-bots/  Academic-Ally/', 
      'Instagram-Tracker/  Student-Mgmt-Java/  Skills-Int-C#/'
    ] 
  },
];

const Hero: React.FC = () => {
  const [animData, setAnimData]   = useState<object | null>(null);
  const [cvOpen, setCvOpen]       = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    fetch(LOTTIE_URL).then(r => r.json()).then(d => setAnimData(d)).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setShowScroll(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ✅ Loop background terminal emulator commands seamlessly in background
  useEffect(() => {
    let isMounted = true;
    let currentCmdIndex = 0;
    let lineBuffer: string[] = [];

    const runSequence = async () => {
      while (isMounted) {
        const item = COMMANDS[currentCmdIndex];
        
        // Write the input prompt line
        if (!isMounted) break;
        lineBuffer = [...lineBuffer, `shanujan@portfolio:~$ ${item.cmd}`].slice(-16);
        setTerminalLines([...lineBuffer]);
        
        // Brief typing pause
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Stream outputs line by line
        for (const line of item.output) {
          if (!isMounted) break;
          lineBuffer = [...lineBuffer, line].slice(-16);
          setTerminalLines([...lineBuffer]);
          
          const lineDelay = Math.max(80, item.delay / item.output.length);
          await new Promise(resolve => setTimeout(resolve, lineDelay));
        }
        
        // Pause between complete sequences
        await new Promise(resolve => setTimeout(resolve, 2000));
        currentCmdIndex = (currentCmdIndex + 1) % COMMANDS.length;
      }
    };

    runSequence();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <CVRequestModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />

      <section
        id="home"
        className="relative flex flex-col overflow-x-clip md:min-h-[100svh]"
        style={{ background: '#0C0C0C' }}
      >
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 85%, rgba(182,0,168,0.09), transparent)' }} />

        {/* ✅ Horizontal background terminal to occupy the center blank space cleanly */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-full max-w-[1440px] px-6 select-none pointer-events-none font-mono flex flex-col justify-end text-left"
          style={{
            top: '30%',
            height: '28vh',
            opacity: 0.12, // Perfectly subtle behind other content
            zIndex: 5,
            overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <div className="flex flex-col gap-1 w-full text-[10px] sm:text-xs tracking-wider">
            {terminalLines.map((line, idx) => (
              <div 
                key={idx} 
                className="whitespace-pre-wrap leading-relaxed truncate"
                style={{
                  color: line.startsWith('shanujan@') ? '#B600A8' : '#D7E2EA',
                  fontWeight: line.startsWith('shanujan@') ? '600' : '300',
                  textShadow: line.startsWith('shanujan@') ? '0 0 8px rgba(182,0,168,0.3)' : 'none',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 flex-shrink-0" />

        <FadeIn y={40} delay={0.15} className="px-5 md:px-12 flex-shrink-0 relative z-20">
          <h1
            className="font-black uppercase tracking-tight leading-[1.15] w-full"
            style={{
              fontSize: 'clamp(2rem, 12vw, 140px)',
              background: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            hi, i'm <br className="block md:hidden" /> shanujan.
          </h1>
        </FadeIn>

        {/* Portrait/Lottie */}
        <div
          className="
            relative
            md:absolute
            md:left-1/2
            md:-translate-x-1/2
            md:bottom-0
            z-10
            pointer-events-none
            md:pointer-events-auto
          "
          style={{
            width: 'min(480px, 80vw)', // ✅ Slightly scaled up to cover additional vertical grid space
            margin: '0 auto',
            marginBottom: '2rem',
          }}
        >
          <FadeIn y={30} delay={0.6}>
            <Magnet strength={0.18}>
              {animData ? (
                <Lottie animationData={animData} loop autoplay style={{ width: '100%' }} />
              ) : (
                <div className="w-full flex items-center justify-center" style={{ aspectRatio: '1' }}>
                  <span style={{ fontSize: 'clamp(4rem, 20vw, 8rem)' }}>👨‍💻</span>
                </div>
              )}
            </Magnet>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="mt-auto pb-8 px-5 md:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-20">
          <FadeIn y={20} delay={0.3}>
            <div className="bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 -ml-4 md:p-0 md:m-0 rounded-xl">
              <p
                className="text-[#D7E2EA] font-light uppercase leading-relaxed max-w-[340px] md:max-w-[420px]" // ✅ Increased width & font range for robust desktop/mobile scale
                style={{ fontSize: 'clamp(0.8rem, 2vw, 1.05rem)' }}
              >
                an it support &amp; ai developer driven by building autonomous agents and robust systems
              </p>
            </div>
          </FadeIn>

          <FadeIn y={20} delay={0.4}>
            <button className="contact-btn" onClick={() => setCvOpen(true)}>
              Request CV
            </button>
          </FadeIn>
        </div>

        <AnimatePresence>
          {showScroll && (
            <motion.div
              key="scroll"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, 6, 0], transition: { y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }, opacity: { duration: 0.5 } } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
              <span
                className="font-light uppercase tracking-[0.35em] text-[#D7E2EA]/40"
                style={{ fontSize: '0.6rem' }}
              >
                scroll
              </span>
              <div className="flex flex-col items-center gap-0.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                    className="w-px rounded-full"
                    style={{ height: i === 1 ? '10px' : '6px', background: '#B600A8' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Hero;