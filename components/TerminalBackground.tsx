
import React, { useState, useEffect, useRef } from 'react';

const commands = [
  { cmd: 'nmap -sV -p- 192.168.1.1', delay: 2000, output: ['Starting Nmap 7.92 ( https://nmap.org ) at 2024-05-21 10:30 EDT', 'Nmap scan report for 192.168.1.1', 'Host is up (0.0020s latency).', 'Not shown: 997 closed tcp ports (reset)', 'PORT    STATE SERVICE VERSION', '22/tcp  open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)', '80/tcp  open  http    Apache httpd 2.4.41 ((Ubuntu))', '443/tcp open  ssl/http Apache httpd 2.4.41 ((Ubuntu))', 'Nmap done: 1 IP address (1 host up) scanned in 5.43 seconds'] },
  { cmd: 'sudo apt-get update && apt-get upgrade -y', delay: 3000, output: ['Hit:1 http://kali.download/kali kali-rolling InRelease', 'Reading package lists... Done', 'Building dependency tree... Done', 'Reading state information... Done', 'Calculating upgrade... Done', '0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.'] },
  { cmd: 'git clone https://github.com/shanujans/Quantum-Random-Number-Generator-QRNG', delay: 2500, output: ['Cloning into \'Quantum-Random-Number-Generator-QRNG\'...', 'remote: Enumerating objects: 15, done.', 'remote: Counting objects: 100% (15/15), done.', 'remote: Compressing objects: 100% (10/10), done.', 'Receiving objects: 100% (15/15), 5.21 KiB | 1.30 MiB/s, done.', 'Resolving deltas: 100% (2/2), done.'] },
  { cmd: 'python3 exploit.py --target 10.0.0.5', delay: 1500, output: ['[+] Initializing exploit v1.2...', '[*] Target acquired: 10.0.0.5:4444', '[*] Crafting payload...', '[*] Sending stage 1 payload (3452 bytes)...', '[+] Stage 1 successful. Awaiting callback...', '[+] Connection established. Spawning shell...', '[+] Shell access granted.'] },
  { cmd: 'whoami', delay: 500, output: ['root'] },
  { cmd: 'ls -la', delay: 800, output: ['total 42', 'drwxr-xr-x 1 root root 4096 Dec 12 10:00 .', 'drwxr-xr-x 1 root root 4096 Dec 12 09:58 ..', '-rw-r--r-- 1 root root 2048 Dec 11 15:30 exploit.py', '-rwxr-xr-x 1 root root 8192 Dec 10 12:00 a.out', 'drwxr-xr-x 1 root root 4096 Dec 9 11:00 Quantum-Random-Number-Generator-QRNG'] },
];

const PROMPT = <span className="text-red-500">root@kali</span>;
const PROMPT_SUFFIX = <><span className="text-white">:</span><span className="text-blue-500">~</span><span className="text-white"># </span></>;

const TerminalBackground: React.FC = () => {
  const [lines, setLines] = useState<React.ReactNode[]>(['Initializing Kali Linux v2024.2...']);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    };
    scrollToBottom();
  }, [lines]);

  useEffect(() => {
    let commandIndex = 0;
    let isRunning = true;

    const runCommand = async () => {
      if (!isRunning) return;

      const { cmd, delay, output } = commands[commandIndex];
      
      // Type out the command
      let currentCmd = '';
      setLines(prev => [...prev, <>{PROMPT}{PROMPT_SUFFIX}</>]);
      for (let i = 0; i < cmd.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        if (!isRunning) return;
        currentCmd += cmd[i];
        setLines(prev => [...prev.slice(0, -1), <>{PROMPT}{PROMPT_SUFFIX}<span className="text-green-400">{currentCmd}</span></>]);
      }
      
      // Show cursor at the end for a moment
      setLines(prev => [...prev.slice(0, -1), <>{PROMPT}{PROMPT_SUFFIX}<span className="text-green-400">{cmd}</span><span className="bg-green-400 w-2 h-4 inline-block animate-pulse"></span></>]);
      await new Promise(resolve => setTimeout(resolve, 600));
      if (!isRunning) return;
      
       // Remove cursor before printing output
      setLines(prev => [...prev.slice(0, -1), <>{PROMPT}{PROMPT_SUFFIX}<span className="text-green-400">{cmd}</span></>]);


      // Print output lines
      for (const line of output) {
        await new Promise(resolve => setTimeout(resolve, 80));
        if (!isRunning) return;
        setLines(prev => [...prev, <span className="text-gray-300">{line}</span>]);
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      if (!isRunning) return;
      
      commandIndex = (commandIndex + 1) % commands.length;
      
      // Limit history to ~50 lines to prevent performance issues
      setLines(prev => prev.length > 50 ? prev.slice(prev.length - 40) : prev);

      runCommand();
    };

    const timeoutId = setTimeout(runCommand, 1000);

    return () => {
      isRunning = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      className="fixed top-0 left-0 w-full h-full z-0 opacity-20 overflow-hidden font-jetbrains-mono text-xs sm:text-sm pointer-events-none"
      style={{ backgroundColor: '#0a0a14' }}
    >
      <div className="p-2">
        {lines.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap break-words">{line}</div>
        ))}
      </div>
    </div>
  );
};

export default TerminalBackground;
