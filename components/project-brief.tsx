import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Project } from '@/data/projects';
import { Emphasis } from './emphasis';

export function ProjectChallenges({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <section id="challenges" className="brief-challenges page-divider">
      {children}
      <div data-scroll-reveal className="section-heading"><span>02 / ENGINEERING</span><h2>Challenges faced</h2><p>What went wrong and how I handled it.</p></div>
      <ul className="challenge-list">
        {project.challenges.map(challenge => (
          <li key={challenge.title} data-scroll-reveal>
            <h3 className="challenge-title">{challenge.title}</h3>
            <p>{challenge.problem}</p>
            <div className="challenge-solution">
              <CheckCircle2 size={17} />
              <p><strong>How I handled it.</strong> <Emphasis text={challenge.solution} terms={challenge.keywords} /></p>
            </div>
            <div className="challenge-keywords">{challenge.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}</div>
          </li>
        ))}
      </ul>
      <a className="mini-button" href={project.github} target="_blank" rel="noreferrer">Read the source <ArrowUpRight size={13} /></a>
    </section>
  );
}
