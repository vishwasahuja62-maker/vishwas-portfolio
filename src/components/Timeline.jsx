import React from 'react';
import { motion } from 'framer-motion';
import { 
    School, 
    GraduationCap, 
    Briefcase, 
    GitMerge, 
    Sparkles, 
    ExternalLink, 
    Calendar,
    ArrowRight
} from 'lucide-react';

const timelineEvents = [
    {
        year: '2020 – 2022',
        period: 'Secondary Education',
        title: 'Class X & XII Board Examinations',
        subtitle: 'Bhatnagar International Summit School, New Delhi',
        desc: 'Graduated with 90.8% in Class XII (CBSE) and 94% in Class X. Built solid mathematical fundamentals and early curiosity in computing.',
        tag: 'Academics',
        icon: <School size={20} />,
        color: 'blue'
    },
    {
        year: '2024 – Present (Exp. 2028)',
        period: 'Undergraduate Degree',
        title: 'B.Tech in Computer Science & Engineering',
        subtitle: 'Manav Rachna University, Faridabad (Minor in Data Science)',
        desc: 'Maintained outstanding academic excellence earning honors on both the Dean\'s List and Vice Chancellor\'s (VC) List. Specializing in full-stack engineering, algorithms, and distributed data systems.',
        tag: 'University',
        icon: <GraduationCap size={20} />,
        color: 'purple'
    },
    {
        year: 'June 2026 – July 2026',
        period: 'Industry Internship',
        title: 'Salesforce Developer Intern',
        subtitle: 'Astrea IT Services (Noida / Hybrid)',
        desc: 'Engineered an enterprise Student Placement Management CRM hosted natively on Salesforce Cloud. Developed dynamic Lightning Web Components (LWC), custom Apex triggers, and automated Salesforce Flows.',
        tag: 'Salesforce CRM',
        icon: <Briefcase size={20} />,
        color: 'cyan'
    },
    {
        year: 'June 2026 – July 2026',
        period: 'Industry Internship',
        title: 'Web Development Intern',
        subtitle: 'CodSoft (Remote)',
        desc: 'Engineered responsive web applications using React.js and modern JavaScript standards. Implemented mobile-responsive UIs, optimized assets, and modular component libraries.',
        tag: 'Web Dev',
        icon: <Briefcase size={20} />,
        color: 'green'
    },
    {
        year: '2026',
        period: 'Open Source',
        title: '2 Merged Production Pull Requests',
        subtitle: 'ConvoBrains/zero-cost-crm & corsairdev/corsair',
        desc: 'Successfully authored and merged PR #138 (audit log export engine) and PR #668 (Amcards agent plugin integration) into active open-source platforms.',
        tag: 'OSS Contributor',
        icon: <GitMerge size={20} />,
        color: 'amber'
    },
    {
        year: '2026 – Beyond',
        period: 'Flagship Systems',
        title: 'Building Enterprise Full-Stack & AI Platforms',
        subtitle: 'ElevateHire, My True Companion, Supabase Kanban, & More',
        desc: 'Continuing to build and ship production systems with modern tech stacks (React 18, Supabase, Java Servlets, LLMs) while exploring Next.js, System Design, and advanced DSA.',
        tag: 'Active Engineering',
        icon: <Sparkles size={20} />,
        color: 'cyan'
    }
];

const Timeline = ({ onNavigate }) => {
    return (
        <section id="timeline" className="section-padding timeline-section">
            <div className="container">
                <div className="section-header center text-center">
                    <span className="section-eyebrow">Milestone Trajectory</span>
                    <h2 className="section-title">The Engineering Journey</h2>
                    <p className="section-subtitle">
                        From school foundations to university honors, enterprise internships, and merged open-source code.
                    </p>
                </div>

                <div className="timeline-wrapper">
                    <div className="timeline-spine"></div>

                    <div className="timeline-items-flow">
                        {timelineEvents.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    className={`timeline-entry ${isEven ? 'entry-left' : 'entry-right'}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    {/* Timeline Marker Node */}
                                    <div className={`timeline-marker marker-${event.color}`}>
                                        {event.icon}
                                    </div>

                                    {/* Card Content */}
                                    <div className="timeline-card glass">
                                        <div className="timeline-card-header">
                                            <span className="timeline-tag">{event.tag}</span>
                                            <div className="timeline-date-chip">
                                                <Calendar size={13} />
                                                <span>{event.year}</span>
                                            </div>
                                        </div>

                                        <span className="timeline-period-label">{event.period}</span>
                                        <h3 className="timeline-title">{event.title}</h3>
                                        <h4 className="timeline-subtitle">{event.subtitle}</h4>
                                        <p className="timeline-desc">{event.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {onNavigate && (
                    <div className="timeline-footer-cta">
                        <button 
                            className="btn btn-secondary btn-glow"
                            onClick={() => onNavigate('experience')}
                        >
                            <span>Inspect Full Experience</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Timeline;
