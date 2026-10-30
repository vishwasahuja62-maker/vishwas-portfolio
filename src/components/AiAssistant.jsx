import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi! I’m Vishwas Ahuja’s AI Portfolio Guide. Ask me anything about his real projects, Salesforce CRM work, tech stack, education, or contact details!' }
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

    // Comprehensive real knowledge base of Vishwas's entire portfolio
    const getRealPortfolioAnswer = (query) => {
        const q = query.toLowerCase();

        // 1. Salesforce CRM (Flagship project & Internship)
        if (q.includes('salesforce') || q.includes('crm') || q.includes('apex') || q.includes('lwc') || q.includes('placement')) {
            return "Vishwas engineered an enterprise **Student Placement Management System** natively on **Salesforce Cloud CRM**! It features a 3-tier architecture with custom relational data models, dynamic **Lightning Web Components (LWC)**, automated **Apex controllers** for eligibility verification, and record-triggered **Salesforce Flows** that cut placement cell overhead by 60%.";
        }

        // 2. GitHub Profile Analyzer
        if (q.includes('analyzer') || q.includes('scoring') || q.includes('github api') || q.includes('score')) {
            return "The **GitHub Profile Analyzer** aggregates live data via GitHub's REST API and calculates a 1–1000 'Developer Score' using weighted algorithms: Stars (x3), Repos (x2), Followers (x2), plus longevity multipliers. It features real-time search, visual metric charts, and live repository insights.";
        }

        // 3. Supabase Kanban Board
        if (q.includes('kanban') || q.includes('real-time') || q.includes('sync') || q.includes('supabase') || q.includes('task')) {
            return "The **Real-Time Kanban Board** is powered by **Supabase & PostgreSQL real-time websockets**. It supports smooth drag-and-drop state updates with optimistic UI sync (<100ms latency), Row-Level Security (RLS) data isolation, and live multi-user collaboration.";
        }

        // 4. Neon Snake Game
        if (q.includes('snake') || q.includes('game') || q.includes('pwa') || q.includes('offline')) {
            return "The **Neon Snake PWA** is built in pure zero-dependency JavaScript. It features an ultra-low latency (<1ms) frame loop, **Illegal Turn Protection** (no 180° self-collisions), custom Service Worker for complete offline play, and local high-score persistence.";
        }

        // 5. All Projects Overview
        if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('flagship')) {
            return "Vishwas's key projects include:\n1. **Salesforce CRM Placement System**: Enterprise cloud app with LWC & Apex.\n2. **GitHub Profile Analyzer**: Real-time developer scoring engine via GitHub API.\n3. **Real-time Kanban Board**: Collaborative task manager with Supabase.\n4. **Neon Snake PWA**: Offline-first web game with sub-1ms input response.";
        }

        // 6. Technical Skills & Stack
        if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('languages') || q.includes('framework')) {
            return "Vishwas's verified tech stack:\n• **Languages**: JavaScript (ES6+), Python, Java, C++, Apex, SQL\n• **Frontend**: React 18, TailwindCSS, GSAP, Framer Motion, HTML5/CSS3\n• **Cloud & CRM**: Salesforce Cloud CRM, Lightning Web Components (LWC), Salesforce Flows\n• **Backend & DB**: Node.js, Express, Supabase, PostgreSQL, REST APIs, Git/GitHub";
        }

        // 7. Education & Academics
        if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('btech') || q.includes('school') || q.includes('gpa') || q.includes('marks')) {
            return "Vishwas is pursuing **B.Tech in Computer Science Engineering (Core)** with a **Minor in Data Science** at **Manav Rachna University** (Batch 2024–2028). Highlights: Dean's List & VC List Awardee. He scored **90.8% in Class XII (CBSE)** from Tagore Academy Public School and **94% in Class X (CBSE)** from St. Anthony's Sr. Sec. School.";
        }

        // 8. Experience & Internships
        if (q.includes('experience') || q.includes('intern') || q.includes('company') || q.includes('job') || q.includes('astrea') || q.includes('codsoft')) {
            return "Vishwas has worked as a **Salesforce Developer & CRM Intern** (engineered enterprise placement workflows, Apex triggers, and automated validation flows) and as a **Web Development Intern at CodSoft** (built responsive modern web applications and interactive UI components).";
        }

        // 9. Contact details & Hiring
        if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('message')) {
            return "You can reach Vishwas directly:\n• **Primary Email**: vishwasahuja62@gmail.com\n• **University Email**: vishwas_ahuja24@mru.ac.in\n• **Phone**: +91-8882449462\n• **LinkedIn**: linkedin.com/in/vishwas-ahuja-6b5225327\n• **GitHub**: github.com/vishwasahuja62-maker\nYou can also submit the live Contact Form or book a Calendly session directly on this site!";
        }

        // 10. Resume / CV
        if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
            return "You can download Vishwas's official resume (`cv_vishwas_btech.pdf`) using the **'Get My Resume'** button in the Hero section or the download action in the Navigation / Command Palette!";
        }

        // 11. Who is Vishwas
        if (q.includes('who') || q.includes('vishwas') || q.includes('about') || q.includes('bio')) {
            return "Vishwas Ahuja is an aspiring Software Engineer and 2nd-year BTech CSE student specializing in Data Science. His engineering philosophy is 'Building Over Replicating'—delivering enterprise cloud CRM systems, interactive AI tooling, and fluid web experiences.";
        }

        // 12. General greeting / Fallback with smart recommendations
        return "I am Vishwas's portfolio intelligence guide. I can tell you all about his **Salesforce CRM Placement System**, **GitHub Profile Analyzer**, **Tech Stack**, **Education at Manav Rachna University**, or his **Contact Information**. What would you like to explore?";
    };

    const handleSend = async (e, textOverride = null) => {
        if (e) e.preventDefault();

        const messageText = textOverride || inputValue;
        if (!messageText.trim()) return;

        const newMessages = [...messages, { role: 'user', text: messageText }];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GROQ_API_KEY;

        if (apiKey) {
            try {
                const systemPrompt = `You are the authentic AI Portfolio Guide for Vishwas Ahuja.
Here are the exact facts about Vishwas:
- Full Name: Vishwas Ahuja
- Role: Aspiring Software Engineer & BTech CSE (Core) student with Minor in Data Science at Manav Rachna University (2024-2028). Dean's List & VC List awardee.
- Key Projects:
  1. Student Placement Management System (Salesforce Cloud CRM, Apex, Lightning Web Components LWC, Salesforce Flows).
  2. GitHub Profile Analyzer (Node.js, GitHub REST API, 1-1000 weighted developer score).
  3. Real-Time Kanban Board (React, Supabase, PostgreSQL real-time websockets, RLS security).
  4. Neon Snake PWA (Vanilla JS, Service Workers, offline play, <1ms input lag).
- Skills: React 18, Node.js, JavaScript, Python, Java, C++, Salesforce CRM, Apex, LWC, SQL, Supabase, TailwindCSS, GSAP.
- Contact: vishwasahuja62@gmail.com, Phone: +91-8882449462, LinkedIn: linkedin.com/in/vishwas-ahuja-6b5225327, GitHub: github.com/vishwasahuja62-maker.
Give helpful, precise, realistic answers in 2-4 sentences. Always be accurate to these facts.`;

                // Groq API call (Free Tier)
                if (apiKey.startsWith('gsk_')) {
                    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            model: "llama-3.3-70b-versatile",
                            messages: [
                                { role: "system", content: systemPrompt },
                                ...newMessages.slice(-6).map(m => ({ role: m.role, content: m.text }))
                            ],
                            temperature: 0.6,
                            max_tokens: 220
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
                    }
                }

                // Google Gemini API call (Free Tier)
                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
                const geminiRes = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${messageText}` }] }
                        ],
                        generationConfig: { maxOutputTokens: 220, temperature: 0.6 }
                    })
                });

                if (geminiRes.ok) {
                    const geminiData = await geminiRes.json();
                    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                        setMessages(prev => [...prev, { role: 'assistant', text }]);
                        setIsTyping(false);
                        return;
                    }
                }
            } catch (_) {
                // Seamless fallback to built-in verified engine
            }
        }

        // Real Verified Engine Fallback (Zero cost, works 100% reliably out of the box)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: getRealPortfolioAnswer(messageText)
            }]);
            setIsTyping(false);
        }, 500);
    };

    // Animation Variants for chat panel
    const panelVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
                filter: { duration: 0.3, ease: 'easeOut' },
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
                                <span className="status"><span className="dot green"></span> Live Intelligence</span>
                            </div>
                            <button onClick={toggleChat} className="close-btn" aria-label="Close Chat"><X size={18} /></button>
                        </motion.div>

                        <motion.div className="chat-body" variants={itemVariants}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`message ${msg.role}`}>
                                    {msg.text}
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
                                <button onClick={() => handleSend(null, "Salesforce CRM Project")}>"Salesforce CRM"</button>
                                <button onClick={() => handleSend(null, "GitHub Profile Analyzer")}>"GitHub Analyzer"</button>
                                <button onClick={() => handleSend(null, "What is your tech stack?")}>"Tech Stack"</button>
                                <button onClick={() => handleSend(null, "Education details")}>"Education"</button>
                            </div>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSend}
                            className="chat-input-area"
                            variants={itemVariants}
                        >
                            <input
                                type="text"
                                placeholder="Ask about Salesforce, skills, or projects..."
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

            {/* Floating Action Button (Exact CSS class matching .ai-fab & .ai-assistant-wrapper) */}
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
