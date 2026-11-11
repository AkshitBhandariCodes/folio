import Image from 'next/image';
import { ArrowRight, Check, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Project } from '@/data/projects';
import { Emphasis } from './emphasis';
import { ProjectLinks } from './project-card';
import { TechStack } from './tech-stack';

export function ProjectBrief({ project, children }: { project: Project; children: ReactNode }) {
  const screenshot = project.caseScreenshot ?? project.screenshot;

  return (
    <>
      <section id="preview" className="case-section case-product" aria-labelledby="product-heading">
        <h2 id="product-heading" className="case-heading"><span>01</span> The product</h2>
        <p className="case-description"><Emphasis text={project.product} terms={project.productEmphasis ?? []} /></p>
        <figure className="case-media">
          <div className="case-media-bar">
            <span>{project.video ? 'Launch film' : 'Product preview'}</span>
            <ProjectLinks project={project} />
          </div>
          {project.video ? (
            <video controls playsInline preload="metadata" poster={screenshot.src} src={project.video}
              aria-label={`${project.name} launch film`} />
          ) : (
            <Image {...screenshot}
              alt={screenshot.alt ?? `${project.name} product interface`} sizes="(max-width: 800px) 94vw, 700px" priority />
          )}
          <figcaption>{project.mediaCaption}</figcaption>
        </figure>
      </section>

      <section id="stack" className="case-section page-divider" aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="case-heading"><span>02</span> How I used the stack</h2>
        <ul className="case-stack">
          {project.stack.map(({ role, tools, use }) => (
            <li key={role} className="case-stack-item">
              <h3>{role}</h3>
              <p>{use}</p>
              <TechStack items={tools} />
            </li>
          ))}
        </ul>
      </section>

      <section id="challenges" className="case-section brief-challenges page-divider" aria-labelledby="decisions-heading">
        {children}
        <h2 id="decisions-heading" className="case-heading"><span>03</span> Engineering decisions</h2>
        <ol className="decision-timeline">
          {project.decisions.map((decision, index) => (
            <li key={decision.title}>
              <span className="decision-index" aria-hidden="true">{index + 1}</span>
              <h3>{decision.title}</h3>
              <dl className="decision-steps">
                <div className="decision-constraint">
                  <dt><TriangleAlert size={14} aria-hidden="true" /> Constraint</dt>
                  <dd><Emphasis text={decision.constraint} terms={decision.emphasis ?? []} /></dd>
                </div>
                <div className="decision-choice">
                  <dt><ArrowRight size={14} aria-hidden="true" /> Decision</dt>
                  <dd><Emphasis text={decision.approach} terms={decision.emphasis ?? []} /></dd>
                </div>
                <div className="decision-result">
                  <dt><Check size={14} aria-hidden="true" /> Result</dt>
                  <dd>{decision.outcome}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
