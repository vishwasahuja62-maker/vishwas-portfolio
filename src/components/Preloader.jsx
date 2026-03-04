import React, { useRef, useEffect, useState } from 'react';
import logoImg from '../assets/images.jpg';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import '../styles/preloader.css';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const speedRef = useRef(15);
    const isExitingRef = useRef(false);

    // Robust Mobile Detection
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1100px)');
        setIsMobile(mediaQuery.matches);

        const handler = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Canvas Logic (Desktop & Mobile)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        // Optimized count for mobile
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
            update() {
                this.prevZ = this.z;
                // Slower speed for mobile to avoid "breaking" the screen feel
                this.z -= isMobile ? speedRef.current * 0.7 : speedRef.current;
                if (this.z <= 0) {
                    this.init();
                    this.z = canvas.width;
                    this.prevZ = this.z;
                }
            }
            draw() {
                const xidx = (this.x - canvas.width / 2) * (canvas.width / this.z);
                const yidx = (this.y - canvas.height / 2) * (canvas.width / this.z);
                const x = xidx + canvas.width / 2;
                const y = yidx + canvas.height / 2;

                const prevXidx = (this.x - canvas.width / 2) * (canvas.width / this.prevZ);
                const prevYidx = (this.y - canvas.height / 2) * (canvas.width / this.prevZ);
                const prevX = prevXidx + canvas.width / 2;
                const prevY = prevYidx + canvas.height / 2;

                const opacity = 1 - this.z / canvas.width;

                ctx.beginPath();
                // Increased opacity for mobile visibility
                const baseAlpha = isMobile ? 0.9 : 0.7;
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * baseAlpha})`;
                ctx.lineWidth = (isMobile ? 2.0 : 2.5) * opacity;
                ctx.moveTo(x, y);
                ctx.lineTo(prevX, prevY);
                ctx.stroke();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(8, 10, 12, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
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
            // Subtle, premium entrance for mobile
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

            // Subtle logo pulse
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

    const handleEnter = () => {
        isExitingRef.current = true;

        const exitTl = gsap.timeline({
            onComplete: onComplete
        });

        if (isMobile) {
            // Smooth, professional slide-up for mobile
            exitTl.to(".preloader-content", {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: "power2.in"
            })
                .to(".preloader-overlay", {
                    opacity: 0,
                    y: "-100%",
                    duration: 0.7,
                    ease: "expo.inOut"
                }, "-=0.2");
        } else {
            // High-Energy Desktop Exit
            exitTl.to(".status-item", {
                y: 40,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: "power2.in"
            })
                .to(".identity-reveal", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power3.in"
                }, "-=0.2")
                .to(".enter-cta", {
                    y: 20,
                    opacity: 0,
                    duration: 0.3
                }, "-=0.4")
                .to(".block-overlay", {
                    opacity: 1,
                    stagger: {
                        amount: 0.7,
                        grid: [10, 10],
                        from: "center"
                    },
                    duration: 0.2,
                    ease: "none"
                }, "-=0.3")
                .to(".preloader-overlay", {
                    opacity: 0,
                    duration: 0.7,
                    ease: "power2.inOut",
                    display: "none"
                });
        }
    };

    return (
        <div className="preloader-overlay" ref={containerRef}>
            {!isMobile && (
                <div className="blocks-container">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="block-overlay"></div>
                    ))}
                </div>
            )}

            <canvas ref={canvasRef} className="matrix-canvas" />

            <div className="preloader-bg"></div>
            <div className="bg-aura" style={{ opacity: isMobile ? 0.2 : 0.4 }}></div>

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
                    <button className="btn-enter" onClick={handleEnter}>
                        Enter Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
