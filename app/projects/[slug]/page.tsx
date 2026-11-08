import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { Navigation } from '@/components/navigation';
import { PortfolioBrand } from '@/components/portfolio-brand';
import { PageSideline, SidelineSticker, type StickerKind } from '@/components/page-sideline';
import { SidelineTree } from '@/components/sideline-tree';
import { Footer } from '@/components/footer';
import { ProjectChallenges } from '@/components/project-brief';
import { ProjectLinks, ProjectLogo } from '@/components/project-card';
import { Emphasis } from '@/components/emphasis';
import { TechStack } from '@/components/tech-stack';

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
          <SidelineTree />
          {notes && <PageSideline side="right" note={{ href: '#preview', text: notes.preview }} />}
          <span className="mini-label">PROJECT {project.number} / {project.category}</span>
          <div className="brief-title"><ProjectLogo project={project} /><h1>{project.name}</h1></div>
          <p className="brief-overview"><Emphasis text={project.description} terms={project.emphasis} /></p>
          <ProjectLinks project={project} />
          <TechStack items={project.tags} />
        </header>
        <div id="preview" className="brief-preview">
          <Image src={project.screenshot} width={1440} height={960} alt={`${project.name} product screenshot`} sizes="(max-width: 800px) 94vw, 720px" priority />
          <span>01 / PRODUCT PREVIEW</span>
        </div>

        <ProjectChallenges project={project}>
          {notes && (
            <PageSideline side="left" note={{ href: '#challenges', text: notes.challenges }}>
              <SidelineSticker kind={notes.sticker} />
            </PageSideline>
          )}
        </ProjectChallenges>
        {project.video && (
          <details className="brief-demo">
            <summary>Watch the SnipWise launch film <span>Optional demo ↓</span></summary>
            <video controls playsInline preload="none" poster={project.screenshot} src={project.video} />
          </details>
        )}
        <Link href={`/projects/${next.slug}`} className="brief-next page-divider">
          <div><span className="mini-label">NEXT PROJECT</span><h2>{next.name}</h2></div><ArrowRight size={22} />
        </Link>
        <Footer />
      </main>
    </>
  );
}
