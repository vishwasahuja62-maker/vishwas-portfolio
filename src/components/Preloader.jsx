/**
 * Preloader.jsx — Cinematic Glass Shatter Intro
 *
 * STACK: React 18 + GSAP + d3-delaunay + html2canvas
 *
 * TIMELINE SPECIFICATION (Zero Dead Wait):
 *   t=0.00s       → Click: Sound plays instantly in same frame (preloaded audio, currentTime=0).
 *                   1-frame impact flash + 4px screen shake.
 *   t=0.00–0.28s  → Cracks radiate outward from click (nearest edges start immediately, farthest by ~0.20s).
 *                   Impact-near cracks have 2.0px stroke & 100% white opacity; outer cracks have 1.2px stroke.
 *   t=0.30s       → BREAK (0.02s after cracks complete): Overlay bg goes transparent, preloader content hidden.
 *                   Website fades in from opacity 0.25 → 1.0 (0.5s) & scales 1.06 → 1.0 (0.5s).
 *                   Shards pop outward 4–12px with small rotation (0.05s).
 *   t=0.35–1.40s  → FALL: Center/small shards fall fast (0.55–0.70s) clearing the center instantly.
 *                   Large outer shards fall heavy and slow (0.90–1.05s) with deep 3D rotation.
 *                   Every shard travels well past the viewport (y += h + 500px).
 *                   Opacity fade occurs ONLY in the final 25% of each shard's fall.
 *   t=1.45s       → COMPLETE: Stage & cracks removed cleanly from DOM, scroll unlocked, onComplete called.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import logoImg from '../assets/images.jpg';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Delaunay } from 'd3-delaunay';
import html2canvas from 'html2canvas';
import '../styles/preloader.css';
import '../styles/glassShatter.css';

/* ============================================================================
   CONFIG — all numbers centralized and easy to tweak
   ============================================================================ */
const CONFIG = {
    // Crack animation
    CRACK_DURATION:         0.28,        // total time window for cracks to spread outward
    CRACK_MAX_EDGES:        65,          // max crack edges to render
    CRACK_NEAR_THRESHOLD:   200,         // px from impact considered "near" (thicker stroke)

    // Break & Pop phase (starts 0.02s after cracks end — NO DEAD WAIT)
    BREAK_DELAY:            0.30,        // absolute timeline second when break starts
    BREAK_POP_DURATION:     0.05,        // snappy pop outward
    POP_DIST_MIN:           4,           // min pop px
    POP_DIST_MAX:           12,          // max pop px

    // Falling shard dynamics (small = fast ~0.6s, large = max ~1.05s)
    FALL_DUR_SMALL:         0.58,        // small shards clear center fast
    FALL_DUR_LARGE:         1.02,        // large outer shards take max ~1.02s
    FALL_STAGGER_MAX:       0.20,        // center shards start at 0.00s stagger, farthest at 0.20s
    FALL_X_DRIFT_MAX:       120,         // max horizontal drift ±px
    FALL_ROT_Z_SMALL:       30,          // rotZ for small shards
    FALL_ROT_Z_LARGE:       55,          // rotZ for large shards
    FALL_ROT_XY_SMALL:      40,          // rotX/Y for small shards
    FALL_ROT_XY_LARGE:      75,          // rotX/Y for large shards

    // Main website reveal (prevents text clash with falling shards)
    REVEAL_FADE_FROM:       0.25,        // website opacity starts at 0.25
    REVEAL_FADE_DUR:        0.50,        // fades to 1.0 in 0.5s
    REVEAL_SCALE_FROM:      1.06,        // starts scale(1.06)
    REVEAL_SCALE_DUR:       0.55,        // scales to 1.0 smoothly

    // Impact FX & Audio
    SHAKE_PX:               4,           // screen shake amplitude px
    SHAKE_DURATION:         0.08,        // shake oscillation duration
    FLASH_DURATION:         0.10,        // impact flash fade duration
    AUDIO_SRC:              '/assets/glass-break.mp3',
    MIN_TRIANGLE_AREA:      500,         // px² — filter out thin edge slivers
};

