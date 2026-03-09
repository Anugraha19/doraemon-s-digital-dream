import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Goa Wildlife Sanctuary',
    description: 'A website showcasing Goa\'s diverse wildlife sanctuaries with interactive maps and galleries.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Event Management Website',
    description: 'A full-featured event management platform with registration, scheduling, and attendee management.',
    tags: ['Bootstrap', 'JavaScript'],
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A modern portfolio with 3D animations, smooth transitions, and responsive design.',
    tags: ['React', 'Three.js', 'CSS'],
  },
  {
    title: 'Ignite 2.0 — College Event',
    description: 'Official website for the college technical event Ignite 2.0 with schedules and registration.',
    tags: ['HTML', 'CSS', 'Bootstrap'],
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">Work</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Selected projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-display font-semibold text-foreground">{project.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="Preview">
                    <ExternalLink size={15} />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                    <Github size={15} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
