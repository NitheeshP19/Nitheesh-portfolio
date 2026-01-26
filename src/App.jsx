import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SkyBackground from './components/VFX/SkyBackground';
import ScrollProgress from './components/VFX/ScrollProgress';


function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-primary/30 selection:text-white">
      <ScrollProgress />
      <SkyBackground />
      <Navbar />
      
      <main>
        <Hero />
        
        <About />

        <Services />

        <Projects />

        <Testimonials />

        <Experience />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
