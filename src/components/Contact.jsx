import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const [state, handleSubmit] = useForm('xlgyjbep');

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>
          <p className="section-subtitle">Ready to transform your business? Contact our team of experts today via email or WhatsApp.</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info glass-panel">
            <h3>Contact Information</h3>
            <p className="contact-description">Fill out the form, send an email, or chat with us on WhatsApp. We get back to you within 24 hours.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Location</h4>
                  <p>7D Old Railway Line, Tengbeh Town</p>
                  <p>Freetown, Sierra Leone</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+232 34 955581</p>
                  <p>+232 73 019699</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:protechassist36@gmail.com" className="contact-link">protechassist36@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon" style={{ color: '#25D366' }}>💬</div>
                <div>
                  <h4>WhatsApp</h4>
                  <p><a href="https://wa.me/23273019699" target="_blank" rel="noopener noreferrer" className="whatsapp-link">+232 34 955581</a></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container glass-panel">
            {state.succeeded ? (
              <div className="success-message" style={{ textAlign: 'center', padding: '3rem 0', color: '#10B981' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
                <h3>Message Sent Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" required />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="john@company.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="How can we help you?" required />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." required></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={state.submitting}>
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
