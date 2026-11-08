import type { CSSProperties } from 'react';
import { Braces, Code2, Database, GitBranch, LockKeyhole } from 'lucide-react';

const brands: Record<string, [string, string, string]> = {
  Go: ['go', '#00add8', 'https://go.dev/'],
  React: ['react', '#61dafb', 'https://react.dev/'],
  TypeScript: ['typescript', '#3178c6', 'https://www.typescriptlang.org/'],
  JavaScript: ['javascript', '#f7df1e', 'https://developer.mozilla.org/docs/Web/JavaScript'],
  Python: ['python', '#3776ab', 'https://www.python.org/'],
  'C++': ['cplusplus', '#659ad2', 'https://isocpp.org/'],
  Docker: ['docker', '#2496ed', 'https://www.docker.com/'],
  Redis: ['redis', '#f0473b', 'https://redis.io/'],
  PostgreSQL: ['postgresql', '#639ad1', 'https://www.postgresql.org/'],
  'Next.js': ['nextdotjs', 'var(--ink)', 'https://nextjs.org/'],
  Supabase: ['supabase', '#3ecf8e', 'https://supabase.com/'],
  SQLite: ['sqlite', '#5aade1', 'https://sqlite.org/'],
  'Node.js': ['nodedotjs', '#6abf4b', 'https://nodejs.org/'],
  Express: ['express', 'var(--ink)', 'https://expressjs.com/'],
  'HTML / CSS': ['html5', '#e34f26', 'https://developer.mozilla.org/docs/Web/HTML'],
  'Tailwind CSS': ['tailwindcss', '#38bdf8', 'https://tailwindcss.com/'],
  'shadcn/ui': ['shadcnui', 'var(--ink)', 'https://ui.shadcn.com/'],
  AWS: ['amazonwebservices', '#ff9900', 'https://aws.amazon.com/'],
  Git: ['git', '#f05032', 'https://git-scm.com/'],
  GitHub: ['github', 'var(--ink)', 'https://github.com/'],
  Linux: ['linux', '#e7bd36', 'https://www.kernel.org/'],
  'CI/CD': ['githubactions', '#508bff', 'https://github.com/features/actions'],
};

function TechIcon({ name }: { name: string }) {
  const brand = brands[name];
  if (brand) {
    const [file, color] = brand;
    return <span aria-hidden="true" className="tech-mark" style={{ '--mark': `url(/tech/${file}.svg)`, '--brand': color } as CSSProperties} />;
  }
  const Icon = { SQL: Database, 'REST APIs': Braces, 'Row Level Security': LockKeyhole, 'CI/CD': GitBranch }[name] ?? Code2;
  return <Icon size={16} aria-hidden="true" />;
}

export function TechStack({ items, linked = false }: { items: string[]; linked?: boolean }) {
  return (
    <ul className={`tech-pills ${linked ? 'tech-pills-linked' : ''}`}>
      {items.map(name => {
        const brand = brands[name];
        const content = <><TechIcon name={name} /><span>{name}</span></>;
        return (
          <li key={name}>
            {linked && brand
              ? <a className="tech-pill" href={brand[2]} target="_blank" rel="noreferrer">{content}</a>
              : <span className="tech-pill">{content}</span>}
          </li>
        );
      })}
    </ul>
  );
}
