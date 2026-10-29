import React, { useState, useEffect } from 'react';
import logoImg from '../assets/images.jpg';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const Navbar = ({ currentPage, onNavigate, mobileMenuOpen, setMobileMenuOpen }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'education', label: 'Education' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'about', label: 'About' },
    ];

    return (
        <header className={`elite-nav-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
            <nav className="elite-nav-shell">
                {/* HUD Corner Accents */}
                <span className="hud-corner top-left"></span>
                <span className="hud-corner top-right"></span>
                <span className="hud-corner bottom-left"></span>
                <span className="hud-corner bottom-right"></span>

                <div className="elite-nav-content">
                    {/* Left: Interactive Brand Identity */}
                    <div
                        className="brand-cyber-group"
                        onClick={() => onNavigate('home')}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="brand-avatar-wrapper">
                            <div className="avatar-cyber-ring"></div>
                            <img src={logoImg} alt="Vishwas Ahuja" className="brand-avatar-img" />
                            <span className="live-status-dot" title="Available for work"></span>
                        </div>
                        <div className="brand-info-cluster">
                            <div className="brand-name-row">
                                <span className="brand-primary-name">VISHWAS AHUJA</span>
                                <span className="brand-version-chip">v2.4</span>
                            </div>
                            <div className="brand-role-row">
                                <span className="terminal-prompt">&gt;</span>
                                <span className="brand-status-role">Full-Stack Engineer</span>
                            </div>
                        </div>
                    </div>

                    {/* Center: Frosted Glass Nav Island */}
                    <div className="elite-nav-track nav-links-desktop">
                        {navItems.map((item) => {
                            const isActive = currentPage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    className={`elite-nav-btn ${isActive ? 'active' : ''}`}
                                    onClick={() => onNavigate(item.id)}
                                >
                                    <span className="btn-label-text">{item.label}</span>
                                    {isActive && <span className="active-glow-pill"></span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Premium Dynamic CTA */}
                    <div className="elite-action-zone">
                        <button
                            className={`cyber-contact-btn ${currentPage === 'contact' ? 'active' : ''}`}
                            onClick={() => onNavigate('contact')}
                        >
                            <span className="btn-ambient-glow"></span>
                            <span className="btn-content-inner">
                                <Sparkles size={14} className="sparkle-icon" />
                                <span>Get in Touch</span>
                                <ArrowUpRight size={14} className="arrow-icon" />
                            </span>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className={`cyber-hamburger ${mobileMenuOpen ? 'is-active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation"
                        >
                            <span className="line line-1"></span>
                            <span className="line line-2"></span>
                            <span className="line line-3"></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Panel */}
            {mobileMenuOpen && (
                <div className="mobile-cyber-drawer">
                    <div className="drawer-header">
                        <span className="drawer-title">SYSTEM NAVIGATION</span>
                        <span className="drawer-status">● ONLINE</span>
                    </div>
                    <div className="drawer-links">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                className={`drawer-link ${currentPage === item.id ? 'active' : ''}`}
                                onClick={() => onNavigate(item.id)}
                            >
                                <span className="drawer-prefix">#</span>
                                <span className="drawer-name">{item.label}</span>
                            </button>
                        ))}
                        <button
                            className={`drawer-link contact-drawer-link ${currentPage === 'contact' ? 'active' : ''}`}
                            onClick={() => onNavigate('contact')}
                        >
                            <span>Get in Touch</span>
                            <ArrowUpRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
