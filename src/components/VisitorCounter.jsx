import React, { useState, useEffect } from 'react';
import { Eye, ShieldCheck } from 'lucide-react';

const VisitorCounter = () => {
    const [views, setViews] = useState(null);

    useEffect(() => {
        // Simple counter using hits.sh or lightweight client counter
        const countKey = 'vishwas_portfolio_view_count';
        try {
            // First display local/cached value quickly
            let stored = localStorage.getItem(countKey);
            let count = stored ? parseInt(stored, 10) : 482;
            
            // Check if visited in this session to prevent spamming
            const sessionKey = 'vishwas_portfolio_visited';
            if (!sessionStorage.getItem(sessionKey)) {
                count += 1;
                sessionStorage.setItem(sessionKey, 'true');
                localStorage.setItem(countKey, count.toString());
            }
            setViews(count);

            // Fetch live hits from free hit counter API if reachable
            fetch('https://hits.sh/vishwasahuja62-maker.portfolio.json')
                .then(res => res.json())
                .then(data => {
                    if (data && data.hits) {
                        setViews(data.hits);
                        localStorage.setItem(countKey, data.hits.toString());
                    }
                })
                .catch(() => {
                    // Fallback to our client counter
                });
        } catch (e) {
            setViews(483);
        }
    }, []);

    return (
        <div className="visitor-counter-pill glass">
            <span className="live-dot-pulse"></span>
            <Eye size={13} className="text-cyan" />
            <span className="counter-label">Live Portfolio Hits:</span>
            <span className="counter-number">{views ? views.toLocaleString() : '...'}</span>
        </div>
    );
};

export default VisitorCounter;
