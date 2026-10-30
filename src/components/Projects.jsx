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
    SlidersHorizontal,
    ShieldAlert
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ onPreview }) => {
    const [stats, setStats] = useState({});
    const [expandedProject, setExpandedProject] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const projectsRef = useRef(null);

    const categories = [
        { id: 'all', label: 'All Projects (8)' },
        { id: 'security', label: 'Cybersecurity & Systems' },
        { id: 'cloud', label: 'Salesforce CRM' },
        { id: 'fullstack', label: 'Full Stack & Web' },
        { id: 'java', label: 'Java & Systems' },
        { id: 'ai', label: 'AI & Tools' },
        { id: 'oss', label: 'Open Source' }
    ];

    const cases = [
        {
            id: "net-forensics",
            title: "Net Forensics – Network Traffic Forensics Platform",
            category: "security",
            repo: "vishwasahuja62-maker/Net-Forensics",
            badge: "Third-Year Flagship",
            isWip: false,
            problem: "Network security incidents are buried inside massive, noisy PCAP captures with siloed logs. Manual packet-by-packet Wireshark inspection is painfully slow, letting quiet attacks like C2 beaconing, DNS tunneling, and slow exfiltration go undetected.",
            challenge: "Architected a fully asynchronous 4-layer network forensics pipeline (Presentation, FastAPI Application, Celery/Redis Processing, and Hybrid Storage). Reconstructs 5-tuple TCP/UDP streams, computes Shannon entropy on DNS queries, evaluates JA3/JA4 TLS fingerprints, and detects anomalies using Isolation Forest & Z-score models with chain-of-custody SHA-256 evidence hashing.",
            thoughtProcess: "Separated heavy packet decoding from HTTP queries using Celery workers and streamed chunk ingestion to maintain flat memory profiles. Designed a 3-layer detection engine (Suricata rules + behavioral heuristics + ML) that tags findings directly with MITRE ATT&CK techniques and generates 1-click forensic PDF reports via WeasyPrint.",
            techStack: "Python, FastAPI, Celery, Redis, PyShark, Scapy, Elasticsearch, PostgreSQL, MinIO, scikit-learn, React, TypeScript, D3.js, Docker",
            outcome: "End-to-end PCAP ingestion pipeline capable of parsing millions of packets, detecting 8 discrete threat classes (DNS tunneling, port scans, C2 beaconing, ARP spoofing), and outputting tamper-proof forensic audit reports.",
            lighthouse: { perf: 99, access: 98, best: 100, seo: 98 },
            github: "https://github.com/vishwasahuja62-maker/Net-Forensics",
            link: "#",
            previewUrl: null,
            snippet: `// Detection Engine: Shannon Entropy & Sliding Window Threat Evaluator
def detect_dns_tunneling(query_records, entropy_threshold=3.8):
    for record in query_records:
        subdomain = record.query_name.split('.')[0]
        # Calculate Shannon entropy on high-frequency TXT/A queries
        prob = [float(subdomain.count(c)) / len(subdomain) for c in dict.fromkeys(subdomain)]
        entropy = -sum([p * math.log(p, 2) for p in prob])
        if entropy > entropy_threshold and record.is_txt_query:
            yield ThreatAlert(
                mitre_technique="T1071.004", 
                severity="HIGH", 
                evidence_hash=sha256(record.raw_bytes)
            )`
        },
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
            thoughtProcess: "Combined Framer Motion for natural physical drag interactions with an optimistic UI state machine, ensuring instantaneous user feedback while persisting state across sessions.",
            techStack: "React.js, Supabase, PostgreSQL, TailwindCSS, Framer Motion",
            outcome: "Zero-latency real-time collaboration with sub-100ms synchronization across concurrent browser windows.",
            lighthouse: { perf: 100, access: 98, best: 100, seo: 98 },
            github: "https://github.com/vishwasahuja62-maker/Kanban-Board",
            link: "#",
            previewUrl: null,
            snippet: `// Real-time synchronization subscription
useEffect(() => {
  const channel = supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, 
      (payload) => handleRealtimeSync(payload)
    ).subscribe();
  return () => supabase.removeChannel(channel);
}, []);`
        },
        {
            id: "snake",
            title: "Neon Snake Game PWA",
            category: "fullstack",
            repo: "vishwasahuja62-maker/Neon-Snake-Game-PWA",
            isWip: false,
            problem: "Modern web games often rely on bloated frameworks, resulting in input latency and unreliable offline states on mobile browsers.",
            challenge: "Designed a deterministic, frame-perfect game loop running on pure HTML5 Canvas with sub-1ms input latency. Implemented an 'Illegal Turn Protection' state buffer to eliminate high-speed 180-degree self-collision bugs.",
            thoughtProcess: "Prioritized absolute zero external runtime dependencies. Integrated an offline-first Service Worker caching pipeline and responsive touch gesture controls for mobile users.",
            techStack: "JavaScript (ES6+), HTML5 Canvas, CSS3, Service Workers, PWA API",
            outcome: "Ultra-fast PWA with instantaneous cold-start load times, seamless offline functionality, and responsive retro visual aesthetic.",
            lighthouse: { perf: 100, access: 100, best: 100, seo: 100 },
            github: "https://github.com/vishwasahuja62-maker/Neon-Snake-Game-PWA",
            link: "https://vishwasahuja62-maker.github.io/Neon-Snake-Game-PWA/",
            previewUrl: "https://vishwasahuja62-maker.github.io/Neon-Snake-Game-PWA/",
            snippet: `// Illegal Turn Buffer & Input Validation
const handleDirectionChange = (newDir) => {
  const isOpposite = (newDir.x === -currentDir.x && newDir.y === -currentDir.y);
  if (!isOpposite && inputQueue.length < 2) {
    inputQueue.push(newDir);
  }
};`
        },
        {
            id: "analyzer",
            title: "GitHub Profile Analyzer",
            category: "ai",
            repo: "vishwasahuja62-maker/Github-Profile-Analyzer",
            isWip: true,
            problem: "Recruiters and engineering leads struggle to quickly assess an open-source contributor's true impact from raw GitHub metrics without manual repo audits.",
            challenge: "Architecting a multi-tier analytics engine that computes an objective, weighted 'Developer Score' (0-1000) based on repository velocity, star-to-fork conversion ratios, commit frequencies, and community engagement.",
            thoughtProcess: "Designing an interactive radar-chart visualization comparing candidate profiles side-by-side, backed by a Node.js caching proxy that bypasses GitHub REST API rate limits.",
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
                <div className="section-header-compact center text-center">
                    <span className="section-eyebrow">Engineering Artifacts</span>
                    <h2 className="section-title">Selected Projects</h2>
                    <p className="section-subtitle">
                        Production deployments, enterprise cloud platforms, and open-source contributions.
                    </p>
                </div>

                {/* Tech Stack Filter Bar (Original glass capsule) */}
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

                {/* Projects Grid Container */}
                <div className="projects-wrapper">
                    {!isMobile ? (
                        filteredCases.map((project, index) => (
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
                                        key="detail"
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
                                                    <div className="title-with-badge">
                                                        <h3 className="project-title">{expandedProject.title}</h3>
                                                        {expandedProject.isWip && (
                                                            <span className="wip-pill">WIP / In Progress</span>
                                                        )}
                                                    </div>
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
