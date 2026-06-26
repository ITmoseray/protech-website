import React from 'react';
import './WhyUs.css';

const highlights = [
  {
    title: 'Innovative Solutions',
    description: 'We leverage the latest technologies to build forward-thinking systems.',
    icon: '💡'
  },
  {
    title: 'Reliable Technology',
    description: 'Our robust architectures ensure high availability and optimal performance.',
    icon: '🛡️'
  },
  {
    title: 'Business-Focused Systems',
    description: 'Every solution is designed with your bottom-line growth in mind.',
    icon: '📈'
  },
  {
    title: 'Professional Support',
    description: 'Dedicated assistance and maintenance to keep your systems running smoothly.',
    icon: '🤝'
  }
];

const WhyUs = () => {
  return (
    <section className="section why-us-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose <span className="text-gradient">Us</span></h2>
          <p className="section-subtitle">
            Partner with a team that prioritizes your success through technological excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-4">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-card glass-panel">
              <div className="highlight-icon">{item.icon}</div>
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
