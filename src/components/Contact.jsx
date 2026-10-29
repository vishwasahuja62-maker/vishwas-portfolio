import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Github, 
    Linkedin, 
    ArrowUpRight, 
    Globe, 
    Phone, 
    Calendar,
    Send
} from 'lucide-react';
import ContactForm from './ContactForm';
import CalendlyAndSocialHub from './CalendlyAndSocialHub';

const Contact = () => {
    const links = [
        {
            icon: <Mail size={22} />,
            label: "Primary Email",
            value: "vishwasahuja62@gmail.com",
            href: "mailto:vishwasahuja62@gmail.com",
            color: "#06b6d4"
        },
        {
            icon: <Mail size={22} />,
            label: "University Email",
            value: "vishwas_ahuja24@mru.ac.in",
            href: "mailto:vishwas_ahuja24@mru.ac.in",
            color: "#3b82f6"
        },
        {
            icon: <Phone size={22} />,
            label: "Phone Contact",
            value: "+91-8882449462",
            href: "tel:+918882449462",
            color: "#10b981"
        },
        {
            icon: <Github size={22} />,
            label: "GitHub Profile",
            value: "vishwasahuja62-maker",
            href: "https://github.com/vishwasahuja62-maker",
            color: "#f8fafc"
        },
        {
            icon: <Linkedin size={22} />,
            label: "LinkedIn Network",
            value: "vishwas-ahuja-6b5225327",
            href: "https://www.linkedin.com/in/vishwas-ahuja-6b5225327",
            color: "#38bdf8"
        },
        {
            icon: <Globe size={22} />,
            label: "Portfolio Site",
            value: "sites.google.com/view/vishwasahuja",
            href: "https://sites.google.com/view/vishwasahuja/home",
            color: "#a855f7"
        }
    ];

    return (
        <section id="contact" className="section-padding contact-page-section">
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
                        BTech CSE (Data Science) student open to internships, software engineering roles, and open-source collaborations.
                        Drop a message or schedule a call.
                    </p>
                </motion.div>

                {/* Dual Column: Working Contact Form + Calendly / Social Links Hub */}
                <div className="contact-dual-column">
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <ContactForm />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <CalendlyAndSocialHub />
                    </motion.div>
                </div>

                {/* Legacy Quick Cards Grid */}
                <div className="contact-secondary-header">
                    <span className="section-eyebrow">Direct Contact Endpoints</span>
                </div>

                <div className="contact-cards-grid">
                    {links.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.href}
                            target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                            rel="noreferrer"
                            className="contact-card glass"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
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
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p>Designed with deep space aesthetics. Always responsive to genuine technical inquiries.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
