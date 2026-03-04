import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Code2, Database, Globe, Cpu,
    CheckCircle, Zap, Workflow,
    Layers, Search, Terminal, ChevronDown, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const gridRef = useRef(null);
    const panelRef = useRef(null);

    const skillsData = [
        // Frontend
        {
            id: 'react',
            name: "React 18",
            category: "Frontend",
            icon: <Code2 size={24} />,
            usage: "Core UI engine for high-performance dashboard architecture.",
            howIUse: "Component-driven development with emphasis on performance profiling and real-time HMR. Used to build the entire Portfolio and Kanban interface.",
            projects: ["GitHub Profile Analyzer", "Supabase Kanban Board"],
            role: "View Layer & State Orchestration",
            badges: ["Production", "Optimized"]
        },
        {
            id: 'tailwind',
            name: "TailwindCSS",
            category: "Frontend",
            icon: <Layers size={24} />,
            usage: "Utility-first CSS framework for rapid UI development.",
            howIUse: "Implementing complex design systems using custom JIT configurations. Used for the elite styling of the Kanban Board.",
            projects: ["Supabase Kanban Board", "Live Portfolio"],
            role: "Styling & Design System",
            badges: ["Responsive", "Utility-First"]
        },
        {
            id: 'framer',
            name: "Framer Motion",
            category: "Frontend",
            icon: <Workflow size={24} />,
            usage: "Declarative animation library for React applications.",
            howIUse: "Engineering physics-based interactions and complex layout transitions for the system preloader and UI reveals.",
            projects: ["Live Portfolio", "Neon Snake Game"],
            role: "Interaction & Orchestration",
            badges: ["Premium UX", "Fluid Animation"]
        },
        {
            id: 'chartjs',
            name: "Chart.js",
            category: "Frontend",
            icon: <Search size={24} />,
            usage: "Canvas-based data visualization library.",
            howIUse: "Developing multi-dimensional radar maps and activity heatmaps for analyzing community contributions.",
            projects: ["GitHub Profile Analyzer"],
            role: "Data Visualization Layer",
            badges: ["Dynamic", "Canvas-Native"]
        },

        // Backend & DB
        {
            id: 'node',
            name: "Node.js & Express",
            category: "Backend",
            icon: <Terminal size={24} />,
            usage: "Asynchronous runtime for scalable logic and API routing.",
            howIUse: "Logic layer management and API orchestration for data-heavy applications.",
            projects: ["GitHub Profile Analyzer"],
            role: "Logic & Lifecycle Management",
            badges: ["Scalable", "REST Expert"]
        },
        {
            id: 'supabase',
            name: "Supabase Backend",
            category: "Backend",
            icon: <Database size={24} />,
            usage: "BaaS for identity, storage, and real-time DB replication.",
            howIUse: "Extensive use of RLS policies and PostgreSQL channels for real-time task synchronization in the Kanban app.",
            projects: ["Supabase Kanban Board"],
            role: "Persistence & Security Layer",
            badges: ["Realtime", "PostgreSQL"]
        },
        {
            id: 'rest-api',
            name: "REST APIs",
            category: "Backend",
            icon: <Globe size={24} />,
            usage: "Standardized communication interface for distributed systems.",
            howIUse: "Consuming and processing high-throughput data from external providers.",
            projects: ["GitHub Profile Analyzer"],
            role: "System Interoperability",
            badges: ["Interconnected", "Standardized"]
        },
        {
            id: 'github-api',
            name: "GitHub API",
            category: "Backend",
            icon: <Search size={24} />,
            usage: "REST & GraphQL access to GitHub's global dataset.",
            howIUse: "Aggregating repository data, commit history, and user activity for real-time profile scoring.",
            projects: ["GitHub Profile Analyzer"],
            role: "External Intelligence Integration",
            badges: ["Data-Driven", "API Expert"]
        },

        // AI & Emerging
        {
            id: 'ai-integration',
            name: "GenAI Apps",
            category: "AI",
            icon: <Cpu size={24} />,
            usage: "Integration of high-reasoning LLMs into production interfaces.",
            howIUse: "Building contextual AI assistants using Groq and Llama-3 models. Implementation of prompt chaining.",
            projects: ["Live Portfolio", "GitHub Profile Analyzer"],
            role: "Intelligent Interaction Layer",
            badges: ["AI-Assisted", "LLM Native"]
        },
        {
            id: 'prompt-eng',
            name: "Prompt Engineering",
            category: "AI",
            icon: <Terminal size={24} />,
            usage: "Precision instruction design for maximizing LLM utility.",
            howIUse: "Architecting multi-turn agentic workflows for the AI Portfolio Assistant.",
            projects: ["Live Portfolio"],
            role: "Model Interaction Strategy",
            badges: ["Optimized", "Zero-Shot Expert"]
        },
        {
            id: 'rapid-proto',
            name: "Rapid Prototyping",
            category: "Strategy",
            icon: <Zap size={24} />,
            usage: "Iterative development to move from concept to MVP.",
            howIUse: "Leveraging Vite and modular components to deploy functional UI proof-of-concepts rapidly.",
            projects: ["Supabase Kanban Board", "Neon Snake Game"],
            role: "Product Strategy",
            badges: ["Fast", "MVP Focused"]
        },

        // Tools & DevOps
        {
            id: 'vite',
            name: "Vite Build",
            category: "Tools",
            icon: <Zap size={24} />,
            usage: "Modern build tool for blazing-fast development.",
            howIUse: "Optimizing asset pipelines and ensuring sub-second HMR updates across all repositories.",
            projects: ["Live Portfolio", "Supabase Kanban Board"],
            role: "Dev Infrastructure",
            badges: ["Fast", "Modern"]
        },
        {
            id: 'deployment',
            name: "Kuberns AI",
            category: "Delivery",
            icon: <Workflow size={24} />,
            usage: "Automated AI-powered deployment orchestration.",
            howIUse: "Zero-config deployment cycles with automated SSL and edge caching.",
            projects: ["Live Portfolio"],
            role: "Delivery Pipeline",
            badges: ["Live", "Automated"]
        },
        {
            id: 'git-expert',
            name: "Git & Versioning",
            category: "Tools",
            icon: <Workflow size={24} />,
            usage: "Distributed version control for collaborative development.",
            howIUse: "Managing complex branch strategies and ensuring atomic commit history.",
            projects: ["GitHub Profile Analyzer", "Neon Snake Game"],
            role: "Source Integrity Management",
            badges: ["Distributed", "Reliable"]
        }
    ];

    const categories = ["Frontend", "Backend", "AI", "Tools", "Delivery", "Strategy"];
    const [expandedMobileCat, setExpandedMobileCat] = useState(null);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

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
        // Initial grid stagger reveal
        gsap.from(".skill-node", {
            scrollTrigger: {
                trigger: ".skills-nodes-grid",
                start: "top 80%"
            },
            opacity: 0,
            y: 30,
            scale: 0.9,
            stagger: {
                each: 0.05,
                grid: "auto",
                from: "start"
            },
            duration: 0.8,
            ease: "back.out(1.7)"
        });

        if (selectedSkill) {
            // Focus transition: Dim other cards
            gsap.to(".skill-node:not(.selected)", {
                opacity: isMobile ? 0.3 : 0.2,
                scale: 0.9,
                duration: 0.5,
                filter: isMobile ? "none" : "blur(4px)",
                ease: "power2.inOut"
            });

            // Reveal Insight Panel
            gsap.fromTo(".skill-insight-panel",
                {
                    x: isMobile ? 0 : 50,
                    y: isMobile ? 50 : 0,
                    opacity: 0,
                    scale: 0.95,
                    rotateY: isMobile ? 0 : 10
                },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 0.7,
                    ease: "expo.out"
                }
            );

            // Stagger internal elements of the panel
            gsap.from(".content-block, .meta-item, .insight-badge", {
                opacity: 0,
                y: 15,
                stagger: 0.08,
                duration: 0.5,
                ease: "power3.out",
                delay: 0.2
            });
        } else {
            // Restore everything
            gsap.to(".skill-node", {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                filter: "blur(0px)",
                ease: "power2.out"
            });
        }
    }, [selectedSkill, isMobile]);

    // Keyboard support - ESC to close
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedSkill(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <section id="skills" className="section-padding alt-bg skills-section-root">
            <div className="container relative">
                <div className="section-header center">
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">Click a node to explore how I use each technology in production.</p>
                </div>

                <div className={`skills-explorer-container ${selectedSkill ? 'is-active' : ''}`}>
                    {!isMobile ? (
                        <div className={`skills-nodes-grid ${selectedSkill ? 'has-selection' : ''}`} ref={gridRef}>
                            {skillsData.map((skill) => (
                                <div
                                    key={skill.id}
                                    className={`skill-node glass ${selectedSkill?.id === skill.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <div className="node-icon-shell">
                                        {skill.icon}
                                    </div>
                                    <div className="node-content text-left">
                                        <span className="skill-cat-tag">{skill.category}</span>
                                        <h4 className="skill-name">{skill.name}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mobile-grouped-skills">
                            {categories.map((cat) => (
                                <div key={cat} className="mobile-skill-group">
                                    <button
                                        className={`mobile-cat-header glass ${expandedMobileCat === cat ? 'active' : ''}`}
                                        onClick={() => setExpandedMobileCat(expandedMobileCat === cat ? null : cat)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="cat-dot"></span>
                                            <span className="cat-label">{cat} Layer</span>
                                        </div>
                                        <ChevronDown size={18} className={`arrow-icon ${expandedMobileCat === cat ? 'rotated' : ''}`} />
                                    </button>

                                    <div className={`mobile-cat-content ${expandedMobileCat === cat ? 'open' : ''}`}>
                                        <div className="mobile-cat-inner">
                                            <div className="skills-nodes-grid">
                                                {skillsData
                                                    .filter((s) => s.category === cat)
                                                    .map((skill) => (
                                                        <div
                                                            key={skill.id}
                                                            className={`skill-node glass ${selectedSkill?.id === skill.id ? 'selected' : ''}`}
                                                            onClick={() => setSelectedSkill(selectedSkill?.id === skill.id ? null : skill)}
                                                            role="button"
                                                            tabIndex={0}
                                                        >
                                                            <div className="node-icon-shell">{skill.icon}</div>
                                                            <div className="node-content text-left">
                                                                <span className="skill-cat-tag">{skill.category}</span>
                                                                <h4 className="skill-name">{skill.name}</h4>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedSkill && (
                        <div className="skill-insight-panel glass" ref={panelRef}>
                            <button className="close-panel" onClick={() => setSelectedSkill(null)}>
                                <X size={20} />
                            </button>

                            <div className="panel-header-reveal">
                                <div className="panel-icon-box">{selectedSkill.icon}</div>
                                <div className="panel-title-group">
                                    <span className="skill-cat-tag">{selectedSkill.category}</span>
                                    <h3>{selectedSkill.name}</h3>
                                </div>
                            </div>

                            <div className="panel-content-body">
                                <div className="content-block">
                                    <label>Production Usage</label>
                                    <p>{selectedSkill.usage}</p>
                                </div>

                                <div className="content-block highlight">
                                    <label>How I use this</label>
                                    <p>{selectedSkill.howIUse}</p>
                                </div>

                                <div className="meta-grid">
                                    <div className="meta-item">
                                        <Layers size={14} />
                                        <span>{selectedSkill.role}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Search size={14} />
                                        <span>Projects: {selectedSkill.projects.join(', ')}</span>
                                    </div>
                                </div>

                                <div className="panel-badges">
                                    {selectedSkill.badges.map((badge, bIdx) => (
                                        <span key={bIdx} className="insight-badge badge-reveal">
                                            {badge === 'Production' ? <CheckCircle size={10} /> : <Zap size={10} />}
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;

