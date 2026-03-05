import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'HTML', level: 90, color: 'from-[hsl(190,100%,50%)] to-[hsl(210,100%,60%)]' },
  { name: 'CSS', level: 85, color: 'from-[hsl(270,80%,60%)] to-[hsl(290,80%,50%)]' },
  { name: 'JavaScript', level: 75, color: 'from-[hsl(50,100%,50%)] to-[hsl(40,100%,55%)]' },
  { name: 'Bootstrap', level: 80, color: 'from-[hsl(270,80%,60%)] to-[hsl(250,80%,55%)]' },
  { name: 'Git & GitHub', level: 70, color: 'from-[hsl(0,80%,55%)] to-[hsl(320,80%,55%)]' },
  { name: 'Canva Design', level: 85, color: 'from-[hsl(190,100%,50%)] to-[hsl(170,100%,45%)]' },
  { name: 'AI Tools', level: 80, color: 'from-[hsl(320,80%,55%)] to-[hsl(350,80%,55%)]' },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-5 gradient-border group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex justify-between mb-3">
                <span className="font-display font-semibold text-foreground">{skill.name}</span>
                <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
