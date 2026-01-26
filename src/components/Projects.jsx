import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, X, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "TechFlow E-Commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&auto=format&fit=crop&q=60",
      description: "A full-featured e-commerce platform with real-time inventory, payment processing, and advanced analytics dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      features: [
        "Real-time inventory management",
        "Secure payment processing",
        "Admin analytics dashboard",
        "Mobile-responsive design"
      ],
      results: "300% increase in online sales within 6 months"
    },
    {
      id: 2,
      title: "HealthTrack Mobile App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&auto=format&fit=crop&q=60",
      description: "Cross-platform health and fitness tracking app with AI-powered recommendations and social features.",
      technologies: ["React Native", "Firebase", "TensorFlow", "Node.js"],
      liveUrl: "#",
      githubUrl: "#",
      features: [
        "AI workout recommendations",
        "Nutrition tracking",
        "Social challenges",
        "Health metrics dashboard"
      ],
      results: "50K+ downloads with 4.8 star rating"
    },
    {
      id: 3,
      title: "Artisan Bakery Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60",
      description: "Beautiful, conversion-optimized website for a local bakery with online ordering and delivery scheduling.",
      technologies: ["Next.js", "TailwindCSS", "Sanity CMS", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      features: [
        "Online ordering system",
        "Delivery scheduling",
        "Menu management CMS",
        "Customer reviews"
      ],
      results: "3x increase in online orders"
    },
    {
      id: 4,
      title: "Corporate Brand Film",
      category: "VFX & Video",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=60",
      description: "Cinematic brand film with custom VFX, motion graphics, and professional color grading for a tech startup.",
      technologies: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Cinema 4D"],
      liveUrl: "#",
      features: [
        "Custom 3D motion graphics",
        "Professional color grading",
        "Sound design & mixing",
        "4K delivery"
      ],
      results: "1M+ views across platforms"
    },
    {
      id: 5,
      title: "FinTech Dashboard",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      description: "Comprehensive financial dashboard redesign focusing on data visualization and user experience.",
      technologies: ["Figma", "React", "D3.js", "TailwindCSS"],
      liveUrl: "#",
      githubUrl: "#",
      features: [
        "Interactive data charts",
        "Real-time updates",
        "Dark/Light themes",
        "Accessibility compliant"
      ],
      results: "94% user satisfaction score"
    },
    {
      id: 6,
      title: "Cloud Infrastructure Migration",
      category: "Cloud Architecture",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
      description: "Complete AWS infrastructure setup with auto-scaling, CI/CD pipelines, and 99.9% uptime guarantee.",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      liveUrl: "#",
      features: [
        "Auto-scaling infrastructure",
        "CI/CD pipelines",
        "24/7 monitoring",
        "Disaster recovery"
      ],
      results: "60% cost reduction, 99.9% uptime"
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
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my best work across web development, app development, and creative production.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              variants={itemVariants}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/50 hover:scale-105 transition-all"
          >
            Start Your Project <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, variants, onSelect }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md overflow-hidden relative cursor-pointer"
      onClick={onSelect}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/30 transition-colors duration-500"></div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-primary/80 text-white text-xs font-medium backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-4">
            <button className="p-3 bg-white/10 rounded-full text-white hover:bg-primary transition-colors">
              <Eye size={20} />
            </button>
            {project.liveUrl && (
              <a href={project.liveUrl} className="p-3 bg-white/10 rounded-full text-white hover:bg-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                <ExternalLink size={20} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} className="p-3 bg-white/10 rounded-full text-white hover:bg-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark/95 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-primary transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h2>
          <p className="text-gray-300 mb-6">{project.description}</p>

          {/* Results */}
          {project.results && (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
              <p className="text-primary font-semibold">📈 Results: {project.results}</p>
            </div>
          )}

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 text-white text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-center hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                View Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                className="flex-1 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold text-center hover:bg-white/20 transition-all"
              >
                View Source
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
