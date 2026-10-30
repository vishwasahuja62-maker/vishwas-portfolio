import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            text: 'Hello! I am Vishwas Ahuja’s Live AI Portfolio Intelligence Guide, powered by Groq. Ask me in-depth questions about his Salesforce CRM engineering, custom architectures, tech stack, or professional background!' 
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async (e, textOverride = null) => {
        if (e) e.preventDefault();

        const messageText = textOverride || inputValue;
        if (!messageText.trim()) return;

        const newMessages = [...messages, { role: 'user', text: messageText }];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

        const systemPrompt = `You are the authentic, highly intelligent and articulate AI Portfolio Guide for Vishwas Ahuja. 
Your purpose is to answer recruiters, hiring managers, and visitors with rich, detailed, comprehensive, and technically grounded answers about Vishwas.
DO NOT give shallow or 1-2 sentence replies. Provide thoughtful, well-structured, in-depth breakdowns with bullet points and clear context.

Here are the VERIFIED core facts about Vishwas Ahuja:
1. Identity & Profile:
   - Full Name: Vishwas Ahuja
   - Role: Aspiring Software Engineer & B.Tech CSE (Core) student with Minor in Data Science at Manav Rachna University (Batch 2024–2028).
   - Academic Excellence: Dean's List and Vice-Chancellor (VC) List Awardee. Class XII (CBSE): 90.8%, Class X (CBSE): 94%.
   - Core Philosophy: "Engineering Over Replicating" — architectures built from scratch with production-grade engineering principles.

2. Flagship Project 1: Student Placement Management System (Salesforce Cloud CRM)
   - Architecture: Native 3-tier enterprise cloud architecture on Salesforce CRM Cloud replacing legacy chaotic spreadsheet tracking.
   - Frontend/UI: Custom Lightning Web Components (LWC) with responsive recruiter and student interfaces.
   - Backend & Logic: Automated Apex Controllers, triggers, and SOQL queries handling eligibility verification and interview pipeline transitions.
   - Automation: Record-triggered Salesforce Flows for instant status updates, candidate shortlisting, and notification dispatch.
   - Impact: Reduced manual administrative and application processing overhead by 60%, delivering real-time executive KPI analytics dashboards directly to university placement directors.

3. Flagship Project 2: GitHub Profile Analyzer
   - Architecture: Node.js and Express backend communicating directly with the GitHub REST API.
   - Engineering Logic: Computes a proprietary 1–1000 weighted "Developer Score". The weighting matrix accounts for Stars (3x), Repositories (2x), Followers (2x), paired with account longevity multipliers and organizational consistency.
   - Visualization: Real-time radar maps and interactive data visualizers comparing developers.

4. Flagship Project 3: Real-Time Kanban Task Manager
   - Stack: React 18 frontend paired with Supabase and PostgreSQL.
   - Real-Time Synchronization: Uses PostgreSQL real-time replication channels via WebSockets for sub-100ms state updates across multiple active browser sessions.
   - Security: Implements strict Row-Level Security (RLS) policies guaranteeing total user data privacy with optimistic UI updates.

5. Flagship Project 4: Neon Snake Game PWA
   - Tech: Pure zero-dependency Vanilla JavaScript, HTML5 Canvas.
   - Game Loop: Sub-1ms input latency frame loop featuring custom "Illegal Turn Protection" logic preventing 180° self-collisions.
   - Offline Capability: Full PWA support with custom Service Worker caching.

6. Skills & Tooling:
   - Languages: JavaScript (ES6+), Python, Java, C++, Apex, SQL
   - Frontend: React 18, Vite, TailwindCSS, GSAP, Framer Motion
   - Cloud & Database: Salesforce Cloud CRM, LWC, Apex, Supabase, PostgreSQL, REST APIs
   - Tooling: Git, GitHub, VS Code, SFDX CLI, Postman

7. Contact & Links:
   - Primary Email: vishwasahuja62@gmail.com
   - University Email: vishwas_ahuja24@mru.ac.in
   - Phone: +91-8882449462
   - LinkedIn: https://www.linkedin.com/in/vishwas-ahuja-6b5225327
   - GitHub: https://github.com/vishwasahuja62-maker
   - Resume: Downloadable as cv_vishwas_btech.pdf directly on the site.

Tone: Professional, enthusiastic, technically insightful, articulate, and structured. Always highlight his real accomplishments.`;

        try {
            if (apiKey) {
                // Determine model: prioritize Groq's high-capacity Qwen model
                const modelToUse = "qwen/qwen3.8-27b";

                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey.trim()}`
                    },
                    body: JSON.stringify({
                        model: modelToUse,
                        messages: [
                            { role: "system", content: systemPrompt },
                            ...newMessages.slice(-8).map(m => ({ role: m.role, content: m.text }))
                        ],
                        temperature: 0.7,
                        max_tokens: 600
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.choices && data.choices[0]?.message?.content) {
                        setMessages(prev => [...prev, {
                            role: 'assistant',
                            text: data.choices[0].message.content
                        }]);
                        setIsTyping(false);
                        return;
                    }
                } else {
                    const errData = await response.json().catch(() => ({}));
                    console.warn("Groq API warning:", errData);
                }
            }
        } catch (err) {
            console.error("AI Assistant network error:", err);
        }

        // Failsafe rich response generator if API is momentarily unreachable
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: `Vishwas Ahuja is an aspiring Software Engineer (B.Tech CSE with Data Science minor at Manav Rachna University, Dean's List). 

Here is an architectural breakdown of what he builds:
• **Salesforce CRM Placement System**: Enterprise cloud app with custom Lightning Web Components (LWC), Apex triggers, and automated Salesforce Flows that reduced placement overhead by 60%.
• **GitHub Profile Analyzer**: Node.js engine calculating a weighted 1-1000 Developer Score (Stars 3x, Repos 2x, Followers 2x) via GitHub REST APIs.
• **Real-Time Kanban Board**: React 18 + Supabase real-time websocket sync (<100ms latency) and Row-Level Security (RLS).
• **Skills**: React 18, Salesforce CRM, Apex, LWC, Python, Java, C++, PostgreSQL, TailwindCSS.

Reach out directly at **vishwasahuja62@gmail.com** or **+91-8882449462**!`
            }]);
            setIsTyping(false);
        }, 600);
    };

    // Animation Variants
    const panelVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="ai-assistant-wrapper">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="ai-chat-panel glass"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div className="chat-header" variants={itemVariants}>
                            <div>
                                <h4>AI Portfolio Guide</h4>
                                <span className="status"><span className="dot green"></span> Live LLM Intelligence</span>
                            </div>
                            <button onClick={toggleChat} className="close-btn" aria-label="Close Chat"><X size={18} /></button>
                        </motion.div>

                        <motion.div className="chat-body" variants={itemVariants}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`message ${msg.role}`}>
                                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="message assistant typing-indicator">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />

                            <div className="suggestion-chips">
                                <button onClick={() => handleSend(null, "Explain the architecture of Vishwas's Salesforce CRM Placement project.")}>
                                    "Salesforce CRM Architecture"
                                </button>
                                <button onClick={() => handleSend(null, "How does the GitHub Profile Analyzer calculate its developer score?")}>
                                    "GitHub Scoring Logic"
                                </button>
                                <button onClick={() => handleSend(null, "What is Vishwas's full tech stack and academic background?")}>
                                    "Tech Stack & Education"
                                </button>
                                <button onClick={() => handleSend(null, "How can I contact or interview Vishwas?")}>
                                    "Contact & Interview"
                                </button>
                            </div>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSend}
                            className="chat-input-area"
                            variants={itemVariants}
                        >
                            <input
                                type="text"
                                placeholder="Ask any in-depth technical question..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isTyping}
                            />
                            <button type="submit" disabled={!inputValue.trim() || isTyping} aria-label="Send Message">
                                <Send size={18} />
                            </button>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                className="ai-fab btn-glow"
                onClick={toggleChat}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { delay: 0.3, type: 'spring', damping: 15 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle AI Portfolio Guide"
            >
                <div className="fab-aura"></div>
                <MessageSquare size={24} />
                <span className="fab-text hidden-mobile">Ask about my work</span>
            </motion.button>
        </div>
    );
};

export default AiAssistant;