/* ============================================================================
   HELPER: Build Delaunay triangulation (Desktop 35–45, Mobile ~16 shards)
   ============================================================================ */
function buildDelaunayGeometry(clickX, clickY, isMobileScreen, w, h) {
    const pts = [];

    if (isMobileScreen) {
        // Mobile: target ~16 shards
        const rings = [
            { r: 50, count: 3 },
            { r: 130, count: 4 },
        ];
        rings.forEach(({ r, count }) => {
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
                const rJitter = r * (0.85 + Math.random() * 0.3);
                pts.push([
                    clickX + Math.cos(angle) * rJitter,
                    clickY + Math.sin(angle) * rJitter
                ]);
            }
        });
        pts.push(
            [0, 0], [w, 0], [0, h], [w, h],
            [w * 0.5, 0], [w * 0.5, h],
            [0, h * 0.5], [w, h * 0.5]
        );
    } else {
        // Desktop: target ~35–45 shards (small near impact, large far away)
        const rings = [
            { r: 85,  count: 5 },
            { r: 220, count: 6 },
            { r: 430, count: 7 },
        ];
        rings.forEach(({ r, count }) => {
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
                const rJitter = r * (0.85 + Math.random() * 0.3);
                pts.push([
                    clickX + Math.cos(angle) * rJitter,
                    clickY + Math.sin(angle) * rJitter
                ]);
            }
        });
        pts.push(
            [0, 0], [w, 0], [0, h], [w, h],
            [w * 0.5, 0], [w * 0.5, h],
            [0, h * 0.5], [w, h * 0.5]
        );
    }

    const delaunay = Delaunay.from(pts);
    const { triangles, halfedges } = delaunay;

    /* --- Build triangular shards --- */
    const shards = [];
    const validAreas = [];

    for (let i = 0; i < triangles.length; i += 3) {
        const ia = triangles[i], ib = triangles[i + 1], ic = triangles[i + 2];
        const ax = pts[ia][0], ay = pts[ia][1];
        const bx = pts[ib][0], by = pts[ib][1];
        const cx = pts[ic][0], cy = pts[ic][1];

        const area = Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay)) / 2;
        if (area < CONFIG.MIN_TRIANGLE_AREA) continue;

        const centX = (ax + bx + cx) / 3;
        const centY = (ay + by + cy) / 3;
        const dist  = Math.hypot(centX - clickX, centY - clickY);
        const angle = Math.atan2(centY - clickY, centX - clickX);

        validAreas.push(area);

        shards.push({
            polygon:   `polygon(${ax}px ${ay}px, ${bx}px ${by}px, ${cx}px ${cy}px)`,
            svgPoints: `${ax},${ay} ${bx},${by} ${cx},${cy}`,
            dist,
            angle,
            area,
            sheen: Math.random() * 360,
        });
    }

    // Normalized size: 0 = smallest shard, 1 = largest shard
    const minArea = Math.min(...validAreas, 1000);
    const maxArea = Math.max(...validAreas, 10000);
    shards.forEach(s => {
        s.sizeNorm = Math.min(1, Math.max(0, (s.area - minArea) / (maxArea - minArea)));
    });

    /* --- Build unique crack edges sorted strictly from click outwards --- */
    const edgeSet = new Set();
    const edges   = [];
    for (let e = 0; e < halfedges.length; e++) {
        const opp = halfedges[e];
        if (opp < e) continue;
        const ia = triangles[e];
        const ib = triangles[e % 3 === 2 ? e - 2 : e + 1];
        const key = `${Math.min(ia, ib)}-${Math.max(ia, ib)}`;
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);

        const ax = pts[ia][0], ay = pts[ia][1];
        const bx = pts[ib][0], by = pts[ib][1];
        const midX = (ax + bx) / 2, midY = (ay + by) / 2;
        const dist = Math.hypot(midX - clickX, midY - clickY);
        edges.push({ ax, ay, bx, by, dist });
    }

    edges.sort((a, b) => a.dist - b.dist);

    return { shards, edges };
}

