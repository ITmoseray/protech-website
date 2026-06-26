import React, { useState, useEffect, useRef } from 'react';
import './AITech.css';

const chatOptions = [
  { 
    label: '💡 Services', 
    reply: 'At Protech Assist SL Limited, we offer 15 comprehensive services: 📱 Mobile Apps, 🏢 ERP Systems, 🛒 E-Commerce, 🎓 Learning (LMS), 🏥 Industry Solutions, ☁️ Cloud Hosting, 🔐 Cybersecurity, 🌐 Network IT, ⚙️ Automation, 🎨 UI/UX, 📊 Data Analytics, 🧑‍💻 24/7 Support, 🖥️ Computer Hardware, 🏢 Office Setup, and 🔧 POS Device Integration. Type any service name in the chat box to learn more!' 
  },
  { 
    label: '📍 Location', 
    reply: 'Our main headquarters is located at 7D Old Railway Line, Tengbeh Town, Freetown, Sierra Leone. Our Freetown-based engineering team is fully available to support your systems!' 
  },
  { 
    label: '📞 Contact Us', 
    reply: 'You can call us at +232 34 955581 / +232 73 019699, or email protechassist36@gmail.com. We provide 24/7 Premium Support to keep your business running smoothly!' 
  },
  {
    label: '🛠️ Tech Stack',
    reply: 'We build high-performance platforms using: React, Vite, Node.js, Express, PostgreSQL, MongoDB, Redis, D3.js/Recharts, and AWS. We focus on scalable, secure, and modern architectures.'
  },
  {
    label: '💼 Portfolio',
    reply: 'Some of our recent successes include a custom Enterprise ERP System, a Global E-Commerce Platform, and a Financial Analytics Dashboard. Check out the details in our Portfolio section!'
  },
  {
    label: '💰 Project Cost',
    reply: 'Project budgets vary by features. You can get an instant custom breakdown using our Interactive Project Cost Estimator modal by clicking the "Request a Demo" button or in the footer menu!'
  },
  {
    label: '📋 Request a Demo',
    reply: 'To request a demo, click the "Request a Demo" button in the header or Hero section, or press the Right Arrow Key (→) on your keyboard! To jump straight to me (the AI Assistant), press the Left Arrow Key (←) anytime. Press Escape to close any open modal.'
  },
  {
    label: '⌨️ Keyboard Shortcuts',
    reply: 'Here are the quick keyboard shortcuts for this page:\n→ Right Arrow — Opens the Project Cost Estimator\n← Left Arrow — Scrolls to the AI Assistant (this chat)\nEsc — Closes any open modal\nThese shortcuts are disabled while you are typing in any input field.'
  }
];

