import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import AiFeatures from './AiFeatures';
import {
    Briefcase,
    GraduationCap,
    FolderGit2,
    Cpu,
    Trophy,
    Mail,
    ArrowRight,
    Star,
    Sparkles
} from 'lucide-react';

const Home = ({ onNavigate }) => {
    const hubCards = [
        {
            id: 'projects',
            title: 'Projects & Case Studies',
            subtitle: 'Flagships & Prototypes',
            desc: 'Explore ElevateHire, My True Companion, Zero-Cost CRM contributions, Java Subscription Manager, and GitHub Profile Analyzer.',
            icon: <FolderGit2 size={24} />,
            badge: '7 Featured',
            color: 'cyan'
        },
        {
            id: 'experience',
            title: 'Experience',
            subtitle: 'Astrea IT & CodSoft',
            desc: 'Salesforce Developer Intern at Astrea IT Services (Placement CRM, Apex, LWC) and Web Development Intern at CodSoft.',
            icon: <Briefcase size={24} />,
            badge: '2 Internships',
            color: 'blue'
        },
        {
            id: 'skills',
            title: 'Skills & Tech Stack',
            subtitle: 'Interactive Matrix',
            desc: 'Interactive node explorer covering Frontend, Backend, AI & Prompt Engineering, Databases & DevOps.',
            icon: <Cpu size={24} />,
            badge: 'Explore Nodes',
            color: 'purple'
        },
        {
            id: 'education',
            title: 'Education',
            subtitle: 'B.Tech CSE & Academics',
            desc: 'Manav Rachna University (Core CSE, Minor in Data Science), Class XII (90.8%), Class X (94%).',
            icon: <GraduationCap size={24} />,
            badge: 'Expected 2028',
            color: 'green'
        },
        {
            id: 'achievements',
            title: 'Achievements & Certifications',
            subtitle: 'Honors & Verified Badges',
            desc: 'Dean’s & VC List honors, 118+ GitHub commits, Google Cloud, MongoDB, & Deloitte credentials.',
            icon: <Trophy size={24} />,
            badge: 'Honors',
            color: 'amber'
        },
        {
            id: 'about',
            title: 'The Mindset & About',
            subtitle: 'Engineering Philosophy',
            desc: 'How I approach systems: Learn by Building, Engineering Over Tutorials, and AI as a Superpower.',
            icon: <Sparkles size={24} />,
            badge: 'Philosophy',
            color: 'cyan'
        }
    ];

    return (
        <div className="home-page-view">
            {/* Original Cinematic Hero */}
            <Hero onNavigate={onNavigate} />

            {/* Hub Directory Section */}
            <section className="section-padding hub-section">
                <div className="container">
                    <div className="section-header-compact center text-center">
                        <span className="section-eyebrow">Explore My Portfolio</span>
                        <h2 className="section-title">Directory & Key Sections</h2>
                        <p className="section-subtitle" style={{ maxWidth: '620px', margin: '0.5rem auto 0' }}>
                            Navigate through dedicated sections to explore my work, technical expertise, academic credentials, and milestones.
                        </p>
                    </div>

                    <div className="hub-grid">
                        {hubCards.map((card, idx) => (
                            <motion.div
                                key={card.id}
                                className={`hub-card glass hub-${card.color}`}
                                onClick={() => onNavigate(card.id)}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                whileHover={{ y: -6 }}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="hub-card-header">
                                    <div className="hub-icon-box">
                                        {card.icon}
                                    </div>
                                    <span className="hub-badge">{card.badge}</span>
                                </div>

                                <div className="hub-card-body">
                                    <span className="hub-subtitle">{card.subtitle}</span>
                                    <h3 className="hub-title">{card.title}</h3>
                                    <p className="hub-desc">{card.desc}</p>
                                </div>

                                <div className="hub-card-footer">
                                    <span className="hub-open-label">Open Section</span>
                                    <ArrowRight size={16} className="hub-arrow" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Foundation Highlights */}
            <AiFeatures />

            {/* Quick Contact Banner */}
            <section className="section-padding contact-banner-section">
                <div className="container">
                    <div className="contact-banner glass">
                        <div className="contact-banner-content">
                            <span className="section-eyebrow">Get in Touch</span>
                            <h3>Interested in building something together?</h3>
                            <p>Open for Software Engineering internships, freelance projects, and collaborations.</p>
                        </div>
                        <button
                            className="btn btn-primary btn-glow"
                            onClick={() => onNavigate('contact')}
                        >
                            <Mail size={16} style={{ marginRight: '6px' }} />
                            Contact Me
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

