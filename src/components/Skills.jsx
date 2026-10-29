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
            howIUse: "Component-driven development with emphasis on performance profiling and real-time HMR. Used to build the entire Portfolio, ElevateHire, and My True Companion interfaces.",
            projects: ["ElevateHire", "My True Companion", "GitHub Profile Analyzer"],
            role: "View Layer & State Orchestration",
            badges: ["Production", "Optimized"]
        },
        {
            id: 'tailwind',
            name: "TailwindCSS & CSS3",
            category: "Frontend",
            icon: <Layers size={24} />,
            usage: "Utility-first CSS framework and modern stylesheet architecture.",
            howIUse: "Implementing complex responsive design systems, animations, and custom styling across web applications.",
            projects: ["ElevateHire", "Supabase Kanban Board", "Live Portfolio"],
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
            id: 'salesforce',
            name: "Salesforce CRM & Apex",
            category: "Backend",
            icon: <Globe size={24} />,
            usage: "Cloud CRM architecture, Apex controllers, and Lightning Web Components (LWC).",
            howIUse: "Building custom objects, automated business flows, SOQL queries, and enterprise CRM solutions.",
            projects: ["Student Placement Management System", "Astrea IT Services Internship"],
            role: "Enterprise Cloud Architecture",
            badges: ["Salesforce", "LWC & Apex"]
        },
        {
            id: 'node',
            name: "Node.js & Express",
            category: "Backend",
            icon: <Terminal size={24} />,
            usage: "Asynchronous runtime for scalable logic and REST API routing.",
            howIUse: "Building secure REST APIs, role-based access control (RBAC), and server-side orchestration for web applications.",
            projects: ["ElevateHire", "GitHub Profile Analyzer", "CodSoft Internships"],
            role: "Logic & Lifecycle Management",
            badges: ["Scalable", "REST Expert"]
        },
        {
            id: 'postgres',
            name: "PostgreSQL & Supabase",
            category: "Backend",
            icon: <Database size={24} />,
            usage: "Relational cloud database and BaaS with Row-Level Security (RLS).",
            howIUse: "Designing relational schemas, cloud database queries, and leveraging real-time channels with RBAC policies.",
            projects: ["ElevateHire", "My True Companion", "Supabase Kanban Board"],
            role: "Persistence & Security Layer",
            badges: ["PostgreSQL", "Cloud DB"]
        },
        {
            id: 'socketio',
            name: "Socket.IO",
            category: "Backend",
            icon: <Globe size={24} />,
            usage: "Bidirectional, low-latency event-driven communication.",
            howIUse: "Powering real-time messaging, instant live updates, and notification channels.",
            projects: ["ElevateHire"],
            role: "Real-time Communication",
            badges: ["WebSockets", "Low-Latency"]
        },
        {
            id: 'jwt-auth',
            name: "JWT & Auth Security",
            category: "Backend",
            icon: <Database size={24} />,
            usage: "Cryptographic token-based authorization and session integrity.",
            howIUse: "Implementing JWT authentication, Role-Based Access Control (RBAC), and secure endpoint protection.",
            projects: ["ElevateHire", "My True Companion"],
            role: "Authentication & Security",
            badges: ["Secure", "RBAC"]
        },
        {
            id: 'rest-api',
            name: "REST APIs",
            category: "Backend",
            icon: <Globe size={24} />,
            usage: "Standardized communication interface for distributed systems.",
            howIUse: "Consuming and processing high-throughput data from external and internal services.",
            projects: ["ElevateHire", "GitHub Profile Analyzer"],
            role: "System Interoperability",
            badges: ["Interconnected", "Standardized"]
        },

        // Languages & Core
        {
            id: 'javascript',
            name: "JavaScript (ES6+)",
            category: "Languages",
            icon: <Code2 size={24} />,
            usage: "Core programming language for frontend, backend, and full-stack logic.",
            howIUse: "Writing modular, asynchronous, functional, and performance-tuned JavaScript code across the entire stack.",
            projects: ["ElevateHire", "My True Companion", "Neon Snake PWA"],
            role: "Core Stack",
            badges: ["Proficient", "Full-Stack"]
        },
        {
            id: 'c-lang',
            name: "Java, JSP & Servlets",
            category: "Languages",
            icon: <Terminal size={24} />,
            usage: "Enterprise Java web architecture, MVC pattern, Servlets, and JSP.",
            howIUse: "Architecting backend applications with Maven, Tomcat, session management, and database DAO patterns.",
            projects: ["Subscription Management System", "MongoDB Java Path"],
            role: "Backend & Systems",
            badges: ["Java Enterprise", "MVC"]
        },
        {
            id: 'python-ds',
            name: "Python & Data Science",
            category: "Languages",
            icon: <Code2 size={24} />,
            usage: "Machine Learning workflows, model evaluation, and exploratory data analysis.",
            howIUse: "Building Jupyter Notebook models for classification and predictive analytics, including Credit Card Fraud Detection.",
            projects: ["Credit Card Fraud Detection", "Machine Learning Labs"],
            role: "Data Science Specialization",
            badges: ["ML Labs", "Jupyter"]
        },
        {
            id: 'mysql',
            name: "MySQL",
            category: "Backend",
            icon: <Database size={24} />,
            usage: "Structured relational database management system.",
            howIUse: "Relational database schema modeling, indexing, joins, and ACID transactional queries.",
            projects: ["University CS Labs", "Database Systems"],
            role: "Relational DB",
            badges: ["SQL", "Relational"]
        },

        // AI & Emerging
        {
            id: 'ai-integration',
            name: "GenAI & Prompt Engineering",
            category: "AI",
            icon: <Cpu size={24} />,
            usage: "Integration of high-reasoning LLMs into production interfaces.",
            howIUse: "Building AI-assisted platforms, doubt-solving systems, and contextual portfolio guides with tailored prompt engineering.",
            projects: ["My True Companion", "Live Portfolio", "Deloitte GenAI Program"],
            role: "Intelligent Interaction Layer",
            badges: ["AI-Assisted", "LLM Native"]
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
            id: 'git-expert',
            name: "Git, GitHub & PR Workflows",
            category: "Tools",
            icon: <Workflow size={24} />,
            usage: "Distributed version control, Pull Requests, and open-source collaboration.",
            howIUse: "Maintaining 15+ public repositories, submitting Pull Requests to open-source codebases, and managing CI/CD workflows.",
            projects: ["Zero-Cost CRM", "ElevateHire", "Subscription Management System"],
            role: "Source Integrity & Open Source",
            badges: ["15+ Repos", "Open-Source PRs"]
        }
    ];

    const categories = ["Frontend", "Backend", "Languages", "AI", "Tools", "Strategy"];
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

