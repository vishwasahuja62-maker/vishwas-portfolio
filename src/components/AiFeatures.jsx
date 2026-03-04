import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Zap, Globe, Code2, ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AiFeatures = () => {
    const features = [
        {
            icon: <Bot size={28} />,
            title: "Autonomous Portfolio Agent",
            desc: "Integrated a live Llama 3.3 model as a conversational edge-agent. It's not just a chatbot — it's trained on my project metadata and engineering mindset to answer queries in real-time.",
            badge: "Live"
        },
        {
            icon: <Zap size={28} />,
            title: "Data Science Specialization",
            desc: "Applying my minor specialization to build model-driven features. Currently exploring prompt engineering and vector embeddings to improve the relevance of the portfolio guide's responses.",
            badge: "Deep Learning"
        },
        {
            icon: <Globe size={28} />,
            title: "Zero-Latency Edge Inference",
            desc: "Leveraging Groq's LPUs and Kuberns AI edge points to ensure AI responses are generated in under 500ms, providing a seamless 'human-like' interaction experience.",
            badge: "Architecture"
        },
        {
            icon: <Code2 size={28} />,
            title: "LLM-Augmented Workflows",
            desc: "Utilizing AI-driven code generation and review cycles to ship 3x faster. Every component in this portfolio passed through an AI-assisted refinement pipeline.",
            badge: "Productivity"
        }
    ];

    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);
    const [selectedFeature, setSelectedFeature] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 900);
            ScrollTrigger.refresh();
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="ai-features" className="section-padding alt-bg">
            <div className="container">
                <div className="ai-header">
                    <h2 className="section-title">AI-First Foundation</h2>
                    <p className="ai-subtitle">
                        As a Data Science student, I don't just 'use' AI tools — I build them into the core of my applications to solve the 'static content' problem.
                    </p>
                </div>

                <div className="ai-features-wrapper">
                    {!isMobile ? (
                        <div className="ai-features-grid">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="ai-feature-card glass"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <div className="ai-card-header">
                                        <div className="ai-icon-box">
                                            {feature.icon}
                                        </div>
                                        <span className="ai-badge">{feature.badge}</span>
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="mobile-ai-features-container">
                            <AnimatePresence mode="wait">
                                {selectedFeature === null ? (
                                    <motion.div
                                        key="list"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="mobile-feature-list"
                                    >
                                        {features.map((feature, idx) => (
                                            <button
                                                key={idx}
                                                className="mobile-feature-selector glass"
                                                onClick={() => setSelectedFeature(feature)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="selector-icon-min">
                                                        {React.cloneElement(feature.icon, { size: 18 })}
                                                    </div>
                                                    <span className="feature-name">{feature.title}</span>
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
                                        className="mobile-feature-detail-view"
                                    >
                                        <button
                                            className="mobile-back-btn"
                                            onClick={() => setSelectedFeature(null)}
                                        >
                                            <ArrowLeft size={18} />
                                            <span>Back to Innovations</span>
                                        </button>

                                        <div className="ai-feature-card glass expanded">
                                            <div className="ai-card-header">
                                                <div className="ai-icon-box">
                                                    {selectedFeature.icon}
                                                </div>
                                                <span className="ai-badge">{selectedFeature.badge}</span>
                                            </div>
                                            <h3>{selectedFeature.title}</h3>
                                            <p>{selectedFeature.desc}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AiFeatures;
