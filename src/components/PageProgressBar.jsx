import React, { useState, useEffect } from 'react';

const PageProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setScrollProgress((currentScroll / scrollHeight) * 100);
            } else {
                setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', updateScrollProgress);
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <div className="page-scroll-progress-container" aria-hidden="true">
            <div 
                className="page-scroll-progress-bar" 
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
};

export default PageProgressBar;
