import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arun Kumar",
      rating: 5,
      text: "Nitheesh delivered an amazing website for my business. Very professional and always available for support. Highly recommended!",
      project: "Web Development"
    },
    {
      name: "Priya Venkatesh",
      rating: 5,
      text: "The mobile app he built works flawlessly. Great communication throughout the project and delivered on time.",
      project: "App Development"
    },
    {
      name: "Rajesh Krishnan",
      rating: 5,
      text: "Excellent VFX work for our video content. Creative ideas and perfect execution. Will definitely work again!",
      project: "VFX & Animations"
    },
    {
      name: "Deepika Nair",
      rating: 5,
      text: "Very satisfied with the UI/UX design. Clean, modern, and user-friendly. My customers love the new look!",
      project: "UI/UX Design"
    },
    {
      name: "Vikram Sundaram",
      rating: 5,
      text: "Fast delivery and great quality. The website helped boost my online presence significantly.",
      project: "Web Development"
    },
    {
      name: "Kavitha Raman",
      rating: 5,
      text: "Professional video editing service. Quick turnaround and exactly what I envisioned. Thank you!",
      project: "Video Editing"
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
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-secondary/5 to-transparent blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Client <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here's what my clients have to say about working with me.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} variants={itemVariants} />
          ))}
        </motion.div>

        {/* Trust Indicators - Matching Experience Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <TrustBadge value="17+" label="Web Projects" />
          <TrustBadge value="3+" label="App Projects" />
          <TrustBadge value="100%" label="Satisfaction" />
          <TrustBadge value="24/7" label="Support" />
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, rating, text, project, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/30 transition-colors duration-500"></div>
      
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-primary/20">
        <Quote size={40} />
      </div>

      <div className="relative z-10">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
          "{text}"
        </p>

        {/* Project Tag */}
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            {project}
          </span>
        </div>

        {/* Author - Simple without photo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <h4 className="text-white font-semibold">{name}</h4>
        </div>
      </div>
    </motion.div>
  );
};

const TrustBadge = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);

export default Testimonials;
