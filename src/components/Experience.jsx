import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';




const Experience = () => {
  const stats = [
    { value: 17, label: "Web Development", suffix: "+" },
    { value: 3, label: "App Development", suffix: "+" },
    { value: 100, label: "Client Satisfaction", suffix: "%" },
    { value: 24, label: "Support Available", suffix: "/7" },
  ];

  const experience = [
    {
      role: "Lead Full Stack Consultant",
      company: "Enterprise Solutions",
      period: "2024 - 2025",
      description: "Spearheaded the architecture and development of scalable microservices for high-traffic platforms. Optimized system performance by 40% and led the migration of legacy systems to modern cloud-native infrastructures."
    },
    {
      role: "Freelance Web Developer",
      company: "Global Client Projects",
      period: "2022 - 2023",
      description: "Delivered 15+ custom web applications for diverse international clients. Combined creative UI/UX strategies with robust technical implementation to boost client engagement metrics by over 60%."
    },
    {
      role: "Open Source Contributor",
      company: "GitHub Community",
      period: "2022 - 2025",
      description: "Actively maintained and contributed to developer tooling ecosystems. authored documentation used by thousands of developers and fixed critical bugs in popular frontend libraries."
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
        {/* Background Elements */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
        
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
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-8 mb-12 last:mb-0 relative group p-6 rounded-2xl border border-transparent hover:border-white/10 transition-all"
    >
      <div className="w-full md:w-1/3 md:text-right relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">{data.company}</h3>
        <p className="text-primary font-mono text-sm">{data.period}</p>
      </div>
      <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-px bg-white/10 -ml-px group-hover:bg-primary/50 transition-colors duration-500">
        <div className="w-3 h-3 rounded-full bg-primary absolute top-8 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-150 transition-transform duration-300"></div>
      </div>
      <div className="w-full md:w-2/3 pl-0 md:pl-8 border-l md:border-l-0 border-white/10 md:border-none pl-4 md:pl-8 relative z-10">
        <h4 className="text-lg font-semibold text-gray-200 mb-2 group-hover:text-white">{data.role}</h4>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{data.description}</p>
      </div>
    </motion.div>
  );
};

export default Experience;
