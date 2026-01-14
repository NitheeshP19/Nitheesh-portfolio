import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';




const Experience = () => {
  /* 
    Directly defining data for static deployment (GitHub Pages).
    The backend /api/stats and /api/experience routes won't work on static hosting.
  */
  const stats = [
    { value: 17, label: "Web Development", suffix: "+" },
    { value: 3, label: "App Development", suffix: "+" },
    { value: 100, label: "Client Satisfaction", suffix: "%" },
    { value: 24, label: "Support Available", suffix: "/7" },
  ];

  const experience = [
    {
        role: "Senior Full Stack Developer",
        company: "TechSolutions Inc.",
        period: "2023 - Present",
        description: "Leading the development of enterprise-scale web applications. Architected microservices solutions and mentored junior developers. Improved system performance by 40%."
    },
    {
        role: "Freelance Creative Technologist",
        company: "Self-Employed",
        period: "2021 - 2023",
        description: "Delivered custom digital solutions for diverse clients. Combined technical development with creative content strategy to boost client engagement metrics."
    },
    {
        role: "Web Developer",
        company: "Digital Studio",
        period: "2020 - 2021",
        description: "Collaborated with designers to implement pixel-perfect user interfaces. Specialized in frontend animations and interactive experiences."
    },
    {
        role: "Frontend Developer Intern",
        company: "Creative Agencies",
        period: "2019 - 2020",
        description: "Assisted in the development of client websites. Gained hands-on experience with modern frontend frameworks and responsive design techniques."
    },
    {
        role: "Open Source Contributor",
        company: "GitHub Community",
        period: "2018 - Present",
        description: "Actively contributing to various open-source projects. Focusing on tooling, documentation, and community support for developer tools."
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
        {/* Background Elements */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                    Experience & <span className="text-gradient">Stats</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 px-4 md:px-0">
                {stats.map((stat, index) => (
                    <Counter key={index} value={stat.value} label={stat.label} suffix={stat.suffix} />
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-0">
              {experience.map((job, index) => (
                <TimelineItem key={index} data={job} index={index} />
              ))}
            </div>
        </div>
    </section>
  );
};

const Counter = ({ value, label, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0.5 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
      viewport={{ once: true }}
      className="text-center p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative group overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-xl group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 font-heading flex justify-center items-baseline drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <NumberDisplay value={springValue} />
          <span className="text-primary text-3xl md:text-5xl ml-1">{suffix}</span>
        </div>
        <p className="text-gray-300 font-bold text-base md:text-lg tracking-wider uppercase">{label}</p>
      </div>
    </motion.div>
  );
};

const NumberDisplay = ({ value }) => {
    const ref = useRef(null);

    useEffect(() => {
        return value.onChange((latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest);
            }
        });
    }, [value]);

    return <span ref={ref}>0</span>;
};

const TimelineItem = ({ data, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0 relative group"
    >
      <div className="w-full md:w-1/3 md:text-right relative z-10 md:pt-2"> {/* Added md:pt-2 for alignment */}
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{data.company}</h3>
        <span className="inline-block px-3 py-1 mt-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-mono">{data.period}</span>
      </div>
      <div className="hidden md:block absolute left-[33.33%] top-0 bottom-0 w-px bg-white/10 -ml-px group-hover:bg-gradient-to-b group-hover:from-primary group-hover:to-secondary transition-all duration-500">
        <div className="w-4 h-4 rounded-full bg-dark border-2 border-primary absolute top-2 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform duration-300 z-20"></div>
      </div>
      <div className="w-full md:w-2/3 border-l md:border-l-0 border-white/10 md:border-none pl-6 md:pl-12 relative z-10">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300 hover:border-white/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             <h4 className="text-lg font-semibold text-white mb-2 relative z-10">{data.role}</h4>
             <p className="text-gray-400 text-sm leading-relaxed relative z-10">{data.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
