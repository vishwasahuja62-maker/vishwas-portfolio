import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    GitBranch, 
    Flame, 
    Calendar, 
    ExternalLink, 
    Info, 
    CheckCircle2 
} from 'lucide-react';

const GithubHeatmap = () => {
    const [selectedYear, setSelectedYear] = useState('2026');

    return (
        <section className="section-padding github-heatmap-section">
            <div className="container">
                <div className="section-header-compact center text-center">
                    <span className="section-eyebrow">Open Source Velocity</span>
                    <h2 className="section-title">GitHub Contribution Stream</h2>
                    <p className="section-subtitle">
                        Real code, real commits, and verified public repository velocity.
                    </p>
                </div>

                <div className="heatmap-card glass">
                    <div className="heatmap-header">
                        <div className="heatmap-user-meta">
                            <div className="heatmap-avatar">
                                <img 
                                    src="https://avatars.githubusercontent.com/u/197171485?v=4" 
                                    alt="Vishwas Ahuja" 
                                    onError={(e) => { e.currentTarget.src = "https://github.com/github.png"; }}
                                />
                            </div>
                            <div>
                                <h3 className="heatmap-username">@vishwasahuja62-maker</h3>
                                <p className="heatmap-user-status">15+ Public Repositories • Active Contributor</p>
                            </div>
                        </div>

                        <div className="heatmap-actions">
                            <div className="heatmap-year-tabs">
                                <button 
                                    className={`year-tab ${selectedYear === '2026' ? 'active' : ''}`}
                                    onClick={() => setSelectedYear('2026')}
                                >
                                    2026
                                </button>
                                <button 
                                    className={`year-tab ${selectedYear === 'recent' ? 'active' : ''}`}
                                    onClick={() => setSelectedYear('recent')}
                                >
                                    Last Year
                                </button>
                            </div>

                            <a 
                                href="https://github.com/vishwasahuja62-maker" 
                                target="_blank" 
                                rel="noreferrer"
                                className="btn btn-secondary btn-sm"
                            >
                                <span>Inspect Profile</span>
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* GitHub Heatmap Graph Visualization */}
                    <div className="heatmap-chart-container">
                        <img 
                            src={
                                selectedYear === '2026'
                                    ? "https://ghchart.rshah.org/06b6d4/vishwasahuja62-maker"
                                    : "https://github-readme-activity-graph.vercel.app/graph?username=vishwasahuja62-maker&theme=react-dark&hide_border=true&area=true&color=06b6d4"
                            }
                            alt="GitHub Contributions Heatmap" 
                            className="heatmap-img"
                            loading="lazy"
                        />
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="heatmap-stats-strip">
                        <div className="heatmap-stat-item">
                            <GitBranch size={16} className="text-cyan" />
                            <div>
                                <span className="stat-value">15+</span>
                                <span className="stat-label">Public Repos</span>
                            </div>
                        </div>
                        <div className="heatmap-stat-item">
                            <Flame size={16} className="text-amber" />
                            <div>
                                <span className="stat-value">2</span>
                                <span className="stat-label">Merged PRs</span>
                            </div>
                        </div>
                        <div className="heatmap-stat-item">
                            <CheckCircle2 size={16} className="text-green" />
                            <div>
                                <span className="stat-value">100%</span>
                                <span className="stat-label">Clean Code Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubHeatmap;

