import React from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    Clock, 
    Sparkles, 
    ExternalLink, 
    Github, 
    Linkedin, 
    Mail, 
    CheckCircle2 
} from 'lucide-react';

const CalendlyAndSocialHub = () => {
    return (
        <div className="calendly-social-hub-container">
            {/* Book a Call / Calendly Card */}
            <div className="calendly-card glass">
                <div className="calendly-card-header">
                    <div className="calendly-icon-pill">
                        <Calendar size={18} className="text-cyan" />
                        <span>Interactive Scheduling</span>
                    </div>
                    <span className="live-dot-pulse"></span>
                </div>

                <h3 className="calendly-title">Book a 1:1 Discussion</h3>
                <p className="calendly-desc">
                    Looking to discuss full-time roles, internship opportunities, or engineering systems? Book a direct 20-minute call slot on my calendar.
                </p>

                <div className="calendly-perks-list">
                    <div className="perk-item">
                        <Clock size={14} className="text-cyan" />
                        <span>20-Min Technical & Project Chat</span>
                    </div>
                    <div className="perk-item">
                        <CheckCircle2 size={14} className="text-green" />
                        <span>Instant Google Meet invite generation</span>
                    </div>
                </div>

                <div className="calendly-action-row">
                    <a 
                        href="https://calendly.com" 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn btn-secondary btn-glow"
                    >
                        <Calendar size={15} />
                        <span>Book Slot via Calendly</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* Social Links Hub (GitHub + LinkedIn as requested) */}
            <div className="social-hub-card glass">
                <div className="social-hub-header">
                    <span className="section-eyebrow">Verified Profiles</span>
                    <h3 className="social-hub-title">Social Links Hub</h3>
                    <p className="social-hub-desc">
                        Connect with me across my verified developer identity platforms.
                    </p>
                </div>

                <div className="social-hub-grid">
                    <a 
                        href="https://github.com/vishwasahuja62-maker" 
                        target="_blank" 
                        rel="noreferrer"
                        className="social-hub-tile glass"
                    >
                        <div className="social-tile-icon icon-github">
                            <Github size={22} />
                        </div>
                        <div className="social-tile-text">
                            <span className="social-tile-name">GitHub</span>
                            <span className="social-tile-handle">@vishwasahuja62-maker</span>
                            <span className="social-tile-badge">15+ Repositories</span>
                        </div>
                        <ExternalLink size={16} className="social-tile-arrow" />
                    </a>

                    <a 
                        href="https://www.linkedin.com/in/vishwas-ahuja-6b5225327" 
                        target="_blank" 
                        rel="noreferrer"
                        className="social-hub-tile glass"
                    >
                        <div className="social-tile-icon icon-linkedin">
                            <Linkedin size={22} />
                        </div>
                        <div className="social-tile-text">
                            <span className="social-tile-name">LinkedIn</span>
                            <span className="social-tile-handle">Vishwas Ahuja</span>
                            <span className="social-tile-badge">Professional Network</span>
                        </div>
                        <ExternalLink size={16} className="social-tile-arrow" />
                    </a>

                    <a 
                        href="mailto:vishwasahuja62@gmail.com"
                        className="social-hub-tile glass"
                    >
                        <div className="social-tile-icon icon-mail">
                            <Mail size={22} />
                        </div>
                        <div className="social-tile-text">
                            <span className="social-tile-name">Direct Email</span>
                            <span className="social-tile-handle">vishwasahuja62@gmail.com</span>
                            <span className="social-tile-badge">Fast Response</span>
                        </div>
                        <ExternalLink size={16} className="social-tile-arrow" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CalendlyAndSocialHub;

