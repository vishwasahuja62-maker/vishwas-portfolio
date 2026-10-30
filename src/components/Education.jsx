import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen, School } from 'lucide-react';

const Education = () => {
    const educationList = [
        {
            institution: "Manav Rachna University",
            degree: "B.Tech in Computer Science Engineering (Core)",
            specialization: "Minor: Data Science",
            year: "2024 – Present (Exp. 2028)",
            grade: "Undergraduate",
            highlight: "Dean's List & VC List Awardee"
        },
        {
            institution: "Tagore Academy Public School",
            degree: "Class XII (CBSE)",
            specialization: "Science Stream",
            year: "2022 – 2024",
            grade: "90.8%"
        },
        {
            institution: "St. Anthony’s Senior Secondary School",
            degree: "Class X (CBSE)",
            specialization: "Secondary Education",
            year: "2010 – 2022",
            grade: "94%"
        }
    ];

    return (
        <section id="education" className="section-padding alt-bg">
            <div className="container">
                <div className="section-header-compact">
                    <span className="section-eyebrow">Academic Background</span>
                    <h2 className="section-title">Education</h2>
                </div>

                <div className="education-grid">
                    {educationList.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            className="education-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                        >
                            <div className="edu-top">
                                <div className="edu-icon-badge">
                                    <GraduationCap size={22} />
                                </div>
                                <span className="edu-year">
                                    <Calendar size={14} />
                                    {edu.year}
                                </span>
                            </div>

                            <h3 className="edu-institution">{edu.institution}</h3>
                            <h4 className="edu-degree text-cyan">{edu.degree}</h4>
                            
                            {edu.specialization && (
                                <p className="edu-spec">
                                    <BookOpen size={14} className="inline-icon" />
                                    {edu.specialization}
                                </p>
                            )}

                            <div className="edu-footer">
                                <div className="edu-grade-badge">
                                    <Award size={15} />
                                    <span>Score / Status: <strong>{edu.grade}</strong></span>
                                </div>
                                {edu.highlight && (
                                    <span className="edu-highlight-pill">{edu.highlight}</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
