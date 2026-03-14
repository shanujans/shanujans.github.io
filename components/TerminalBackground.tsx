import React, { useState, useEffect, useRef } from 'react';

const commands = [
  { cmd: 'nmap -sV -p- 192.168.1.1', delay: 2200, output: ['Starting Nmap 7.92 at 2024-05-21 10:30 EDT', 'Nmap scan report for 192.168.1.1 (host up)', 'PORT    STATE SERVICE  VERSION', '22/tcp  open  ssh      OpenSSH 8.2p1 Ubuntu', '80/tcp  open  http     Apache httpd 2.4.41', '443/tcp open  ssl/http Apache httpd 2.4.41', 'Nmap done: 1 IP scanned in 5.43 seconds'] },
  { cmd: 'python3 qrng.py --qubits 256', delay: 2000, output: ['[*] Connecting to IBM Quantum backend...', '[*] Initializing 256-qubit circuit...', '[+] Applying Hadamard gates to qubits...', '[+] Measuring superposition states...', '[+] Generated 256 truly random bits', '0b1101011001010110001011001101001010101001001110010101'] },
  { cmd: 'sudo apt-get update && apt-get upgrade -y', delay: 1800, output: ['Hit:1 http://kali.download/kali kali-rolling InRelease', 'Reading package lists... Done', 'Building dependency tree... Done', '0 upgraded, 0 newly installed, 0 to remove'] },
  { cmd: 'git clone https://github.com/shanujans/AutoAI-Loan-Risk-Predictor', delay: 1500, output: ["Cloning into 'AutoAI-Loan-Risk-Predictor'...", 'remote: Enumerating objects: 28, done.', 'Receiving objects: 100% (28/28), 12.4 KiB | 2.1 MiB/s, done.'] },
  { cmd: 'python3 train_model.py --dataset loan_data.csv', delay: 2500, output: ['[*] Loading dataset: 1000 samples, 12 features', '[*] Running AutoAI pipeline...', '[*] Snap Boosting Machine selected', '[+] Accuracy: 77.3% | Precision: 0.81 | Recall: 0.74', '[+] Model saved: loan_risk_model.pkl'] },
  { cmd: 'whoami', delay: 700, output: ['shanujan@dev'] },
  { cmd: 'ls ~/projects', delay: 800, output: ['QRNG/  AutoAI-Loan-Risk/  telegram-bots/  Academic-Ally/', 'Instagram-Tracker/  Student-Mgmt-Java/  Skills-Int-C#/'] },
];

const PROMPT_USER = <span className="text-[#00ff9d]">shanujan</span>;
const PROMPT_HOST = <span className="text-[#00b3ff]">@dev</span>;
const PROMPT_PATH = <span className="text-[#7700ff]">:~/</span>;
const PROMPT_HASH = <span className="text-white">$ </span>;

const TerminalBackground: React.FC = () => {
  const [lines, setLines] = useState<React.ReactNode[]>([
    <span className="text-gray-500">Last login: {new Date().toDateString()} on pts/0</span>
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    let cmdIdx = 0;
    let alive = true;

    const runNext = async () => {
      if (!alive) return;
      const { cmd, delay, output } = commands[cmdIdx];

      // Type command char by char
      let typed = '';
      setLines(prev => [...prev, <>{PROMPT_USER}{PROMPT_HOST}{PROMPT_PATH}{PROMPT_HASH}</>]);
      for (let i = 0; i < cmd.length; i++) {
        await new Promise(r => setTimeout(r, 28));
        if (!alive) return;
        typed += cmd[i];
        setLines(prev => [
          ...prev.slice(0, -1),
          <>{PROMPT_USER}{PROMPT_HOST}{PROMPT_PATH}{PROMPT_HASH}<span className="text-green-300">{typed}</span><span className="bg-green-400 w-2 h-4 inline-block ml-0.5 animate-pulse" /></>
        ]);
      }

      await new Promise(r => setTimeout(r, 500));
      if (!alive) return;

      setLines(prev => [
        ...prev.slice(0, -1),
        <>{PROMPT_USER}{PROMPT_HOST}{PROMPT_PATH}{PROMPT_HASH}<span className="text-green-300">{cmd}</span></>
      ]);

      for (const line of output) {
        await new Promise(r => setTimeout(r, 75));
        if (!alive) return;
        setLines(prev => [...prev, <span className="text-gray-400">{line}</span>]);
      }

      await new Promise(r => setTimeout(r, delay));
      if (!alive) return;

      cmdIdx = (cmdIdx + 1) % commands.length;
      setLines(prev => prev.length > 60 ? prev.slice(prev.length - 40) : prev);
      runNext();
    };

    const t = setTimeout(runNext, 800);
    return () => { alive = false; clearTimeout(t); };
  }, []);

  return (
    <div
      ref={terminalRef}
      className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none font-jetbrains-mono text-xs"
      style={{ background: '#0a0a14', opacity: 0.18 }}
    >
      <div className="p-3">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words leading-5">{line}</div>
        ))}
      </div>
    </div>
  );
};

export default TerminalBackground;
