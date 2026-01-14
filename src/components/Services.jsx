import React from 'react';
import { motion } from 'framer-motion';

import { Layout, Smartphone, Video, Film, Camera, Zap, Globe, Search, Cloud } from 'lucide-react';




const Services = () => {
  /* 
     Directly defining services data for static deployment (GitHub Pages).
     The backend /api/services route won't work on static hosting.
  */
  const servicesData = [
    {
      title: "Web Development",
      description: "Crafting scalable, high-performance web applications using modern architectures. From responsive landing pages to complex enterprise solutions, I deliver clean, maintainable code that drives business growth.",
      icon: <Layout className="w-8 h-8 text-primary" />
    },
    {
      title: "App Development",
      description: "Engineering intuitive, cross-platform mobile experiences. utilizing React Native to build robust applications that provide seamless user interactions across Android and iOS ecosystems.",
      icon: <Smartphone className="w-8 h-8 text-secondary" />
    },
    {
      title: "Content Creation",
      description: "Producing high-impact technical content that resonates with audiences. Specialized in breaking down complex concepts into engaging, digestible media formats for diverse platforms.",
      icon: <Video className="w-8 h-8 text-accent" />
    },
    {
      title: "Video Editing",
      description: "Transforming raw footage into cinematic narratives. Expert in color grading, sound design, and pacing to create visually stunning stories that captivate viewers and enhance brand identity.",
      icon: <Film className="w-8 h-8 text-primary" />
    },
    {
      title: "VFX & Animations",
      description: "Designing immersive visual experiences. Leveraging 3D tools and motion graphics to add depth, realism, and dynamic flair to digital interfaces and video productions.",
      icon: <Zap className="w-8 h-8 text-secondary" />
    },
    {
      title: "Page Automation",
      description: "Streamlining operations through intelligent automation. Developing custom scripts and bots to eliminate repetitive tasks, optimize workflows, and boost operational efficiency.",
      icon: <Camera className="w-8 h-8 text-accent" />
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and accessible user interfaces. Focusing on user-centered design principles to create engaging digital products that delight users.",
      icon: <Layout className="w-8 h-8 text-primary" />
    },
    {
      title: "SEO Optimization",
      description: "Optimizing websites for search engines to increase visibility and drive organic traffic. Implementing best practices for on-page and technical SEO.",
      icon: <Search className="w-8 h-8 text-secondary" />
    },
    {
      title: "Cloud Architecture",
      description: "Designing scalable and secure cloud infrastructure. Leveraging AWS/Azure services to ensure high availability and disaster recovery for enterprise applications.",
      icon: <Cloud className="w-8 h-8 text-accent" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">

      <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I offer a comprehensive suite of creative and technical services designed to transform your digital presence and drive business growth. 
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon, title, description, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/30 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            {icon}
        </div>
        <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
            {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {description}
        </p>
      </div>
    </motion.div>
  );
};

export default Services;
