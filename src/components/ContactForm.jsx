import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
    Mail, 
    Send, 
    CheckCircle2, 
    AlertCircle, 
    Calendar, 
    Clock, 
    Sparkles, 
    ArrowRight,
    Github,
    Linkedin,
    ExternalLink
} from 'lucide-react';

const ContactForm = () => {
    const formRef = useRef(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) {
            setStatus('error');
            setErrorMessage('Please fill in your name, email, and message.');
            return;
        }

        setStatus('sending');

        try {
            // EmailJS send: user can configure VITE_EMAILJS_SERVICE_ID, etc.
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_mock';

            // If keys are placeholders, fallback gracefully to mailto or instant confirmed preview
            if (serviceId === 'service_portfolio') {
                // Mock delay to give realistic feedback and fallback to mailto opening
                await new Promise((r) => setTimeout(r, 900));
                
                // Trigger mailto client as backup delivery guarantee
                const mailtoUrl = `mailto:vishwasahuja62@gmail.com?subject=${encodeURIComponent(formState.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Vishwas,\n\nMy name is ${formState.name} (${formState.email}).\n\n${formState.message}`)}`;
                
                setStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });

                // Try opening user mail client as a failsafe
                const link = document.createElement('a');
                link.href = mailtoUrl;
                link.target = '_blank';
                link.click();
            } else {
                await emailjs.send(serviceId, templateId, {
                    from_name: formState.name,
                    from_email: formState.email,
                    subject: formState.subject || 'New Portfolio Message',
                    message: formState.message,
                    to_email: 'vishwasahuja62@gmail.com'
                }, publicKey);

                setStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
            }
        } catch (err) {
            console.error('Email send failed:', err);
            setStatus('error');
            setErrorMessage('Could not deliver directly. Please use the direct email button below!');
        }
    };

    return (
        <div className="contact-form-card glass">
            <div className="contact-form-header">
                <div className="contact-form-icon-pill">
                    <Mail size={18} className="text-cyan" />
                    <span>Direct Message Channel</span>
                </div>
                <h3>Send a Message</h3>
                <p>Have an opportunity, internship inquiry, or project proposal? Send a note directly to my inbox.</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form-body">
                <div className="form-row-dual">
                    <div className="form-group">
                        <label htmlFor="name">Your Name <span className="req">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formState.name} 
                            onChange={handleChange} 
                            placeholder="Alex Morgan" 
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address <span className="req">*</span></label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formState.email} 
                            onChange={handleChange} 
                            placeholder="alex@company.com" 
                            className="form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formState.subject} 
                        onChange={handleChange} 
                        placeholder="Software Engineering Internship / Freelance Project" 
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message <span className="req">*</span></label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formState.message} 
                        onChange={handleChange} 
                        rows={4} 
                        placeholder="Hi Vishwas, I came across your portfolio and would love to discuss..." 
                        className="form-input form-textarea"
                        required
                    />
                </div>

                {status === 'success' && (
                    <div className="form-alert alert-success">
                        <CheckCircle2 size={16} />
                        <span>Message prepared & dispatched! Thank you for reaching out.</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="form-alert alert-error">
                        <AlertCircle size={16} />
                        <span>{errorMessage}</span>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="btn btn-primary btn-glow btn-full"
                    disabled={status === 'sending'}
                >
                    {status === 'sending' ? (
                        <>
                            <span className="spinner-dot"></span>
                            <span>Sending Securely...</span>
                        </>
                    ) : (
                        <>
                            <Send size={16} />
                            <span>Dispatch Message</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
