import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const highlights = [
  { label: 'Full-Stack Dev', desc: 'Building end-to-end web applications' },
  { label: 'UI/UX Design', desc: 'Clean, user-centered interfaces' },
  { label: 'AI Explorer', desc: 'Leveraging AI in real projects' },
  { label: 'Fast Learner', desc: 'Always picking up new tools' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">About</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            A bit about me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-5">
              I'm a student developer from India who enjoys building modern websites
              and experimenting with emerging technologies. I care about clean code,
              thoughtful design, and solving real problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, I'm exploring AI tools, designing graphics, or
              coordinating college events. I'm always looking for the next challenge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="border border-border rounded-lg p-4"
              >
                <p className="font-display font-semibold text-sm text-foreground mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
