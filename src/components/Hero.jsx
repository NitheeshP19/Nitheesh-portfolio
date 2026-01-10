import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Download, FlaskConical, Code, Database, Server } from 'lucide-react';

const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "App Developer",
    "Content Creator",
    "Video Editor",
    "VFX & Animations Artist"
  ];

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark pt-28 md:pt-0">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating Icons */}
        <FloatingIcon delay={0} x="10%" y="20%" icon={<FlaskConical size={40} />} color="text-gray-500/20" />
        <FloatingIcon delay={2} x="80%" y="15%" icon={<span className="font-bold text-xl">Django</span>} color="text-gray-500/20" />
        <FloatingIcon delay={4} x="15%" y="70%" icon={<Code size={40} />} color="text-gray-500/20" />
        <FloatingIcon delay={1} x="85%" y="65%" icon={<Database size={40} />} color="text-gray-500/20" />
        <FloatingIcon delay={3} x="50%" y="15%" icon={<Server size={40} />} color="text-gray-500/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight flex flex-col md:block">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm 
            </motion.span>
            {" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
               Nitheesh P
            </motion.span>
          </h1>

          <div className="h-12 md:h-16 mb-8 overflow-hidden">
            <motion.p 
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-4xl text-gray-300 font-light"
            >
              I am a <span className="text-white font-semibold">{roles[currentRole]}</span>
            </motion.p>
          </div>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed">
            Structuring the web and apps with passion. Blending technical expertise with creative vision to build cinematic, functional, and premium digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center gap-2 group"
            >
              Contact Me
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </motion.a>
            <motion.a 
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-[30px] h-[50px] rounded-3xl border-2 border-white/20 flex justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const FloatingIcon = ({ icon, delay, x, y, color }) => (
  <motion.div
    className={`absolute ${color}`}
    style={{ left: x, top: y }}
    animate={{ 
      y: [0, -20, 0],
      opacity: [0.3, 0.6, 0.3],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 5, 
      delay: delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {icon}
  </motion.div>
);

export default Hero;
