import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis();

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
    <div className="bg-dark min-h-screen text-white selection:bg-primary/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <About />

        <Services />

        <Experience />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
