import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-dark relative flex items-center justify-center min-h-screen">
       {/* Background Glow */}
       <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Send size={200} />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                     <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
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
                    const formData = {
                        name: e.target[0].value,
                        email: e.target[1].value,
                        message: e.target[2].value
                    };
                    
                    try {
                        const response = await fetch('/api/contact', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(formData)
                        });
                        const data = await response.json();
                        if (data.success) {
                            alert('Message sent successfully!');
                            e.target.reset();
                        }
                    } catch (error) {
                        console.error('Error sending message:', error);
                        alert('Failed to send message.');
                    }
                }}>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Name</label>
                        <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Message</label>
                        <textarea required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors h-32 resize-none" placeholder="Your message..."></textarea>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                    >
                        Send Message
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
