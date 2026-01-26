import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import LiquidOrb from './VFX/LiquidOrb';
import TextReveal from './VFX/TextReveal';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#4299e1" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ed64a6" />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
               <LiquidOrb />
            </Float>
            
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay Gradient for Text Readability */}
      {/* Overlay Gradient for Text Readability - Smoother radial fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent pointer-events-none z-10 w-full h-full"></div>
      
      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-6 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 inline-block"
        >
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium text-cyan-400 backdrop-blur-md">
            Available for New Projects
          </span>
        </motion.div>

        <h1 className="mb-8 drop-shadow-2xl">
            <span className="flex flex-wrap justify-center gap-x-4">
                <TextReveal as="span" text="Crafting" className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight" delay={0.1} />
                <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8, duration: 1 }}
                    className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient"
                >
                    Digital
                </motion.span>
            </span>
            
            <span className="relative inline-block mt-2">
                <TextReveal as="span" text="Experiences" className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white tracking-tight" delay={1.2} />
                 <motion.span 
                  className="absolute -bottom-2 left-1/2 md:left-0 w-24 md:w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full transform -translate-x-1/2 md:translate-x-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 2, duration: 1 }}
                ></motion.span>
            </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-gray-300 max-w-xl md:max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed px-4"
        >
          I architect immersive web solutions that blend technical excellence with cinematic visuals. 
          Specializing in scalable full-stack applications and high-performance 3D interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-md mx-auto sm:max-w-none"
        >
          <a
            href="#contact"
            className="group relative w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(66,153,225,0.5)] border border-white/10 backdrop-blur-md text-center"
          >
             <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 group-hover:opacity-40 transition-opacity"></span>
             <span className="relative flex items-center justify-center gap-2">
               Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </span>
          </a>

          <a
            href="/resume.pdf"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            Download CV <Download size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 z-20 cursor-pointer hidden md:block" // Hidden on small mobile to give more space
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
