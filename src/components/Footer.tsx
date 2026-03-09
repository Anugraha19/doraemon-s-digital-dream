import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-mono">
          © 2025 Anugraha Chalwadi
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
