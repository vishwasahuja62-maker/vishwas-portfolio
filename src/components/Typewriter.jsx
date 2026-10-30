import React, { useState, useEffect } from 'react';

const Typewriter = ({ phrases, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1800 }) => {
    const [currentText, setCurrentText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = phrases[phraseIndex % phrases.length];
        
        let timer;
        if (!isDeleting && currentText === fullText) {
            timer = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        } else {
            const nextLength = isDeleting ? currentText.length - 1 : currentText.length + 1;
            timer = setTimeout(() => {
                setCurrentText(fullText.substring(0, nextLength));
            }, isDeleting ? deletingSpeed : typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className="typewriter-container">
            <span className="typewriter-text">{currentText}</span>
            <span className="typewriter-cursor">|</span>
        </span>
    );
};

export default Typewriter;

