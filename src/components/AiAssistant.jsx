import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            text: 'Hey! I’m Vishwas Ahuja’s AI Guide. Feel free to ask me about his Net Forensics platform, Salesforce CRM engineering, custom architectures, tech stack, or background!' 
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

        const systemPrompt = `You are the personal AI Portfolio Guide on Vishwas Ahuja's website.
CRITICAL TONE & STYLE RULES:
- Talk like a smart, knowledgeable tech colleague in a fast-paced chat—natural, direct, and conversational.
- NEVER write stiff textbook essays, boring documentation headings (e.g. do NOT use headings like "### 1. Architectural Overview: 3-Tier Enterprise Cloud" or "Presentation Tier").
- Avoid endless bullet lists or generic fluff.
- Deliver lively, sharp, and engaging responses in 2 to 3 smooth paragraphs with real context, human problem-solving, and concrete outcomes.

Core Verified Facts about Vishwas Ahuja:
1. Net Forensics – Network Traffic Forensics Platform (Flagship Third-Year Project):
   - Problem: Network evidence is massive, noisy, and scattered across millions of packets in PCAPs. Manual Wireshark packet-by-packet analysis misses quiet threats like C2 beaconing, DNS tunneling, and slow exfiltration.
   - Architecture: An asynchronous 4-tier pipeline: React/D3.js dashboard, FastAPI REST/WebSocket backend, Celery + Redis distributed worker queue (tshark, Scapy, dpkt packet decoding), and MinIO (immutable raw PCAPs) + Elasticsearch + PostgreSQL storage.
   - Detection & ML: Multi-layered detection with Suricata rules, behavioral heuristics (Shannon entropy on DNS, Z-score on outbound byte spikes, JA3/JA4 TLS fingerprinting), and an Isolation Forest anomaly model. All findings tagged with MITRE ATT&CK techniques, SHA-256 evidence chain of custody, and 1-click forensic PDF reports.

2. Student Placement Management System (Salesforce Cloud CRM):
   - The university was managing campus drives on messy spreadsheets with lost records and slow communication.
   - Vishwas architected a native Salesforce CRM platform with custom Lightning Web Components (LWC) tailored for students (application tracking) and recruiters (fast candidate filtering).
   - Under the hood, custom Apex controllers and record-triggered Salesforce Flows automatically validated GPA/major eligibility and handled interview round transitions.
   - Result: Slashed administrative overhead by 60% and gave university directors real-time KPI analytics.

3. GitHub Profile Analyzer:
   - An engineering dashboard querying the GitHub REST API.
   - Uses a custom 1-1000 Developer Score algorithm weighting Stars (3x), Repositories (2x), and Followers (2x), plus account longevity and consistency multipliers.

4. Real-Time Kanban Board:
   - Built with React 18, Supabase, and PostgreSQL.
   - Features sub-100ms real-time state synchronization across active sessions via WebSockets, with strict Row-Level Security (RLS) data isolation.

5. Neon Snake Game PWA:
   - High-performance vanilla JavaScript PWA with sub-1ms input latency.
   - Built with Illegal Turn Protection logic to prevent 180° self-collisions and full offline Service Worker caching.

6. Education & Background:
   - B.Tech CSE (Core) with a Minor in Data Science at Manav Rachna University (2024–2028). Dean's List and VC List Awardee.
   - Class XII (2022–2024): 90.8% from Tagore Academy Public School.
   - Class X (2010–2022): 94% from St. Anthony's Senior Secondary School.
   - Contact: vishwasahuja62@gmail.com | +91-8882449462 | LinkedIn: linkedin.com/in/vishwas-ahuja-6b5225327`;

        try {
            if (apiKey) {
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey.trim()}`
                    },
                    body: JSON.stringify({
                        model: "qwen/qwen3.8-27b",
                        messages: [
                            { role: "system", content: systemPrompt },
                            ...newMessages.slice(-6).map(m => ({ role: m.role, content: m.text }))
                        ],
                        temperature: 0.7,
                        max_tokens: 380
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
        } catch (err) {
            console.error("AI Assistant network error:", err);
        }

        // Conversational natural fallback
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: `Vishwas is an aspiring software engineer pursuing B.Tech CSE (Data Science minor) at Manav Rachna University, recognized on the Dean's List.

His core projects include:
• **Net Forensics**: An asynchronous network traffic forensics platform decoding L2–L7 PCAP packets, using Shannon entropy and Isolation Forest ML to detect quiet attacks (DNS tunneling, C2 beaconing) with SHA-256 chain of custody.
• **Salesforce CRM Placement System**: Enterprise cloud app with custom Lightning Web Components (LWC), custom Apex eligibility logic, and Salesforce Flows—slashing processing time by 60%.
• **GitHub Profile Analyzer & Real-Time Kanban**: Full-stack platforms backed by custom scoring algorithms and Supabase websockets. Reach him directly at **vishwasahuja62@gmail.com**!`
            }]);
            setIsTyping(false);
        }, 500);
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
                                <span className="status"><span className="dot green"></span> Live Intelligence</span>
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
                                <button onClick={() => handleSend(null, "Tell me about your Net Forensics platform.")}>
                                    "Net Forensics Platform"
                                </button>
                                <button onClick={() => handleSend(null, "Tell me about your Salesforce CRM Placement project.")}>
                                    "Salesforce CRM Project"
                                </button>
                                <button onClick={() => handleSend(null, "How does the GitHub Profile Analyzer work?")}>
                                    "GitHub Scoring Logic"
                                </button>
                                <button onClick={() => handleSend(null, "What is your core tech stack and academic background?")}>
                                    "Tech Stack & Education"
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
                                placeholder="Ask any question about his work..."
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
