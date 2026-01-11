import React from 'react';
import { Github, Linkedin, Mail, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold font-heading text-white">
            Nitheesh<span className="text-primary">.P</span>
          </h3>
          <p className="text-gray-400 mt-2 text-sm">
            Building digital experiences that matter.
          </p>
        </div>

        <div className="flex space-x-6">
          <SocialLink href="#" icon={<Github size={20} />} />
          <SocialLink href="#" icon={<Linkedin size={20} />} />
          <SocialLink href="#" icon={<Instagram size={20} />} />
          <SocialLink href="mailto:nitheeshengineer@gmail.com" icon={<Mail size={20} />} />
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Nitheesh P. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href}
    className="p-3 bg-white/5 rounded-full text-gray-400 hover:bg-white/10 hover:text-white hover:scale-110 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
