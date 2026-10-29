import React from 'react';
import { motion } from 'framer-motion';
import { 
    Sparkles, 
    Cloud, 
    ArrowRight, 
    CheckCircle2, 
    ShieldCheck, 
    BarChart3, 
    Workflow, 
    Code2, 
    Cpu 
} from 'lucide-react';

const FeaturedSpotlight = ({ onNavigate }) => {
    return (
        <section className="section-padding spotlight-section">
            <div className="container">
                <div className="section-header-compact center text-center">
                    <span className="section-eyebrow">Flagship Cloud Architecture</span>
                    <h2 className="section-title">Enterprise Project Spotlight</h2>
                    <p className="section-subtitle">
                        Deep dive into enterprise Salesforce CRM systems engineered with Lightning Web Components & Apex.
                    </p>
                </div>

                <div className="spotlight-card glass">
                    <div className="spotlight-badge-row">
                        <span className="spotlight-pill">
                            <Sparkles size={13} className="text-cyan" />
                            <span>Enterprise Cloud Architecture</span>
                        </span>
                        <span className="spotlight-status-cloud">
                            <Cloud size={14} className="text-cyan" />
                            <span>Salesforce Cloud CRM Hosted</span>
                        </span>
                    </div>

                    <div className="spotlight-content-grid">
                        <div className="spotlight-left">
                            <span className="spotlight-eyebrow">Enterprise Placement Solution</span>
                            <h3 className="spotlight-title">Student Placement Management CRM</h3>
                            <p className="spotlight-desc">
                                Engineered directly for university placement cells and corporate recruiters. Replaces chaotic spreadsheets with a high-governance, 3-tier Salesforce Cloud architecture featuring custom relational data models, Lightning Web Components (LWC), and automated Apex controllers.
                            </p>

                            <div className="spotlight-highlights-list">
                                <div className="highlight-item">
                                    <Workflow size={16} className="text-cyan" />
                                    <span>Automated Record-Triggered Salesforce Flows for eligibility checking</span>
                                </div>
                                <div className="highlight-item">
                                    <Code2 size={16} className="text-purple" />
                                    <span>Custom Apex controllers with cacheable SOQL & security enforcement</span>
                                </div>
                                <div className="highlight-item">
                                    <BarChart3 size={16} className="text-green" />
                                    <span>Real-time executive KPI dashboards cutting application overhead by 60%</span>
                                </div>
                                <div className="highlight-item">
                                    <ShieldCheck size={16} className="text-amber" />
                                    <span>Role-Based Access Control (RBAC) with Profiles & Permission Sets</span>
                                </div>
                            </div>

                            <div className="spotlight-tech-tags">
                                <span className="tech-tag">Salesforce CRM</span>
                                <span className="tech-tag">Lightning Web Components (LWC)</span>
                                <span className="tech-tag">Apex Controllers</span>
                                <span className="tech-tag">Salesforce Flows</span>
                                <span className="tech-tag">SOQL & SFDX CLI</span>
                            </div>

                            <div className="spotlight-actions">
                                {onNavigate && (
                                    <button 
                                        className="btn btn-primary btn-glow"
                                        onClick={() => onNavigate('projects')}
                                    >
                                        <span>View Complete Case Study</span>
                                        <ArrowRight size={15} />
                                    </button>
                                )}
                                {onNavigate && (
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => onNavigate('experience')}
                                    >
                                        <span>Inspect Astrea IT Internship</span>
                                        <ArrowRight size={15} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="spotlight-right">
                            <div className="spotlight-preview-frame">
                                <div className="browser-mockup-bar">
                                    <div className="browser-dots">
                                        <span className="dot dot-red"></span>
                                        <span className="dot dot-yellow"></span>
                                        <span className="dot dot-green"></span>
                                    </div>
                                    <span className="browser-url">salesforce.com/lightning/app/placement_hub</span>
                                </div>
                                
                                <div className="spotlight-interactive-teaser">
                                    <div className="teaser-salesforce-board">
                                        <div className="sf-header-bar">
                                            <div className="sf-logo-title">
                                                <Cloud size={16} className="text-cyan" />
                                                <span className="sf-title-text">Placement Lightning Console</span>
                                            </div>
                                            <span className="sf-badge-status">Cloud Org Verified</span>
                                        </div>

                                        <div className="sf-metrics-row">
                                            <div className="sf-metric-card">
                                                <span className="sf-metric-val">60%</span>
                                                <span className="sf-metric-lbl">Overhead Reduced</span>
                                            </div>
                                            <div className="sf-metric-card">
                                                <span className="sf-metric-val">100%</span>
                                                <span className="sf-metric-lbl">Flow Automation</span>
                                            </div>
                                            <div className="sf-metric-card">
                                                <span className="sf-metric-val">Apex</span>
                                                <span className="sf-metric-lbl">Security Enforced</span>
                                            </div>
                                        </div>

                                        <div className="sf-code-preview">
                                            <div className="sf-code-header">
                                                <Code2 size={13} className="text-cyan" />
                                                <span>Apex Controller: Dynamic Eligibility Filter</span>
                                            </div>
                                            <pre className="sf-code-text">
{`public with sharing class PlacementController {
    @AuraEnabled(cacheable=true)
    public static List<Application__c> getEligibleApps(Id driveId) {
        return [SELECT Id, Student__r.Name, CGPA__c 
                FROM Application__c WHERE Drive__c = :driveId 
                WITH SECURITY_ENFORCED];
    }
}`}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSpotlight;