const getBotResponse = (query) => {
  const cleanQuery = query.toLowerCase().trim();
  
  if (cleanQuery.includes('location') || cleanQuery.includes('where') || cleanQuery.includes('address') || cleanQuery.includes('office') || cleanQuery.includes('place') || cleanQuery.includes('freetown') || cleanQuery.includes('tengbeh')) {
    return '📍 Protech Assist SL Limited is headquartered at 7D Old Railway Line, Tengbeh Town, Freetown, Sierra Leone. Our local engineering team is ready to assist you on-site!';
  }
  
  if (cleanQuery.includes('contact') || cleanQuery.includes('phone') || cleanQuery.includes('call') || cleanQuery.includes('email') || cleanQuery.includes('number') || cleanQuery.includes('reach') || cleanQuery.includes('get in touch') || cleanQuery.includes('mail') || cleanQuery.includes('whatsapp') || cleanQuery.includes('chat')) {
    return '📞 You can call us at +232 34 955581 / +232 73 019699, chat with us on WhatsApp at +232 34 955581, or email us at protechassist36@gmail.com. We provide 24/7 premium support to keep client systems running smoothly!';
  }
  
  if (cleanQuery.includes('mobile') || cleanQuery.includes('app') || cleanQuery.includes('ios') || cleanQuery.includes('android') || cleanQuery.includes('phone')) {
    return '📱 Mobile Application Development: We design and develop powerful mobile applications (Android & iOS), custom business mobile apps, customer service apps, and mobile business platforms.';
  }
  
  if (cleanQuery.includes('erp') || cleanQuery.includes('accounting') || cleanQuery.includes('hr') || cleanQuery.includes('payroll') || cleanQuery.includes('inventory') || cleanQuery.includes('stock') || cleanQuery.includes('pos')) {
    return '🏢 Enterprise Resource Planning (ERP) Systems: We build complete business management systems including accounting systems, HR management systems, sales management systems, procurement systems, and business dashboards.';
  }
  
  if (cleanQuery.includes('e-commerce') || cleanQuery.includes('ecommerce') || cleanQuery.includes('online store') || cleanQuery.includes('shopping') || cleanQuery.includes('sell') || cleanQuery.includes('payment')) {
    return '🛒 E-Commerce Solutions: We create online shopping platforms featuring product management, customer accounts, order management systems, and secure payment integrations.';
  }
  
  if (cleanQuery.includes('lms') || cleanQuery.includes('school') || cleanQuery.includes('learning') || cleanQuery.includes('student') || cleanQuery.includes('class') || cleanQuery.includes('course') || cleanQuery.includes('education')) {
    return '🎓 Learning Management Systems (LMS): Technology solutions for schools, training centers, and organizations including student management, course portals, and digital classrooms.';
  }
  
  if (cleanQuery.includes('custom') || cleanQuery.includes('healthcare') || cleanQuery.includes('financial') || cleanQuery.includes('retail') || cleanQuery.includes('industry')) {
    return '🏥 Custom Industry Solutions: We develop software solutions tailored for different industries, including school management, healthcare, financial platforms, and retail operations.';
  }
  
  if (cleanQuery.includes('cloud') || cleanQuery.includes('host') || cleanQuery.includes('server') || cleanQuery.includes('deploy') || cleanQuery.includes('infrastructure')) {
    return '☁️ Cloud Hosting & Deployment: Helping businesses move online with cloud application deployment, server setup, continuous system monitoring, backups, and infrastructure management.';
  }
  
  if (cleanQuery.includes('cyber') || cleanQuery.includes('security') || cleanQuery.includes('protect') || cleanQuery.includes('data protection') || cleanQuery.includes('backup')) {
    return '🔐 Cybersecurity & Data Protection: Protecting business systems and information through security assessments, user access control, data protection, and backup strategies.';
  }
  
  if (cleanQuery.includes('network') || cleanQuery.includes('internet') || cleanQuery.includes('wifi')) {
    return '🌐 Network & IT Infrastructure: Office network setup, server configuration, internet setup, hardware provisioning, and long-term IT maintenance.';
  }
  
  if (cleanQuery.includes('automate') || cleanQuery.includes('automation') || cleanQuery.includes('workflow') || cleanQuery.includes('process')) {
    return '⚙️ Business Automation: Helping businesses reduce manual work through workflow automation, automated reports, digital processes, and business integrations.';
  }
  
  if (cleanQuery.includes('design') || cleanQuery.includes('ui') || cleanQuery.includes('ux') || cleanQuery.includes('brand') || cleanQuery.includes('logo')) {
    return '🎨 UI/UX Design & Branding: Creating digital experiences that are professional and easy to use, including UI design, UX improvement, product design, branding, and design systems.';
  }
  
  if (cleanQuery.includes('analytics') || cleanQuery.includes('data') || cleanQuery.includes('bi') || cleanQuery.includes('dashboard') || cleanQuery.includes('chart')) {
    return '📊 Data Analytics & BI: Turning business data into decisions using interactive data dashboards, performance reports, data visualizations, and decision-support systems.';
  }
  
  if (cleanQuery.includes('maintain') || cleanQuery.includes('support') || cleanQuery.includes('bug') || cleanQuery.includes('fix') || cleanQuery.includes('update')) {
    return '🧑‍💻 Software Maintenance & Support: Keeping business systems updated, secure, and running efficiently with bug fixing, optimizations, and technical support.';
  }

  if (cleanQuery.includes('hardware') || cleanQuery.includes('computer') || cleanQuery.includes('repair') || cleanQuery.includes('desktop') || cleanQuery.includes('laptop') || cleanQuery.includes('printer') || cleanQuery.includes('diagnostics')) {
    return '🖥️ Computer Hardware & IT Support: We provide complete computer hardware setup, installation, troubleshooting, repairs, hardware upgrades (RAM/SSD), printer setup, and data backup/recovery.';
  }

  if (cleanQuery.includes('workstation') || cleanQuery.includes('equipment') || cleanQuery.includes('office computer') || cleanQuery.includes('licensing')) {
    return '🏢 Business IT Equipment Setup: We help organizations build reliable tech environments with computer deployments, workstation setups, software licensing, and network device configuration.';
  }

  if (cleanQuery.includes('scanner') || cleanQuery.includes('barcode') || cleanQuery.includes('receipt') || cleanQuery.includes('integration') || cleanQuery.includes('pos hardware')) {
    return '🔧 Hardware & Software Integration: We connect your software systems to local devices. This includes POS hardware setup, inventory scanner installations, receipt printers, and custom system integrations.';
  }
  
  if (cleanQuery.includes('tech') || cleanQuery.includes('stack') || cleanQuery.includes('framework') || cleanQuery.includes('language') || cleanQuery.includes('react') || cleanQuery.includes('node') || cleanQuery.includes('postgresql') || cleanQuery.includes('mongodb') || cleanQuery.includes('database')) {
    return '⚡ Our primary tech stack includes React, Vite, Node.js, Express, PostgreSQL, MongoDB, Redis, and AWS. We use modern, scalable technologies to build secure, robust platforms.';
  }
  
  if (cleanQuery.includes('price') || cleanQuery.includes('cost') || cleanQuery.includes('quote') || cleanQuery.includes('estimate') || cleanQuery.includes('how much') || cleanQuery.includes('fee')) {
    return '💰 Project pricing is flexible and based on scope. You can try our Interactive Project Cost Estimator modal by clicking the "Request a Demo" button or in the footer menu to get an instant breakdown!';
  }

  if (cleanQuery.includes('demo') || cleanQuery.includes('try') || cleanQuery.includes('playground') || cleanQuery.includes('estimator') || cleanQuery.includes('request')) {
    return '📋 To request a demo, click the "Request a Demo" button in the header or Hero section, or press the Right Arrow Key (→) on your keyboard! To jump to the AI Assistant, press the Left Arrow Key (←). Press Escape to close any open modal.';
  }

  if (cleanQuery.includes('shortcut') || cleanQuery.includes('keyboard') || cleanQuery.includes('key') || cleanQuery.includes('hotkey') || cleanQuery.includes('arrow')) {
    return '⌨️ Keyboard Shortcuts available on this page: → Right Arrow = Opens the Project Cost Estimator | ← Left Arrow = Scrolls to & focuses the AI Assistant chat | Esc = Closes any open modal. These shortcuts are disabled while typing in any input field.';
  }
  
  if (cleanQuery.includes('about') || cleanQuery.includes('who are') || cleanQuery.includes('experience') || cleanQuery.includes('years') || cleanQuery.includes('delivered') || cleanQuery.includes('mission') || cleanQuery.includes('history') || cleanQuery.includes('tagline') || cleanQuery.includes('statement')) {
    return '🎯 From software development to computer hardware setup, Protech Assist SL Limited provides complete technology solutions that help businesses operate efficiently and grow digitally. We have 10+ years of experience and 500+ delivered projects.';
  }
  
  if (cleanQuery.includes('project') || cleanQuery.includes('portfolio') || cleanQuery.includes('work') || cleanQuery.includes('case study') || cleanQuery.includes('done') || cleanQuery.includes('show')) {
    return '💼 Some of our key projects include a custom Enterprise ERP System, a Global E-Commerce Platform, and a Financial Analytics Dashboard. Check out the details in our Portfolio section!';
  }
  
  if (cleanQuery.includes('support') || cleanQuery.includes('help') || cleanQuery.includes('service') || cleanQuery.includes('consulting') || cleanQuery.includes('audit') || cleanQuery.includes('security')) {
    return '🛡️ We offer complete IT solutions including Software Dev, Mobile Apps, ERP Systems, E-Commerce, LMS, Cloud Hosting, Cybersecurity, IT Infrastructure, Automation, UI/UX, Data Analytics, Computer Hardware setup, Office configurations, and POS Hardware Integration.';
  }
  
  if (cleanQuery.includes('hi') || cleanQuery.includes('hello') || cleanQuery.includes('hey') || cleanQuery.includes('greetings')) {
    return '👋 Hello! I am the Protech AI Assistant. I can tell you about our Freetown offices, our 15 core tech services, tech stack, portfolio, and pricing. What can I help you with?';
  }
  
  return '🤖 I am here to help you with anything related to Protech Assist! Feel free to ask about our location in Freetown, contact phone/email, any of our 15 services (e.g. mobile development, hardware support, ERP, cybersecurity, LMS), our tech stack, or portfolio.';
};

