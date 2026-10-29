import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Database, CloudLightning, Server, ChevronRight, Eye } from 'lucide-react';
import Typewriter from './Typewriter';
import VisitorCounter from './VisitorCounter';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onNavigate }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    const techPanelRef = useRef(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

    const typewriterPhrases = [
        "I build full-stack React & Supabase platforms.",
        "I architect enterprise Salesforce CRM solutions.",
        "I integrate real AI & LLM reasoning pipelines.",
        "I author and merge open-source pull requests.",
        "I engineer scalable Java MVC architectures."
    ];

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 900;
            setIsMobile(mobile);
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "expo.out", duration: 1.2 }
        });

        const title = document.querySelector('.hero-title');
        if (title) {
            title.classList.add('glitch-title');
            setTimeout(() => {
                title.classList.remove('glitch-title');
            }, 1000);
        }

        tl.from(".hero-title-inner", {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out"
        })
            .from(".hero-typewriter-box", {
                opacity: 0,
                y: 15,
                duration: 0.8
            }, "-=1.2")
            .from(".hero-subtitle", {
                opacity: 0,
                y: 20,
                duration: 1.2
            }, "-=1.1")
            .from(".hero-ctas", {
                opacity: 0,
                scale: 0.9,
                y: 20,
                duration: 1
            }, "-=0.9")
            .from(".status-badge", {
                opacity: 0,
                x: -20,
                scale: 0.8,
                duration: 0.8
            }, "-=1.8");

        if (!isMobile) {
            const panelTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".tech-panel",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            panelTl.from(".tech-panel", {
                opacity: 0,
                x: 60,
                rotateY: -25,
                perspective: 1000,
                scale: 0.8,
                duration: 1.8,
                ease: "expo.out"
            })
                .from(".arch-layer", {
                    opacity: 0,
                    x: 30,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=1.2")
                .from(".signal-wire", {
                    scaleY: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    transformOrigin: "top"
                }, "-=0.8");

            gsap.to(".tech-panel", {
                y: -10,
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        } else {
            gsap.from(".tech-panel", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".tech-panel",
                    start: "top 85%"
                }
            });

            gsap.from(".arch-layer", {
                opacity: 0,
                y: 20,
                stagger: 0.15,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".tech-panel",
                    start: "top 85%"
                }
            });
        }

    }, { scope: heroRef, dependencies: [isMobile] });

    return (
        <section id="hero" className="hero-section perspective-1000" ref={heroRef}>
            <div className="hud-background">
                <div className="hud-grid"></div>
                <div className="hud-circles"></div>
                <div className="system-scan-line"></div>
            </div>

            <div className="container hero-container">
                <div
                    className="hero-left"
                    style={!isMobile ? {
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                    } : undefined}
                >
                    <div className="hero-top-badges">
                        <div className="status-badge pulse-badge">
                            <span className="pulse-dot active"></span> Solving Real-World Engineering Problems
                        </div>
                        <VisitorCounter />
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-mask">
                            <span className="hero-title-inner">I don't just learn tech —</span>
                        </span>
                        <span className="hero-title-mask">
                            <span className="hero-title-inner">I <span className="highlight">build and ship</span> with it.</span>
                        </span>
                    </h1>

                    {/* Dynamic Rotating Typewriter Widget */}
                    <div className="hero-typewriter-box glass">
                        <span className="typewriter-prefix">&gt;</span>
                        <Typewriter phrases={typewriterPhrases} />
                    </div>

                    <p className="hero-subtitle">
                        BTech CSE (Data Science) student building full-stack <strong className="neon-text">React</strong> apps, integrating <strong className="neon-text">real AI</strong> APIs, and deploying <strong className="neon-text">live</strong> — while most are still watching tutorials.
                    </p>

                    <div className="hero-ctas">
                        {onNavigate ? (
                            <button onClick={() => onNavigate('projects')} className="btn btn-primary btn-glow">
                                See My Projects <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                            </button>
                        ) : (
                            <a href="#projects" className="btn btn-primary btn-glow">
                                See My Projects <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                            </a>
                        )}
                        <a href="/cv_vishwas_btech.pdf" download="cv_vishwas_btech.pdf" className="btn btn-secondary btn-underline">
                            Get My Resume
                        </a>
                    </div>
                </div>

                {/* Right Column: Architectural Stack HUD */}
                <div className="hero-right">
                    <div className="tech-panel glass hud-border" ref={techPanelRef}>
                        <div className="panel-hud-header">
                            <span className="hud-label">SYSTEM_ARCHITECTURE // LIVE</span>
                            <div className="hud-indicators">
                                <span className="indicator-dot active"></span>
                                <span className="indicator-dot"></span>
                                <span className="indicator-dot"></span>
                            </div>
                        </div>

                        <div className="arch-layers">
                            <div className="arch-layer">
                                <div className="layer-icon"><Terminal size={18} /></div>
                                <div className="layer-content">
                                    <span className="layer-tag">PRESENTATION LAYER</span>
                                    <h4>Modern Reactive UI</h4>
                                    <p>React 18, GSAP & Framer Motion, Tailwind</p>
                                </div>
                                <div className="layer-status optimal">OPTIMAL</div>
                            </div>

                            <div className="signal-wire"></div>

                            <div className="arch-layer">
                                <div className="layer-icon"><CloudLightning size={18} /></div>
                                <div className="layer-content">
                                    <span className="layer-tag">LOGIC & INTEGRATION LAYER</span>
                                    <h4>Full-Stack & Cloud CRM</h4>
                                    <p>Node.js, Express, Salesforce Apex & LWC</p>
                                </div>
                                <div className="layer-status active">ACTIVE</div>
                            </div>

                            <div className="signal-wire"></div>

                            <div className="arch-layer">
                                <div className="layer-icon"><Database size={18} /></div>
                                <div className="layer-content">
                                    <span className="layer-tag">PERSISTENCE LAYER</span>
                                    <h4>Cloud Databases & Sockets</h4>
                                    <p>PostgreSQL, Supabase Real-Time, MongoDB</p>
                                </div>
                                <div className="layer-status synced">SYNCED</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
