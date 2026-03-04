import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SystemLogs = () => {
    const [logs, setLogs] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    const logMessages = [
        "Initializing premium experience...",
        "Applying glassmorphism layers...",
        "Mounting Framer Motion animations...",
        "Fetching real-time GitHub stats...",
        "Calibrating custom cursor...",
        "Deploying edge workers...",
        "Optimizing React 18 bundles...",
        "Ready."
    ];

    useEffect(() => {
        let currentLog = 0;
        const interval = setInterval(() => {
            if (currentLog < logMessages.length) {
                setLogs(prev => [...prev.slice(-3), logMessages[currentLog]]);
                currentLog++;
            } else {
                clearInterval(interval);
                setTimeout(() => setIsVisible(false), 2000);
            }
        }, 800);

        const handleScroll = () => {
            // Randomly inject scroll-based logs
            if (Math.random() > 0.98) {
                const scrollLogs = ["Updating viewport state...", "Calculating parallax shift...", "Re-rendering active block..."];
                setLogs(prev => [...prev.slice(-3), scrollLogs[Math.floor(Math.random() * scrollLogs.length)]]);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && logs.length > 0 && (
                <motion.div
                    className="system-logs-panel"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                >
                    {logs.map((log, i) => (
                        <div key={i} className="log-line">
                            <span className="log-timestamp">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                            <span className="log-text">{log}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SystemLogs;
