import React from 'react';
import { motion } from 'framer-motion';
import { 
    Sparkles, 
    ExternalLink, 
    Star, 
    GitFork, 
    ArrowRight, 
    Zap, 
    Layers, 
    Database 
} from 'lucide-react';

const FeaturedSpotlight = ({ onNavigate, onPreview }) => {
    return (
        <section className="section-padding spotlight-section">
            <div className="container">
                <div className="section-header-compact center text-center">
                    <span className="section-eyebrow">Spotlight of the Month</span>
                    <h2 className="section-title">Flagship Project Spotlight</h2>
                    <p className="section-subtitle">
                        Deep dive into our most interactive, real-time reactive architecture.
                    </p>
                </div>

                <div className="spotlight-card glass">
                    <div className="spotlight-badge-row">
                        <span className="spotlight-pill">
                            <Sparkles size={13} className="text-cyan" />
                            <span>Featured Showcase</span>
                        </span>
                        <span className="spotlight-status-live">
                            <span className="pulse-dot active"></span> Production Live
                        </span>
                    </div>

                    <div className="spotlight-content-grid">
                        <div className="spotlight-left">
                            <span className="spotlight-eyebrow">Real-Time Collaborative System</span>
                            <h3 className="spotlight-title">Supabase Kanban Elite</h3>
                            <p className="spotlight-desc">
                                Enterprise-grade drag-and-drop task board with sub-100ms optimistic state reconciliation powered by Supabase PostgreSQL WebSockets and Row-Level Security (RLS). Zero state drift across multiple concurrent client sessions.
                            </p>

                            <div className="spotlight-highlights-list">
                                <div className="highlight-item">
                                    <Zap size={16} className="text-cyan" />
                                    <span>Instant optimistic UI updates with rollback protection</span>
                                </div>
                                <div className="highlight-item">
                                    <Database size={16} className="text-purple" />
                                    <span>PostgreSQL Real-Time subscription channels</span>
                                </div>
                                <div className="highlight-item">
                                    <Layers size={16} className="text-green" />
                                    <span>100 Lighthouse Best Practices & Accessibility</span>
                                </div>
                            </div>

                            <div className="spotlight-tech-tags">
                                <span className="tech-tag">React 18</span>
                                <span className="tech-tag">Supabase Realtime</span>
                                <span className="tech-tag">PostgreSQL</span>
                                <span className="tech-tag">Tailwind CSS</span>
                                <span className="tech-tag">Row-Level Security</span>
                            </div>

                            <div className="spotlight-actions">
                                <button 
                                    className="btn btn-primary btn-glow"
                                    onClick={() => onPreview && onPreview('https://kanban-elite-task-manager.netlify.app/', 'Supabase Kanban Elite')}
                                >
                                    <Zap size={16} />
                                    <span>Interactive Live Preview</span>
                                </button>
                                <a 
                                    href="https://kanban-elite-task-manager.netlify.app/" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="btn btn-secondary"
                                >
                                    <span>Visit Site</span>
                                    <ExternalLink size={15} />
                                </a>
                                {onNavigate && (
                                    <button 
                                        className="btn btn-ghost"
                                        onClick={() => onNavigate('projects')}
                                    >
                                        <span>All 7 Projects</span>
                                        <ArrowRight size={15} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="spotlight-right">
                            <div className="spotlight-preview-frame">
                                <div className="browser-mockup-bar">
                                    <div className="browser-dots">
                                        <span className="dot dot-red"></span>
                                        <span className="dot dot-yellow"></span>
                                        <span className="dot dot-green"></span>
                                    </div>
                                    <span className="browser-url">kanban-elite-task-manager.netlify.app</span>
                                </div>
                                
                                <div className="spotlight-interactive-teaser">
                                    <div className="teaser-kanban-board">
                                        <div className="teaser-column">
                                            <span className="column-title">To-Do (3)</span>
                                            <div className="teaser-card">
                                                <div className="card-pill pill-blue">High Priority</div>
                                                <p className="card-text">Audit JWT Expire Policies</p>
                                            </div>
                                            <div className="teaser-card">
                                                <div className="card-pill pill-cyan">Frontend</div>
                                                <p className="card-text">Integrate HUD Navbar v2</p>
                                            </div>
                                        </div>
                                        <div className="teaser-column">
                                            <span className="column-title">In Progress (1)</span>
                                            <div className="teaser-card card-active">
                                                <div className="card-pill pill-amber">Live Channel</div>
                                                <p className="card-text">Supabase Real-Time Sync</p>
                                                <div className="sync-pulse-bar"></div>
                                            </div>
                                        </div>
                                        <div className="teaser-column">
                                            <span className="column-title">Done (5)</span>
                                            <div className="teaser-card card-done">
                                                <div className="card-pill pill-green">Verified</div>
                                                <p className="card-text">Row-Level Security Config</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="preview-hover-overlay">
                                        <button 
                                            className="btn btn-primary btn-sm btn-glow"
                                            onClick={() => onPreview && onPreview('https://kanban-elite-task-manager.netlify.app/', 'Supabase Kanban Elite')}
                                        >
                                            <Zap size={14} /> Open Live Simulator
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSpotlight;
