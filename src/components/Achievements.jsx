import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, GitMerge, GitCommit, ShieldCheck, CheckCircle2, Star, ExternalLink } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        {
            title: "Dean's List and VC List Award Recipient",
            subtitle: "Academic & Leadership Excellence",
            description: "Honored on both the Dean's List and Vice Chancellor's List at Manav Rachna University for outstanding academic ranking and overall performance.",
            icon: <Trophy size={22} />,
            tag: "Honors"
        },
        {
            title: "2 Merged Open-Source Pull Requests",
            subtitle: "Real-World OSS Contributions — Merged by Maintainers",
            description: "Contributed production-ready features to two external open-source repositories that were reviewed, approved, and merged by project maintainers.",
            icon: <GitMerge size={22} />,
            tag: "Open Source",
            prs: [
                {
                    label: "feat: export activity audit log as CSV/JSON",
                    repo: "ConvoBrains/zero-cost-crm",
                    url: "https://github.com/ConvoBrains/zero-cost-crm/pull/138",
                    pr: "#138"
                },
                {
                    label: "feat(amcards): add Amcards plugin",
                    repo: "corsairdev/corsair",
                    url: "https://github.com/corsairdev/corsair/pull/668",
                    pr: "#668"
                }
            ]
        },
        {
            title: "15+ Public Repositories on GitHub",
            subtitle: "Full-Stack, ML, Cloud & Systems Projects",
            description: "Maintaining 15+ public repositories spanning full-stack web apps, machine learning experiments, Java enterprise systems, and open-source contributions — with modular, production-grade architecture.",
            icon: <GitCommit size={22} />,
            tag: "GitHub"
        },
        {
            title: "Hackathon Competitor & Builder",
            subtitle: "Rapid Prototyping & Team Problem Solving",
            description: "Participated in multiple university-level and online hackathons, developing functional full-stack prototypes under tight deadlines.",
            icon: <Award size={22} />,
            tag: "Hackathons"
        }
    ];

    const certifications = [
        {
            title: "MongoDB Java Developer Path",
            issuer: "MongoDB University",
            desc: "Database modeling, CRUD operations, aggregation pipelines, and Java driver integration.",
            badge: "Database"
        },
        {
            title: "Google Cloud Skill Badge – CI/CD Pipelines Implementation",
            issuer: "Google Cloud",
            desc: "Cloud Build, artifact registries, automated containerized workflows, and cloud deployment pipelines.",
            badge: "Cloud & DevOps"
        },
        {
            title: "Deloitte Generative AI Virtual Experience Program",
            issuer: "Forage",
            desc: "Enterprise GenAI exploration, prompt design strategies, and AI governance fundamentals.",
            badge: "Generative AI"
        }
    ];

    return (
        <section id="achievements" className="section-padding">
            <div className="container">
                <div className="section-header-compact">
                    <span className="section-eyebrow">Milestones & Verification</span>
                    <h2 className="section-title">Achievements & Certifications</h2>
                </div>

                <div className="achieve-cert-layout">
                    {/* Achievements Column */}
                    <div className="achieve-column">
                        <div className="column-label">
                            <Star size={18} className="text-cyan" />
                            <h3>Key Achievements</h3>
                        </div>

                        <div className="achieve-cards-stack">
                            {achievements.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="achieve-card glass"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <div className="achieve-icon-box">
                                        {item.icon}
                                    </div>
                                    <div className="achieve-content">
                                        <div className="achieve-title-row">
                                            <h4>{item.title}</h4>
                                            <span className="achieve-tag">{item.tag}</span>
                                        </div>
                                        <p className="achieve-sub">{item.subtitle}</p>
                                        <p className="achieve-desc">{item.description}</p>
                                        {item.prs && (
                                            <div className="pr-links-list">
                                                {item.prs.map((pr, i) => (
                                                    <a
                                                        key={i}
                                                        href={pr.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pr-link-pill"
                                                    >
                                                        <GitMerge size={13} />
                                                        <span className="pr-num">{pr.pr}</span>
                                                        <span className="pr-label">{pr.label}</span>
                                                        <span className="pr-repo">({pr.repo})</span>
                                                        <ExternalLink size={11} />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div className="cert-column">
                        <div className="column-label">
                            <ShieldCheck size={18} className="text-cyan" />
                            <h3>Verified Certifications</h3>
                        </div>

                        <div className="cert-cards-stack">
                            {certifications.map((cert, idx) => (
                                <motion.div
                                    key={idx}
                                    className="cert-card glass"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <div className="cert-badge-row">
                                        <span className="cert-badge">{cert.badge}</span>
                                        <span className="cert-issuer">{cert.issuer}</span>
                                    </div>
                                    <h4 className="cert-title">{cert.title}</h4>
                                    <p className="cert-desc">{cert.desc}</p>
                                    <div className="cert-verified-pill">
                                        <CheckCircle2 size={14} className="text-cyan" />
                                        <span>Verified Credential</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
