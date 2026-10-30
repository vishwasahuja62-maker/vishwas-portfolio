import React, { useRef, useEffect, useState } from 'react';
import logoImg from '../assets/images.jpg';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import '../styles/preloader.css';
import '../styles/glassShatter.css';

/**
 * ============================================================================
 * CINEMATIC GLASS SHATTER INTRO CONFIGURATION
 * ============================================================================
 */
const CRACK_COUNT_DESKTOP = 13;
const CRACK_COUNT_MOBILE = 8;
const CONCENTRIC_RINGS = 3;
const SHARDS_DESKTOP = 24;
const SHARDS_MOBILE = 11;

const FLASH_DURATION = 0.15;
const CRACK_DURATION = 0.25;
const PAUSE_DURATION = 0.10;
const FALL_DURATION = 1.05;

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const flashRef = useRef(null);
    const cracksSvgRef = useRef(null);
    const shardsStageRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const speedRef = useRef(15);
    const isExitingRef = useRef(false);

    // Dynamic Crack & Shard Geometry State
    const [cracksData, setCracksData] = useState({ radials: [], rings: [] });
    const [shardsPolygons, setShardsPolygons] = useState([]);
    const [isShattering, setIsShattering] = useState(false);

    // Robust Mobile Detection
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1100px)');
        setIsMobile(mediaQuery.matches);

        const handler = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Canvas Space Particle Field
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        const particleCount = isMobile ? 80 : 250;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * canvas.width;
                this.prevZ = this.z;
            }
            update(speed) {
                this.prevZ = this.z;
                this.z -= speed;
                if (this.z <= 0) {
                    this.init();
                    this.prevZ = this.z;
                }
            }
            draw() {
                const cx = canvas.width / 2;
                const cy = canvas.height / 2;

                const x = (this.x - cx) * (canvas.width / this.z) + cx;
                const y = (this.y - cy) * (canvas.width / this.z) + cy;

                const prevX = (this.x - cx) * (canvas.width / this.prevZ) + cx;
                const prevY = (this.y - cy) * (canvas.width / this.prevZ) + cy;

                const alpha = Math.min(1, (1 - this.z / canvas.width) * 1.5);
                const size = Math.max(0.5, (1 - this.z / canvas.width) * 2.5);

                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.7})`;
                ctx.lineWidth = size;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(3, 7, 18, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const currentSpeed = isExitingRef.current ? speedRef.current * 3 : speedRef.current;
            particles.forEach(p => {
                p.update(currentSpeed);
                p.draw();
            });

            if (!isExitingRef.current || speedRef.current > 0) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        resizeCanvas();
        animate();

        window.addEventListener('resize', resizeCanvas);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isMobile]);

    // Entrance Animations
    useGSAP(() => {
        if (isMobile) {
            gsap.fromTo(".preloader-content",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.3
                }
            );

            gsap.to(".preloader-logo", {
                scale: 1.05,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: "expo.out", duration: 1.2 }
        });

        tl.to(".identity-reveal", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power4.out"
        });

        tl.from(".identity-name", {
            letterSpacing: "0.2em",
            duration: 1.5,
            ease: "power3.out"
        }, "-=1.5");

        tl.to(".status-item", {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.8");

        tl.to(".enter-cta", {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "expo.out"
        }, "-=0.2");

    }, { scope: containerRef, dependencies: [isMobile] });

    /**
     * Generate jagged radial and concentric cracks & triangulated shards from click coordinates
     */
    const generateShatterGeometry = (clickX, clickY) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const isMobileScreen = w < 768;

        const maxDist = Math.hypot(Math.max(clickX, w - clickX), Math.max(clickY, h - clickY));
        const numCracks = isMobileScreen ? CRACK_COUNT_MOBILE : CRACK_COUNT_DESKTOP;
        const numShards = isMobileScreen ? SHARDS_MOBILE : SHARDS_DESKTOP;

        const radials = [];
        const angles = [];
        const baseStep = (Math.PI * 2) / numCracks;

        for (let i = 0; i < numCracks; i++) {
            const jitter = (Math.random() - 0.5) * 0.45;
            const angle = i * baseStep + jitter;
            angles.push(angle);

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
            radials.push({ d, strokeWidth: i % 3 === 0 ? 2.2 : 1.4 });
        }

        const rings = [];
        const ringRadii = [maxDist * 0.12, maxDist * 0.28, maxDist * 0.48];
        ringRadii.slice(0, CONCENTRIC_RINGS).forEach((r) => {
            let ringPath = '';
            for (let i = 0; i < numCracks; i++) {
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

        const shards = [];
        const shardRings = 2;
        const shardsPerRing = Math.round(numShards / shardRings);

        const innerR = Math.min(w, h) * 0.28;
        const outerR = maxDist * 1.35;

        const innerPoints = [];
        for (let i = 0; i < shardsPerRing; i++) {
            const angle = (i * Math.PI * 2) / shardsPerRing + (Math.random() - 0.5) * 0.3;
            const dist = innerR * (0.7 + Math.random() * 0.5);
            innerPoints.push({
                x: clickX + Math.cos(angle) * dist,
                y: clickY + Math.sin(angle) * dist
            });
        }

        const outerPoints = [];
        for (let i = 0; i < shardsPerRing; i++) {
            const angle = (i * Math.PI * 2) / shardsPerRing + (Math.random() - 0.5) * 0.35;
            const dist = outerR * (0.85 + Math.random() * 0.3);
            outerPoints.push({
                x: clickX + Math.cos(angle) * dist,
                y: clickY + Math.sin(angle) * dist
            });
        }

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

        return { cracks: { radials, rings }, shards };
    };

    /**
     * ON BUTTON CLICK: CINEMATIC GLASS SHATTER SEQUENCE
     */
    const handleEnter = (e) => {
        if (isExitingRef.current) return;
        isExitingRef.current = true;

        const clickX = e.clientX || window.innerWidth / 2;
        const clickY = e.clientY || window.innerHeight / 2;

        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: onComplete
            });
            return;
        }

        // Failsafe Audio Playback
        try {
            const audio = new Audio('/assets/glass-break.mp3');
            audio.volume = 0.65;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => { /* audio file absent or autoplay restricted; ignore */ });
            }
        } catch (err) { /* ignore */ }

        // Generate dynamic cracks and triangulation
        const { cracks, shards } = generateShatterGeometry(clickX, clickY);
        setCracksData(cracks);
        setShardsPolygons(shards);
        setIsShattering(true);

        if (flashRef.current) {
            flashRef.current.style.left = `${clickX - 130}px`;
            flashRef.current.style.top = `${clickY - 130}px`;
        }

        requestAnimationFrame(() => {
            const tl = gsap.timeline();

            // 1. Fade out preloader content immediately on impact
            tl.to(".preloader-content", {
                opacity: 0,
                scale: 0.96,
                duration: 0.12,
                ease: "power2.out"
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

            // Hide preloader background and canvas as shards take over
            tl.set([".preloader-bg", ".bg-aura", ".matrix-canvas"], { opacity: 0 }, shatterStartTime);
            tl.set(cracksSvgRef.current, { opacity: 0 }, shatterStartTime + 0.08);

            // 6. Screen rumble & depth reveal
            const mainContent = document.querySelector('.main-content-reveal') || document.querySelector('.app-container');
            if (mainContent) {
                tl.to(mainContent, {
                    x: '+=3',
                    y: '-=2',
                    duration: 0.06,
                    repeat: 4,
                    yoyo: true,
                    ease: 'sine.inOut'
                }, shatterStartTime);

                tl.fromTo(mainContent,
                    { scale: 1.05 },
                    { scale: 1, duration: 0.85, ease: 'power3.out' },
                    shatterStartTime
                );
            }

            // 5. Shards fall away with stagger based on distance from impact point (nearest fall first)
            const shardElements = shardsStageRef.current ? shardsStageRef.current.querySelectorAll('.glass-shard') : [];
            const windowHeight = window.innerHeight;

            const sortedIndices = shards
                .map((s, idx) => ({ idx, dist: s.dist, angle: s.angle }))
                .sort((a, b) => a.dist - b.dist);

            sortedIndices.forEach((item, i) => {
                const el = shardElements[item.idx];
                if (!el) return;

                el.style.willChange = 'transform, opacity';

                const dirX = Math.cos(item.angle);
                const randomXDrift = dirX * (40 + Math.random() * 120) + (Math.random() - 0.5) * 60;
                const randomFallY = windowHeight + 250 + Math.random() * 300;

                const rotX = (Math.random() - 0.5) * 220;
                const rotY = (Math.random() - 0.5) * 260;
                const rotZ = (Math.random() - 0.5) * 180;

                const shardDuration = FALL_DURATION * (0.8 + Math.random() * 0.35);
                const shardDelay = shatterStartTime + i * 0.018;

                tl.to(el, {
                    y: randomFallY,
                    x: randomXDrift,
                    rotateX: rotX,
                    rotateY: rotY,
                    rotateZ: rotZ,
                    ease: 'power2.in',
                    duration: shardDuration
                }, shardDelay);

                tl.to(el, {
                    opacity: 0,
                    duration: 0.35,
                    ease: 'power1.in'
                }, shardDelay + shardDuration - 0.35);
            });

            // 8. Animation ends: Complete & clean up
            tl.call(() => {
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }, null, shatterStartTime + FALL_DURATION + 0.15);
        });
    };

    return (
        <div className="preloader-overlay" ref={containerRef} style={{ perspective: '800px' }}>
            <canvas ref={canvasRef} className="matrix-canvas" />

            <div className="preloader-bg"></div>
            <div className="bg-aura" style={{ opacity: isMobile ? 0.2 : 0.4 }}></div>

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
                {isShattering && shardsPolygons.map((shard, idx) => (
                    <div
                        key={`shard-${idx}`}
                        className="glass-shard"
                        style={{ clipPath: shard.polygon }}
                    />
                ))}
            </div>

            {/* Preloader Identity Content & Enter Portfolio Button */}
            <div className="preloader-content" style={{ opacity: isMobile ? 0 : 1 }}>
                <div className="identity-reveal" style={{ opacity: isMobile ? 1 : 0 }}>
                    <img src={logoImg} alt="Logo" className="preloader-logo" />
                    <h1 className="identity-name">Vishwas Ahuja</h1>
                    <div className="identity-title">Aspiring Software Engineer • AI-Powered Systems</div>
                </div>

                <div className="status-grid">
                    {['System State', 'Environment', 'Uptime', 'Location'].map((label, idx) => (
                        <div className="status-item" key={label} style={{ opacity: isMobile ? 1 : 0 }}>
                            <span className="status-label">{label}</span>
                            <span className={`status-value ${idx === 0 ? 'active' : ''}`}>
                                {idx === 0 ? 'ACTIVE' : idx === 1 ? 'PRODUCTION' : idx === 2 ? '99.9%' : 'DL, IN'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="enter-cta" style={{ opacity: isMobile ? 1 : 0 }}>
                    <button className="btn-enter" onClick={handleEnter} disabled={isExitingRef.current}>
                        Enter Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
