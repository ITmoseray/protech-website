import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="section-title">About <span className="text-gradient">Protech Assist</span></h2>
            <p className="about-text">
              From software development to computer hardware setup, Protech Assist SL Limited provides complete technology solutions that help businesses operate efficiently and grow digitally. We design and deliver custom software systems, mobile apps, secure databases, cybersecurity audits, and robust IT equipment environments.
            </p>
            <p className="about-text">
              Our mission is to empower organizations by transforming complex challenges into streamlined, intelligent digital platforms. We are committed to quality, scalability, and 24/7 technical support.
            </p>
            
            <div className="stats-grid">
              <div className="stat-item glass-panel">
                <span className="stat-number text-gradient">10+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item glass-panel">
                <span className="stat-number text-gradient">500+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item glass-panel">
                <span className="stat-number text-gradient">24/7</span>
                <span className="stat-label">Premium Support</span>
              </div>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="abstract-shape shape-main"></div>
            <div className="abstract-shape shape-secondary"></div>
            <div className="glass-panel about-card">
              <div className="card-icon">🎯</div>
              <h3>Committed to Quality</h3>
              <p>We build systems that are robust, secure, and designed to scale with your business.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
