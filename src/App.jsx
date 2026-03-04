import React, { useState, useEffect } from 'react';
import logoImg from './assets/images.jpg';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AiFeatures from './components/AiFeatures';
import Deployment from './components/Deployment';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import SystemLogs from './components/SystemLogs';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
    const [isLoading, setIsLoading] = useState(() => {
        // If we're in development, you might want to see it, 
        // but for UX, skipping after first load is better.
        return !sessionStorage.getItem('portfolio_preloader_seen');
    });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handlePreloaderComplete = () => {
        sessionStorage.setItem('portfolio_preloader_seen', 'true');
        setIsLoading(false);
    };

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    // Subtle UI sound logic
    const playTick = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) { /* ignore */ }
    };

    useEffect(() => {
        const handleInteraction = (e) => {
            if (e.target.closest('a, button, .command-item, .contact-card')) {
                playTick();
            }
        };
        window.addEventListener('mouseover', handleInteraction);
        return () => window.removeEventListener('mouseover', handleInteraction);
    }, []);

    // Removed redundant staggered reveal to let individual components handle their own build-up animations


    return (
        <div className="app-container">
            <CustomCursor />
            {isLoading ? (
                <Preloader onComplete={handlePreloaderComplete} />
            ) : (
                <>
                    <Background />
                    <CommandPalette />
                    <SystemLogs />

                    <nav className="navbar">
                        <div className="nav-logo">
                            <img src={logoImg} alt="Logo" className="nav-logo-img" />
                        </div>

                        {/* Desktop nav links */}
                        <div className="nav-links nav-links-desktop">
                            <a href="#about">About</a>
                            <a href="#skills">Skills</a>
                            <a href="#projects">Projects</a>
                            <a href="#deployment">Deployment</a>
                            <a href="#contact" className="nav-cta">Contact</a>
                        </div>

                        {/* Hamburger button (mobile only) */}
                        <button
                            className={`hamburger-btn ${mobileMenuOpen ? 'is-active' : ''}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </nav>

                    {/* Mobile nav overlay */}
                    <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}>
                        <div className="mobile-nav-content">
                            <a href="#about" onClick={handleNavClick}>About</a>
                            <a href="#skills" onClick={handleNavClick}>Skills</a>
                            <a href="#projects" onClick={handleNavClick}>Projects</a>
                            <a href="#deployment" onClick={handleNavClick}>Deployment</a>
                            <a href="#contact" onClick={handleNavClick}>Contact</a>
                        </div>
                        <div className="mobile-nav-footer">
                            <p>© {new Date().getFullYear()} Vishwas Ahuja</p>
                        </div>
                    </div>

                    <main className="main-content-reveal">
                        <Hero />
                        <About />
                        <Skills />
                        <Projects />
                        <AiFeatures />
                        <Deployment />
                        <Contact />
                        <AiAssistant />
                    </main>

                    <footer>
                        <p>&copy; {new Date().getFullYear()} Vishwas Ahuja. Deployed on Kuberns AI.</p>
                    </footer>
                </>
            )}
        </div>
    );
}

export default App;
