import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

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
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs md:text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Portfolio — 2025
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-3 text-foreground leading-tight">
            Anugraha
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-8 text-primary leading-tight">
            Chalwadi
          </h1>

          <div className="h-8 md:h-10 flex items-center justify-center mb-12">
            <span className="text-base md:text-lg font-mono text-muted-foreground">
              {text}
              <span className="animate-pulse text-primary">_</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#projects"
              className="px-6 py-2.5 rounded bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded border border-border text-foreground font-display font-semibold text-sm hover:border-primary/50 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer p-2 text-muted-foreground hover:text-foreground transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}