/* ============================================================================
   COMPONENT
   ============================================================================ */
const Preloader = ({ onComplete }) => {
    const containerRef    = useRef(null);
    const canvasRef       = useRef(null);
    const flashRef        = useRef(null);
    const cracksSvgRef    = useRef(null);
    const shardsStageRef  = useRef(null);
    const screenshotRef   = useRef(null);
    const canvasAnimIdRef = useRef(null);
    const isExitingRef    = useRef(false);
    const audioRef        = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // ── Preload Audio on Mount ────────────────────────────────────────────────
    useEffect(() => {
        try {
            const audio = new Audio(CONFIG.AUDIO_SRC);
            audio.preload = 'auto';
            audio.load();
            audioRef.current = audio;
        } catch (_) {}
    }, []);

    // ── Mobile detection ──────────────────────────────────────────────────────
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        setIsMobile(mq.matches);
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // ── Canvas particle field ─────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        const speedRef2 = { v: 15 };
        const count = isMobile ? 80 : 250;

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x     = Math.random() * canvas.width;
                this.y     = Math.random() * canvas.height;
                this.z     = Math.random() * canvas.width;
                this.prevZ = this.z;
            }
            update() {
                this.prevZ = this.z;
                this.z    -= speedRef2.v;
                if (this.z <= 0) { this.reset(); this.prevZ = this.z; }
            }
            draw() {
                const cx = canvas.width / 2, cy = canvas.height / 2;
                const x  = (this.x - cx) * (canvas.width / this.z) + cx;
                const y  = (this.y - cy) * (canvas.width / this.z) + cy;
                const px = (this.x - cx) * (canvas.width / this.prevZ) + cx;
                const py = (this.y - cy) * (canvas.width / this.prevZ) + cy;
                const a  = Math.min(1, (1 - this.z / canvas.width) * 1.5);
                const sz = Math.max(0.5, (1 - this.z / canvas.width) * 2.5);
                ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y);
                ctx.strokeStyle = `rgba(6,182,212,${a * 0.7})`;
                ctx.lineWidth = sz; ctx.stroke();
                ctx.beginPath(); ctx.arc(x, y, sz * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill();
            }
        }

        const initParticles = () => {
            particles = Array.from({ length: count }, () => new Particle());
        };

        const animate = () => {
            ctx.fillStyle = 'rgba(3,7,18,0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            canvasAnimIdRef.current = requestAnimationFrame(animate);
        };

        resize();
        animate();
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(canvasAnimIdRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [isMobile]);

    // ── html2canvas capture (idle time after entrance settles) ────────────────
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!containerRef.current) return;
            try {
                if (canvasRef.current) canvasRef.current.style.opacity = '0';
                const dataCanvas = await html2canvas(containerRef.current, {
                    scale:       1,
                    useCORS:     true,
                    allowTaint:  true,
                    logging:     false,
                    backgroundColor: null,
                });
                screenshotRef.current = dataCanvas.toDataURL('image/webp', 0.92);
            } catch (_err) {
                // Screenshot fallback handled gracefully
            } finally {
                if (canvasRef.current) canvasRef.current.style.opacity = '1';
            }
        }, 1600);
        return () => clearTimeout(timer);
    }, []);

    // ── GSAP entrance animations ──────────────────────────────────────────────
    useGSAP(() => {
        if (isMobile) {
            gsap.fromTo('.preloader-content',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
            );
            gsap.to('.preloader-logo', {
                scale: 1.05, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
            });
            return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
        tl.to('.identity-reveal', { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' });
        tl.from('.identity-name', { letterSpacing: '0.2em', duration: 1.5, ease: 'power3.out' }, '-=1.5');
        tl.to('.status-item', { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.8');
        tl.to('.enter-cta', { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.2');
    }, { scope: containerRef, dependencies: [isMobile] });

    // ── MAIN CLICK HANDLER ────────────────────────────────────────────────────
    const handleEnter = useCallback((e) => {
        if (isExitingRef.current) return;
        isExitingRef.current = true;

        /* ── Audio: Play IMMEDIATELY in this very frame (cracks start) ── */
        try {
            const audio = audioRef.current || new Audio(CONFIG.AUDIO_SRC);
            audio.currentTime = 0;
            audio.volume = 0.65;
            audio.play().catch(() => {});
        } catch (_) {}

        const clickX = (e && e.clientX != null) ? e.clientX : window.innerWidth / 2;
        const clickY = (e && e.clientY != null) ? e.clientY : window.innerHeight / 2;
        const w = window.innerWidth, h = window.innerHeight;
        const mobile = w < 768;

        /* ── prefers-reduced-motion: skip to simple fade ── */
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            cancelAnimationFrame(canvasAnimIdRef.current);
            gsap.to(containerRef.current, {
                opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: onComplete
            });
            return;
        }

        /* ── Stop particle canvas ── */
        cancelAnimationFrame(canvasAnimIdRef.current);

        /* ── Build geometry ── */
        const { shards, edges } = buildDelaunayGeometry(clickX, clickY, mobile, w, h);

        /* ── Inject SVG crack paths (with stroke & opacity differentiation) ── */
        const crackSvg = cracksSvgRef.current;
        const crackPathEls = [];
        if (crackSvg) {
            crackSvg.innerHTML = '';
            const edgesToDraw = edges.slice(0, CONFIG.CRACK_MAX_EDGES);
            edgesToDraw.forEach(({ ax, ay, bx, by, dist }) => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', `M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)}`);
                path.setAttribute('class', 'glass-crack-line');

                // Near impact cracks are thicker and brighter
                const isNear = dist < CONFIG.CRACK_NEAR_THRESHOLD;
                path.setAttribute('stroke-width', isNear ? '2.0' : '1.2');
                path.style.stroke = isNear ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.75)';

                crackSvg.appendChild(path);
                crackPathEls.push({ path, dist });
            });
        }

        /* ── Inject shards into DOM (FULL BRIGHTNESS — NO DARK OVERLAY) ── */
        const stage = shardsStageRef.current;
        if (!stage) return;
        stage.innerHTML = '';

        const bgImg = screenshotRef.current
            ? `url(${screenshotRef.current})`
            : 'radial-gradient(circle at center, #0f172a 0%, #030712 100%)';

        // Edge-highlight SVG layer for crisp 1px white lines
        const edgeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        edgeSvg.setAttribute('class', 'glass-shards-edge-svg');
        edgeSvg.setAttribute('width', '100%');
        edgeSvg.setAttribute('height', '100%');
        edgeSvg.style.cssText = 'position:absolute;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:26;overflow:visible;';

        const shardEls = shards.map((shard) => {
            // Shard div — fully bright, identical to intact landing screen
            const div = document.createElement('div');
            div.className = 'glass-shard';
            div.style.cssText = `
                clip-path: ${shard.polygon};
                background-image: ${bgImg};
                background-size: ${w}px ${h}px;
                background-position: 0 0;
                opacity: 1;
                will-change: transform, opacity;
            `;

            // Subtle sheen overlay (pure highlight only, never darkening)
            const sheen = document.createElement('div');
            sheen.className = 'glass-shard-sheen';
            sheen.style.cssText = `
                position:absolute;inset:0;pointer-events:none;
                background:linear-gradient(${shard.sheen}deg,
                    transparent 0%,
                    rgba(255,255,255,0.12) 48%,
                    rgba(255,255,255,0.06) 53%,
                    transparent 100%);
            `;
            div.appendChild(sheen);
            stage.appendChild(div);

            // 1px white edge highlight polygon
            const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute('points', shard.svgPoints);
            poly.setAttribute('class', 'glass-shard-edge-poly');
            edgeSvg.appendChild(poly);

            return div;
        });

        stage.appendChild(edgeSvg);

        /* ── GSAP TIMELINE ── */
        requestAnimationFrame(() => {
            const tl = gsap.timeline();

            /* t=0: Position & show impact flash */
            if (flashRef.current) {
                flashRef.current.style.left = `${clickX}px`;
                flashRef.current.style.top  = `${clickY}px`;
            }
            tl.fromTo(flashRef.current,
                { opacity: 1, scale: 0.2 },
                { opacity: 0, scale: 2.2, duration: CONFIG.FLASH_DURATION, ease: 'power2.out' },
                0
            );

            /* t=0: Subtle 4px screen shake */
            tl.to(containerRef.current, {
                x: CONFIG.SHAKE_PX,
                duration: CONFIG.SHAKE_DURATION / 4,
                repeat: 5,
                yoyo: true,
                ease: 'sine.inOut',
            }, 0);

            /* t=0.00 → 0.28s: CRACKS SPREAD OUTWARD
               Nearest edges start drawing IMMEDIATELY at 0s, farthest edges start at ~0.18s.
               No single-frame reveal — true radial wave of crack lines.
            */
            if (crackPathEls.length > 0) {
                const maxEdgeDist = crackPathEls.reduce((m, item) => Math.max(m, item.dist), 1);
                crackPathEls.forEach(({ path, dist }) => {
                    const len = path.getTotalLength ? path.getTotalLength() : 250;
                    gsap.set(path, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len });

                    // Stagger start time strictly proportional to radial distance
                    const startTime = (dist / maxEdgeDist) * (CONFIG.CRACK_DURATION * 0.65);
                    const drawDuration = 0.08 + (dist / maxEdgeDist) * 0.06;

                    tl.to(path, {
                        strokeDashoffset: 0,
                        duration: drawDuration,
                        ease: 'power2.out',
                    }, startTime);
                });
            }

            /* t=0.30s: BREAK (ZERO DEAD WAIT — 0.02s after cracks complete)
               - Overlay background becomes transparent
               - Intact preloader DOM hidden
               - Crack SVG hidden
            */
            tl.set(containerRef.current, { backgroundColor: 'transparent' }, CONFIG.BREAK_DELAY);
            tl.set('.preloader-bg, .bg-aura, .matrix-canvas, .preloader-content', { opacity: 0 }, CONFIG.BREAK_DELAY);
            tl.set(crackSvg, { opacity: 0 }, CONFIG.BREAK_DELAY);

            /* t=0.30s: Snappy pop outward (4–12px) in 0.05s */
            shardEls.forEach((el, i) => {
                const s = shards[i];
                const popDist = CONFIG.POP_DIST_MIN + Math.random() * (CONFIG.POP_DIST_MAX - CONFIG.POP_DIST_MIN);
                tl.to(el, {
                    x: Math.cos(s.angle) * popDist,
                    y: Math.sin(s.angle) * popDist,
                    rotateZ: (Math.random() - 0.5) * 6,
                    duration: CONFIG.BREAK_POP_DURATION,
                    ease: 'power2.out',
                }, CONFIG.BREAK_DELAY);
            });

            /* t=0.30s: SMOOTH WEBSITE REVEAL (Fades in 0.25 → 1.0 in 0.5s & scales 1.06 → 1.0) */
            const mainEl = document.querySelector('.main-content-reveal') || document.querySelector('.app-container');
            if (mainEl) {
                tl.fromTo(mainEl,
                    { opacity: CONFIG.REVEAL_FADE_FROM, scale: CONFIG.REVEAL_SCALE_FROM },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: CONFIG.REVEAL_FADE_DUR,
                        ease: 'power2.out'
                    },
                    CONFIG.BREAK_DELAY
                );
            }

            /* t=0.35–1.40s: FALL
               - Center shards start immediately with 0 stagger and fall FAST (0.58s), clearing center.
               - Farthest shards start with slight stagger (up to 0.20s) and take max ~1.02s.
               - Every shard falls past the viewport (y += h + 500px).
               - Shards remain fully bright until the last 25% of their fall.
            */
            const maxDistCenter = Math.max(...shards.map(s => s.dist), 1);
            const fallBaseTime = CONFIG.BREAK_DELAY + CONFIG.BREAK_POP_DURATION; // 0.35s
            let maxTotalEndTime = fallBaseTime;

            shardEls.forEach((el, i) => {
                const s = shards[i];
                // Distance ratio (0 = center impact, 1 = farthest corner)
                const distRatio = s.dist / maxDistCenter;
                const stagger = distRatio * CONFIG.FALL_STAGGER_MAX;

                // Duration based on shard size
                const shardDuration = CONFIG.FALL_DUR_SMALL + s.sizeNorm * (CONFIG.FALL_DUR_LARGE - CONFIG.FALL_DUR_SMALL);

                // 3D rotations: bigger shards have heavier rotation
                const rotZ = (Math.random() - 0.5) * (CONFIG.FALL_ROT_Z_SMALL + s.sizeNorm * (CONFIG.FALL_ROT_Z_LARGE - CONFIG.FALL_ROT_Z_SMALL)) * 2;
                const rotX = (Math.random() - 0.5) * (CONFIG.FALL_ROT_XY_SMALL + s.sizeNorm * (CONFIG.FALL_ROT_XY_LARGE - CONFIG.FALL_ROT_XY_SMALL)) * 2;
                const rotY = (Math.random() - 0.5) * (CONFIG.FALL_ROT_XY_SMALL + s.sizeNorm * (CONFIG.FALL_ROT_XY_LARGE - CONFIG.FALL_ROT_XY_SMALL)) * 2;
                const driftX = (Math.random() - 0.5) * CONFIG.FALL_X_DRIFT_MAX * 2;

                const startAt = fallBaseTime + stagger;
                const endAt = startAt + shardDuration;
                if (endAt > maxTotalEndTime) maxTotalEndTime = endAt;

                // Full fall well below screen
                tl.to(el, {
                    y: `+=${h + 500}`,
                    x: `+=${driftX}`,
                    rotateZ: rotZ,
                    rotateX: rotX,
                    rotateY: rotY,
                    ease: 'power3.in',
                    duration: shardDuration,
                }, startAt);

                // Opacity fades ONLY in final 25% of fall
                tl.to(el, {
                    opacity: 0,
                    duration: shardDuration * 0.25,
                    ease: 'power1.in',
                }, startAt + shardDuration * 0.75);
            });

            /* Edge SVG lines follow and dissolve as shards clear */
            tl.to(edgeSvg, {
                opacity: 0,
                duration: CONFIG.FALL_DUR_SMALL * 0.7,
                ease: 'power1.in',
            }, fallBaseTime + 0.15);

            /* COMPLETE & CLEANUP:
               Total time capped at ~1.45–1.50s max. Clean DOM removal & scroll restore.
            */
            const cleanupTime = Math.min(maxTotalEndTime + 0.05, 1.48);
            tl.call(() => {
                shardEls.forEach(el => { if (el) el.style.willChange = 'auto'; });
                if (stage) stage.remove();
                if (crackSvg) crackSvg.remove();
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }, null, cleanupTime);
        });
    }, [onComplete]);

    /* ── JSX ─────────────────────────────────────────────────────────────────── */
    return (
        <div className="preloader-overlay" ref={containerRef} style={{ perspective: '900px' }}>
            <canvas ref={canvasRef} className="matrix-canvas" />

            <div className="preloader-bg" />
            <div className="bg-aura" style={{ opacity: isMobile ? 0.2 : 0.4 }} />

            {/* Impact flash */}
            <div className="glass-impact-flash" ref={flashRef} style={{ opacity: 0 }} />

            {/* SVG crack layer — populated dynamically from click outwards */}
            <svg
                className="glass-cracks-svg"
                ref={cracksSvgRef}
                style={{ position: 'absolute', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 20, overflow: 'visible' }}
            />

            {/* 3D shard stage */}
            <div className="glass-shards-stage" ref={shardsStageRef} />

            {/* Preloader identity content & Enter Portfolio button */}
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
                    <button
                        className="btn-enter"
                        onClick={handleEnter}
                        disabled={isExitingRef.current}
                    >
                        Enter Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
