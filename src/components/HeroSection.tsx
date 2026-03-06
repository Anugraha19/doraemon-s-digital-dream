import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Eye, Mail } from 'lucide-react';

const roles = ['Student Developer', 'Web Developer', 'Tech Enthusiast', 'Creative Coder'];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentRole.length) {
          setText(currentRole.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (text.length > 0) {
          setText(currentRole.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className="text-sm md:text-base font-mono tracking-[0.3em] uppercase text-primary mb-6 glow-text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to my world
          </motion.p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-4">
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text">Anugraha</span>
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-8">
            <span className="gradient-text">Chalwadi</span>
          </h1>

          <div className="h-10 md:h-12 flex items-center justify-center mb-10">
            <span className="text-xl md:text-2xl font-mono text-muted-foreground">
              {text}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="glass glow-primary px-8 py-3 rounded-lg font-display font-semibold text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Eye size={18} /> View Projects
            </a>
            <a
              href="#contact"
              className="glass px-8 py-3 rounded-lg font-display font-semibold text-accent hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail size={18} /> Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
}
