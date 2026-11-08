type Challenge = {
  title: string;
  problem: string;
  solution: string;
  keywords: string[];
};

type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  emphasis: string[];
  tags: string[];
  status: string;
  logo: string;
  screenshot: string;
  github: string;
  live?: string;
  video?: string;
  challenges: Challenge[];
};

export const projects: Project[] = [
  {
    slug: 'snipwise',
    number: '01',
    name: 'SnipWise',
    category: 'Desktop product',
    description: 'A Windows clipboard workspace for finding, organizing, and reusing clips without leaving your current app.',
    emphasis: ['Windows clipboard workspace'],
    tags: ['Go', 'React', 'TypeScript', 'SQLite'],
    status: 'Windows beta',
    logo: '/brand/snipwise.png',
    screenshot: '/images/snipwise-live.png',
    github: 'https://github.com/AkshitBhandariCodes/SnipWise-Desktop',
    live: 'https://snipwise.akshitbhandari.codes/',
    video: '/video/snipwise-launch.mp4',
    challenges: [
      {
        title: 'Keep capture from storing the wrong things',
        problem: 'Clipboard events can contain sensitive values or be echoes of the app restoring a clip.',
        solution: 'Reject sensitive and self-written events before storage, then deduplicate approved clips before committing them to SQLite.',
        keywords: ['Capture guards', 'SQLite', 'Deduplication'],
      },
      {
        title: 'Make history available mid-task',
        problem: 'Opening a fresh window for every hotkey press adds friction to an action people repeat throughout the day.',
        solution: 'Keep the WebView2 dock resident and connect it to the Go agent through an authenticated loopback API. Use FTS5 to search locally.',
        keywords: ['Go', 'WebView2', 'FTS5', 'Local API'],
      },
      {
        title: 'Verify updates to the Windows beta',
        problem: 'A desktop updater needs a way to verify the origin and integrity of update metadata.',
        solution: 'Sign update manifests with Ed25519 and verify them against the app’s pinned public key before accepting the update.',
        keywords: ['Ed25519', 'Release automation', 'Update verification'],
      },
    ],
  },
  {
    slug: 'push2prod',
    number: '02',
    name: 'Push2Prod',
    category: 'Deployment infrastructure',
    description: 'A deployment platform prototype that takes a Git repository through a queued build, artifact storage, and per-project routing.',
    emphasis: ['queued build', 'artifact storage', 'per-project routing'],
    tags: ['TypeScript', 'Docker', 'Redis', 'PostgreSQL', 'AWS'],
    status: 'In development',
    logo: '/brand/push2prod.ico',
    screenshot: '/images/push2prod-screen.png',
    github: 'https://github.com/AkshitBhandariCodes/Push2Prod',
    challenges: [
      {
        title: 'Keep builds off the request path',
        problem: 'Cloning and compiling a repository can outlive an HTTP request and compete with API traffic for resources.',
        solution: 'Record the deployment in PostgreSQL, hand the job off through Redis Streams, and launch a temporary Docker runner for the build.',
        keywords: ['Redis Streams', 'Docker', 'PostgreSQL', 'Job queue'],
      },
      {
        title: 'Serve projects with root-relative assets',
        problem: 'A project mounted at a subpath still asks the browser for URLs like /assets/index.js from the domain root.',
        solution: 'Give each project its own hostname and route it to its artifact prefix, so existing build output resolves without rewriting asset paths.',
        keywords: ['Hostname routing', 'Static artifacts', 'Object storage'],
      },
      {
        title: 'Track failures between database and queue writes',
        problem: 'The deployment row can say queued even when publishing the stream event fails.',
        solution: 'Keep database state and job delivery visible as separate steps. Document an outbox and idempotent consumers as the next reliability improvement.',
        keywords: ['Consistency', 'Transactional outbox', 'Idempotency'],
      },
    ],
  },
  {
    slug: 'deviators-dashboard',
    number: '03',
    name: 'Deviators Dashboard',
    category: 'Community platform',
    description: 'A club platform for profiles, event registration, team invitations, and timed assessments.',
    emphasis: ['event registration', 'team invitations', 'timed assessments'],
    tags: ['Next.js', 'React', 'PostgreSQL', 'Supabase'],
    status: 'Shipped',
    logo: '/brand/deviators.svg',
    screenshot: '/images/deviators-live.png',
    github: 'https://github.com/AkshitBhandariCodes/deviators.club',
    live: 'https://www.deviators.club/',
    challenges: [
      {
        title: 'Prevent duplicate registrations',
        problem: 'Two tabs can submit the same registration before either request sees the other write.',
        solution: 'Enforce one registration per event and profile with a PostgreSQL uniqueness constraint shared by every instance.',
        keywords: ['PostgreSQL', 'Unique constraints', 'Concurrency'],
      },
      {
        title: 'Break a recursive permission check',
        problem: 'Team and membership row-level policies depended on each other, causing recursive evaluation.',
        solution: 'Move the membership predicate into a scoped SECURITY DEFINER helper with an explicit search path.',
        keywords: ['Supabase RLS', 'Authorization', 'SECURITY DEFINER'],
      },
      {
        title: 'Persist answers across serverless instances',
        problem: 'A local JSON fallback could fail to write an answer even when the response returned HTTP 200.',
        solution: 'Give each answer a stable session-and-question key and upsert it into PostgreSQL. Check assessment expiry on the server.',
        keywords: ['Serverless', 'PostgreSQL', 'Upserts'],
      },
    ],
  },
];

export type { Project };
