import React, { useState, useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

// TODO: STEP 2 
const emailAddress = 'shanujansh@gmail.com';

const AnimatedElement: React.FC<{children: React.ReactNode; delay?: number}> = ({ children, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    return (
        <div
            ref={ref}
            className={`fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const Contact: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(emailAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <section id="contact" className="py-24 bg-black/20 scroll-mt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedElement>
                    <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">Get In Touch</h2>
                    <div className="w-20 h-1 bg-[#00ff9d] mx-auto mb-12"></div>
                </AnimatedElement>

                <div className="grid lg:grid-cols-2 gap-16">
                    <AnimatedElement delay={200}>
                        {/* TODO: STEP 1 - Replace this action URL from formspree.io */}
                        <form action="https://formspree.io/f/mrbapzwd" method="POST" className="space-y-6">
                            <div className="relative">
                                <input type="text" name="name" required placeholder=" " className="form-input" />
                                <label className="form-label">_name:</label>
                            </div>
                            <div className="relative">
                                <input type="email" name="email" required placeholder=" " className="form-input" />
                                <label className="form-label">_email:</label>
                            </div>
                            <div className="relative">
                                <textarea name="message" rows={5} required placeholder=" " className="form-input"></textarea>
                                <label className="form-label">_message:</label>
                            </div>
                            <button type="submit" className="w-full btn-primary">Send Message</button>
                        </form>
                    </AnimatedElement>

                    <AnimatedElement delay={400}>
                        <div className="text-left">
                            <h3 className="text-3xl font-bold text-white mb-4">Or, Reach Out Directly</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Connect with me on social media or just copy my email.
                            </p>
                            
                            <div className="mt-6">
                                <button onClick={handleCopy} className="w-full btn-tertiary">
                                    {copied ? 'Email Copied!' : 'Copy My Email'} <i className="fas fa-copy ml-2"></i>
                                </button>
                            </div>

                            <div className="flex justify-center space-x-6 text-3xl mt-8">
                                <a href="https://github.com/shanujans" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-github"></i></a>
                                <a href="https://www.linkedin.com/in/shanujansuresh/" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-linkedin"></i></a>
                                <a href="https://t.me/Revmatrix" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-telegram"></i></a>
                                <a href="https://www.instagram.com/shanujan_29/" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </AnimatedElement>
                </div>
            </div>
            <style>{`
                .form-input {
                    width: 100%;
                    background-color: transparent;
                    border: 2px solid #374151;
                    border-radius: 4px;
                    padding: 1rem;
                    color: white;
                    font-size: 1rem;
                    transition: border-color 0.3s;
                    font-family: 'JetBrains Mono', monospace;
                }
                .form-input:focus {
                    outline: none;
                    border-color: #00ff9d;
                    box-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
                }
                .form-input:focus + .form-label,
                .form-input:not(:placeholder-shown) + .form-label {
                    transform: translateY(-2.25rem) scale(0.8);
                    color: #00ff9d;
                }
                .form-label {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    font-family: 'JetBrains Mono', monospace;
                    color: #9ca3af;
                    background-color: #0a0a14;
                    padding: 0 0.25rem;
                    transition: all 0.2s ease-out;
                    pointer-events: none;
                }
                .social-link {
                    color: #9ca3af;
                    transition: all 0.3s ease;
                }
                .social-link:hover {
                    color: #00ff9d;
                    transform: scale(1.2) translateY(-2px);
                    text-shadow: 0 0 10px #00ff9d;
                }
            `}</style>
        </section>
    );
};

export default Contact;