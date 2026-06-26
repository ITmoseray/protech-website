import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './ProjectEstimator.css';

const ProjectEstimator = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('software');
  const [scale, setScale] = useState('small');
  const [features, setFeatures] = useState([]);
  const [webType, setWebType] = useState('corporate');
  
  const webSubTypes = [
    { id: 'corporate', icon: '🏢', name: 'Corporate Website', desc: 'Company profile, branding, and contact pages.' },
    { id: 'ecommerce', icon: '🛒', name: 'E-Commerce Store', desc: 'Product inventory, cart, and payment setups.' },
    { id: 'portal', icon: '🔑', name: 'User Portal / SaaS', desc: 'Secure logins, profiles, and custom databases.' },
    { id: 'landing', icon: '🎨', name: 'Landing Page / Portfolio', desc: 'Single high-impact layout for campaigns.' },
    { id: 'blog', icon: '📰', name: 'Blog & Content Hub', desc: 'CMS publishing system for articles.' }
  ];

  const projectTypeLabels = {
    software: 'Software Development',
    web: 'Web Application',
    erp: 'Inventory Enterprise OS',
    consulting: 'IT Consulting',
    mobile: 'Mobile App Development',
    ecommerce: 'E-Commerce Solutions',
    lms: 'Learning System (LMS)',
    cyber: 'Cybersecurity & Protection'
  };

  // Formspree submission
  const [formState, handleSubmit] = useForm('xlgyjbep');

  if (!isOpen) return null;

  const toggleFeature = (feat) => {
    if (features.includes(feat)) {
      setFeatures(features.filter(f => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  // Pricing calculations (Adapted for competitive Sierra Leone pricing, starting at $500)
  const basePrices = {
    software: 750,
    web: 500,
    erp: 1000,
    consulting: 500,
    mobile: 850,
    ecommerce: 650,
    lms: 650,
    cyber: 500
  };

  const scaleMultipliers = {
    small: 1.0,
    medium: 1.25,
    enterprise: 1.5
  };

  const featureCosts = {
    ai: 300,
    payment: 150,
    sms: 100,
    security: 200,
    backup: 250,
    roles: 150,
    barcode: 200,
    whatsapp: 300
  };

  const calculateEstimate = () => {
    let base = basePrices[projectType] || 0;
    if (projectType === 'web') {
      if (webType === 'ecommerce') base = 650;
      else if (webType === 'portal') base = 700;
      else base = 500; // corporate, landing, blog
    }
    const mult = scaleMultipliers[scale] || 1;
    const featCost = features.reduce((sum, f) => sum + (featureCosts[f] || 0), 0);
    const total = (base * mult) + featCost;
    
    return Math.round(total / 50) * 50; // Returns one clean cost rounded to nearest $50
  };

  const calculateTimeline = () => {
    if ((projectType === 'consulting' || projectType === 'cyber') && scale === 'small') {
      return '1 - 2 Weeks';
    }
    return '2 - 3 Weeks';
  };

  const cost = calculateEstimate();
  const timeline = calculateTimeline();

  const handleBack = () => setStep(prev => Math.max(1, prev - 1));
  const handleNext = () => setStep(prev => Math.min(4, prev + 1));

  return (
    <div className="estimator-overlay" onClick={onClose}>
      <div className="estimator-content glass-panel animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button className="estimator-close-btn" onClick={onClose}>✕</button>
        
        {/* Progress bar */}
        <div className="estimator-progress">
          <div className="estimator-progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        <div className="estimator-body">
          {step === 1 && (
            <div className="step-container">
              <span className="step-num">Step 1 of 4</span>
              <h3 className="step-title">What type of project are we building?</h3>
              <div className="options-grid">
                <button 
                  className={`option-btn ${projectType === 'software' ? 'active' : ''}`}
                  onClick={() => setProjectType('software')}
                >
                  <span className="option-icon">💻</span>
                  <div className="option-desc">
                    <h4>Software Development</h4>
                    <p>Custom business solutions and automated workflows.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'web' ? 'active' : ''}`}
                  onClick={() => setProjectType('web')}
                >
                  <span className="option-icon">🌐</span>
                  <div className="option-desc">
                    <h4>Web Applications</h4>
                    <p>Corporate sites, user portals, and web services.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'erp' ? 'active' : ''}`}
                  onClick={() => setProjectType('erp')}
                >
                  <span className="option-icon">📦</span>
                  <div className="option-desc">
                    <h4>Inventory Enterprise OS</h4>
                    <p>Multi-user billing, warehousing, and operational tools.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'consulting' ? 'active' : ''}`}
                  onClick={() => setProjectType('consulting')}
                >
                  <span className="option-icon">📈</span>
                  <div className="option-desc">
                    <h4>IT Consulting</h4>
                    <p>Systems audit, cyber security analysis, and scaling advice.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'mobile' ? 'active' : ''}`}
                  onClick={() => setProjectType('mobile')}
                >
                  <span className="option-icon">📱</span>
                  <div className="option-desc">
                    <h4>Mobile App Development</h4>
                    <p>Custom Android & iOS native and cross-platform apps.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'ecommerce' ? 'active' : ''}`}
                  onClick={() => setProjectType('ecommerce')}
                >
                  <span className="option-icon">🛒</span>
                  <div className="option-desc">
                    <h4>E-Commerce Solutions</h4>
                    <p>High-converting stores and local payment integrations.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'lms' ? 'active' : ''}`}
                  onClick={() => setProjectType('lms')}
                >
                  <span className="option-icon">🎓</span>
                  <div className="option-desc">
                    <h4>Learning Systems (LMS)</h4>
                    <p>Online classrooms and student management portals.</p>
                  </div>
                </button>
                <button 
                  className={`option-btn ${projectType === 'cyber' ? 'active' : ''}`}
                  onClick={() => setProjectType('cyber')}
                >
                  <span className="option-icon">🔐</span>
                  <div className="option-desc">
                    <h4>Cybersecurity & Protection</h4>
                    <p>Vulnerability audits, compliance, and backups.</p>
                  </div>
                </button>
              </div>
              {projectType === 'web' && (
                <div className="web-type-selector">
                  <h4 className="web-selector-title">🌐 Select Website Type:</h4>
                  <div className="web-options-grid">
                    {webSubTypes.map(sub => (
                      <button
                        key={sub.id}
                        className={`web-sub-btn ${webType === sub.id ? 'active' : ''}`}
                        onClick={() => setWebType(sub.id)}
                        type="button"
                      >
                        <span className="option-icon" style={{ fontSize: '1.25rem' }}>{sub.icon}</span>
                        <div className="option-desc">
                          <h4>{sub.name}</h4>
                          <p>{sub.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="step-container">
              <span className="step-num">Step 2 of 4</span>
              <h3 className="step-title">What is the scale of your business operations?</h3>
              <div className="options-list">
                <button 
                  className={`option-row-btn ${scale === 'small' ? 'active' : ''}`}
                  onClick={() => setScale('small')}
                >
                  <div className="option-row-radio"></div>
                  <div className="option-row-text">
                    <h4>Startup / Small Business</h4>
                    <p>Localized setup, single database instance, standard support.</p>
                  </div>
                </button>
                <button 
                  className={`option-row-btn ${scale === 'medium' ? 'active' : ''}`}
                  onClick={() => setScale('medium')}
                >
                  <div className="option-row-radio"></div>
                  <div className="option-row-text">
                    <h4>Growing Business / SME</h4>
                    <p>Multi-location integration, cloud scaling, priority SLA backup.</p>
                  </div>
                </button>
                <button 
                  className={`option-row-btn ${scale === 'enterprise' ? 'active' : ''}`}
                  onClick={() => setScale('enterprise')}
                >
                  <div className="option-row-radio"></div>
                  <div className="option-row-text">
                    <h4>Global Enterprise</h4>
                    <p>High availability clusters, strict security compliance, dedicated hosting.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-container">
              <span className="step-num">Step 3 of 4</span>
              <h3 className="step-title">Select premium integrations for your system:</h3>
              <div className="chips-grid">
                <button 
                  className={`chip-select-btn ${features.includes('ai') ? 'active' : ''}`}
                  onClick={() => toggleFeature('ai')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>🧠 AI Analytics & Forecasting</h4>
                    <p>Predict stock demand, customer trends, and generate auto-reports.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('payment') ? 'active' : ''}`}
                  onClick={() => toggleFeature('payment')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>💳 Payment Gateways</h4>
                    <p>Stripe integration, Orange Money API, card checkouts.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('sms') ? 'active' : ''}`}
                  onClick={() => toggleFeature('sms')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>✉️ SMS Sync & Alerts</h4>
                    <p>Send automated receipts, threshold alerts, and billing notifications.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('security') ? 'active' : ''}`}
                  onClick={() => toggleFeature('security')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>🛡️ Advanced Compliance Security</h4>
                    <p>2FA login integration, full action logging, and encrypted databases.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('backup') ? 'active' : ''}`}
                  onClick={() => toggleFeature('backup')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>☁️ Cloud Infrastructure Backup</h4>
                    <p>Automated backups, live database mirroring, and disaster recovery.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('roles') ? 'active' : ''}`}
                  onClick={() => toggleFeature('roles')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>👥 Multi-User Role Management</h4>
                    <p>Granular access permissions, audit logs, and security groups.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('barcode') ? 'active' : ''}`}
                  onClick={() => toggleFeature('barcode')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>🏷️ Custom Barcode & POS Setup</h4>
                    <p>Configure scanner devices, receipt printers, and label generation.</p>
                  </div>
                </button>
                <button 
                  className={`chip-select-btn ${features.includes('whatsapp') ? 'active' : ''}`}
                  onClick={() => toggleFeature('whatsapp')}
                >
                  <span className="chip-indicator">✓</span>
                  <div className="chip-text">
                    <h4>💬 WhatsApp API Integration</h4>
                    <p>Automated chat notifications, status alerts, and support routing.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="step-container">
              <span className="step-num">Step 4 of 4</span>
              <h3 className="step-title">Your Estimated Budget & Timeline</h3>
              
              <div className="estimate-result-card glass-panel">
                <div className="result-metric">
                  <span className="metric-label">Estimated Cost</span>
                  <span className="metric-value text-gradient">${cost.toLocaleString()}</span>
                  <span className="metric-subvalue">SLE {(cost * 23).toLocaleString()}</span>
                </div>
                <div className="result-separator"></div>
                <div className="result-metric">
                  <span className="metric-label">Delivery Timeline</span>
                  <span className="metric-value">{timeline}</span>
                </div>
              </div>

              <div className="estimator-summary-text">
                Configured: <strong>{projectType === 'web' ? `Web App (${webSubTypes.find(w => w.id === webType)?.name})` : (projectTypeLabels[projectType] || projectType)}</strong> ({scale} scale){features.length > 0 ? ` with ${features.length} premium integrations` : ''}
              </div>

              {formState.succeeded ? (
                <div className="success-message text-center" style={{ padding: '2rem 0', color: '#10B981' }}>
                  ✓ Estimate Request Submitted! We will contact you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="estimator-lead-form">
                  <input type="hidden" name="Project Type" value={projectType === 'web' ? `Web Application (${webSubTypes.find(w => w.id === webType)?.name || webType})` : (projectTypeLabels[projectType] || projectType)} />
                  <input type="hidden" name="Scale" value={scale} />
                  <input type="hidden" name="Integrations" value={features.join(', ')} />
                  <input type="hidden" name="Estimated Cost (USD)" value={`$${cost.toLocaleString()}`} />
                  <input type="hidden" name="Estimated Cost (SLE)" value={`SLE ${(cost * 23).toLocaleString()}`} />
                  <input type="hidden" name="Timeline" value={timeline} />

                  <div className="form-row">
                    <div className="form-col">
                      <label htmlFor="est-name">Full Name</label>
                      <input type="text" id="est-name" name="name" required placeholder="John Doe" />
                      <ValidationError prefix="Name" field="name" errors={formState.errors} />
                    </div>
                    <div className="form-col">
                      <label htmlFor="est-email">Email Address</label>
                      <input type="email" id="est-email" name="email" required placeholder="john@company.com" />
                      <ValidationError prefix="Email" field="email" errors={formState.errors} />
                    </div>
                  </div>

                  <div className="form-row" style={{ marginTop: '0.75rem' }}>
                    <div className="form-col" style={{ flex: 1 }}>
                      <label htmlFor="est-phone">Phone Number</label>
                      <input type="tel" id="est-phone" name="phone" required placeholder="+232 34 955581" />
                      <ValidationError prefix="Phone" field="phone" errors={formState.errors} />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '1.25rem' }}
                    disabled={formState.submitting}
                  >
                    {formState.submitting ? 'Submitting Details...' : 'Request Consultation with this Estimate'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="estimator-footer">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={handleBack}>
              ← Back
            </button>
          )}
          <div style={{ flexGrow: 1 }}></div>
          {step < 4 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next Step →
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectEstimator;
