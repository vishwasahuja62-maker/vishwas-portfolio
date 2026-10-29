import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, GitFork, ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [stats, setStats] = useState({});
    const [expandedProject, setExpandedProject] = useState(null);
    const projectsRef = useRef(null);

    const cases = [
        {
            id: "salesforce-crm",
            title: "Student Placement Management System – Salesforce CRM",
            repo: null,
            badge: "Cloud CRM Hosted",
            problem: "University campus placements suffer from chaotic spreadsheet tracking, missing access governance, and lack of real-time application visibility across students and recruiters.",
            challenge: "Architected and delivered an enterprise cloud solution running directly on Salesforce CRM featuring a 3-tier cloud architecture. Built dynamic interfaces with Lightning Web Components (LWC), custom Apex controllers for eligibility validation, and record-triggered Salesforce Flows for instant status automation.",
            thoughtProcess: "Modeled relational custom objects with Master-Detail relationships, Record Types (On-Campus, Off-Campus, Internship), and granular profile permissions. Deployed real-time executive analytics dashboards directly inside the Salesforce Lightning interface for university placement directors.",
            techStack: "Salesforce CRM, Lightning Web Components (LWC), Apex, Salesforce Flows, SOQL, SFDX CLI",
            outcome: "Automated end-to-end recruitment tracking directly on Salesforce CRM, cut application processing overhead by 60%, and delivered real-time executive KPI dashboards.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 96 },
            github: null,
            link: "#",
            snippet: `// Apex Controller: Dynamic Placement Application Filter
public with sharing class PlacementController {
    @AuraEnabled(cacheable=true)
    public static List<Application__c> getEligibleApplications(Id driveId, Decimal minCgpa) {
        return [
            SELECT Id, Student__r.Name, Student__r.CGPA__c, Status__c, Drive__r.Company_Name__c
            FROM Application__c
            WHERE Drive__c = :driveId AND Student__r.CGPA__c >= :minCgpa
            WITH SECURITY_ENFORCED
            ORDER BY Student__r.CGPA__c DESC
        ];
    }
}`
        },
        {
            id: "elevatehire",
            title: "ElevateHire – Full Stack Recruitment Platform",
            repo: "vishwasahuja62-maker/ElevateHire",
            problem: "Recruiters and job seekers lack an integrated, transparent hiring lifecycle that manages everything from applications to real-time interviews in one hub.",
            challenge: "Engineered a dual-dashboard full-stack recruitment architecture with Role-Based Access Control (RBAC), JWT authentication, and a real-time messaging pipeline powered by Socket.IO. Developed a fluid Kanban-based Applicant Tracking System (ATS), interview scheduler, and hiring analytics visualization.",
            thoughtProcess: "Implemented secure cloud database integration with PostgreSQL (Supabase) and structured REST APIs with Docker-ready modular architecture adhering to enterprise software engineering standards.",
            techStack: "React.js, Node.js, Express.js, PostgreSQL, Supabase, Socket.IO, Docker",
            outcome: "Streamlined end-to-end recruitment with live ATS drag-and-drop, instantaneous candidate-recruiter messaging, and resilient role security.",
            lighthouse: { perf: 98, access: 100, best: 98, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker",
            link: "#",
            snippet: `// Real-Time Socket.IO Pipeline & JWT Auth
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error('Authentication failed'));
    socket.user = decoded;
    next();
  });
});`
        },
        {
            id: "mytruecompanion",
            title: "My True Companion – AI-Powered Learning Platform",
            repo: "vishwasahuja62-maker/My-True-Companion",
            problem: "Students struggle with generic study material and lack personalized, on-demand AI guidance for conceptual doubt resolution.",
            challenge: "Designed and deployed an AI-assisted educational system featuring intelligent doubt resolution, personalized progress tracking, and student dashboards. Focused on sub-500ms response streaming and seamless user onboarding.",
            thoughtProcess: "Integrated LLM reasoning workflows with Supabase authentication and PostgreSQL cloud storage to persist learning milestones. Refined UX iteratively using feedback from 20+ active community users.",
            techStack: "React.js, Node.js, PostgreSQL, Supabase, AI Integration, Tailwind CSS",
            outcome: "Successfully deployed and adopted by 20+ active users with sustained positive retention and real-world doubt resolution.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker",
            link: "#",
            snippet: `// AI Doubt Solving & Stream Handler
const resolveDoubt = async (userId, prompt) => {
  const context = await getLearnerContext(userId);
  const stream = await aiClient.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'system', content: context }, { role: 'user', content: prompt }]
  });
  return stream;
};`
        },
        {
            id: "analyzer",
            title: "GitHub Profile Analyzer",
            repo: "vishwasahuja62-maker/Github-Profile-Analyzer",
            problem: "Recruiters and developers need a high-level summary of technical aptitude that raw GitHub profiles fail to provide at a glance.",
            challenge: "Engineering a multi-weighted scoring engine that aggregates data from GitHub's REST API. I developed a backend logic that calculates a 'Developer Score' by weighting Stars (x3), Repos (x2), and Followers (x2), while applying multipliers for account age, organizational loyalty, and recent commit velocity.",
            thoughtProcess: "Built a decoupled architecture with a Node.js/Express backend to handle API rate-limiting and data normalization. Used Chart.js for radar-map visualizations, allowing for multi-dimensional skill assessment.",
            techStack: "React, Node.js, Express, Chart.js, GitHub API",
            outcome: "Generates a comprehensive 1-1000 technical profile in under 1.5s. Successfully visualizes cross-repo consistency.",
            lighthouse: { perf: 98, access: 100, best: 95, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker/Github-Profile-Analyzer",
            link: "#",
            snippet: `// Developer Scoring Engine Logic
const calculateDeveloperScore = (data) => {
  const baseScore = (data.stars * 3) + (data.repos * 2) + (data.followers * 2);
  const bonuses = (data.activityBonus * 1.2) + (data.orgBonus * 50);
  const ageLoyalty = Math.log(data.accountAgeDays) * 10;
  return Math.min(1000, baseScore + bonuses + ageLoyalty);
};`
        },
        {
            id: "kanban",
            title: "Supabase Kanban Board",
            repo: "vishwasahuja62-maker/Kanban-Board",
            problem: "Task management tools often suffer from state drift and lack real-time synchronization across multiple client instances.",
            challenge: "Implementing real-time optimistic updates for drag-and-drop actions. I leveraged Supabase's PostgreSQL real-time engine to ensure that any change in the 'To-Do', 'In-Progress', or 'Done' stacks is instantly reflected across all active sessions.",
            thoughtProcess: "Focused on a 'Reactive State' model using Supabase's subscription model. Implemented Row-Level Security (RLS) to ensure data isolation while maintaining a high-performance, low-latency UI.",
            techStack: "React 18, TailwindCSS, Supabase Auth/DB, Lucide",
            outcome: "Zero state-drift observed during concurrent edits. Achieved seamless real-time persistence with sub-100ms sync latency.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker/Kanban-Board",
            link: "https://kanban-elite-task-manager.netlify.app/",
            snippet: `// Real-time Sync (Supabase Channel)
const syncTasks = (projectId) => {
  supabase.channel('project_tasks')
    .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
      setTasks(current => reconcileState(current, payload));
    }).subscribe();
};`
        },
        {
            id: "snake",
            title: "Neon Snake PWA",
            repo: "vishwasahuja62-maker/Snake-Game",
            problem: "Traditional browser games often lack mobile responsiveness and fail to provide a native-app feel or offline capability.",
            challenge: "Developing a zero-dependency Progressive Web App (PWA) with a frame-perfect game loop. I engineered a coordinate-based grid system with 'Illegal Turn Protection' (preventing 180-degree self-collisions) and dynamic speed scaling.",
            thoughtProcess: "Prioritized 'Engineering Elegance' using pure JavaScript for maximum performance. Implemented a Service Worker for offline play and leveraged CSS Grid for a perfectly responsive game board that adapts to any viewport.",
            techStack: "HTML5, CSS3, JavaScript (ES6+), Service Workers",
            outcome: "Input lag < 1ms. Full offline support via PWA manifest. Clean, framework-free implementation under 50KB.",
            lighthouse: { perf: 100, access: 100, best: 100, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker/Snake-Game",
            link: "#",
            snippet: `// Illegal Move & Collision Logic
function handleDirection(newDir) {
  const isOpposite = (newDir.x === -velocity.x) || (newDir.y === -velocity.y);
  if (isOpposite) return; // Prevent 180-degree turn
  velocity = newDir;
}`
        },
        {
            id: "subscription",
            title: "Subscription Management System",
            repo: "vishwasahuja62-maker/Subscription-Management-System",
            problem: "Managing recurring SaaS billing and client subscriptions requires strict transactional integrity and modular backend routing.",
            challenge: "Engineered a full-fledged enterprise Java web application with Maven, Servlets, and JSP. Designed modular MVC architecture managing subscription tiers, billing renewal schedules, and client lifecycle state transitions.",
            thoughtProcess: "Emphasized Java enterprise standards with robust servlet session management, clean separation between view (JSP/CSS) and controllers, and planned relational database mapping.",
            techStack: "Java, Servlets, JSP, Maven, Apache Tomcat, CSS3, JavaScript",
            outcome: "Production-ready Java MVC architecture for subscription lifecycle tracking with extensible database hooks.",
            lighthouse: { perf: 97, access: 96, best: 98, seo: 95 },
            github: "https://github.com/vishwasahuja62-maker/Subscription-Management-System",
            link: "#",
            snippet: `// Servlet Subscription Filter & Controller
@WebServlet("/subscriptions")
public class SubscriptionServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
        throws ServletException, IOException {
        List<Subscription> activeList = subscriptionService.getActive();
        req.setAttribute("subscriptions", activeList);
        req.getRequestDispatcher("/views/dashboard.jsp").forward(req, resp);
    }
}`
        },
        {
            id: "zerocostcrm",
            title: "Zero-Cost CRM – Open Source Contribution",
            repo: "vishwasahuja62-maker/zero-cost-crm",
            problem: "Small sales teams need a lightweight, self-hosted CRM for lead follow-ups, pipeline management, and audit tracking without high subscription costs.",
            challenge: "Contributed to the open-source ConvoBrains ecosystem by implementing activity audit logging export features (CSV/JSON), follow-up suggestion workflows, and pre-commit development hooks.",
            thoughtProcess: "Analyzed existing repository architecture, engineered clean feature branches with automated formatting, and submitted Pull Requests aligning with community coding standards.",
            techStack: "TypeScript, React, Node.js, Open Source PRs, Git",
            outcome: "Authored Pull Requests for audit logs and follow-up engines with merged community improvements.",
            lighthouse: { perf: 98, access: 98, best: 100, seo: 98 },
            github: "https://github.com/ConvoBrains/zero-cost-crm/pull/138",
            link: "https://github.com/ConvoBrains/zero-cost-crm#readme",
            snippet: `// Activity Audit Log Exporter
export function exportAuditLog(activities, format) {
  if (format === 'json') return JSON.stringify(activities, null, 2);
  const headers = ['Timestamp', 'User', 'Action', 'Entity', 'Details'];
  const rows = activities.map(a => [a.createdAt, a.author, a.action, a.target, a.note]);
  return [headers, ...rows].map(r => r.join(',')).join('\\n');
}`
        }
    ];

    useEffect(() => {
        const fetchStats = async () => {
            const data = {};
            for (const p of cases) {
                try {
                    const res = await fetch(`https://api.github.com/repos/${p.repo}`);
                    if (!res.ok) continue;
                    const json = await res.json();
                    data[p.id] = { stars: json.stargazers_count, forks: json.forks_count };
                } catch (e) { /* ignore */ }
            }
            setStats({ ...data });
        };
        fetchStats();
    }, []);

    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 900);
            ScrollTrigger.refresh();
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        // Main staggered card reveal
        const cases = gsap.utils.toArray(".project-case");
        if (cases.length > 0) {
            gsap.from(cases, {
                scrollTrigger: {
                    trigger: ".projects-wrapper",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: isMobile ? 30 : 50,
                rotateX: isMobile ? 0 : 10,
                stagger: 0.2,
                duration: 1.2,
                ease: "power4.out",
                clearProps: "all"
            });
        }

        // Detailed internal animations
        const projectCases = gsap.utils.toArray(".project-case");
        projectCases.forEach(project => {
            const title = project.querySelector(".project-title");
            if (!title) return; // Skip if targets not found (happens in mobile list view)

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: project,
                    start: "top 85%"
                }
            });

            tl.from(title, {
                opacity: 0,
                x: isMobile ? 0 : -20,
                y: isMobile ? 10 : 0,
                duration: 0.6
            });

            const statsItems = project.querySelectorAll(".stat-item");
            if (statsItems.length) {
                tl.from(statsItems, {
                    opacity: 0,
                    y: 10,
                    stagger: 0.1,
                    duration: 0.4
                }, "-=0.3");
            }

            const sections = project.querySelectorAll(".project-section");
            if (sections.length) {
                tl.from(sections, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.15,
                    duration: 0.6
                }, "-=0.2");
            }

            const tags = project.querySelectorAll(".tech-tag");
            if (tags.length) {
                tl.from(tags, {
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.05,
                    duration: 0.3
                }, "-=0.2");
            }
        });

    }, { scope: projectsRef, dependencies: [isMobile] });

    return (
        <section id="projects" className="section-padding" ref={projectsRef}>
            <div className="container">
                <div className="section-header center">
                    <h2 className="section-title">Case Studies & Flagships</h2>
                    <p className="section-subtitle">Real engineering challenges, documented and deployed.</p>
                </div>

                <div className="projects-wrapper">
                    {!isMobile ? (
                        cases.map((project, idx) => (
                            <div className="project-case glass" key={idx}>
                                <div className="project-header">
                                    <div className="project-title-area">
                                        <h3 className="project-title">{project.title}</h3>
                                        <div className="project-api-stats">
                                            <div className="stat-item">
                                                <Star size={14} /> <span>{stats[project.id]?.stars || 0} Stars</span>
                                            </div>
                                            <div className="stat-item">
                                                <GitFork size={14} /> <span>{stats[project.id]?.forks || 0} Forks</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-links">
                                        {project.github ? (
                                            <a href={project.github} className="icon-link" title="Source Code" target="_blank" rel="noreferrer"><Github size={20} /></a>
                                        ) : (
                                            <span className="cloud-crm-tag" title="Deployed on Salesforce Cloud CRM">Salesforce Cloud</span>
                                        )}
                                        {project.id !== "analyzer" && project.link && project.link !== "#" && (
                                            <a href={project.link} className="icon-link" title="Live Demo" target="_blank" rel="noreferrer"><ExternalLink size={20} /></a>
                                        )}
                                    </div>
                                </div>

                                <div className="project-details-grid">
                                    <div className="project-section">
                                        <h4>Context & Problem</h4>
                                        <p>{project.problem}</p>
                                    </div>
                                    <div className="project-section highlight">
                                        <h4>Technical Challenge & Engineering Process</h4>
                                        <p>{project.challenge}</p>
                                        <p className="mt-2 text-sm italic">{project.thoughtProcess}</p>
                                    </div>
                                    <div className="project-section">
                                        <h4>Final Outcome</h4>
                                        <p>{project.id === "analyzer" ? "Still working (Under Development): Refining API rate-limiting logic and radar map assessment." : project.outcome}</p>
                                    </div>
                                </div>

                                <div className="project-footer">
                                    <div className="tech-tags">
                                        {project.techStack.split(', ').map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mobile-projects-container">
                            <AnimatePresence mode="wait">
                                {expandedProject === null ? (
                                    <motion.div
                                        key="list"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="mobile-project-list"
                                    >
                                        {cases.map((project) => (
                                            <button
                                                key={project.id}
                                                className="mobile-project-selector glass"
                                                onClick={() => setExpandedProject(project)}
                                            >
                                                <span className="project-name">{project.title}</span>
                                                <ArrowRight size={20} className="selector-icon" />
                                            </button>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="mobile-project-detail-view"
                                    >
                                        <button
                                            className="mobile-back-btn"
                                            onClick={() => setExpandedProject(null)}
                                        >
                                            <ArrowLeft size={18} />
                                            <span>Back to Projects</span>
                                        </button>

                                        <div className="project-case glass expanded">
                                            <div className="project-header">
                                                <div className="project-title-area">
                                                    <h3 className="project-title">{expandedProject.title}</h3>
                                                    <div className="project-api-stats">
                                                        <div className="stat-item">
                                                            <Star size={14} /> <span>{stats[expandedProject.id]?.stars || 0} Stars</span>
                                                        </div>
                                                        <div className="stat-item">
                                                            <GitFork size={14} /> <span>{stats[expandedProject.id]?.forks || 0} Forks</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="project-links">
                                                    {expandedProject.github ? (
                                                        <a href={expandedProject.github} className="icon-link" title="Source Code" target="_blank" rel="noreferrer"><Github size={20} /></a>
                                                    ) : (
                                                        <span className="cloud-crm-tag" title="Deployed on Salesforce Cloud CRM">Salesforce Cloud</span>
                                                    )}
                                                    {expandedProject.id !== "analyzer" && expandedProject.link && expandedProject.link !== "#" && (
                                                        <a href={expandedProject.link} className="icon-link" title="Live Demo" target="_blank" rel="noreferrer"><ExternalLink size={20} /></a>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="project-details-grid">
                                                <div className="project-section">
                                                    <h4>Context & Problem</h4>
                                                    <p>{expandedProject.problem}</p>
                                                </div>
                                                <div className="project-section highlight">
                                                    <h4>Technical Challenge & Engineering Process</h4>
                                                    <p>{expandedProject.challenge}</p>
                                                    <p className="mt-2 text-sm italic">{expandedProject.thoughtProcess}</p>
                                                </div>
                                                <div className="project-section">
                                                    <h4>Final Outcome</h4>
                                                    <p>{expandedProject.id === "analyzer" ? "Still working (Under Development): Refining API rate-limiting logic and radar map assessment." : expandedProject.outcome}</p>
                                                </div>
                                            </div>

                                            <div className="project-footer">
                                                <div className="tech-tags">
                                                    {expandedProject.techStack.split(', ').map((tech, i) => (
                                                        <span key={i} className="tech-tag">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
