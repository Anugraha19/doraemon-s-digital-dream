import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Paintbrush, Globe } from 'lucide-react';

const achievements = [
  {
    icon: Award,
    title: 'Student Coordinator',
    description: 'Coordinated and managed college events, leading teams and ensuring smooth execution.',
    year: '2024',
  },
  {
    icon: Paintbrush,
    title: 'Creative Designer',
    description: 'Designed posters, certificates, and marketing materials for various college events and projects.',
    year: '2023',
  },
  {
    icon: Globe,
    title: 'Web Developer',
    description: 'Built multiple websites for college projects and events, applying modern web technologies.',
    year: '2023',
  },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex items-center mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="glass rounded-xl p-6 gradient-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="text-primary" size={22} />
                    <span className="font-mono text-xs text-muted-foreground">{item.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              </div>

              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary glow-primary -translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
