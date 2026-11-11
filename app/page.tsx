import Image from 'next/image';
import { ArrowUpRight, FileCode2, Github, Linkedin, Mail, MapPin, Terminal } from 'lucide-react';
import { OpenSourceContributions } from '@/components/open-source-contributions';
import { Navigation } from '@/components/navigation';
import { PortfolioBrand } from '@/components/portfolio-brand';
import { ProfileBanner } from '@/components/profile-banner';
import { PageSideline, SidelineSticker } from '@/components/page-sideline';
import { Footer } from '@/components/footer';
import { Guestbook } from '@/components/guestbook';
import { GitHubActivity } from '@/components/github-activity';
import { VisitorBadge } from '@/components/visitor-badge';
import { SelectedProjects } from '@/components/project-card';
import { ExperienceHighlights, ResumeEntryLink } from '@/components/resume-content';
import { TechStack } from '@/components/tech-stack';

const socialProfiles = [
  { label: 'X', icon: 'x', href: 'https://x.com/akshitbhandarix' },
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/akshitbhandari19' },
  { label: 'Product Hunt', icon: 'producthunt', href: 'https://www.producthunt.com/@akshitbhandaricodes' },
];

const skillGroups = [
  { label: 'Languages', items: ['Go', 'TypeScript', 'JavaScript', 'Python', 'C++', 'SQL'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'HTML / CSS'] },
  { label: 'Backend & data', items: ['Node.js', 'Express', 'PostgreSQL', 'SQLite', 'Supabase', 'Redis'] },
  { label: 'Cloud & tooling', items: ['AWS', 'Docker', 'Git', 'GitHub', 'Linux', 'CI/CD'] },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <main id="main" className="profile-shell">
        <div className="site-toolbar">
          <PortfolioBrand home />
          <Navigation />
          <nav className="toolbar-shortcuts toolbar-sections" aria-label="Portfolio shortcuts">
            <a href="#work">Work</a>
            <a href="#experience" className="toolbar-mobile-link">Experience</a>
            <a href="#open-source" className="toolbar-mobile-link">Open source</a>
            <a href="#skills" className="toolbar-mobile-link">Toolbox</a>
            <a href="#guestbook" className="toolbar-mobile-link">Guestbook</a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
          </nav>
        </div>
        <ProfileBanner />
        <header className="profile-hero">
          <PageSideline side="right" note={{ href: '#work', text: 'see what I shipped' }}>
            <SidelineSticker kind="pull" />
          </PageSideline>
          <div className="profile-identity">
            <div className="portrait-frame">
              <Image src="/images/profile-illustration.png" width={104} height={104} sizes="(max-width: 650px) 72px, 98px" alt="Akshit Bhandari" priority />
              <span className="portrait-glint" aria-hidden="true" />
            </div>
            <div className="identity-text">
              <span className="mini-label">FULL-STACK SOFTWARE ENGINEER</span>
              <h1>Akshit Bhandari</h1>
              <p><MapPin size={13} /> New Delhi, India</p>
            </div>
            <VisitorBadge />
          </div>
          <div className="hero-intro">
            <p>
              I’m a full-stack developer interested in <strong>backend systems, cloud infrastructure, and desktop software</strong>.
              Lately I’ve been building a Windows clipboard app in Go and a platform that deploys projects straight from Git.
              I also contribute to open source and lead Deviators Club, where we run hackathons and coding events.
            </p>
            <p>
              I was a <strong>finalist at the Innovate4FinLit national hackathon</strong> with a gamified financial literacy app.
              I’ve also built client web apps at Webdesino.
            </p>
            <nav className="hero-actions" aria-label="Social profiles">
              <a href="https://github.com/AkshitBhandariCodes" className="mini-button social-github" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
              <a href="https://www.linkedin.com/in/akshitbhandaricodes" className="mini-button social-linkedin" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
              {socialProfiles.map(({ label, icon, href }) => (
                <a key={label} href={href} className={`mini-button social-${icon}`} target="_blank" rel="noreferrer">
                  <span className="social-mark" style={{ maskImage: `url(/tech/${icon}.svg)` }} aria-hidden="true" /> {label}
                </a>
              ))}
              <a href="mailto:akshitbhandaricodes@gmail.com" className="mini-button social-email"><Mail size={15} /> Email</a>
            </nav>
            <a href="/llms.txt" className="llms-link"><FileCode2 size={13} /> Plain-text résumé <span>/llms.txt ↗</span></a>
          </div>
        </header>

        <section id="work" className="portfolio-section page-divider">
          <div data-scroll-reveal className="section-heading"><span>01 / SELECTED WORK</span><h2>Projects</h2></div>
          <SelectedProjects />
        </section>

        <section id="experience" className="portfolio-section page-divider">
          <div data-scroll-reveal className="section-heading section-heading-action">
            <div><span>02 / WORK</span><h2>Experience</h2></div>
            <ResumeEntryLink />
          </div>
          <ExperienceHighlights />
        </section>

        <section id="open-source" className="portfolio-section page-divider">
          <PageSideline side="right" note={{ href: '#open-source', text: 'read the patches' }}>
            <SidelineSticker kind="review" />
          </PageSideline>
          <div data-scroll-reveal className="section-heading"><span>03 / CONTRIBUTIONS</span><h2>Open source</h2></div>
          <OpenSourceContributions />
        </section>

        <section id="activity" className="portfolio-section page-divider">
          <div data-scroll-reveal className="section-heading"><span>04 / THE COMMIT LOG</span><h2>GitHub activity</h2></div>
          <GitHubActivity />
        </section>

        <section id="skills" className="portfolio-section page-divider">
          <PageSideline side="left" note={{ href: '#skills', text: 'open the toolbox' }}>
            <SidelineSticker kind="terminal" />
          </PageSideline>
          <div data-scroll-reveal className="section-heading"><span>05 / TOOLS I USE</span><h2>Toolbox</h2></div>
          <div className="toolbox">
            {skillGroups.map(group => (
              <div key={group.label} data-scroll-reveal className="toolbox-group">
                <h3><Terminal size={13} /> {group.label}</h3>
                <TechStack items={group.items} linked />
              </div>
            ))}
          </div>
        </section>

        <Guestbook />
        <Footer />
      </main>
    </>
  );
}
