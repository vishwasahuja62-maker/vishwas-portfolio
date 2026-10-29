import React from 'react';
import { X, ExternalLink, RefreshCw, Maximize2 } from 'lucide-react';

const LivePreviewModal = ({ url, title, isOpen, onClose }) => {
    if (!isOpen || !url) return null;

    return (
        <div className="preview-modal-backdrop" onClick={onClose}>
            <div className="preview-modal-window glass" onClick={(e) => e.stopPropagation()}>
                {/* Modal Window Top Bar */}
                <div className="preview-modal-bar">
                    <div className="preview-dots">
                        <span className="dot dot-red" onClick={onClose} role="button" title="Close"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                    </div>

                    <div className="preview-address-bar">
                        <span className="preview-url-text">{url}</span>
                    </div>

                    <div className="preview-bar-actions">
                        <a 
                            href={url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="preview-btn-icon" 
                            title="Open in new tab"
                        >
                            <ExternalLink size={16} />
                        </a>
                        <button 
                            className="preview-btn-icon" 
                            onClick={onClose} 
                            title="Close simulator"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Live iFrame Sandbox */}
                <div className="preview-iframe-wrapper">
                    <iframe 
                        src={url} 
                        title={title || "Project Live Sandbox"} 
                        className="preview-iframe"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default LivePreviewModal;
