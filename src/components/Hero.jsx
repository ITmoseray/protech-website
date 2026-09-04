import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';

const getInventoryLink = () => {
  return 'https://inventory-web--protech-website-38a37.us-east4.hosted.app/';
};

const Hero = ({ openEstimator }) => {
  const words = ['Smart Technology', 'Custom Software', 'Modern Websites', 'Enterprise ERPs', 'AI Integrations'];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Coding typing animation states
  const codeSnippet = `// Initialize digital transformation
import { AI, ERP, Cloud } from 'protech';

const company = new Business('Client');

company.optimize({
  systems: ERP.OS,
  features: [AI.Insights, Cloud.Sync],
  performance: 'Optimal'
});`;

  const [codeText, setCodeText] = useState('');
  const [codeIndex, setCodeIndex] = useState(0);

  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty('--mouse-x', `${x}px`);
    heroRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(150);
        } else {
          setDisplayText(displayText.slice(0, -1));
          setTypingSpeed(75);
        }
      } else {
        if (displayText.length === currentWord.length) {
          setIsDeleting(true);
          setTypingSpeed(2000); // Pause when full word is typed
        } else {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          setTypingSpeed(150);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, typingSpeed, wordIndex]);

  // Code writing animation hook
  useEffect(() => {
    if (codeIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setCodeText(prev => prev + codeSnippet[codeIndex]);
        setCodeIndex(prev => prev + 1);
      }, 35);
      return () => clearTimeout(timer);
    } else {
      const restartTimer = setTimeout(() => {
        setCodeText('');
        setCodeIndex(0);
      }, 6000);
      return () => clearTimeout(restartTimer);
    }
  }, [codeIndex]);

  const highlightCode = (lineText) => {
    return lineText
      .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
      .replace(/\b(import|from|const|new)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/('protech'|'Client'|'Optimal')/g, '<span class="code-string">$1</span>')
      .replace(/\b(AI|ERP|Cloud|Business)\b/g, '<span class="code-class">$1</span>');
  };

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <div className="hero-background">
        <div className="glow-sphere sphere-1"></div>
        <div className="glow-sphere sphere-2"></div>
        <div className="grid-overlay"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Empowering Businesses Through <br/>
            <span className="text-gradient typewriter-text">
              {displayText}
              <span className="typewriter-caret">|</span>
            </span>
          </h1>
          <p className="hero-description delay-100">
            Protech Assist SL Limited provides complete technology solutions — from software development and AI-powered systems to mobile applications, cloud solutions, cybersecurity, automation, and enterprise platforms. We help businesses build, transform, and scale through modern technology.
          </p>
          <div className="hero-buttons delay-200">
            <button className="btn btn-primary" onClick={openEstimator}>Request a Demo</button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('contact').scrollIntoView()}>Contact Us</button>
            <a 
              href={getInventoryLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              Inventory Enterprise OS ↗
            </a>
          </div>
        </div>
        
        <div className="hero-visual animate-fade-in delay-300">
          <div className="glass-panel dashboard-mockup">
            <div className="mockup-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar"></div>
              <div className="mockup-content">
                <div className="mockup-card code-terminal">
                  <div className="terminal-header">
                    <span className="terminal-file">ProtechOS.js</span>
                    <span className="terminal-lang">JavaScript</span>
                  </div>
                  <div className="terminal-body">
                    {codeText.split('\n').map((line, idx) => (
                      <div key={idx} className="terminal-row">
                        <span className="line-num">{idx + 1}</span>
                        <span 
                          className="line-code" 
                          dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                        ></span>
                      </div>
                    ))}
                    <span className="terminal-cursor">|</span>
                  </div>
                </div>
                <div className="mockup-row">
                  <div className={`mockup-card stat-box ${codeIndex >= codeSnippet.length - 20 ? 'active' : ''}`}>
                    <div className="stat-info-group">
                      <span className="stat-label">ERP Optimizer</span>
                    </div>
                    <span className="stat-val">
                      {codeIndex < 40 ? 'Connecting' : codeIndex < 120 ? 'Optimizing...' : '100%'}
                    </span>
                    <div className="stat-progress-bar">
                      <div 
                        className="stat-progress-fill" 
                        style={{ width: `${Math.min(100, Math.floor((codeIndex / codeSnippet.length) * 100))}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={`mockup-card stat-box ${codeIndex >= codeSnippet.length - 20 ? 'active' : ''}`}>
                    <div className="stat-info-group">
                      <span className="stat-label">Database Sync</span>
                      <span className={`stat-indicator-dot ${codeIndex >= codeSnippet.length - 20 ? 'green' : codeIndex >= 60 ? 'yellow' : ''}`}></span>
                    </div>
                    <span className="stat-val">
                      {codeIndex < 60 ? 'Offline' : codeIndex < 130 ? 'Syncing...' : 'Connected'}
                    </span>
                  </div>
                  <div className={`mockup-card stat-box ${codeIndex >= codeSnippet.length - 20 ? 'active' : ''}`}>
                    <div className="stat-info-group">
                      <span className="stat-label">Perf Boost</span>
                      <span className="stat-subtext">throughput</span>
                    </div>
                    <span className="stat-val">
                      {codeIndex < 100 ? '0%' : codeIndex < 140 ? '+18%' : '+42%'}
                    </span>
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

export default Hero;
