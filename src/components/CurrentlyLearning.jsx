import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Terminal, Cpu, ArrowUpRight } from 'lucide-react';

const learningStack = [
    {
        title: "Next.js 15 & Server Components",
        focus: "App Router, Server Actions, Edge Rendering, and Next Auth v5",
        status: "Active Exploration",
        progress: 75,
        color: "cyan",
        icon: <Terminal size={18} />
    },
    {
        title: "Data Structures & Algorithms (Core Foundations)",
        focus: "Arrays, Strings, Two Pointers, Hashing, Recursion, and Sliding Window basics",
        status: "Active Daily Practice",
        progress: 65,
        color: "purple",
        icon: <Cpu size={18} />
    },
    {
        title: "System Design & Distributed Scalability",
        focus: "Microservices, Caching strategies, Message Queues (Kafka/Redis), and Database Sharding",
        status: "Architectural Deep Dives",
        progress: 55,
        color: "amber",
        icon: <BookOpen size={18} />
    }
];

const CurrentlyLearning = () => {
    return (
        <section className="section-padding learning-section">
            <div className="container">
                <div className="section-header-compact center text-center">
                    <span className="section-eyebrow">Continuous Expansion</span>
                    <h2 className="section-title">What I'm Currently Learning</h2>
                    <p className="section-subtitle">
                        An engineer never stops evolving. Here are the paradigms and systems currently under focus.
                    </p>
                </div>

                <div className="learning-grid">
                    {learningStack.map((item, index) => (
                        <motion.div 
                            key={index}
                            className={`learning-card glass border-${item.color}`}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="learning-card-top">
                                <div className={`learning-icon-box box-${item.color}`}>
                                    {item.icon}
                                </div>
                                <span className={`learning-status-badge badge-${item.color}`}>
                                    {item.status}
                                </span>
                            </div>

                            <h3 className="learning-title">{item.title}</h3>
                            <p className="learning-focus">{item.focus}</p>

                            <div className="learning-progress-track">
                                <div className="learning-progress-header">
                                    <span className="progress-label">Practice & Consistency</span>
                                    <span className="progress-val">{item.progress}%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div 
                                        className={`progress-bar-fill fill-${item.color}`}
                                        style={{ width: `${item.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurrentlyLearning;
