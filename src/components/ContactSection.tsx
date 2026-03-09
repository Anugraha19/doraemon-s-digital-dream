import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Mail, CheckCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.company) return;
    setStatus('sending');
    try {
      await emailjs.send(
        'service_vt8jn7w',
        'template_npyefen',
        { name: formData.name, email: formData.email, message: formData.message },
        'Qs2p94aQ7_IFgBL91'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '', company: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Get in touch
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-3 space-y-4"
          >
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-secondary rounded px-4 py-2.5 text-sm text-foreground font-display focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-secondary rounded px-4 py-2.5 text-sm text-foreground font-display focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-secondary rounded px-4 py-2.5 text-sm text-foreground font-display focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                required
              />
            </div>
            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-2.5 rounded bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === 'sending' ? (
                <><Loader2 size={14} className="animate-spin" /> Sending...</>
              ) : status === 'success' ? (
                <><CheckCircle size={14} /> Message sent successfully!</>
              ) : status === 'error' ? (
                <>Message not sent. Please try again later.</>
              ) : (
                <><Send size={14} /> Send Message</>
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 flex flex-col justify-between"
          >
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Open to collaborations, project ideas, or just a conversation. Feel free to reach out.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:anugrahachalwadi@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
