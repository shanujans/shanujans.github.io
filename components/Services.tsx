
import React, { useRef } from 'react';
import type { Service } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const services: Service[] = [
    { icon: 'fas fa-shield-halved', title: 'Cyber Security', description: 'Providing robust security solutions, threat analysis, and ethical hacking to protect digital assets and infrastructure from evolving cyber threats.' },
    { icon: 'fas fa-code', title: 'Web & Bot Development', description: 'Crafting responsive, high-performance websites and intelligent, automated Telegram bots using modern technologies.' },
    { icon: 'fas fa-server', title: 'System Operations', description: 'Expertise in managing and maintaining complex IT systems, cloud platforms, and data infrastructure to ensure high availability and performance.' },
    { icon: 'fa-solid fa-brain', title: 'AI/ML Integration', description: 'Transitioning into AI/ML to develop and integrate intelligent systems that drive automation, data analysis, and innovative solutions.' },
];

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

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    return (
        <div className="group bg-white/5 backdrop-blur-md p-8 rounded-lg border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#7700ff]/30">
            <div className="text-5xl text-[#00ff9d] mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className={service.icon}></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed">{service.description}</p>
        </div>
    );
};

const Services: React.FC = () => {
    return (
        <section id="services" className="py-24 bg-black/20 scroll-mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedElement>
                    <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">My Services</h2>
                    <div className="w-20 h-1 bg-[#00ff9d] mx-auto mb-12"></div>
                </AnimatedElement>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                         <AnimatedElement key={service.title} delay={index * 150}>
                            <ServiceCard service={service} />
                        </AnimatedElement>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
