import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    const links = [
        {
            icon: <Mail size={22} />,
            label: "Email",
            value: "vishwasahuja62@gmail.com",
            href: "mailto:vishwasahuja62@gmail.com",
            color: "#f59e0b"
        },
        {
            icon: <Github size={22} />,
            label: "GitHub",
            value: "vishwasahuja62-maker",
            href: "https://github.com/vishwasahuja62-maker",
            color: "#f8fafc"
        },
        {
            icon: <Linkedin size={22} />,
            label: "LinkedIn",
            value: "Connect with me",
            href: "https://www.linkedin.com/in/vishwas-ahuja-6b5225327",
            color: "#3b82f6"
        }
    ];

    return (
        <section id="contact" className="section-padding">
            <div className="container">
                <motion.div
                    className="contact-hero"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="contact-eyebrow">Get in Touch</span>
                    <h2 className="contact-headline">
                        Let's build something <span className="highlight">great together</span>.
                    </h2>
                    <p className="contact-desc">
                        BTech CSE (Data Science) student open to internships, freelance gigs, and open-source collabs.
                        If my work excites you — let's talk.
                    </p>
                </motion.div>

                <div className="contact-cards-grid">
                    {links.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noreferrer"
                            className="contact-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.12 }}
                            whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                        >
                            <div className="contact-card-icon" style={{ color: link.color }}>
                                {link.icon}
                            </div>
                            <div className="contact-card-info">
                                <span className="contact-card-label">{link.label}</span>
                                <span className="contact-card-value">{link.value}</span>
                            </div>
                            <ArrowUpRight size={16} className="contact-card-arrow" />
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    className="contact-footer-note"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="proof-badge glass">
                        <span className="blob"></span>
                        All projects are real, self-built, and deployed. Source code available on GitHub.
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
