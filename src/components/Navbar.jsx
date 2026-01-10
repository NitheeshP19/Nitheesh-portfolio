import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren"
      }
    },
    open: {
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
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 }
  };

  return (
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
          className="text-2xl font-bold font-heading text-white tracking-wider relative z-50"
        >
          Nitheesh<span className="text-primary">.P</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative text-gray-300 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all"
          >
            Let's Talk
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-[60]">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed inset-0 bg-dark/95 backdrop-blur-xl md:hidden z-[55] flex flex-col items-center justify-center space-y-8"
          >
             {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-heading font-medium text-white hover:text-primary transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div variants={itemVariants} className="flex space-x-8 mt-8">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Github size={28} /></a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Linkedin size={28} /></a>
              <a href="mailto:nitheeshengineer@gmail.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"><Mail size={28} /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
