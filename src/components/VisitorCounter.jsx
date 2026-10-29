import React, { useState } from 'react';
import { Eye } from 'lucide-react';

const VisitorCounter = () => {
    const [loaded, setLoaded] = useState(false);

    // Using hits.sh dynamic image badge directly via <img>
    // <img> tags are NEVER blocked by CORS policies and are supported on localhost as well as production.
    // The server increments live on every request and returns the actual count in an SVG badge.
    const badgeUrl = `https://hits.sh/vishwasahuja62-maker.portfolio.svg?style=flat-square&label=Visitors&color=06b6d4&labelColor=0f172a&t=${Date.now()}`;

    return (
        <div className="visitor-counter-pill glass">
            <span className="live-dot-pulse"></span>
            <Eye size={13} className="text-cyan" />
            <span className="counter-label">Live Hits:</span>
            <img 
                src={badgeUrl} 
                alt="Live Unique Visitor Counter" 
                className="visitor-badge-img"
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                    // Fallback visual text if image fails to render
                    e.currentTarget.style.display = 'none';
                }}
            />
            {!loaded && <span className="counter-loading-text">Live Sync...</span>}
        </div>
    );
};

export default VisitorCounter;
