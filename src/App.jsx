import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AITech from './components/AITech';
import WhyUs from './components/WhyUs';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

const ProjectEstimator = lazy(() => import('./components/ProjectEstimator'));
const SandboxOS = lazy(() => import('./components/SandboxOS'));
import FloatingChat from './components/FloatingChat';

function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);

  const openEstimator = () => setIsEstimatorOpen(true);
  const closeEstimator = () => setIsEstimatorOpen(false);

  const openSandbox = () => setIsSandboxOpen(true);
  const closeSandbox = () => setIsSandboxOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input or textarea
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      // → Right arrow key: open the Project Estimator
      if (e.key === 'ArrowRight') {
        openEstimator();
      }

      // ← Left arrow key: scroll to the AI Assistant section
      if (e.key === 'ArrowLeft') {
        const aiSection = document.getElementById('ai-assistant');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Focus the chatbot input after scrolling
          setTimeout(() => {
            const chatInput = aiSection.querySelector('.chat-input');
            if (chatInput) chatInput.focus();
          }, 600);
        }
      }

      // Escape key: close any open modal
      if (e.key === 'Escape') {
        closeEstimator();
        closeSandbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Header openEstimator={openEstimator} />
      <main>
        <Hero openEstimator={openEstimator} />
        <About />
        <Services openSandbox={openSandbox} />
        <AITech />
        <WhyUs />
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      {isEstimatorOpen && (
        <Suspense fallback={null}>
          <ProjectEstimator isOpen={isEstimatorOpen} onClose={closeEstimator} />
        </Suspense>
      )}
      {isSandboxOpen && (
        <Suspense fallback={null}>
          <SandboxOS isOpen={isSandboxOpen} onClose={closeSandbox} />
        </Suspense>
      )}
      <FloatingChat openEstimator={openEstimator} />
    </>
  );
}

export default App;
