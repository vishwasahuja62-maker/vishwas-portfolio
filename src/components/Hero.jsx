import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Database, CloudLightning, Server, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    const techPanelRef = useRef(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

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
        // Skip parallax on mobile devices for performance
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

        // High-Impact Entrance sequence using FROM for better reliability
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

        // Only run heavy cinematic animations on desktop
        if (!isMobile) {
            // Tech Panel - Cinematic Build-Up
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
                    x: 40,
                    stagger: 0.25,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=1.2")
                .from(".connection-line", {
                    scaleY: 0,
                    opacity: 0,
                    transformOrigin: "top",
                    stagger: 0.35,
                    duration: 1.5,
                    ease: "expo.inOut"
                }, "-=1.5")
                .from(".system-status .status-text", {
                    opacity: 0,
                    x: -15,
                    stagger: 0.15,
                    duration: 0.6
                }, "-=0.8");

            // Background Parallax
            if (heroRef.current) {
                gsap.to(".hud-grid", {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }

            gsap.to(".hud-circles", {
                rotate: 360,
                duration: 50,
                repeat: -1,
                ease: "none"
            });

            // Floating animation for tech panel (desktop only)
            gsap.to(".tech-panel", {
                y: -30,
                rotateZ: 1,
                rotateX: 2,
                duration: 4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        } else {
            // Mobile: simple fade-in for tech panel
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
            {/* Next-Level Background HUD */}
            <div className="hud-background">
                <div className="hud-grid"></div>
                <div className="hud-circles"></div>
                <div className="system-scan-line"></div>
            </div>

            <div className="container hero-container">

                {/* Left Column */}
                <div
                    className="hero-left"
                    style={!isMobile ? {
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                    } : undefined}
                >
                    <div className="status-badge pulse-badge">
                        <span className="pulse-dot active"></span> Solving Real-World Engineering Problems
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-mask">
                            <span className="hero-title-inner">I don't just learn tech —</span>
                        </span>
                        <span className="hero-title-mask">
                            <span className="hero-title-inner">I <span className="highlight">build and ship</span> with it.</span>
                        </span>
                    </h1>

                    <p className="hero-subtitle">
                        BTech CSE (Data Science) student building full-stack <strong className="neon-text">React</strong> apps, integrating <strong className="neon-text">real AI</strong> APIs, and deploying <strong className="neon-text">live</strong> — while most are still watching tutorials.
                    </p>

                    <div className="hero-ctas">
                        <a href="#projects" className="btn btn-primary btn-glow">
                            See My Projects <ChevronRight size={18} style={{ marginLeft: '4px' }} />
                        </a>
                        <a href="/cv_vishwas_btech.pdf" download="cv_vishwas_btech.pdf" className="btn btn-secondary btn-underline">
                            Get My Resume
                        </a>
                    </div>
                </div>

                {/* Right Column (Technical Panel) */}
                <div
                    className="hero-right"
                    style={!isMobile ? {
                        transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
                    } : undefined}
                >
                    <div className="tech-panel glass" ref={techPanelRef}>
                        <div className="panel-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            <span className="panel-title">System Architecture (v2.1)</span>
                        </div>

                        <div className="panel-body">
                            <div className="arch-layer">
                                <Terminal className="layer-icon" size={20} />
                                <div className="layer-info">
                                    <div className="layer-name">UI Ecosystem</div>
                                    <div className="layer-tech">React 18 • GSAP • Framer</div>
                                </div>
                                <div className="pulse-dot active"></div>
                            </div>

                            <div className="connection-line"></div>

                            <div className="arch-layer highlight-ai">
                                <Server className="layer-icon" size={20} />
                                <div className="layer-info">
                                    <div className="layer-name">AI Logic Hub</div>
                                    <div className="layer-tech">Llama-3 • Groq Inference</div>
                                </div>
                                <div className="pulse-dot ai"></div>
                            </div>

                            <div className="connection-line ai-line"></div>

                            <div className="arch-layer highlighted">
                                <CloudLightning className="layer-icon" size={20} />
                                <div className="layer-info">
                                    <div className="layer-name">Edge Delivery</div>
                                    <div className="layer-tech">Kuberns AI Auto-Deploy</div>
                                </div>
                                <div className="pulse-dot deploy"></div>
                            </div>

                            <div className="system-status">
                                <span className="status-text">State: <strong className="success-text">OPERATIONAL</strong></span>
                                <span className="status-text">Env: <strong>PROD</strong></span>
                                <span className="status-text">Uptime: <strong>99.99%</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




            <motion.div
                className="proof-strip"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="proof-item"><span className="proof-icon">⚡</span> Full-Stack Dev</div>
                <div className="proof-item"><span className="proof-icon">🤖</span> AI Integration</div>
                <div className="proof-item"><span className="proof-icon">🎯</span> Performance Focused</div>
                <div className="proof-item"><span className="proof-icon">🏗️</span> Scalable Architecture</div>
            </motion.div>
        </section>
    );
};

export default Hero;
