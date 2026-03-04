import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Github, Code2, Terminal, User } from 'lucide-react';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const items = [
        { icon: <User size={18} />, label: 'Jump to About', target: '#about', category: 'Navigation' },
        { icon: <Code2 size={18} />, label: 'Jump to Projects', target: '#projects', category: 'Navigation' },
        { icon: <Terminal size={18} />, label: 'View Deployment', target: '#deployment', category: 'Navigation' },
        { icon: <Search size={18} />, label: 'Search GitHub Analyzer', target: '#projects', category: 'Projects' },
        { icon: <Search size={18} />, label: 'Search ProKanban Elite', target: '#projects', category: 'Projects' },
        { icon: <Github size={18} />, label: 'Github Profile', target: 'https://github.com/vishwasahuja62-maker', category: 'External' },
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

    const handleSelect = (target) => {
        if (target.startsWith('http')) {
            window.open(target, '_blank');
        } else {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
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
                            <div className="esc-hint">ESC</div>
                        </div>

                        <div className="command-results">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="command-item"
                                        onClick={() => handleSelect(item.target)}
                                    >
                                        <div className="item-icon">{item.icon}</div>
                                        <div className="item-details">
                                            <span className="item-label">{item.label}</span>
                                            <span className="item-category">{item.category}</span>
                                        </div>
                                        <ArrowRight size={14} className="arrow-icon" />
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">No results found for "{query}"</div>
                            )}
                        </div>

                        <div className="command-footer">
                            <div className="hint"><Command size={12} /> + K to toggle</div>
                            <div className="hint"><ArrowRight size={14} style={{ rotate: '90deg' }} /> to navigate</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