const AITech = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'assistant', 
      text: 'Hello! I am your Protech Assistant. Ask me anything about our Freetown offices, our 15 core services, tech stack, portfolio, and contact details, or select a prompt below.' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option) => {
    if (isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: option.label }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let currentLength = 0;
      setMessages(prev => [...prev, { sender: 'assistant', text: '' }]);

      const speed = Math.max(8, Math.floor(1000 / option.reply.length));
      const interval = setInterval(() => {
        currentLength++;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'assistant', text: option.reply.slice(0, currentLength) };
          return updated;
        });

        if (currentLength >= option.reply.length) {
          clearInterval(interval);
        }
      }, speed);
    }, 800);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userText = inputText;
    setInputText('');

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotResponse(userText);
      let currentLength = 0;
      setMessages(prev => [...prev, { sender: 'assistant', text: '' }]);

      const speed = Math.max(8, Math.floor(1000 / reply.length));
      const interval = setInterval(() => {
        currentLength++;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: 'assistant', text: reply.slice(0, currentLength) };
          return updated;
        });

        if (currentLength >= reply.length) {
          clearInterval(interval);
        }
      }, speed);
    }, 800);
  };

  return (
    <section id="ai-assistant" className="section ai-section">
      <div className="container">
        <div className="ai-grid">
          <div className="ai-visual">
            <div className="brain-container">
              <div className="brain-core"></div>
              <div className="neural-path path-1"></div>
              <div className="neural-path path-2"></div>
              <div className="neural-path path-3"></div>
            </div>
            
            <div className="ai-chat-window glass-panel animate-float">
              <div className="chat-header">
                <div className="chat-header-info">
                  <span className="chat-status-dot"></span>
                  <span className="chat-title">Protech AI Assistant</span>
                </div>
                <span className="chat-model-badge">Knowledge base v1.0</span>
              </div>
              <div className="chat-body" ref={chatBodyRef}>
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.sender}`}>
                    <div className="message-bubble">{msg.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-message assistant typing">
                    <div className="message-bubble">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  </div>
                )}
              </div>
              <div className="chat-footer">
                <div className="chat-chips-container">
                  {chatOptions.map((opt, index) => (
                    <button 
                      key={index} 
                      className={`chat-chip-btn ${isTyping ? 'disabled' : ''}`}
                      onClick={() => handleOptionClick(opt)}
                      disabled={isTyping}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                
                <form className="chat-input-container" onSubmit={handleSendMessage}>
                  <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="Ask about Protech (e.g. location, email)..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isTyping}
                  />
                  <button type="submit" className="chat-send-btn" disabled={isTyping || !inputText.trim()}>
                    ➤
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="ai-content">
            <h2 className="section-title">Get to Know <span className="text-gradient">Protech Assist</span></h2>
            <p className="ai-description">
              Interact with our custom AI assistant to explore our IT capabilities, review our technology stack, check our Freetown location, or get in touch with our team instantly.
            </p>
            
            <ul className="ai-features-list">
              <li>
                <div className="feature-icon">📍</div>
                <div className="feature-text">
                  <h4>Freetown Presence</h4>
                  <p>Based at Old Railway Line, Tengbeh Town, ready to deploy systems and provide local on-site support.</p>
                </div>
              </li>
              <li>
                <div className="feature-icon">💻</div>
                <div className="feature-text">
                  <h4>Custom Software & Web</h4>
                  <p>We build everything from custom enterprise ERP systems to high-performance e-commerce websites.</p>
                </div>
              </li>
              <li>
                <div className="feature-icon">🛠️</div>
                <div className="feature-text">
                  <h4>Modern Tech Stack</h4>
                  <p>Harnessing React, Node.js, PostgreSQL, MongoDB, and AWS to develop secure, scalable products.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITech;
