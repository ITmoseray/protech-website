import React, { useState } from 'react';
import './Portfolio.css';

const getInventoryLink = () => {
  return 'https://inventory-web--protech-website-38a37.us-east4.hosted.app/';
};
import image1 from '../1.png';
import imageERP from '../erp_dashboard.png';
import imageFinance from '../financial_analytics.png';

const portfolioItems = [
  {
    category: 'Business Applications',
    title: 'Enterprise ERP System',
    image: imageERP,
    description: 'A comprehensive, custom-built ERP system designed to centralize and automate business operations. It integrates inventory management, sales processing, HR payroll, and real-time financial analytics in a single secure platform.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    features: ['Real-time stock level synchronization', 'Automated purchase ordering', 'Multi-user roles and permissions', 'Financial ledger and report generation'],
    liveUrl: 'https://inventory-web--protech-website-38a37.us-east4.hosted.app/',
    liveUrlText: 'Launch Inventory Enterprise OS'
  },
  {
    category: 'Websites',
    title: 'Global E-Commerce Platform',
    image: image1,
    description: 'A premium, highly-scalable multi-vendor e-commerce platform. Optimized for lightning-fast loads, localized currencies, secure payment gateways, and a customized, admin dashboard for order tracking.',
    tech: ['React / Vite', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
    features: ['Responsive mobile-first design', 'Full checkout flow with Stripe integration', 'Admin inventory and order dashboard', 'Advanced search and category filtering']
  },
  {
    category: 'Digital Platforms',
    title: 'Financial Analytics Dashboard',
    image: imageFinance,
    description: 'A state-of-the-art financial analysis dashboard offering deep insights into portfolios and transactions. Uses custom chart integrations to present complex datasets in an intuitive, interactive layout.',
    tech: ['React', 'D3.js / Recharts', 'Express', 'MongoDB', 'JWT Auth'],
    features: ['Interactive multi-line performance charts', 'Automatic weekly CSV and PDF report generation', 'Real-time database updates via WebSockets', 'Strict data encryption standards']
  }
];

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);

  const openProject = (project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setActiveProject(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our <span className="text-gradient">Portfolio</span></h2>
          <p className="section-subtitle">
            A showcase of our recent projects, highlighting our expertise across different domains.
          </p>
        </div>
        
        <div className="grid grid-cols-3">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-card glass-panel">
              <div className="portfolio-image" style={{backgroundImage: `url(${item.image})`}}>
                <div className="portfolio-overlay">
                  <button className="btn btn-secondary btn-small" onClick={() => openProject(item)}>
                    View Project
                  </button>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-category">{item.category}</span>
                <h3 className="portfolio-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="portfolio-modal-overlay" onClick={closeProject}>
          <div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProject}>✕</button>
            <div className="modal-image" style={{backgroundImage: `url(${activeProject.image})`}}></div>
            <div className="modal-body">
              <span className="modal-category">{activeProject.category}</span>
              <h3 className="modal-title">{activeProject.title}</h3>
              <p className="modal-description">{activeProject.description}</p>
              
              <h4 className="modal-section-title">Technologies Used</h4>
              <div className="modal-tech-tags">
                {activeProject.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>
              
              <h4 className="modal-section-title">Key Features</h4>
              <ul className="modal-features-list">
                {activeProject.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>

              {activeProject.liveUrl && (
                <div style={{ marginTop: '2rem' }}>
                  <a 
                    href={activeProject.liveUrl === 'https://inventory-web--protech-website-38a37.us-east4.hosted.app/' ? getInventoryLink() : activeProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-flex', gap: '0.5rem' }}
                  >
                    🌐 {activeProject.liveUrlText || 'Launch Live Application'} ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
