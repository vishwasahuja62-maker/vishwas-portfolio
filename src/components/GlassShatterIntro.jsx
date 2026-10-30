import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/glassShatter.css';

/**
 * ============================================================================
 * CINEMATIC GLASS SHATTER INTRO TRANSITION CONSTANTS
 * (Tweak these constants easily to adjust cracks, shards, and timing)
 * ============================================================================
 */
const CRACK_COUNT_DESKTOP = 12; // Radial crack lines on desktop (10 - 14)
const CRACK_COUNT_MOBILE = 8;   // Radial crack lines on mobile
const CONCENTRIC_RINGS = 3;     // Concentric spiderweb crack rings

const SHARDS_DESKTOP = 24;      // Number of triangulated shards (20 - 25)
const SHARDS_MOBILE = 11;       // Fewer shards on mobile (< 768px, 10 - 12)

const FLASH_DURATION = 0.15;    // Impact flash fade duration (seconds)
const CRACK_DURATION = 0.25;    // Crack lines drawing duration (seconds)
const PAUSE_DURATION = 0.10;    // Pause between cracks drawn and shatter
const FALL_DURATION = 1.05;     // Shards gravity fall duration (seconds)
const SHAKE_DURATION = 0.30;    // Full-screen camera rumble duration (seconds)

