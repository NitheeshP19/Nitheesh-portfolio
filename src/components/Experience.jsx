import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';



const Experience = () => {
  const [stats, setStats] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="experience" className="py-20 bg-dark relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <Counter key={index} value={stat.value} label={stat.label} suffix={stat.suffix} />
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
  const springValue = useSpring(motionValue, { duration: 3000 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <div ref={ref} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading flex justify-center">
        <NumberDisplay value={springValue} />
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-gray-400 font-medium">{label}</p>
    </div>
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

export default Experience;
