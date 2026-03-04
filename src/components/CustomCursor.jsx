import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [isPressed, setIsPressed] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Physics layers
    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    const ringX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const ringY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const hudX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const hudY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            setIsHidden(true);
            return;
        }

        // Class management based on visibility
        if (!isHidden) {
            document.documentElement.classList.add('custom-cursor-active');
        } else {
            document.documentElement.classList.remove('custom-cursor-active');
        }

        const handleMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (isHidden) setIsHidden(false);

            const target = e.target;
            const clickable = target.closest('a, button, .clickable, .project-case, .contact-card, .btn, .nav-links a, .icon-link, .command-item');
            setIsHovering(!!clickable);
        };

        const handleDown = () => setIsPressed(true);
        const handleUp = () => setIsPressed(false);

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);
        document.addEventListener('mouseleave', () => setIsHidden(true));
        document.addEventListener('mouseenter', () => setIsHidden(false));

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
            document.documentElement.classList.remove('custom-cursor-active');
        };
    }, [isHidden]);

    // Simple touch check for early return
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isHidden || isTouchDevice) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999999 }}>
            {/* 1. HUD Brackets (Targeting System - Visible only on Hover) */}
            <motion.div
                className="cursor-hud"
                style={{
                    x: hudX,
                    y: hudY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    rotate: isHovering ? 90 : 45,
                    scale: isHovering ? 1.2 : 0.5,
                    opacity: isHovering ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "backOut" }}
            >
                <div className="hud-bracket tl"></div>
                <div className="hud-bracket tr"></div>
                <div className="hud-bracket bl"></div>
                <div className="hud-bracket br"></div>
            </motion.div>

            {/* 2. Primary Ring (The "Ring One") */}
            <motion.div
                className="cursor-ring-v4"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isPressed ? 0.8 : (isHovering ? 1.5 : 1),
                    borderColor: isHovering ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.4)',
                    borderStyle: isHovering ? 'dashed' : 'solid',
                    borderWidth: isHovering ? '2px' : '1px'
                }}
                transition={{ duration: 0.3 }}
            />

            {/* 3. Core Dot (Subtle Hint) */}
            <motion.div
                className="cursor-dot-v4"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isPressed ? 1.5 : (isHovering ? 0 : 0.8),
                    opacity: isHovering ? 0 : 0.6,
                    backgroundColor: '#fff'
                }}
            />
        </div>
    );
};

export default CustomCursor;
