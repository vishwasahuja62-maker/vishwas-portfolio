import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import SystemLogs from './components/SystemLogs';
import { ArrowLeft } from 'lucide-react';

function App() {
    const [isLoading, setIsLoading] = useState(() => {
        return !sessionStorage.getItem('portfolio_preloader_seen');
    });
    const [currentPage, setCurrentPage] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handlePreloaderComplete = () => {
        sessionStorage.setItem('portfolio_preloader_seen', 'true');
        setIsLoading(false);
    };

    const navigateTo = (pageId) => {
        setCurrentPage(pageId);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // UI Tick sound
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
            if (e.target.closest('a, button, .command-item, .contact-card, .hub-card, .nav-island-btn')) {
                playTick();
            }
        };
        window.addEventListener('mouseover', handleInteraction);
        return () => window.removeEventListener('mouseover', handleInteraction);
    }, []);

    const renderPageContent = () => {
        switch (currentPage) {
            case 'projects':
                return <Projects />;
            case 'experience':
                return <Experience />;
            case 'skills':
                return <Skills />;
            case 'education':
                return <Education />;
            case 'achievements':
                return <Achievements />;
            case 'about':
                return <About />;
            case 'contact':
                return <Contact />;
            case 'home':
            default:
                return <Home onNavigate={navigateTo} />;
        }
    };

    return (
        <div className="app-container">
            <CustomCursor />
            {isLoading ? (
                <Preloader onComplete={handlePreloaderComplete} />
            ) : (
                <>
                    <Background />
                    <CommandPalette onNavigate={navigateTo} />
                    <SystemLogs />

                    {/* Elite Floating Dock Navbar */}
                    <Navbar
                        currentPage={currentPage}
                        onNavigate={navigateTo}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />

                    <main className="main-content-reveal">
                        {currentPage !== 'home' ? (
                            <div className="page-wrapper-view">
                                <div className="container">
                                    <div className="page-breadcrumb-bar">
                                        <button className="page-back-button" onClick={() => navigateTo('home')}>
                                            <ArrowLeft size={16} />
                                            <span>Back to Home Overview</span>
                                        </button>
                                    </div>
                                </div>
                                {renderPageContent()}
                            </div>
                        ) : (
                            renderPageContent()
                        )}
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
