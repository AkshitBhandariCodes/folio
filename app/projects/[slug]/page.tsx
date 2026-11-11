import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { Navigation } from '@/components/navigation';
import { PortfolioBrand } from '@/components/portfolio-brand';
import { PageSideline, SidelineSticker, type StickerKind } from '@/components/page-sideline';
import { Footer } from '@/components/footer';
import { ProjectBrief } from '@/components/project-brief';
import { ProjectLogo } from '@/components/project-card';

const projectNotes: Partial<Record<string, { preview: string; challenges: string; sticker: StickerKind }>> = {
  snipwise: {
    preview: 'see the clipboard in action',
    challenges: 'clipboard gremlins live here',
    sticker: 'clipboard',
  },
  push2prod: {
    preview: 'follow a build to prod',
    challenges: 'where builds get weird',
    sticker: 'rocket',
  },
  'deviators-dashboard': {
    preview: 'peek inside the clubhouse',
    challenges: 'race conditions, anyone?',
    sticker: 'flag',
  },
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: project?.name || 'Project', description: project?.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(item => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const notes = projectNotes[slug];

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <main id="main" className="brief-shell">
        <div className="site-toolbar">
          <PortfolioBrand />
          <div className="toolbar-shortcuts"><Link href="/#work"><ArrowLeft size={13} /> Projects</Link></div>
          <Navigation />
        </div>
        <header id="overview" className="brief-header">
          {notes && (
            <PageSideline side="right" note={{ href: '#preview', text: notes.preview }}>
              <SidelineSticker kind="preview" />
            </PageSideline>
          )}
          <div className="project-meta case-meta"><span>{project.category}</span><span><i /> {project.status}</span></div>
          <div className="brief-title"><ProjectLogo project={project} /><h1>{project.name}</h1></div>
        </header>
        <ProjectBrief project={project}>
          {notes && (
            <PageSideline side="right" note={{ href: '#challenges', text: notes.challenges }}>
              <SidelineSticker kind={notes.sticker} />
            </PageSideline>
          )}
        </ProjectBrief>
        <Link href={`/projects/${next.slug}`} className="brief-next page-divider">
          <div><span className="mini-label">NEXT PROJECT</span><h2>{next.name}</h2></div><ArrowRight size={22} />
        </Link>
        <Footer />
      </main>
    </>
  );
}
