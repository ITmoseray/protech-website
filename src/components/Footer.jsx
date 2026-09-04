import React, { useState } from 'react';
import './Footer.css';

const getInventoryLink = () => {
  return 'https://inventory-web--protech-website-38a37.us-east4.hosted.app/';
};

const Footer = () => {
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  const handleServiceClick = (e, serviceTitle) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const event = new CustomEvent('highlight-service', { detail: serviceTitle });
      window.dispatchEvent(event);
    }, 100);
  };

  const openLegalModal = (e, type) => {
    e.preventDefault();
    setLegalModal(type);
    document.body.style.overflow = 'hidden';
  };

  const closeLegalModal = () => {
    setLegalModal(null);
    document.body.style.overflow = '';
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-wrapper">
                <img src="/logo.jpeg" alt="Protech Assist Logo" className="logo-image" />
                <div className="football-scene">
                  <img src="/real-ball.png" alt="Football" className="real-soccer-ball" />
                </div>
              </div>
              <span className="logo-text">Protech <span className="text-gradient">Assist</span></span>
            </div>
            <p className="footer-desc">
              Empowering businesses through smart technology, innovative software, and strategic digital transformation.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">IN</a>
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><a href="#" onClick={(e) => handleServiceClick(e, 'Software Development')}>Software Development</a></li>
              <li><a href="#" onClick={(e) => handleServiceClick(e, 'Website')}>Web Applications</a></li>
              <li><a href={getInventoryLink()} target="_blank" rel="noopener noreferrer">Inventory Enterprise OS ↗</a></li>
              <li><a href="#" onClick={(e) => handleServiceClick(e, 'Consulting')}>IT Consulting</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="#" onClick={(e) => openLegalModal(e, 'privacy')}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => openLegalModal(e, 'terms')}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Protech Assist SL Limited. All rights reserved.</p>
        </div>
      </div>

      {legalModal && (
        <div className="legal-modal-overlay" onClick={closeLegalModal}>
          <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="legal-close-btn" onClick={closeLegalModal}>✕</button>
            <div className="legal-body">
              {legalModal === 'privacy' ? (
                <>
                  <h3 className="legal-title">Privacy Policy</h3>
                  <p className="legal-date">Last Updated: June 25, 2026</p>
                  <div className="legal-text-content">
                    <p>At Protech Assist SL Limited, we value and respect your privacy. This policy outlines how we collect, store, and process your data.</p>
                    
                    <h4>1. Information Collection</h4>
                    <p>We collect information you provide directly through our contact form, including your name, email address, phone number, and message content.</p>
                    
                    <h4>2. Use of Information</h4>
                    <p>Your details are used solely to contact you regarding your requests, answer inquiries, and provide professional support or demos for our products.</p>
                    
                    <h4>3. Data Security</h4>
                    <p>We apply robust technical and organizational measures to prevent unauthorized access, alterations, or disclosures of your personal data.</p>
                    
                    <h4>4. Third-Party Sharing</h4>
                    <p>We do not sell, trade, or share your personally identifiable information with outside parties, except for essential service delivery partners bound by confidentiality agreements.</p>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="legal-title">Terms of Service</h3>
                  <p className="legal-date">Last Updated: June 25, 2026</p>
                  <div className="legal-text-content">
                    <p>Welcome to Protech Assist. By browsing this website and using our systems, you agree to comply with and be bound by the following terms.</p>
                    
                    <h4>1. Intellectual Property</h4>
                    <p>All content, designs, branding, and custom software code created by Protech Assist SL Limited are our exclusive property unless specified otherwise by client contracts.</p>
                    
                    <h4>2. Acceptable Use</h4>
                    <p>You agree to use our site and services only for legitimate business inquiries and lawful purposes. Any attempts to disrupt our services or compromise database security are strictly prohibited.</p>
                    
                    <h4>3. Service Provision</h4>
                    <p>While we strive to maintain 100% availability of our SaaS and custom ERP products, we do not guarantee uninterrupted system operations. Maintenance and upgrades will be scheduled with advance user notification.</p>
                    
                    <h4>4. Limitation of Liability</h4>
                    <p>Protech Assist shall not be liable for any direct or indirect losses, business interruptions, or data losses resulting from the use or inability to use our systems.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
