import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Goa Wildlife Sanctuary',
    description: 'A beautifully designed website showcasing Goa\'s diverse wildlife sanctuaries with interactive maps and galleries.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Event Management Website',
    description: 'A full-featured event management platform with registration, scheduling, and attendee management.',
    tags: ['Bootstrap', 'JavaScript'],
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A modern portfolio website with 3D animations, smooth transitions, and responsive design.',
    tags: ['React', 'Three.js', 'CSS'],
  },
  {
    title: 'Ignite 2.0 — College Event',
    description: 'Official website for the college technical event Ignite 2.0 with event schedules and registration.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6 gradient-border group cursor-default"
            >
              <div className="h-40 rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 mb-5 flex items-center justify-center overflow-hidden">
                <motion.span
                  className="text-5xl font-bold gradient-text opacity-30 group-hover:opacity-60 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  {project.title.charAt(0)}
                </motion.span>
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 text-sm font-display text-primary hover:text-primary/80 transition-colors">
                  <ExternalLink size={14} /> Preview
                </button>
                <button className="flex items-center gap-2 text-sm font-display text-muted-foreground hover:text-foreground transition-colors">
                  <Github size={14} /> GitHub
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
