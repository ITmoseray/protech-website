import React, { useState, useEffect } from 'react';
import './Services.css';

const services = [
  {
    title: 'Mobile Application Development',
    description: 'We design and develop powerful mobile applications that help businesses connect with customers, automate processes, and provide digital services.',
    icon: '📱',
    features: ['Android applications', 'iOS applications', 'Business mobile apps', 'Customer service apps', 'Mobile business platforms']
  },
  {
    title: 'Enterprise Resource Planning (ERP) Systems',
    description: 'We build complete business management systems that connect different departments and improve productivity.',
    icon: '🏢',
    features: ['Accounting systems', 'HR management systems', 'Sales management systems', 'Procurement systems', 'Business dashboards']
  },
  {
    title: 'E-Commerce Solutions',
    description: 'We create online shopping platforms that help businesses sell products and manage digital commerce.',
    icon: '🛒',
    features: ['Online stores', 'Payment integration', 'Product management', 'Customer accounts', 'Order management systems']
  },
  {
    title: 'Learning Management Systems (LMS)',
    description: 'Technology solutions for schools, training centers, and organizations.',
    icon: '🎓',
    features: ['Online learning platforms', 'Student management systems', 'Course management', 'Digital classrooms', 'Training portals']
  },
  {
    title: 'Custom Industry Solutions',
    description: 'We develop software solutions tailored for different industries.',
    icon: '🏥',
    features: ['School management systems', 'Healthcare systems', 'Financial systems', 'Retail solutions', 'Organization management platforms']
  },
  {
    title: 'Cloud Hosting & Deployment',
    description: 'Helping businesses move their systems online with reliable cloud technology.',
    icon: '☁️',
    features: ['Cloud application deployment', 'Server setup', 'System monitoring', 'Backup solutions', 'Online infrastructure management']
  },
  {
    title: 'Cybersecurity & Data Protection',
    description: 'Protecting business systems, applications, and important information.',
    icon: '🔐',
    features: ['Security assessment', 'User access control', 'Data protection', 'System security improvements', 'Backup strategies']
  },
  {
    title: 'Network & IT Infrastructure',
    description: 'Building reliable technology infrastructure for businesses.',
    icon: '🌐',
    features: ['Office network setup', 'Server configuration', 'Internet infrastructure', 'Hardware setup', 'IT maintenance']
  },
  {
    title: 'Business Automation',
    description: 'Helping businesses reduce manual work through smart automation.',
    icon: '⚙️',
    features: ['Workflow automation', 'Automated reports', 'Digital processes', 'Customer communication systems', 'Business integrations']
  },
  {
    title: 'UI/UX Design & Branding',
    description: 'Creating digital experiences that are professional and easy to use.',
    icon: '🎨',
    features: ['User interface design', 'User experience improvement', 'Product design', 'Digital branding', 'Design systems']
  },
  {
    title: 'Data Analytics & Business Intelligence',
    description: 'Turning business data into useful decisions.',
    icon: '📊',
    features: ['Data dashboards', 'Performance reports', 'Business insights', 'Data visualization', 'Decision-support systems']
  },
  {
    title: 'Software Maintenance & Support',
    description: 'Keeping business systems updated, secure, and running efficiently.',
    icon: '🧑‍💻',
    features: ['System updates', 'Bug fixing', 'Performance optimization', 'Technical support', 'Long-term maintenance']
  },
  {
    title: 'Computer Hardware & IT Support',
    description: 'Protech Assist SL Limited provides complete computer hardware solutions, installation, configuration, and technical support for businesses and individuals.',
    icon: '🖥️',
    features: ['Computer setup and installation', 'OS installation (Windows, Linux)', 'Troubleshooting and repair', 'Hardware upgrades (RAM, SSD)', 'Data backup & recovery']
  },
  {
    title: 'Business IT Equipment Setup',
    description: 'We help organizations build reliable technology environments with workstation deployment and configuration.',
    icon: '🏢',
    features: ['Computer deployment for offices', 'Employee workstation setup', 'Network and device configuration', 'Software licensing support', 'Business tech maintenance']
  },
  {
    title: 'Hardware & Software Integration',
    description: 'Connecting hardware and software solutions to improve business operations and billing workflows.',
    icon: '🔧',
    features: ['POS hardware setup', 'Inventory system device setup', 'Barcode scanner installation', 'Receipt printer configuration', 'Business system integration']
  }
];

const Services = ({ openSandbox }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  useEffect(() => {
    const handleHighlight = (e) => {
      const serviceTitle = e.detail;
      const index = services.findIndex(s => s.title.toLowerCase().includes(serviceTitle.toLowerCase()));
      if (index !== -1) {
        setHighlightedIndex(index);
        const timer = setTimeout(() => {
          setHighlightedIndex(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    window.addEventListener('highlight-service', handleHighlight);
    return () => window.removeEventListener('highlight-service', handleHighlight);
  }, []);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our <span className="text-gradient">Services</span></h2>
          <p className="section-subtitle">
            Comprehensive technology solutions designed to scale your business and streamline your operations.
          </p>
        </div>
        
        <div className="grid grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`service-card glass-panel ${highlightedIndex === index ? 'highlighted' : ''}`}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <ul className="service-features" style={{ marginBottom: '1.5rem' }}>
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <span className="check">✓</span> {feature}
                  </li>
                ))}
              </ul>
              {service.title === 'Enterprise Resource Planning (ERP) Systems' ? (
                <button 
                  className="btn btn-secondary btn-small" 
                  style={{ marginTop: 'auto', width: '100%', fontSize: '0.85rem' }} 
                  onClick={openSandbox}
                >
                  ⚡ Try Live Demo
                </button>
              ) : (
                <button 
                  className="btn btn-secondary btn-small" 
                  style={{ marginTop: 'auto', width: '100%', fontSize: '0.85rem' }} 
                  onClick={() => document.getElementById('contact').scrollIntoView()}
                >
                  Inquire Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
