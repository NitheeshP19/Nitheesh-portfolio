import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 relative flex items-center justify-center min-h-screen">
       {/* Background Glow */}
       <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Send size={200} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div>
                     <h2 className="text-2xl md:text-4xl font-bold font-heading mb-6">
                        Let's <span className="text-gradient">Connect</span>
                     </h2>
                     <p className="text-gray-400 mb-8 leading-relaxed">
                        Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
                     </p>

                     <div className="space-y-6">
                        <ContactItem icon={<Mail className="text-primary" />} label="Email" value="nitheeshengineer@gmail.com" href="mailto:nitheeshengineer@gmail.com" />
                        <ContactItem icon={<Phone className="text-secondary" />} label="Phone" value="+91 99528 13588" href="tel:+919952813588" />
                        <ContactItem icon={<MapPin className="text-accent" />} label="Location" value="Coimbatore, Tamil Nadu, India" />
                     </div>
                     
                     <div className="flex space-x-4 mt-8">
                        <SocialIcon icon={<Github size={20} />} href="#" />
                        <SocialIcon icon={<Linkedin size={20} />} href="#" />
                        <SocialIcon icon={<Instagram size={20} />} href="#" />
                     </div>
                </div>

                <form className="space-y-4 relative z-10" onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const formData = {
                        name: form.elements[0].value,
                        email: form.elements[1].value,
                        // Select is at index 2
                        service: form.elements[2].value,
                        message: form.elements[3].value
                    };
                    
                    const btn = form.querySelector('button[type="submit"]');
                    const originalText = btn.innerText;
                    btn.disabled = true;
                    btn.innerText = 'Sending...';

                    try {
                        const response = await fetch('/api/contact', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData),
                        });
                        
                        if (response.ok) {
                            alert('Message sent successfully!');
                            form.reset();
                        } else {
                            alert('Failed to send message. Please try again.');
                        }
                    } catch (error) {
                        console.error('Error sending message:', error);
                        alert('An error occurred. Please try again.');
                    } finally {
                        btn.disabled = false;
                        btn.innerText = originalText;
                    }
                }}>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Name</label>
                        <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-300 focus:bg-white/10 hover:bg-white/10 focus:shadow-[0_0_15px_rgba(66,153,225,0.3)] placeholder:text-gray-600 will-change-transform" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-300 focus:bg-white/10 hover:bg-white/10 focus:shadow-[0_0_15px_rgba(66,153,225,0.3)] placeholder:text-gray-600 will-change-transform" placeholder="john@example.com" />
                    </div>
                    
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Service You Want</label>
                        <div className="relative group">
                            <select 
                                required 
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-300 appearance-none cursor-pointer focus:bg-white/10 hover:bg-white/10 hover:border-primary/50 focus:shadow-[0_0_15px_rgba(66,153,225,0.3)] will-change-transform"
                                defaultValue=""
                            >
                                <option value="" disabled className="bg-dark text-gray-500">Select a Service</option>
                                <option value="Web Development" className="bg-dark">Web Development</option>
                                <option value="App Development" className="bg-dark">App Development</option>
                                <option value="UI/UX Design" className="bg-dark">UI/UX Design</option>
                                <option value="VFX & Animations" className="bg-dark">VFX & Animations</option>
                                <option value="Content Creation" className="bg-dark">Content Creation</option>
                                <option value="Video Editing" className="bg-dark">Video Editing</option>
                                <option value="SEO Optimization" className="bg-dark">SEO Optimization</option>
                                <option value="Cloud Architecture" className="bg-dark">Cloud Architecture</option>
                                <option value="Page Automation" className="bg-dark">Page Automation</option>
                                <option value="Other" className="bg-dark">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-primary transition-colors transform group-hover:scale-125 duration-300">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Message</label>
                        <textarea required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-300 h-32 resize-none focus:bg-white/10 hover:bg-white/10 focus:shadow-[0_0_15px_rgba(66,153,225,0.3)] placeholder:text-gray-600 will-change-transform" placeholder="Tell me about your project..."></textarea>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02, textShadow: "0 0 8px rgb(255,255,255)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden group will-change-transform"
                        type="submit"
                    >
                        <span className="relative z-10">Send Message</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </motion.button>
                </form>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, value, href }) => (
    <a href={href} className={`flex items-start gap-4 ${href ? 'hover:opacity-80 transition-opacity' : ''}`}>
        <div className="p-3 bg-white/5 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    </a>
)

const SocialIcon = ({ icon, href }) => (
    <a href={href} className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-primary transition-all duration-300">
        {icon}
    </a>
)

export default Contact;
