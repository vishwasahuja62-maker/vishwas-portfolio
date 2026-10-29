import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            role: "Salesforce Developer & CRM Intern",
            company: "Astrea IT Services",
            period: "June 2026 – July 2026",
            location: "Noida / Hybrid",
            points: [
                "Engineered a centralized, enterprise Student Placement Management System directly on Salesforce CRM (Cloud Org) replacing fragmented spreadsheet workflows.",
                "Developed modular, reactive UI interfaces using Lightning Web Components (LWC) and integrated backend business logic with Apex controllers.",
                "Automated end-to-end recruitment lifecycle pipelines (Applications, Eligibility, Interview Scheduling, Offer Letter generation) using Salesforce Flows and Validation Rules.",
                "Architected a custom data model with Custom Objects, Record Types (On-Campus, Off-Campus, Internship), and Role-Based Access Control (RBAC).",
                "Created real-time executive dashboards and reports providing instant visibility into student placement conversion rates and company metrics."
            ],
            tech: ["Salesforce CRM", "Apex", "Lightning Web Components (LWC)", "Salesforce Flows", "SFDX CLI", "SOQL/SOSL", "VS Code"]
        },
        {
            role: "Web Development Intern",
            company: "CodSoft",
            period: "June 2026 – July 2026",
            location: "Work From Home",
            points: [
                "Developed two full-stack web applications using React.js, Node.js, Express.js, PostgreSQL, and Supabase.",
                "Built responsive user interfaces, secure authentication systems, REST APIs, and integrated cloud-hosted databases.",
                "Worked across both frontend and backend while following Git-based version control and modern web development practices.",
                "Strengthened practical full-stack development skills by building industry-oriented projects from scratch."
            ],
            tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Supabase", "REST APIs", "Git"]
        }
    ];

    return (
        <section id="experience" className="section-padding">
            <div className="container">
                <div className="section-header-compact">
                    <span className="section-eyebrow">Career & Roles</span>
                    <h2 className="section-title">Work Experience</h2>
                </div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="experience-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="experience-header">
                                <div className="experience-role-group">
                                    <div className="role-icon-box">
                                        <Briefcase size={22} />
                                    </div>
                                    <div>
                                        <h3 className="experience-role">{exp.role}</h3>
                                        <h4 className="experience-company text-cyan">{exp.company}</h4>
                                    </div>
                                </div>
                                <div className="experience-meta">
                                    <span className="meta-item">
                                        <Calendar size={15} />
                                        {exp.period}
                                    </span>
                                    <span className="meta-item">
                                        <MapPin size={15} />
                                        {exp.location}
                                    </span>
                                </div>
                            </div>

                            <ul className="experience-points">
                                {exp.points.map((pt, pIdx) => (
                                    <li key={pIdx}>
                                        <CheckCircle2 size={16} className="bullet-icon" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="experience-tech-tags">
                                {exp.tech.map((t, tIdx) => (
                                    <span key={tIdx} className="tech-badge">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

