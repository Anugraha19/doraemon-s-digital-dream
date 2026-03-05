import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Lightbulb, Rocket } from 'lucide-react';

const highlights = [
  { icon: Code2, label: 'Full-Stack Dev', color: 'primary' },
  { icon: Palette, label: 'UI/UX Design', color: 'secondary' },
  { icon: Lightbulb, label: 'AI Explorer', color: 'accent' },
  { icon: Rocket, label: 'Fast Learner', color: 'primary' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8 gradient-border">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I am a passionate student developer who loves building modern websites,
                experimenting with AI tools, and creating visually appealing digital experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I enjoy learning new technologies and building creative projects. Based in
                <span className="text-primary font-semibold"> India</span>, I'm always looking
                for new challenges to grow my skills and make an impact.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-6 text-center gradient-border cursor-default"
              >
                <item.icon className="mx-auto mb-3 text-primary" size={28} />
                <p className="font-display font-medium text-sm text-foreground">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
