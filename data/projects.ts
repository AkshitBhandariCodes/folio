type Decision = {
  title: string;
  constraint: string;
  approach: string;
  outcome: string;
  emphasis?: string[];
};

type ProjectScreenshot = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  emphasis: string[];
  product: string;
  productEmphasis?: string[];
  mediaCaption: string;
  tags: string[];
  stack: { role: string; tools: string[]; use: string }[];
  status: string;
  logo: string;
  screenshot: ProjectScreenshot;
  caseScreenshot?: ProjectScreenshot;
  github: string;
  live?: string;
  video?: string;
  decisions: Decision[];
};

export const projects: Project[] = [
  {
    slug: 'snipwise',
    name: 'SnipWise',
    category: 'Native Windows app',
    description: 'I built a Windows clipboard workspace with a Go desktop agent, a React dock, and SQLite search. A native Windows drag layer lets users drop saved images into other apps.',
    emphasis: ['Windows clipboard workspace', 'native Windows drag layer'],
    product: 'SnipWise saves reusable clips on Windows. Open the quick dock from your current app to find an old clip, convert it, paste it back, or drag an image into another app. Clipboard history and search work offline.',
    mediaCaption: 'Launch film showing the quick dock, clipboard history, and conversion tools.',
    tags: ['Go', 'React', 'TypeScript', 'SQLite'],
    stack: [
      { role: 'Native host', tools: ['Go'], use: 'The Go agent watches the clipboard, owns the hotkey and windows, and hands cross-app drags to Windows OLE.' },
      { role: 'Embedded interface', tools: ['React', 'TypeScript'], use: 'React renders the dock and Dashboard in WebView2. A token-protected local API searches, organizes, and restores clips.' },
      { role: 'Offline search', tools: ['SQLite'], use: 'SQLite stores clipboard history and indexes clip text with FTS5 so search works offline.' },
    ],
    status: 'Windows v1',
    logo: '/brand/snipwise.png',
    screenshot: { src: '/images/snipwise-live.png', width: 1440, height: 1000 },
    github: 'https://github.com/AkshitBhandariCodes/SnipWise-Desktop',
    live: 'https://snipwise.akshitbhandari.codes/',
    video: '/video/snipwise-launch.mp4',
    decisions: [
      {
        title: 'Hand image drags to Windows OLE',
        constraint: 'WebView2’s browser drag could not deliver a real PNG file to web drop targets. Starting OLE after WebView2 owned the mouse press ended the drag immediately.',
        approach: 'I put a transparent native Go window over the image preview so it receives the press first. It starts OLE DoDragDrop and offers PNG, bitmap, and file data. A stationary press is forwarded as a normal click.',
        outcome: 'Mouse tests dropped a PNG into an Edge page and a file into Explorer from both clipboard views.',
        emphasis: ['could not deliver a real PNG file', 'transparent native Go window', 'OLE DoDragDrop'],
      },
      {
        title: 'Expand shortcuts only in verified editors',
        constraint: 'A global shortcut can fire after focus has moved. Rich editors can also report a generic pane where the actual text field is hard to identify.',
        approach: 'I kept the keyboard hook limited to matching aliases. A separate worker checks Windows accessibility roles and password flags, then rechecks focus before sending input.',
        outcome: 'Password fields, unknown controls, and changed targets are skipped. The typed alias stays in place when the check fails.',
        emphasis: ['focus has moved', 'generic pane', 'separate worker', 'rechecks focus before sending input'],
      },
      {
        title: 'Recover clipboard reads lost to contention',
        constraint: 'Windows can notify the agent while another process still holds the clipboard. When the listener’s read fails, there may be no second notification for that copy.',
        approach: 'I used Windows clipboard sequence numbers to retry missed reads. The listener and retry path share the sensitive-content guard and deduplicate by sequence, format, and hash.',
        outcome: 'A missed copy can be recovered after the clipboard unlocks. Sensitive items and the app’s own writes stay out of history.',
        emphasis: ['another process still holds the clipboard', 'clipboard sequence numbers', 'sensitive-content guard'],
      },
      {
        title: 'Resume interrupted installer releases',
        constraint: 'GitHub can return an error after creating a release. Retrying creation can collide with the existing tag, and interrupted uploads can leave a partial update.',
        approach: 'I made CI reuse a tag only when it matches the source commit, then replace and re-download the assets for byte checks. The updater validates an Ed25519-signed manifest and installer hash before launch.',
        outcome: 'CI can resume the same release after an interruption. Installed clients reject incomplete or mismatched update bytes.',
        emphasis: ['after creating a release', 'reuse a tag only when it matches the source commit', 'Ed25519-signed manifest'],
      },
    ],
  },
  {
    slug: 'push2prod',
    name: 'Push2Prod',
    category: 'Deployment infrastructure',
    description: 'I built a self-hosted Git-to-deploy platform for frontend projects. Redis Streams queue builds, disposable Docker runners publish static output to S3, and each project gets a preview subdomain.',
    emphasis: ['self-hosted Git-to-deploy platform', 'disposable Docker runners', 'preview subdomain'],
    product: 'Push2Prod is an open-source deployment platform for frontend projects. Connect a GitHub repository, start a build, and follow its logs in the dashboard. A fresh Docker runner builds the project and uploads its static output to S3. The router gives each project its own preview subdomain.',
    productEmphasis: ['Connect a GitHub repository', 'follow its logs', 'fresh Docker runner', 'preview subdomain'],
    mediaCaption: 'The Push2Prod dashboard shows a project’s deployment state and provides access to build logs.',
    tags: ['TypeScript', 'Docker', 'Redis', 'PostgreSQL', 'AWS'],
    stack: [
      { role: 'Deployment console', tools: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL'], use: 'Next.js shows repos, deployment status, and logs. Express accepts deploy requests and persists project and build state in PostgreSQL through Prisma.' },
      { role: 'Build execution', tools: ['Redis', 'Docker'], use: 'Redis Streams queues build jobs. A controller reads each job and starts a short-lived Docker container with CPU and memory limits.' },
      { role: 'Preview hosting', tools: ['AWS'], use: 'The runner uploads artifacts to deployment-specific S3 prefixes. The Express router resolves each preview hostname to its active deployment.' },
    ],
    status: 'In development',
    logo: '/brand/push2prod.ico',
    screenshot: { src: '/images/push2prod-screen.png', width: 1024, height: 465 },
    github: 'https://github.com/AkshitBhandariCodes/Push2Prod',
    decisions: [
      {
        title: 'Fit Next.js builds on a 1 GB EC2 host',
        constraint: 'A Next.js build hit exit code 137 on a 1 GB EC2 instance that also ran the backend services. Parallel compilation exhausted the available memory.',
        approach: 'I configured a single-worker build, set V8’s old-space limit to 1,536 MB, and set Docker memory limits that let the runner use disk-backed swap.',
        outcome: 'The test build could run on the same instance. Lower concurrency and swap trade build speed for a smaller RAM footprint.',
        emphasis: ['exit code 137', '1 GB EC2 instance', 'single-worker build', 'disk-backed swap'],
      },
      {
        title: 'Give every build a fresh runner',
        constraint: 'A long-running build worker can retain files from earlier projects. Launching runners through the Docker socket also ties the executor to hosts with a Docker daemon.',
        approach: 'I queued builds in Redis Streams and gave each job a disposable Docker container with CPU and memory limits, dropped Linux capabilities, and cleanup on exit.',
        outcome: 'Each Docker build starts with a fresh workspace. I also prototyped a Kubernetes Job executor so the controller can target a cluster.',
        emphasis: ['retain files from earlier projects', 'disposable Docker container', 'CPU and memory limits'],
      },
      {
        title: 'Fix asset 404s with preview subdomains',
        constraint: 'Sites served under /site/<slug>/ rendered without styles because browsers requested root-relative CSS and JavaScript from the shared hostname root.',
        approach: 'I assigned projects wildcard preview subdomains. The Express router reads the slug from the Host header and maps requests to the correct deployment.',
        outcome: 'Framework assets resolve at the project’s own URL root without requiring a custom basePath.',
        emphasis: ['root-relative CSS and JavaScript', 'wildcard preview subdomains', 'Host header'],
      },
      {
        title: 'Discover where each build should be served',
        constraint: 'Frameworks put index.html in different folders. A fixed artifact path could miss a nested entry point or return a 404 for a clean page URL.',
        approach: 'I made the runner discover and save the directory containing index.html. The router checks candidate S3 keys for exact files, .html routes, and framework assets.',
        outcome: 'The same router serves several static build layouts. A lookup that misses the first candidate can incur extra S3 reads.',
        emphasis: ['fixed artifact path', 'directory containing index.html', 'candidate S3 keys'],
      },
    ],
  },
  {
    slug: 'deviators-dashboard',
    name: 'Deviators Dashboard',
    category: 'Community platform',
    description: 'I shipped a Next.js and Supabase dashboard for a 300+ student developer community. Members create public @username profiles, form event teams, and download personalized certificates.',
    emphasis: ['300+ student developer community', 'public @username profiles', 'form event teams', 'personalized certificates'],
    product: 'Students create a shareable @username profile with a photo, bio, and links. They can register for events, create teams, and invite teammates by handle. Server-side checks catch duplicate leaders and existing team memberships. After Debug Decrypt 3.0, participants can download a personalized certificate from My Events.',
    productEmphasis: ['shareable @username profile', 'invite teammates by handle', 'duplicate leaders and existing team memberships', 'personalized certificate'],
    mediaCaption: 'The Debug Decrypt 3.0 organizer view shows confirmed members, pending invites, and the roster CSV export.',
    tags: ['Next.js', 'React', 'PostgreSQL', 'Supabase'],
    stack: [
      { role: 'Member dashboard', tools: ['Next.js', 'React', 'TypeScript'], use: 'Next.js serves public member cards and the event dashboard. The browser adds each participant’s name to the certificate template using Canvas.' },
      { role: 'Team registration', tools: ['PostgreSQL', 'Next.js'], use: 'Server routes resolve @usernames, check leaders and memberships, and save each event registration against a unique event and profile key.' },
      { role: 'Access control', tools: ['Supabase', 'PostgreSQL'], use: 'Supabase handles sign-in. PostgreSQL row-level policies govern roster access, while a database function returns the fields shown on public member cards.' },
    ],
    status: 'Shipped',
    logo: '/brand/deviators.svg',
    screenshot: {
      src: '/images/deviators-dashboard.png',
      width: 1462,
      height: 872,
      alt: 'Deviators member dashboard with an @username profile, event tabs, and the Web Lumina 2026 event card',
    },
    caseScreenshot: {
      src: '/images/deviators-team-roster.png',
      width: 1433,
      height: 553,
      alt: 'Debug Decrypt 3.0 organizer roster showing 133 teams, 335 confirmed members, and the CSV export action',
    },
    github: 'https://github.com/AkshitBhandariCodes/deviators.club',
    live: 'https://www.deviators.club/',
    decisions: [
      {
        title: 'Catch duplicate leaders, members, and registrations',
        constraint: 'Team creation and invite acceptance have different entry points. A participant can already lead or belong to a team, and two requests can race to register the same profile.',
        approach: 'Check leader and membership conflicts in the event APIs. Back registration upserts with a PostgreSQL unique key on (event_id, profile_id).',
        outcome: 'Conflicting team actions get a specific error, and concurrent writes cannot create two registration rows for the same profile and event.',
        emphasis: ['two requests can race', 'leader and membership conflicts', 'unique key on (event_id, profile_id)'],
      },
      {
        title: 'Break the loop in roster access policies',
        constraint: 'The teams policy looked up members, and the members policy looked up team leaders. PostgreSQL raised an infinite recursion error during roster reads.',
        approach: 'Move the membership lookup into a SECURITY DEFINER function that returns a boolean. The team policy calls it with the signed-in user’s ID.',
        outcome: 'PostgreSQL can evaluate who can see a roster without re-entering the same policy chain.',
        emphasis: ['infinite recursion error', 'SECURITY DEFINER function', 'signed-in user’s ID'],
      },
      {
        title: 'Share profiles without exposing private records',
        constraint: 'Public @username pages need to load for signed-out visitors. The underlying account and registration records contain private fields.',
        approach: 'Resolve the handle through a PostgreSQL function that returns an explicit list of display fields for onboarded members. Keep anonymous reads of the profiles table restricted.',
        outcome: 'Members can share their profile link publicly while the page excludes emails, phone numbers, and college roll numbers.',
        emphasis: ['signed-out visitors', 'explicit list of display fields'],
      },
      {
        title: 'Fix roster downloads that cut off at a hash',
        constraint: 'A # in a roster field was interpreted as a URL fragment when CSV downloads used a data URL, cutting off the rest of the file.',
        approach: 'Build the escaped CSV as a UTF-8 Blob with a byte-order mark and download it through a temporary object URL.',
        outcome: 'Organizers can export the full roster, and Excel can read Unicode names and fields.',
        emphasis: ['interpreted as a URL fragment', 'UTF-8 Blob', 'temporary object URL'],
      },
    ],
  },
];

export type { Project };
