import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const sidebarVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="#home" 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-heading text-white tracking-wider relative z-50 flex items-center gap-2 group"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-secondary transition-all duration-300">Nitheesh</span>
            <span className="text-primary group-hover:text-white transition-colors duration-300">.P</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all"
            >
              Let's Talk
            </motion.a>
          </div>

          {/* Mobile Menu Button - Visible when menu is closed */}
          <div className="md:hidden z-[60] relative">
            <button 
              onClick={() => setIsOpen(true)} 
              className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Portaled to Body */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl md:hidden z-[100] overflow-y-auto overflow-x-hidden"
            >
              {/* Close Button inside Overlay */}
              <div className="absolute top-6 right-6 z-[101]">
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

               <div className="min-h-full flex flex-col items-center justify-center p-8">
                  <div className="flex flex-col items-center gap-8 w-full max-w-sm">
                    {navLinks.map((link) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        variants={itemVariants}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:from-primary hover:to-secondary transition-all text-center"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                    
                    <motion.div variants={itemVariants} className="w-full pt-8 flex flex-col items-center gap-6 border-t border-white/10">
                       <a 
                         href="#contact" 
                         onClick={() => setIsOpen(false)}
                         className="w-full py-4 text-center bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-bold shadow-lg shadow-primary/25 text-lg"
                       >
                          Let's Talk
                       </a>

                      <div className="flex space-x-8">
                        <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Github size={24} /></a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Linkedin size={24} /></a>
                        <a href="mailto:nitheeshengineer@gmail.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Mail size={24} /></a>
                      </div>
                    </motion.div>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Navbar;
