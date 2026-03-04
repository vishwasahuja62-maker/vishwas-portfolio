import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi, I’m the AI portfolio guide for Vishwas. How can I help you evaluate his work?' }
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

    const getLocalResponse = (query) => {
        const q = query.toLowerCase();

        // Project deep-dives
        if (q.includes('analyzer') || q.includes('scoring') || q.includes('github api')) {
            return "The **GitHub Profile Analyzer** is a sophisticated engineering tool. It uses a Node.js backend to aggregate REST API data and calculate a 1-1000 'Developer Score'. The logic weights Stars (x3), Repos (x2), and Followers (x2), with additional multipliers for organizational loyalty and account longevity. It's designed to give recruiters a radar-map visualization of a builder's actual consistency.";
        }

        if (q.includes('kanban') || q.includes('real-time') || q.includes('sync') || q.includes('supabase')) {
            return "The **Supabase Kanban Board** focuses on sub-100ms state synchronization. It leverages **PostgreSQL real-time channels** and optimistic UI updates to ensure that drag-and-drop actions are reflected instantly across all concurrent sessions. It also implements Row-Level Security (RLS) to ensure that despite the speed, user data remains perfectly isolated.";
        }

        if (q.includes('snake') || q.includes('pwa') || q.includes('offline') || q.includes('game')) {
            return "The **Neon Snake PWA** is a masterclass in zero-dependency JavaScript. It features a frame-perfect game loop with **Illegal Turn Protection** (preventing 180-degree self-collisions) and full offline support via custom **Service Worker** implementation. It's under 50KB but offers input lag lower than 1ms.";
        }

        // Generic Categories
        if (q.includes('project') || q.includes('work') || q.includes('build')) {
            return "Vishwas has built three major flagships: \n1. A **GitHub Profile Analyzer** with weighted scoring logic. \n2. A **Real-time Kanban Board** powered by Supabase. \n3. A high-performance **Neon Snake PWA**. \nEach project is architected with a 'mobile-first' and 'performance-first' philosophy.";
        }

        if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('frontend') || q.includes('backend')) {
            return "The engineering stack is optimized for the modern web: **React 18** for the view layer, **GSAP/Framer** for cinematic interactions, and **TailwindCSS** for atomic design. The backend architecture relies on **Node.js** for logic and **Supabase/PostgreSQL** for real-time persistence. Everything is deployed on **Kuberns AI** for global edge performance.";
        }

        if (q.includes('deploy') || q.includes('host') || q.includes('kuberns') || q.includes('infra')) {
            return "This entire site is a production showcase of **Kuberns AI Infrastructure**. It utilizes automated SSL, edge delivery nodes for global speed, and real-time observability clusters. Every deployment follows a rigid CI/CD mindset, treating infrastructure as a first-class citizen.";
        }

        if (q.includes('who') || q.includes('vishwas') || q.includes('about') || q.includes('mindset') || q.includes('student')) {
            return "Vishwas is a 2nd-year BTech student specializing in **Data Science**. His core philosophy is 'Engineering Over Tutorials'—meaning he builds custom-architected solutions instead of simply replicating guides. He specializes in integrating AI logic directly into fluid user interfaces.";
        }

        if (q.includes('github') || q.includes('stars') || q.includes('repos')) {
            return "Vishwas builds highly visible open-source tools. His projects, such as the GitHub Profile Analyzer and elite Kanban Board, fetch real-time stats (Stars/Forks) via the GitHub REST API to ensure transparency and community-driven social proof.";
        }

        if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('linkedin')) {
            return "You can reach Vishwas directly at **vishwasahuja62@gmail.com**. He is also active on LinkedIn and GitHub. You'll find a functional 'System Architecture' terminal at the bottom of the page which serves as his contact and deployment control center.";
        }

        if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
            return "You can download Vishwas's technical CV by clicking the **'Get My Resume'** button in the Hero section at the top of the page. It details his full engineering background and project metrics.";
        }

        return "I'm currently operating on my **Local Knowledge Engine** while the primary LLM is offline. I can give you deep technical specs on the **GitHub Scoring Multipliers**, the **PWA Service Worker logic**, or the **Supabase Real-time Cluster sync**. What would you like to know more about?";
    };

    const handleSend = async (e, textOverride = null) => {
        if (e) e.preventDefault();

        const messageText = textOverride || inputValue;
        if (!messageText.trim()) return;

        const newMessages = [...messages, { role: 'user', text: messageText }];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                // Key missing: use local fallback immediately
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        text: getLocalResponse(messageText)
                    }]);
                    setIsTyping(false);
                }, 800);
                return;
            }

            const apiMessages = [
                {
                    role: "system",
                    content: "You are the AI portfolio guide for Vishwas Ahuja, a 2nd year BTech CSE student with a minor specialization in Data Science. He builds production-quality React apps, integrates real AI APIs (like Groq), and deploys live with Kuberns AI. His projects include a GitHub Profile Analyzer, a Kanban Task Manager with Supabase, and a vanilla JS Snake Game. Help visitors understand his skills and projects. Keep answers concise (max 3 sentences) and enthusiastic but honest."
                },
                ...newMessages.map(msg => ({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.text
                }))
            ];

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            if (!response.ok) throw new Error("API call failed");

            const data = await response.json();
            if (data.error) throw new Error(data.error.message);

            const aiText = data.choices[0].message.content;

            setMessages(prev => [...prev, {
                role: 'assistant',
                text: aiText
            }]);
        } catch (error) {
            // Fallback to local knowledge if API fails
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: getLocalResponse(messageText)
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Animation Variants for orchestrated reveal
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
                                <span className="status"><span className="dot green"></span> Edge Deployed</span>
                            </div>
                            <button onClick={toggleChat} className="close-btn"><X size={18} /></button>
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

                            {messages.length === 1 && (
                                <div className="suggestion-chips">
                                    <button onClick={() => handleSend(null, "Tell me about his flagship projects")}>"Ask about projects"</button>
                                    <button onClick={() => handleSend(null, "How does he handle deployments?")}>"Show deployment flow"</button>
                                </div>
                            )}
                        </motion.div>

                        <motion.form
                            onSubmit={handleSend}
                            className="chat-input-area"
                            variants={itemVariants}
                        >
                            <input
                                type="text"
                                placeholder="Ask about scaling, React, or deployments..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isTyping}
                            />
                            <button type="submit" disabled={!inputValue.trim() || isTyping}><Send size={18} /></button>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="ai-fab btn-glow"
                onClick={toggleChat}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { delay: 1.2, type: 'spring', damping: 15 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="fab-aura"></div>
                <MessageSquare size={24} />
                <span className="fab-text hidden-mobile">Ask about my work</span>
            </motion.button>
        </div>
    );
};

export default AiAssistant;
