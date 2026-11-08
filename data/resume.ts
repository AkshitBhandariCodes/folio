// Transcribed from public/resume.pdf. PDF layout artifacts are normalized to spaces.
export const resume = {
  name: 'Akshit Singh Bhandari',
  location: 'New Delhi, India',
  contacts: [
    { text: '+91 7982540588', href: 'tel:+917982540588' },
    { text: 'akshitbhandaricodes@gmail.com', href: 'mailto:akshitbhandaricodes@gmail.com' },
    { text: 'akshitbhandari.codes', href: 'https://akshitbhandari.codes' },
    { text: 'linkedin.com/in/akshitbhandaricodes', href: 'https://linkedin.com/in/akshitbhandaricodes' },
    { text: 'github.com/akshitbhandaricodes', href: 'https://github.com/akshitbhandaricodes' },
    { text: 'x.com/akshitbhandarix', href: 'https://x.com/akshitbhandarix' },
  ],
  education: {
    school: 'Dronacharya College of Engineering',
    degree: 'Bachelor of Technology in Computer Science',
    date: 'Expected: 2028',
  },
  experience: [
    {
      company: 'Webdesino',
      title: 'Full Stack Intern',
      dates: 'Apr. 2026 – Jul. 2026',
      points: [
        'Delivered 3+ end-to-end client applications, building scalable REST APIs, relational database schemas, and responsive React/Tailwind interfaces with optimized API performance.',
      ],
    },
    {
      company: 'Octalucent Software Solutions',
      title: 'Frontend Developer Intern',
      dates: 'Feb. 2025 – Apr. 2025',
      points: [
        'Engineered reusable production-grade React and TypeScript components aligned with design systems; integrated REST APIs and maintained reliable client-side state synchronization.',
      ],
    },
  ],
  openSource: [
    {
      name: 'open-telemetry / opentelemetry-go-compile-instrumentation',
      description: ' | CNCF – Merged PR #800: Added env-var filtering test coverage for runtime compile instrumentation.',
      links: [
        { text: '#800', href: 'https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/800' },
      ],
    },
    {
      name: 'Noveum / orbit',
      description: ' – Merged PR #379 (duplicate issue detection via PostgreSQL trigram matching) and PR #372 (workspace live updates feed and project health telemetry).',
      links: [
        { text: '#379', href: 'https://github.com/Noveum/orbit/pull/379' },
        { text: '#372', href: 'https://github.com/Noveum/orbit/pull/372' },
      ],
    },
  ],
  projects: [
    {
      name: 'Push2Prod',
      href: 'https://github.com/akshitbhandaricodes/Push2Prod',
      stack: 'Next.js 14, TypeScript, Node.js, Express.js, AWS, Docker, PostgreSQL, Redis, pgvector',
      points: [
        'Architected a full-stack PaaS CI/CD platform with a Next.js dashboard, Express REST API, Redis-backed async build workers, Amazon RDS PostgreSQL, and CloudFormation IaC.',
        'Engineered isolated Docker build sandboxes for concurrent application compilation, optimizing resource limits and lifecycle management to eliminate out-of-memory (OOM) failures.',
        'Built a zero-DB live log pipeline using Redis Pub/Sub and WebSockets, archived logs to Amazon S3, and integrated embeddings with pgvector for semantic build-failure diagnosis.',
      ],
    },
    {
      name: 'Deviators Dashboard',
      href: 'https://deviators.club',
      stack: 'Next.js 16, React 19, TypeScript, Supabase, PostgreSQL, RLS',
      points: [
        'Architected and shipped a full-stack community and hackathon dashboard for 300+ developers using Next.js and Supabase with secure SSR authentication and multi-tenant profiles.',
        'Designed normalized PostgreSQL schemas with constraints, composite keys, and functional B-Tree indexes, achieving sub-20ms teammate lookup while enforcing team and seat limits.',
        'Implemented granular Row Level Security (RLS) policies governing team invites, RSVP states, memberships, and profile access to prevent unauthorized cross-user data access.',
      ],
    },
    {
      name: 'SnipWise',
      href: 'https://snipwise.akshitbhandari.codes/',
      stack: 'JavaScript, Chrome Extension APIs, IndexedDB',
      points: [
        'Engineered and shipped a privacy-first Chrome extension for fast snippet capture, tagging, search, and browser retrieval with no external server dependency.',
        'Built an offline-first IndexedDB storage and search layer for structured snippet metadata, tags, and low-latency local retrieval.',
      ],
    },
  ],
  skills: [
    { label: 'Languages & Frameworks', text: 'TypeScript, JavaScript, React.js, Next.js, Node.js, Express.js, SQL, Python, C++' },
    { label: 'Databases & Backend', text: 'PostgreSQL, Supabase, Redis, REST APIs, pgvector, WebSockets, Row Level Security (RLS)' },
    { label: 'Cloud & DevOps', text: 'AWS, Docker, Kubernetes, Linux, Git, CI/CD, Microservices, Load Balancing, Event-Driven Architecture' },
  ],
  achievements: [
    { label: 'President | Deviators Club', text: 'Leading tech community; hosted hackathons, DSA bootcamps, and tech meetups.' },
    { label: 'Finalist | Innovate4FinLit National Challenge', text: 'Recognized for building a gamified financial literacy platform.' },
  ],
};
