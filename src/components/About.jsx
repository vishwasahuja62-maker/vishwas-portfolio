import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = useRef(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);
    const [selectedMindset, setSelectedMindset] = useState(null);

    const mindsets = [
        {
            id: "01",
            title: "Learn by Building",
            desc: "I don't wait until I \"know enough\" to start. Every project I build — from full-stack dashboards to AI-powered chat — is how I learn. I pick real problems, figure out the tech along the way, and ship something that actually works."
        },
        {
            id: "02",
            title: "Engineering Over Tutorials",
            desc: "While most students follow along with tutorials, I architect my own solutions. I choose my own tech stacks, structure my own codebases, handle authentication, state management, and deployment myself — because that's what separates builders from learners."
        },
        {
            id: "03",
            title: "AI as a Superpower",
            desc: "I actively integrate AI into my workflow and my products — from using LLMs to accelerate development, to building a live AI chat assistant powered by Groq right into this portfolio. I treat AI as a tool to multiply output, not a crutch."
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 900);
            ScrollTrigger.refresh();
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        // Initial title reveal
        gsap.from(".about-title", {
            scrollTrigger: {
                trigger: ".about-title",
                start: "top 85%"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out"
        });

        // Staggered card entrance (Desktop only)
        if (!isMobile) {
            gsap.from(".about-card", {
                scrollTrigger: {
                    trigger: ".about-grid",
                    start: "top 80%"
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                ease: "expo.out"
            });
        }

        // Mobile list entrance (No ScrollTrigger for better reliability on list mount)
        if (isMobile && selectedMindset === null) {
            const selectors = gsap.utils.toArray(".mobile-mindset-selector");
            if (selectors.length > 0) {
                gsap.from(selectors, {
                    opacity: 0,
                    x: -20,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "all"
                });
            }
        }

        // Card hover effect using standard listeners for better performance
        const cards = gsap.utils.toArray(".about-card");
        cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
            });
        });

    }, { scope: aboutRef, dependencies: [isMobile, selectedMindset] });

    return (
        <section id="about" className="section-padding" ref={aboutRef}>
            <div className="container">
                <h2 className="section-title about-title">The Mindset</h2>

                {!isMobile ? (
                    <div className="about-grid">
                        {mindsets.map((item) => (
                            <div key={item.id} className="about-card glass">
                                <h3><span className="number">{item.id}.</span> {item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mobile-mindset-container">
                        <AnimatePresence mode="wait">
                            {selectedMindset === null ? (
                                <motion.div
                                    key="list"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="mobile-mindset-list"
                                >
                                    {mindsets.map((item) => (
                                        <button
                                            key={item.id}
                                            className="mobile-mindset-selector glass"
                                            onClick={() => setSelectedMindset(item)}
                                        >
                                            <div className="flex items-center">
                                                <span className="selector-title">{item.title}</span>
                                            </div>
                                            <ArrowRight size={18} className="selector-arrow" />
                                        </button>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="detail"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="mobile-mindset-detail-view"
                                >
                                    <button
                                        className="mobile-back-btn"
                                        onClick={() => setSelectedMindset(null)}
                                    >
                                        <ArrowLeft size={18} />
                                        <span>Back to Mindset</span>
                                    </button>
                                    <div className="about-card glass expanded">
                                        <h3>{selectedMindset.title}</h3>
                                        <p>{selectedMindset.desc}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
};

export default About;
