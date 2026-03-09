import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const achievements = [
  {
    title: 'Student Coordinator',
    description: 'Coordinated and managed college events, leading teams and ensuring smooth execution.',
    year: '2024',
  },
  {
    title: 'Creative Designer',
    description: 'Designed posters, certificates, and marketing materials for various college events.',
    year: '2023',
  },
  {
    title: 'Web Developer',
    description: 'Built multiple websites for college projects and events using modern web technologies.',
    year: '2023',
  },
];

export default function AchievementsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">Experience</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Achievements
          </h2>
        </motion.div>

        <div className="space-y-0">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex gap-6 py-6 border-b border-border last:border-b-0"
            >
              <span className="font-mono text-xs text-muted-foreground pt-1 shrink-0 w-12">{item.year}</span>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
