import React, { useState, useEffect, useRef } from 'react';
import './FloatingChat.css';

const chatOptions = [
  { label: '💡 Services',      reply: 'At Protech Assist SL Limited, we offer 15 comprehensive services: 📱 Mobile Apps, 🏢 ERP Systems, 🛒 E-Commerce, 🎓 Learning (LMS), 🏥 Industry Solutions, ☁️ Cloud Hosting, 🔐 Cybersecurity, 🌐 Network IT, ⚙️ Automation, 🎨 UI/UX, 📊 Data Analytics, 🧑‍💻 24/7 Support, 🖥️ Computer Hardware, 🏢 Office Setup, and 🔧 POS Device Integration.' },
  { label: '📍 Location',      reply: 'Our main headquarters is located at 7D Old Railway Line, Tengbeh Town, Freetown, Sierra Leone. Our Freetown-based engineering team is fully available to support your systems!' },
  { label: '📞 Contact Us',    reply: 'You can call us at +232 34 955581 / +232 73 019699, or email protechassist36@gmail.com. We provide 24/7 Premium Support!' },
  { label: '💰 Project Cost',  reply: 'Project budgets vary by features. Press → on your keyboard or click "Request a Demo" to launch our interactive Project Cost Estimator for an instant breakdown!' },
  { label: '📋 Request Demo',  reply: 'Click "Request a Demo" in the header or Hero section, or press the Right Arrow Key (→) on your keyboard! Press Escape to close any open modal.' },
  { label: '⌨️ Shortcuts',    reply: '→ Right Arrow — Opens the Project Cost Estimator\n← Left Arrow — Scrolls to the AI Assistant\nEsc — Closes any open modal\n(Disabled while typing in inputs)' },
];

const getBotResponse = (query) => {
  const q = query.toLowerCase().trim();
  if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('freetown') || q.includes('tengbeh'))
    return '📍 Protech Assist SL Limited is headquartered at 7D Old Railway Line, Tengbeh Town, Freetown, Sierra Leone.';
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('whatsapp') || q.includes('call'))
    return '📞 Call us at +232 34 955581 / +232 73 019699, chat on WhatsApp at +232 34 955581, or email protechassist36@gmail.com. 24/7 support available!';
  if (q.includes('mobile') || q.includes('android') || q.includes('ios'))
    return '📱 Mobile App Development: We build powerful Android & iOS apps, business platforms, and customer service apps.';
  if (q.includes('erp') || q.includes('accounting') || q.includes('inventory') || q.includes('payroll'))
    return '🏢 ERP Systems: We build complete business management systems — accounting, HR, sales, procurement, and dashboards.';
  if (q.includes('ecommerce') || q.includes('e-commerce') || q.includes('online store') || q.includes('shop'))
    return '🛒 E-Commerce: Online stores with product management, secure payment integrations, and order tracking.';
  if (q.includes('lms') || q.includes('school') || q.includes('learning') || q.includes('course') || q.includes('education'))
    return '🎓 LMS: Learning platforms for schools and training centers — student management, courses, and digital classrooms.';
  if (q.includes('cloud') || q.includes('host') || q.includes('server') || q.includes('deploy'))
    return '☁️ Cloud Hosting & Deployment: Cloud app deployment, server setup, monitoring, and infrastructure management.';
  if (q.includes('cyber') || q.includes('security') || q.includes('protect') || q.includes('backup'))
    return '🔐 Cybersecurity & Data Protection: Security assessments, access control, data protection, and backup strategies.';
  if (q.includes('network') || q.includes('wifi') || q.includes('internet'))
    return '🌐 Network & IT Infrastructure: Office network setup, server configuration, hardware provisioning, and IT maintenance.';
  if (q.includes('hardware') || q.includes('computer') || q.includes('repair') || q.includes('laptop'))
    return '🖥️ Computer Hardware & IT Support: Hardware setup, troubleshooting, upgrades (RAM/SSD), printer setup, and data recovery.';
  if (q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('database'))
    return '⚡ Tech Stack: React, Vite, Node.js, Express, PostgreSQL, MongoDB, Redis, and AWS — scalable and secure architectures.';
  if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('how much') || q.includes('fee'))
    return '💰 Pricing starts from $500 (SLE 11,500). Press → or click "Request a Demo" to launch our interactive Project Cost Estimator!';
  if (q.includes('demo') || q.includes('estimator') || q.includes('request') || q.includes('try'))
    return '📋 Press the Right Arrow Key (→) or click "Request a Demo" in the header to open the Project Cost Estimator instantly!';
  if (q.includes('shortcut') || q.includes('keyboard') || q.includes('arrow') || q.includes('key'))
    return '⌨️ Shortcuts: → Right Arrow = Estimator | ← Left Arrow = AI Assistant | Esc = Close modals. (Disabled while typing)';
  if (q.includes('portfolio') || q.includes('project') || q.includes('work'))
    return '💼 Our portfolio includes a custom Enterprise ERP System, a Global E-Commerce Platform, and a Financial Analytics Dashboard. Check the Portfolio section!';
  if (q.includes('hi') || q.includes('hello') || q.includes('hey'))
    return '👋 Hello! I am the Protech AI Assistant. Ask me about our services, location, pricing, or keyboard shortcuts!';
  if (q.includes('about') || q.includes('who') || q.includes('mission') || q.includes('experience'))
    return '🎯 From software to hardware, Protech Assist SL Limited provides complete technology solutions. 10+ years of experience, 500+ projects delivered!';
  return '🤖 Ask me about our 15 services, Freetown location, pricing, portfolio, or keyboard shortcuts. I am here to help!';
};

