import React, { useState, useEffect, useRef } from 'react';

const terminalLines = [
  'shanujan@portfolio:~$ neofetch',
  '                   -`                    shanujan@portfolio',
  '                  .o+`                   ------------------',
  '                 `ooo/                   OS: Debian-based Linux',
  '                `+oooo:                  Kernel: 6.5.0-kali3-amd64',
  '               `+oooooo:                 Uptime: 3 days, 4 hours, 21 mins',
  '               -+oooooo+:                Shell: zsh 5.9',
  '             `/:-:++oooo+:               DE: GNOME 45.2',
  '            `/++++/+++++++:              Theme: Gruvbox-Dark [GTK2/3]',
  '           `/++++++++++++++:             Icons: Papirus-Dark [GTK2/3]',
  '          `/+++++++++++++++++:           Terminal: tilix',
  '         `/++++++++++++++++++++/         CPU: Intel i9-13900K (24) @ 5.800GHz',
  '        `/++++++++++++++++++++++/        GPU: NVIDIA GeForce RTX 4090',
  '       `/++++++++++++++++++++++++/       Memory: 64GiB / 128GiB',
  '      .++++++++++++++++++++++++++++`     ',
  '     .++++++++++++++++++++++++++++++`    ',
  '    .++++++++++++++++++++++++++++++++`   ',
  '   -+++++++++++++++++++++++++++++++++`   ',
  '  -+++++++++++++++++++++++++++++++++`    ',
  ' .+++++++++++++++++++++++++++++++++`     ',
  '++++++++++++++++++++++++++++++++++`      ',
  'shanujan@portfolio:~$ ls -la /projects',
  'total 24',
  'drwxr-xr-x 1 shanujan shanujan 4096 Jan 11 10:20 .',
  'drwxr-xr-x 1 root     root     4096 Dec 20 12:00 ..',
  '-rwxr-xr-x 1 shanujan shanujan 8192 Jan 10 15:00 quantum_rng.py',
  '-rwxr-xr-x 1 shanujan shanujan 4096 Jan 08 09:15 loan_risk_model.ipynb',
  '-rwxr-xr-x 1 shanujan shanujan 2048 Jan 05 18:45 academic_ally_bot.py',
  'shanujan@portfolio:~$ cat /projects/quantum_rng.py',
  'from qiskit import QuantumCircuit, execute, Aer',
  '',
  'def get_quantum_random_bit():',
  '    # Create a quantum circuit with one qubit and one classical bit',
  '    circuit = QuantumCircuit(1, 1)',
  '    # Apply Hadamard gate to create superposition',
  '    circuit.h(0)',
  '    # Measure the qubit',
  '    circuit.measure(0, 0)',
  '    # Execute the circuit on a simulator',
  '    simulator = Aer.get_backend("qasm_simulator")',
  '    result = execute(circuit, simulator, shots=1).result()',
  '    counts = result.get_counts(circuit)',
  '    return int(list(counts.keys())[0])',
  '',
  'print(f"Generated Quantum Random Bit: {get_quantum_random_bit()}")',
  '# End of file',
  'shanujan@portfolio:~$ ',
];

const TerminalBackground: React.FC = () => {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (lineIndex < terminalLines.length) {
          setVisibleLines(prev => [...prev, terminalLines[lineIndex]]);
          setLineIndex(prev => prev + 1);
        } else {
            // Loop the animation
            setLineIndex(0);
            setVisibleLines([]);
        }
      }, 200); // Speed of new lines appearing
  
      return () => clearInterval(interval);
    }, [lineIndex]);
  
    useEffect(() => {
      // Auto-scroll to the bottom
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, [visibleLines]);
  
    return (
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full z-0 opacity-20 font-jetbrains-mono text-[#00ff9d] text-xs sm:text-sm overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <pre className="whitespace-pre-wrap p-4">
          {visibleLines.join('\n')}
          <span className="bg-[#00ff9d] w-2 h-4 inline-block animate-pulse"></span>
        </pre>
      </div>
    );
};

export default TerminalBackground;