import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Globe2 } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { Emphasis } from '@/components/emphasis';
import { TechStack } from './tech-stack';

export function ProjectLogo({ project }: { project: Project }) {
  return <span className={`project-logo logo-${project.slug}`}><img src={project.logo} alt="" /></span>;
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-actions">
      <a href={project.github} target="_blank" rel="noreferrer" aria-label={`GitHub repository for ${project.name}`}>
        <Github size={15} /> GitHub <ArrowUpRight size={11} />
      </a>
      {project.live && (
        <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Website for ${project.name}`}>
          <Globe2 size={15} /> Website <ArrowUpRight size={11} />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`;
  return (
    <article data-scroll-reveal className="project-row" data-project={project.slug}>
      <Link href={href} className="project-image-link" aria-label={`Read ${project.name} case study`}>
        <span className="project-preview-index" aria-hidden="true">{project.number} / PREVIEW</span>
        <span className="project-preview-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
        <div className="project-window">
          <span className="project-window-bar" aria-hidden="true"><i /><i /><i /></span>
          <Image src={project.screenshot} width={720} height={500}
            alt={`${project.name} product screenshot`} sizes="(max-width: 560px) 88vw, 350px" />
        </div>
      </Link>
      <div className="project-copy">
        <div className="project-meta"><span>{project.category}</span><span><i /> {project.status}</span></div>
        <Link href={href} className="project-name-link"><ProjectLogo project={project} /><h3>{project.name}</h3><ArrowUpRight size={15} /></Link>
        <p><Emphasis text={project.description} terms={project.emphasis} /></p>
        <TechStack items={project.tags} />
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function SelectedProjects() {
  return <div className="project-rows">{projects.map(project => <ProjectCard key={project.slug} project={project} />)}</div>;
}
