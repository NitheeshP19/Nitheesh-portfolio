import React from 'react';
import { motion } from 'framer-motion';

import { Layout, Smartphone, Video, Film, Camera, Zap, Globe, Search, Cloud } from 'lucide-react';




const Services = () => {
  const [servicesData, setServicesData] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        const servicesWithIcons = data.map(service => ({
            ...service,
            icon: getIcon(service.title)
        }));
        setServicesData(servicesWithIcons);
      })
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const getIcon = (title) => {
    switch(title) {
        case "Web Development": return <Layout className="w-8 h-8 text-primary" />;
        case "App Development": return <Smartphone className="w-8 h-8 text-secondary" />;
        case "Content Creation": return <Video className="w-8 h-8 text-accent" />;
        case "Video Editing": return <Film className="w-8 h-8 text-primary" />;
        case "VFX & Animations": return <Zap className="w-8 h-8 text-secondary" />;
        case "Page Automation": return <Camera className="w-8 h-8 text-accent" />; 
        case "UI/UX Design": return <Layout className="w-8 h-8 text-primary" />;
        case "SEO Optimization": return <Search className="w-8 h-8 text-secondary" />;
        case "Cloud Architecture": return <Cloud className="w-8 h-8 text-accent" />;
        default: return <Globe className="w-8 h-8" />;
    }
  };

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

      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      
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
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-primary/30 transition-colors duration-300 group"
    >
      <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-heading text-white mb-4 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
        {description}
      </p>
    </motion.div>
  );
};

export default Services;
