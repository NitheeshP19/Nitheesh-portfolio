import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Code, Palette, Zap, GraduationCap, Globe } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-28 text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From coding logic to crafting visuals, here is the story of how I blend engineering with artistry.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform -translate-x-1/2 md:transform-none">
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }} 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-secondary to-accent"
            ></motion.div>
          </div>

          <div className="space-y-24">
            <TimelineItem 
              side="left"
              icon={<Code size={24} />}
              title="The Foundation"
              subtitle="Full Stack Developer"
              description="It started with a curiosity for how things work. I dove deep into the MERN stack, mastering the logic behind scalable web applications. Writing clean, efficient code became my first art form."
              tags={["React", "Node.js", "MongoDB", "Express"]}
            />
             <TimelineItem 
              side="right"
              icon={<Palette size={24} />}
              title="The Vision"
              subtitle="VFX & Design"
              description="Logic needed beauty. I expanded my horizon into Visual Effects and UI/UX design, realizing that a great product must not only function flawlessly but also look cinematic and immersive."
              tags={["After Effects", "Figma", "Blender", "Motion Graphics"]}
            />
            <TimelineItem 
              side="left"
              icon={<GraduationCap size={24} />}
              title="The Pursuit"
              subtitle="B.Tech IT at KPRIET"
              description="Currently honing my skills in Information Technology, bridging the gap between theoretical knowledge and real-world application. Every project is a step towards perfection."
              tags={["Information Technology", "Engineering", "Innovation"]}
            />
             <TimelineItem 
              side="right"
              icon={<Globe size={24} />}
              title="The Mission"
              subtitle="Building the Future"
              description="Today, I stand at the intersection of technology and creativity. My goal is to build digital experiences that tell a story, solve problems, and leave a lasting impact."
              tags={["Freelancing", "Open Source", "Content Creation"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ side, icon, title, subtitle, description, tags }) => {
  const isLeft = side === 'left';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-dark border-2 border-primary z-20 transform -translate-x-1/2 md:transform-none shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/50 rounded-full animate-ping"></div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 group">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent mb-4 ${isLeft ? 'md:ml-auto' : ''}`}>
            {React.cloneElement(icon, { className: "text-primary group-hover:scale-110 transition-transform" })}
          </div>
          <h3 className="text-xl font-bold font-heading text-white">{title}</h3>
          <p className="text-secondary font-medium mb-3">{subtitle}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {tags.map((tag, i) => (
              <span key={i} className="text-xs font-mono py-1 px-2 rounded bg-dark/50 border border-white/10 text-gray-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Empty space for the other side */}
      <div className="hidden md:block w-1/2"></div>
    </motion.div>
  );
};

export default About;