const FloatingChat = ({ openEstimator }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'GREETING' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [hasUnread, setHasUnread] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Show unread pulse after 3 seconds if chat hasn't been opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setHasUnread(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const typeReply = (reply) => {
    let currentLength = 0;
    setMessages(prev => [...prev, { sender: 'assistant', text: '' }]);
    const speed = Math.max(8, Math.floor(900 / reply.length));
    const interval = setInterval(() => {
      currentLength++;
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: 'assistant', text: reply.slice(0, currentLength) };
        return updated;
      });
      if (currentLength >= reply.length) clearInterval(interval);
    }, speed);
  };

  const handleOptionClick = (option) => {
    if (isTyping) return;
    setMessages(prev => [...prev, { sender: 'user', text: option.label }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      typeReply(option.reply);
    }, 700);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    const userText = inputText;
    setInputText('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      typeReply(getBotResponse(userText));
    }, 700);
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setHasUnread(false);
  };

  return (
    <div className="floating-chat-widget">
      {/* Chat Panel */}
      <div className={`floating-chat-panel glass-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="fc-header">
          <div className="fc-header-info">
            <div className="fc-avatar">
              <span className="fc-avatar-icon">🤖</span>
              <span className="fc-status-dot"></span>
            </div>
            <div className="fc-header-text">
              <span className="fc-title">Protech AI Assistant</span>
              <span className="fc-subtitle">Online · Replies instantly</span>
            </div>
          </div>
          <button className="fc-close-btn" onClick={handleToggle} aria-label="Close chat">✕</button>
        </div>

        {/* Messages */}
        <div className="fc-body" ref={chatBodyRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`fc-message ${msg.sender}`}>
              {msg.sender === 'assistant' && (
                <div className="fc-msg-avatar">🤖</div>
              )}
              {msg.text === 'GREETING' ? (
                <div className="fc-bubble fc-greeting-card">
                  <div className="fc-greeting-top">
                    <span className="fc-greeting-wave">👋</span>
                    <span className="fc-greeting-hi">Hello! I am</span>
                  </div>
                  <div className="fc-greeting-name">Protech AI Assistant</div>
                  <div className="fc-greeting-tagline">I am here to assist you!</div>
                  <div className="fc-greeting-body">
                    Ask me about our services, Freetown location, pricing, portfolio, or keyboard shortcuts. Always ready to help 🚀
                  </div>
                </div>
              ) : (
                <div className="fc-bubble">{msg.text}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="fc-message assistant">
              <div className="fc-msg-avatar">🤖</div>
              <div className="fc-bubble fc-typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Chips */}
        <div className="fc-chips">
          {chatOptions.map((opt, i) => (
            <button
              key={i}
              className={`fc-chip ${isTyping ? 'disabled' : ''}`}
              onClick={() => handleOptionClick(opt)}
              disabled={isTyping}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <form className="fc-input-row" onSubmit={handleSend}>
          <input
            className="fc-input"
            type="text"
            placeholder="Ask about Protech..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button
            className="fc-send-btn"
            type="submit"
            disabled={isTyping || !inputText.trim()}
          >➤</button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button
        className={`floating-chat-btn ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label="Open AI chat"
      >
        {isOpen ? (
          <span className="fc-btn-icon">✕</span>
        ) : (
          <>
            <span className="fc-btn-icon">🤖</span>
            {hasUnread && <span className="fc-unread-badge"></span>}
          </>
        )}
        <span className="fc-btn-ripple"></span>
      </button>
    </div>
  );
};

export default FloatingChat;
