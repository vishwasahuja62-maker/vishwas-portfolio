import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
    Mail, 
    Send, 
    CheckCircle2, 
    AlertCircle 
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
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // If credentials are not yet added in .env/.env.local
            if (!serviceId || !templateId || !publicKey) {
                setStatus('error');
                setErrorMessage('EmailJS credentials missing. Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env or .env.local file.');
                return;
            }

            // Real dispatch through EmailJS
            const result = await emailjs.send(
                serviceId, 
                templateId, 
                {
                    from_name: formState.name,
                    from_email: formState.email,
                    subject: formState.subject || 'New Portfolio Inquiry',
                    message: formState.message,
                    to_email: 'vishwasahuja62@gmail.com'
                }, 
                publicKey
            );

            if (result.status === 200 || result.text === 'OK') {
                setStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Email service returned non-200 status');
            }
        } catch (err) {
            console.error('Email send failed:', err);
            setStatus('error');
            setErrorMessage(err?.text || err?.message || 'Could not send message. Please verify your EmailJS keys in .env.local.');
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
                        <span>Message dispatched directly to Vishwas! Thank you for reaching out.</span>
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
