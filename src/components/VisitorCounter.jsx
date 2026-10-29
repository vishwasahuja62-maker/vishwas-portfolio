import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
    const [views, setViews] = useState(null);

    useEffect(() => {
        // Fetch 100% REAL hit counter from hits.sh SVG backend
        // Hits.sh automatically increments and returns the exact live visitor count
        const fetchRealCount = async () => {
            try {
                const res = await fetch('https://hits.sh/vishwasahuja62-maker.portfolio.svg', {
                    cache: 'no-cache'
                });
                const svgText = await res.text();
                // Extract the exact real hit number rendered inside the SVG <text> tag
                const matches = svgText.match(/>(\d+)</g);
                if (matches && matches.length > 0) {
                    const numberStr = matches[matches.length - 1].replace(/[><]/g, '');
                    const realCount = parseInt(numberStr, 10);
                    if (!isNaN(realCount)) {
                        setViews(realCount);
                        localStorage.setItem('vishwas_real_hits', realCount.toString());
                        return;
                    }
                }
            } catch (err) {
                // If offline or blocked, read from last saved real count
                const cached = localStorage.getItem('vishwas_real_hits');
                if (cached) {
                    setViews(parseInt(cached, 10));
                }
            }
        };

        fetchRealCount();
    }, []);

    return (
        <div className="visitor-counter-pill glass">
            <span className="live-dot-pulse"></span>
            <Eye size={13} className="text-cyan" />
            <span className="counter-label">Live Unique Hits:</span>
            <span className="counter-number">{views !== null ? views.toLocaleString() : 'Syncing...'}</span>
        </div>
    );
};

export default VisitorCounter;
