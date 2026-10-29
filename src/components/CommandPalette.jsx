import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Github, Code2, Terminal, User } from 'lucide-react';

const CommandPalette = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const items = [
        { icon: <User size={18} />, label: 'Jump to Home Overview', page: 'home', category: 'Navigation' },
        { icon: <User size={18} />, label: 'Jump to About & Mindset', page: 'about', category: 'Navigation' },
        { icon: <Code2 size={18} />, label: 'View Work Experience', page: 'experience', category: 'Navigation' },
        { icon: <Code2 size={18} />, label: 'Jump to Projects', page: 'projects', category: 'Navigation' },
        { icon: <Terminal size={18} />, label: 'View Skills Matrix', page: 'skills', category: 'Navigation' },
        { icon: <User size={18} />, label: 'View Education', page: 'education', category: 'Navigation' },
        { icon: <Terminal size={18} />, label: 'View Achievements & Certifications', page: 'achievements', category: 'Navigation' },
        { icon: <Search size={18} />, label: 'View ElevateHire Platform', page: 'projects', category: 'Projects' },
        { icon: <Search size={18} />, label: 'View My True Companion', page: 'projects', category: 'Projects' },
        { icon: <Search size={18} />, label: 'Search GitHub Analyzer', page: 'projects', category: 'Projects' },
        { icon: <Search size={18} />, label: 'Search ProKanban Elite', page: 'projects', category: 'Projects' },
        { icon: <User size={18} />, label: 'Contact Vishwas', page: 'contact', category: 'Navigation' },
        { icon: <Github size={18} />, label: 'Github Profile', url: 'https://github.com/vishwasahuja62-maker', category: 'External' },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (item) => {
        if (item.url) {
            window.open(item.url, '_blank');
        } else if (item.page && onNavigate) {
            onNavigate(item.page);
        }
        setIsOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="command-palette-overlay">
                    <motion.div
                        className="command-palette-wrapper glass"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="command-search-wrapper">
                            <Search size={20} className="search-icon" />
                            <input
                                autoFocus
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <kbd className="esc-badge">ESC</kbd>
                        </div>

                        <div className="command-results-list">
                            {filteredItems.length === 0 ? (
                                <div className="command-empty">No results found.</div>
                            ) : (
                                filteredItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="command-item"
                                        onClick={() => handleSelect(item)}
                                    >
                                        <div className="item-left">
                                            <span className="item-icon">{item.icon}</span>
                                            <span className="item-label">{item.label}</span>
                                        </div>
                                        <div className="item-right">
                                            <span className="item-cat">{item.category}</span>
                                            <ArrowRight size={14} className="arrow" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="command-footer">
                            <span>Navigation shortcut</span>
                            <div className="keys">
                                <kbd>Ctrl</kbd> + <kbd>K</kbd> to open
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
