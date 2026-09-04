import React, { useState, useEffect } from 'react';
import './Header.css';

const getInventoryLink = () => {
  return 'https://inventory-web--protech-website-38a37.us-east4.hosted.app/';
};

const Header = ({ openEstimator }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile nav when user taps anywhere outside the header
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.header')) {
        setMobileMenuOpen(false);
      }
    };
    // Small delay so the toggle click doesn't immediately re-close
    const timer = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo">
          <div className="logo-wrapper">
            <img src="/logo.jpeg" alt="Protech Assist Logo" className="logo-image" />
          </div>
          <span className="logo-text">Protech <span className="text-gradient">Assist</span></span>
        </a>
        
        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
          <a href={getInventoryLink()} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>Inventory Enterprise OS ↗</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button className="btn btn-primary mobile-nav-btn" onClick={() => {
            openEstimator();
            setMobileMenuOpen(false);
          }}>Request a Demo</button>
        </nav>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => {
            openEstimator();
            setMobileMenuOpen(false);
          }}>Request a Demo</button>
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
