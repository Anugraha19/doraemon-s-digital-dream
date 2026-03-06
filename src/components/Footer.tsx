import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-mono">
          © 2025 Anugraha Chalwadi. All rights reserved.
        </p>

        <div className="flex gap-5">
          {[
            { icon: Github, href: '#' },
            { icon: Linkedin, href: '#' },
            { icon: Mail, href: 'mailto:anugrahachalwadi@gmail.com' },
          ].map((s, i) => (
            <a key={i} href={s.href} className="text-muted-foreground hover:text-primary transition-colors">
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          className="glass w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </div>
    </footer>
  );
}