const GlassShatterIntro = ({ onComplete }) => {
    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const flashRef = useRef(null);
    const cracksSvgRef = useRef(null);
    const shardsStageRef = useRef(null);
    const buttonRef = useRef(null);

    const [isTriggered, setIsTriggered] = useState(false);
    const [cracksData, setCracksData] = useState({ radials: [], rings: [] });
    const [shardsPolygons, setShardsPolygons] = useState([]);

    // Lock body scroll while overlay is active
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    /**
     * Compute crack paths & Delaunay/radial shards based on click coordinates
     */
    const generateShatterGeometry = (clickX, clickY) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const isMobile = w < 768;

        const maxDist = Math.hypot(Math.max(clickX, w - clickX), Math.max(clickY, h - clickY));
        const numCracks = isMobile ? CRACK_COUNT_MOBILE : CRACK_COUNT_DESKTOP;
        const numShards = isMobile ? SHARDS_MOBILE : SHARDS_DESKTOP;

        // 1. Radial cracks radiating from impact point
        const radials = [];
        const angles = [];
        const baseStep = (Math.PI * 2) / numCracks;

        for (let i = 0; i < numCracks; i++) {
            const jitter = (Math.random() - 0.5) * 0.45;
            const angle = i * baseStep + jitter;
            angles.push(angle);

            // Create jagged crack path
            const length = maxDist * (0.85 + Math.random() * 0.35);
            const segments = 4;
            let d = `M ${clickX} ${clickY}`;
            for (let s = 1; s <= segments; s++) {
                const r = (length / segments) * s;
                const dev = (Math.random() - 0.5) * 35;
                const px = clickX + Math.cos(angle) * r - Math.sin(angle) * dev;
                const py = clickY + Math.sin(angle) * r + Math.cos(angle) * dev;
                d += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
            }
            radials.push({ d, strokeWidth: sWidth(i) });
        }

        function sWidth(index) {
            return index % 3 === 0 ? 2.2 : 1.4;
        }

        // 2. Concentric spiderweb crack rings
        const rings = [];
        const ringRadii = [maxDist * 0.12, maxDist * 0.28, maxDist * 0.48];
        ringRadii.slice(0, CONCENTRIC_RINGS).forEach((r) => {
            let ringPath = '';
            const steps = numCracks;
            for (let i = 0; i < steps; i++) {
                const a = angles[i];
                const jitterR = r * (0.82 + Math.random() * 0.36);
                const rx = clickX + Math.cos(a) * jitterR;
                const ry = clickY + Math.sin(a) * jitterR;
                if (i === 0) {
                    ringPath += `M ${rx.toFixed(1)} ${ry.toFixed(1)}`;
                } else {
                    ringPath += ` L ${rx.toFixed(1)} ${ry.toFixed(1)}`;
                }
            }
            ringPath += ' Z';
            rings.push({ d: ringPath });
        });

        // 3. Triangulated shards around the impact point
        // Using radial Delaunay-like Voronoi triangulation:
        // Inner ring shards (smaller, near impact) + Outer ring shards (larger, far away)
        const shards = [];
        const shardRings = 2; // inner and outer
        const shardsPerRing = Math.round(numShards / shardRings);

        const innerR = Math.min(w, h) * 0.28;
        const outerR = maxDist * 1.35;

        // Inner polygon points
        const innerPoints = [];
        for (let i = 0; i < shardsPerRing; i++) {
            const angle = (i * Math.PI * 2) / shardsPerRing + (Math.random() - 0.5) * 0.3;
            const dist = innerR * (0.7 + Math.random() * 0.5);
            innerPoints.push({
                x: clickX + Math.cos(angle) * dist,
                y: clickY + Math.sin(angle) * dist
            });
        }

        // Outer polygon points
        const outerPoints = [];
        for (let i = 0; i < shardsPerRing; i++) {
            const angle = (i * Math.PI * 2) / shardsPerRing + (Math.random() - 0.5) * 0.35;
            const dist = outerR * (0.85 + Math.random() * 0.3);
            outerPoints.push({
                x: clickX + Math.cos(angle) * dist,
                y: clickY + Math.sin(angle) * dist
            });
        }

        // Inner ring triangles (origin -> point[i] -> point[i+1])
        for (let i = 0; i < shardsPerRing; i++) {
            const p1 = innerPoints[i];
            const p2 = innerPoints[(i + 1) % shardsPerRing];
            const poly = `polygon(${clickX}px ${clickY}px, ${p1.x}px ${p1.y}px, ${p2.x}px ${p2.y}px)`;
            const centerDist = Math.hypot((p1.x + p2.x) / 2 - clickX, (p1.y + p2.y) / 2 - clickY);
            shards.push({
                polygon: poly,
                dist: centerDist,
                angle: (i * Math.PI * 2) / shardsPerRing
            });
        }

        // Outer ring triangles (inner p1, inner p2, outer p1) and (inner p2, outer p1, outer p2)
        for (let i = 0; i < shardsPerRing; i++) {
            const ip1 = innerPoints[i];
            const ip2 = innerPoints[(i + 1) % shardsPerRing];
            const op1 = outerPoints[i];
            const op2 = outerPoints[(i + 1) % shardsPerRing];

            const poly1 = `polygon(${ip1.x}px ${ip1.y}px, ${op1.x}px ${op1.y}px, ${ip2.x}px ${ip2.y}px)`;
            const dist1 = Math.hypot((ip1.x + op1.x + ip2.x) / 3 - clickX, (ip1.y + op1.y + ip2.y) / 3 - clickY);
            shards.push({
                polygon: poly1,
                dist: dist1,
                angle: ((i + 0.5) * Math.PI * 2) / shardsPerRing
            });

            if (shards.length < numShards) {
                const poly2 = `polygon(${ip2.x}px ${ip2.y}px, ${op1.x}px ${op1.y}px, ${op2.x}px ${op2.y}px)`;
                const dist2 = Math.hypot((ip2.x + op1.x + op2.x) / 3 - clickX, (ip2.y + op1.y + op2.y) / 3 - clickY);
                shards.push({
                    polygon: poly2,
                    dist: dist2,
                    angle: ((i + 0.8) * Math.PI * 2) / shardsPerRing
                });
            }
        }

        return {
            cracks: { radials, rings },
            shards
        };
    };

    /**
     * Trigger the full glass-break audio + visual cinematic sequence
     */
    const handleEnterClick = (e) => {
        if (isTriggered) return;
        setIsTriggered(true);

        // 1. Impact coordinates
        const clickX = e.clientX || window.innerWidth / 2;
        const clickY = e.clientY || window.innerHeight / 2;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    document.body.style.overflow = '';
                    if (onComplete) onComplete();
                }
            });
            return;
        }

        // 7. Play glass break sound (failsafe handling if audio file is not present)
        try {
            const audio = new Audio('/assets/glass-break.mp3');
            audio.volume = 0.65;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Audio missing or blocked by browser policy; silently ignore
                });
            }
        } catch (err) {
            // Ignore missing audio error
        }

        // Generate geometry
        const { cracks, shards } = generateShatterGeometry(clickX, clickY);
        setCracksData(cracks);
        setShardsPolygons(shards);

        // Position the impact flash element
        if (flashRef.current) {
            flashRef.current.style.left = `${clickX - 130}px`;
            flashRef.current.style.top = `${clickY - 130}px`;
        }

        // Start GSAP Animation Timeline
        requestAnimationFrame(() => {
            runShatterTimeline(clickX, clickY, shards);
        });
    };

    const runShatterTimeline = (clickX, clickY, shards) => {
        const tl = gsap.timeline();

        // Hide "Enter Portfolio" button immediately on impact
        tl.to(contentRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.12,
            ease: 'power2.out'
        }, 0);

        // 2. Impact flash: soft white radial-gradient fades out in ~0.15s
        tl.fromTo(flashRef.current, 
            { opacity: 1, scale: 0.4 },
            { opacity: 0, scale: 1.4, duration: FLASH_DURATION, ease: 'power2.out' },
            0
        );

        // 3. Crack lines: radiate outward using stroke-dashoffset animation over ~0.25s
        const crackPaths = cracksSvgRef.current ? cracksSvgRef.current.querySelectorAll('path') : [];
        if (crackPaths.length > 0) {
            crackPaths.forEach((path) => {
                const len = path.getTotalLength ? path.getTotalLength() : 300;
                path.style.strokeDasharray = `${len} ${len}`;
                path.style.strokeDashoffset = len;
            });

            tl.to(crackPaths, {
                strokeDashoffset: 0,
                duration: CRACK_DURATION,
                ease: 'power1.inOut',
                stagger: 0.01
            }, 0.02);
        }

        // 4. Shatter: After a tiny pause of ~0.10s
        const shatterStartTime = FLASH_DURATION + CRACK_DURATION + PAUSE_DURATION;

        // Hide the unbroken base background right when shards take over
        tl.set('.glass-shatter-base', { opacity: 0 }, shatterStartTime);
        tl.set(cracksSvgRef.current, { opacity: 0 }, shatterStartTime + 0.08);

        // 6. Subtle whole-screen shake (2-3px, ~0.3s) and main website scales from 1.05 to 1
        const mainContent = document.querySelector('.main-content-reveal') || document.querySelector('.app-container');
        if (mainContent) {
            // Screen shake
            tl.to(mainContent, {
                x: '+=3',
                y: '-=2',
                duration: 0.06,
                repeat: 4,
                yoyo: true,
                ease: 'sine.inOut'
            }, shatterStartTime);

            // Scale from 1.05 to 1 for depth reveal
            tl.fromTo(mainContent,
                { scale: 1.05 },
                { scale: 1, duration: 0.85, ease: 'power3.out' },
                shatterStartTime
            );
        }

        // 5. Shards fall away with stagger based on distance from impact point (nearest fall first)
        const shardElements = shardsStageRef.current ? shardsStageRef.current.querySelectorAll('.glass-shard') : [];
        const windowHeight = window.innerHeight;

        // Sort shards by distance so closest fall first
        const sortedIndices = shards
            .map((s, idx) => ({ idx, dist: s.dist, angle: s.angle }))
            .sort((a, b) => a.dist - b.dist);

        sortedIndices.forEach((item, i) => {
            const el = shardElements[item.idx];
            if (!el) return;

            // Performance rule: will-change set during animation
            el.style.willChange = 'transform, opacity';

            // Random physics: gravity fall, x drift away from impact center, and 3D rotation
            const dirX = Math.cos(item.angle);
            const randomXDrift = dirX * (40 + Math.random() * 120) + (Math.random() - 0.5) * 60;
            const randomFallY = windowHeight + 250 + Math.random() * 300;

            const rotX = (Math.random() - 0.5) * 220;
            const rotY = (Math.random() - 0.5) * 260;
            const rotZ = (Math.random() - 0.5) * 180;

            const shardDuration = FALL_DURATION * (0.8 + Math.random() * 0.35);
            const shardDelay = shatterStartTime + i * 0.018; // Staggered: nearest fall first

            tl.to(el, {
                y: randomFallY,
                x: randomXDrift,
                rotateX: rotX,
                rotateY: rotY,
                rotateZ: rotZ,
                ease: 'power2.in',
                duration: shardDuration
            }, shardDelay);

            // Opacity fade out near the bottom
            tl.to(el, {
                opacity: 0,
                duration: 0.35,
                ease: 'power1.in'
            }, shardDelay + shardDuration - 0.35);
        });

        // 8. Total duration: 1.2s - 1.5s -> Clean up DOM & restore body scroll
        tl.call(() => {
            document.body.style.overflow = '';
            if (overlayRef.current) {
                overlayRef.current.remove();
            }
            if (onComplete) {
                onComplete();
            }
        }, null, shatterStartTime + FALL_DURATION + 0.15);
    };

    return (
        <div className="glass-shatter-overlay" ref={overlayRef}>
            {/* Base unbroken background */}
            <div className="glass-shatter-base"></div>

            {/* Impact Flash Element */}
            <div className="glass-impact-flash" ref={flashRef} style={{ opacity: 0 }}></div>

            {/* Cracks SVG Layer */}
            <svg className="glass-cracks-svg" ref={cracksSvgRef}>
                {cracksData.radials.map((crack, idx) => (
                    <path
                        key={`radial-${idx}`}
                        d={crack.d}
                        className="glass-crack-line"
                        strokeWidth={crack.strokeWidth}
                    />
                ))}
                {cracksData.rings.map((ring, idx) => (
                    <path
                        key={`ring-${idx}`}
                        d={ring.d}
                        className="glass-crack-ring"
                        strokeWidth={1.2}
                    />
                ))}
            </svg>

            {/* Triangular Shards 3D Perspective Stage */}
            <div className="glass-shards-stage" ref={shardsStageRef}>
                {shardsPolygons.map((shard, idx) => (
                    <div
                        key={`shard-${idx}`}
                        className="glass-shard"
                        style={{ clipPath: shard.polygon }}
                    />
                ))}
            </div>

            {/* Centered Landing Button */}
            <div className="glass-shatter-content" ref={contentRef}>
                <button
                    ref={buttonRef}
                    className="glass-enter-btn"
                    onClick={handleEnterClick}
                    disabled={isTriggered}
                    aria-label="Enter Portfolio"
                >
                    <span className="glass-enter-btn-text">
                        <span>Enter Portfolio</span>
                    </span>
                    <span className="glass-enter-glow"></span>
                </button>
            </div>
        </div>
    );
};

export default GlassShatterIntro;
