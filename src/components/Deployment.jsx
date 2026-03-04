import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Server, Shield, Activity } from 'lucide-react';

const Deployment = () => {
    return (
        <section id="deployment" className="section-padding">
            <div className="container">
                <div className="deploy-grid">
                    <motion.div
                        className="deploy-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="section-title">Production Infrastructure</h2>
                        <h3 className="deploy-subtitle">Powered by Kuberns AI</h3>

                        <p className="deploy-lead">
                            As a BTech student, I treat deployment as a first-class citizen. I don't just "push code" — I manage infrastructure.
                        </p>

                        <div className="infrastructure-cards">
                            <div className="infra-card glass">
                                <Server size={20} className="infra-icon" />
                                <div>
                                    <h4>Edge Deployment</h4>
                                    <p>Global low-latency delivery via Kuberns AI Edge nodes.</p>
                                </div>
                            </div>
                            <div className="infra-card glass">
                                <Shield size={20} className="infra-icon" />
                                <div>
                                    <h4>Auto-Security</h4>
                                    <p>Automated SSL and RLS policies for 100% data isolation.</p>
                                </div>
                            </div>
                            <div className="infra-card glass">
                                <Activity size={20} className="infra-icon" />
                                <div>
                                    <h4>Live Observability</h4>
                                    <p>Real-time metrics and health checks on all active clusters.</p>
                                </div>
                            </div>
                        </div>

                        <div className="deploy-status-box glass">
                            <span className="pulse-dot active"></span>
                            <span className="status-text">Stack: React 18 / Vite / Kuberns AI / Netlify</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="deploy-visual glass"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="terminal-header">
                            <div className="terminal-controls">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="terminal-tab">
                                <Terminal size={14} />
                                <span>deploy.sh</span>
                            </div>
                        </div>
                        <div className="terminal-body">
                            <div className="terminal-line"><span className="prompt">$</span> kuberns login --user vishwas</div>
                            <div className="terminal-line success">✔ Authenticated via DataScience-Auth-V2</div>
                            <div className="terminal-line"><span className="prompt">$</span> kuberns deploy --env prod</div>
                            <div className="terminal-line">... Initializing build environment</div>
                            <div className="terminal-line">... Analyzing React project structure</div>
                            <div className="terminal-line">... Optimizing assets for Edge Delivery</div>
                            <div className="terminal-line">... Deploying to 6 global locations</div>
                            <div className="terminal-line success">---------------------------------------</div>
                            <div className="terminal-line success">🚀 DEPLOYMENT SUCCESSFUL [422ms]</div>
                            <div className="terminal-line">URL: <span className="text-cyan">vishwas-portfolio.kuberns.ai</span></div>
                            <div className="terminal-line active-line"><span className="prompt">$</span> <span className="cursor"></span></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Deployment;
