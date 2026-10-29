import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    Github, 
    ExternalLink, 
    Star, 
    GitFork, 
    ArrowLeft, 
    ArrowRight, 
    Zap, 
    Layers, 
    Clock, 
    CheckCircle2, 
    SlidersHorizontal 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ onPreview }) => {
    const [stats, setStats] = useState({});
    const [expandedProject, setExpandedProject] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const projectsRef = useRef(null);

    const categories = [
        { id: 'all', label: 'All Projects (7)' },
        { id: 'fullstack', label: 'Full Stack & Web' },
        { id: 'cloud', label: 'Salesforce CRM' },
        { id: 'java', label: 'Java & Systems' },
        { id: 'ai', label: 'AI & Tools' },
        { id: 'oss', label: 'Open Source' }
    ];

    const cases = [
        {
            id: "salesforce-crm",
            title: "Student Placement Management System – Salesforce CRM",
            category: "cloud",
            repo: null,
            badge: "Cloud CRM Hosted",
            isWip: false,
            problem: "University campus placements suffer from chaotic spreadsheet tracking, missing access governance, and lack of real-time application visibility across students and recruiters.",
            challenge: "Architected and delivered an enterprise cloud solution running directly on Salesforce CRM featuring a 3-tier cloud architecture. Built dynamic interfaces with Lightning Web Components (LWC), custom Apex controllers for eligibility validation, and record-triggered Salesforce Flows for instant status automation.",
            thoughtProcess: "Modeled relational custom objects with Master-Detail relationships, Record Types (On-Campus, Off-Campus, Internship), and granular profile permissions. Deployed real-time executive analytics dashboards directly inside the Salesforce Lightning interface for university placement directors.",
            techStack: "Salesforce CRM, Lightning Web Components (LWC), Apex, Salesforce Flows, SOQL, SFDX CLI",
            outcome: "Automated end-to-end recruitment tracking directly on Salesforce CRM, cut application processing overhead by 60%, and delivered real-time executive KPI dashboards.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 96 },
            github: null,
            link: "#",
            previewUrl: null,
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
            category: "fullstack",
            repo: "vishwasahuja62-maker/ElevateHire",
            isWip: false,
            problem: "Recruiters and job seekers lack an integrated, transparent hiring lifecycle that manages everything from applications to real-time interviews in one hub.",
            challenge: "Engineered a dual-dashboard full-stack recruitment architecture with Role-Based Access Control (RBAC), JWT authentication, and a real-time messaging pipeline powered by Socket.IO. Developed a fluid Kanban-based Applicant Tracking System (ATS), interview scheduler, and hiring analytics visualization.",
            thoughtProcess: "Implemented secure cloud database integration with PostgreSQL (Supabase) and structured REST APIs with Docker-ready modular architecture adhering to enterprise software engineering standards.",
            techStack: "React.js, Node.js, Express.js, PostgreSQL, Supabase, Socket.IO, Docker",
            outcome: "Streamlined end-to-end recruitment with live ATS drag-and-drop, instantaneous candidate-recruiter messaging, and resilient role security.",
            lighthouse: { perf: 98, access: 100, best: 98, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker",
            link: "#",
            previewUrl: null,
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
            id: "kanban",
            title: "Supabase Kanban Board",
            category: "fullstack",
            repo: "vishwasahuja62-maker/Kanban-Board",
            isWip: false,
            problem: "Task management tools often suffer from state drift and lack real-time synchronization across multiple client instances.",
            challenge: "Implementing real-time optimistic updates for drag-and-drop actions. I leveraged Supabase's PostgreSQL real-time engine to ensure that any change in the 'To-Do', 'In-Progress', or 'Done' stacks is instantly reflected across all active sessions.",
            thoughtProcess: "Focused on a 'Reactive State' model using Supabase's subscription model. Implemented Row-Level Security (RLS) to ensure data isolation while maintaining a high-performance, low-latency UI.",
            techStack: "React 18, TailwindCSS, Supabase Auth/DB, Lucide",
            outcome: "Zero state-drift observed during concurrent edits. Achieved seamless real-time persistence with sub-100ms sync latency.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker/Kanban-Board",
            link: "https://kanban-elite-task-manager.netlify.app/",
            previewUrl: "https://kanban-elite-task-manager.netlify.app/",
            snippet: `// Real-time Sync (Supabase Channel)
const syncTasks = (projectId) => {
  supabase.channel('project_tasks')
    .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
      setTasks(current => reconcileState(current, payload));
    }).subscribe();
};`
        },
        {
            id: "mytruecompanion",
            title: "My True Companion – AI-Powered Learning Platform",
            category: "ai",
            repo: "vishwasahuja62-maker/My-True-Companion",
            isWip: false,
            problem: "Students struggle with generic study material and lack personalized, on-demand AI guidance for conceptual doubt resolution.",
            challenge: "Designed and deployed an AI-assisted educational system featuring intelligent doubt resolution, personalized progress tracking, and student dashboards. Focused on sub-500ms response streaming and seamless user onboarding.",
            thoughtProcess: "Integrated LLM reasoning workflows with Supabase authentication and PostgreSQL cloud storage to persist learning milestones. Refined UX iteratively using feedback from 20+ active community users.",
            techStack: "React.js, Node.js, PostgreSQL, Supabase, AI Integration, Tailwind CSS",
            outcome: "Successfully deployed and adopted by 20+ active users with sustained positive retention and real-world doubt resolution.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker",
            link: "#",
            previewUrl: null,
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
            category: "ai",
            repo: "vishwasahuja62-maker/Github-Profile-Analyzer",
            isWip: true, // Marked as WIP with distinct badge
            problem: "Recruiters and developers need a high-level summary of technical aptitude that raw GitHub profiles fail to provide at a glance.",
            challenge: "Engineering a multi-weighted scoring engine that aggregates data from GitHub's REST API. I developed a backend logic that calculates a 'Developer Score' by weighting Stars (x3), Repos (x2), and Followers (x2), while applying multipliers for account age, organizational loyalty, and recent commit velocity.",
            thoughtProcess: "Built a decoupled architecture with a Node.js/Express backend to handle API rate-limiting and data normalization. Used Chart.js for radar-map visualizations, allowing for multi-dimensional skill assessment.",
            techStack: "React, Node.js, Express, Chart.js, GitHub API",
            outcome: "Under Active Development: Refining API rate-limiting caching layers and multi-metric radar assessment.",
            lighthouse: { perf: 98, access: 100, best: 95, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker/Github-Profile-Analyzer",
            link: "#",
            previewUrl: null,
            snippet: `// Developer Scoring Engine Logic
const calculateDeveloperScore = (data) => {
  const baseScore = (data.stars * 3) + (data.repos * 2) + (data.followers * 2);
  const bonuses = (data.activityBonus * 1.2) + (data.orgBonus * 50);
  const ageLoyalty = Math.log(data.accountAgeDays) * 10;
  return Math.min(1000, baseScore + bonuses + ageLoyalty);
};`
        },
        {
            id: "subscription",
            title: "Subscription Management System",
            category: "java",
            repo: "vishwasahuja62-maker/Subscription-Management-System",
            isWip: false,
            problem: "Managing recurring SaaS billing and client subscriptions requires strict transactional integrity and modular backend routing.",
            challenge: "Engineered a full-fledged enterprise Java web application with Maven, Servlets, and JSP. Designed modular MVC architecture managing subscription tiers, billing renewal schedules, and client lifecycle state transitions.",
            thoughtProcess: "Emphasized Java enterprise standards with robust servlet session management, clean separation between view (JSP/CSS) and controllers, and planned relational database mapping.",
            techStack: "Java, Servlets, JSP, Maven, Apache Tomcat, CSS3, JavaScript",
            outcome: "Production-ready Java MVC architecture for subscription lifecycle tracking with extensible database hooks.",
            lighthouse: { perf: 97, access: 96, best: 98, seo: 95 },
            github: "https://github.com/vishwasahuja62-maker/Subscription-Management-System",
            link: "#",
            previewUrl: null,
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
            category: "oss",
            repo: "vishwasahuja62-maker/zero-cost-crm",
            isWip: false,
            problem: "Small sales teams need a lightweight, self-hosted CRM for lead follow-ups, pipeline management, and audit tracking without high subscription costs.",
            challenge: "Contributed to the open-source ConvoBrains ecosystem by implementing activity audit logging export features (CSV/JSON), follow-up suggestion workflows, and pre-commit development hooks.",
            thoughtProcess: "Analyzed existing repository architecture, engineered clean feature branches with automated formatting, and submitted Pull Requests aligning with community coding standards.",
            techStack: "TypeScript, React, Node.js, Open Source PRs, Git",
            outcome: "Authored and merged Pull Request #138 for activity audit logs and follow-up engines with approved production status.",
            lighthouse: { perf: 98, access: 98, best: 100, seo: 98 },
            github: "https://github.com/ConvoBrains/zero-cost-crm/pull/138",
            link: "https://github.com/ConvoBrains/zero-cost-crm#readme",
            previewUrl: null,
            snippet: `// Activity Audit Log Exporter
export function exportAuditLog(activities, format) {
  if (format === 'json') return JSON.stringify(activities, null, 2);
  const headers = ['Timestamp', 'User', 'Action', 'Entity', 'Details'];
  const rows = activities.map(a => [a.createdAt, a.author, a.action, a.target, a.note]);
  return [headers, ...rows].map(r => r.join(',')).join('\\n');
}`
        }
    ];

    // Filter projects based on category
    const filteredCases = cases.filter(item => {
        if (selectedCategory === 'all') return true;
        return item.category === selectedCategory;
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = {};
            for (const p of cases) {
                if (!p.repo) continue;
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

    return (
        <section id="projects" className="section-padding projects-page-section" ref={projectsRef}>
            <div className="container">
                <div className="section-header center text-center">
                    <span className="section-eyebrow">Production Architectures</span>
                    <h2 className="section-title">Case Studies & Flagships</h2>
                    <p className="section-subtitle">Real engineering challenges, documented and deployed.</p>
                </div>

                {/* Tech Stack Filter Bar */}
                <div className="project-filter-bar glass">
                    <div className="filter-label">
                        <SlidersHorizontal size={14} className="text-cyan" />
                        <span>Filter By:</span>
                    </div>
                    <div className="filter-buttons-list">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="projects-wrapper">
                    {!isMobile ? (
                        filteredCases.map((project, idx) => (
                            <div className="project-case glass" key={project.id}>
                                <div className="project-header">
                                    <div className="project-title-area">
                                        <div className="title-with-badge">
                                            <h3 className="project-title">{project.title}</h3>
                                            {project.isWip ? (
                                                <span className="wip-pill" title="Under active development">
                                                    <Clock size={12} />
                                                    <span>In Progress / WIP</span>
                                                </span>
                                            ) : (
                                                <span className="deployed-pill">
                                                    <CheckCircle2 size={12} />
                                                    <span>Production Deployed</span>
                                                </span>
                                            )}
                                        </div>
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
                                        {project.previewUrl && (
                                            <button 
                                                className="btn btn-primary btn-sm btn-glow"
                                                onClick={() => onPreview && onPreview(project.previewUrl, project.title)}
                                                title="Open in-page interactive sandbox preview"
                                            >
                                                <Zap size={14} />
                                                <span>Live Preview</span>
                                            </button>
                                        )}
                                        {project.github ? (
                                            <a href={project.github} className="icon-link" title="Source Code" target="_blank" rel="noreferrer"><Github size={20} /></a>
                                        ) : (
                                            <span className="cloud-crm-tag" title="Deployed on Salesforce Cloud CRM">Salesforce Cloud</span>
                                        )}
                                        {project.id !== "analyzer" && project.link && project.link !== "#" && (
                                            <a href={project.link} className="icon-link" title="Live Site" target="_blank" rel="noreferrer"><ExternalLink size={20} /></a>
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
                                        <p>{project.outcome}</p>
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
                                        {filteredCases.map((project) => (
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
                                                    {expandedProject.isWip && (
                                                        <span className="wip-pill">WIP / In Progress</span>
                                                    )}
                                                </div>
                                                <div className="project-links">
                                                    {expandedProject.previewUrl && (
                                                        <button 
                                                            className="btn btn-primary btn-sm btn-glow"
                                                            onClick={() => onPreview && onPreview(expandedProject.previewUrl, expandedProject.title)}
                                                        >
                                                            <Zap size={14} /> Live Preview
                                                        </button>
                                                    )}
                                                    {expandedProject.github ? (
                                                        <a href={expandedProject.github} className="icon-link" title="Source Code" target="_blank" rel="noreferrer"><Github size={20} /></a>
                                                    ) : (
                                                        <span className="cloud-crm-tag" title="Deployed on Salesforce Cloud CRM">Salesforce Cloud</span>
                                                    )}
                                                    {expandedProject.id !== "analyzer" && expandedProject.link && expandedProject.link !== "#" && (
                                                        <a href={expandedProject.link} className="icon-link" title="Live Site" target="_blank" rel="noreferrer"><ExternalLink size={20} /></a>
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
                                                    <p>{expandedProject.outcome}</p>
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
