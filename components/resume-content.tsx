import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { resume } from '@/data/resume';
import { Emphasis } from './emphasis';
import { TechStack } from './tech-stack';

const homeJobDetails = [
  { logo: '/images/webdesino.jpg', stack: ['React', 'Tailwind CSS', 'REST APIs', 'SQL'] },
  { logo: '/images/octalucent.png', stack: ['React', 'TypeScript', 'REST APIs'] },
];

export function ExperienceHighlights() {
  return (
    <div className="resume-experience">
      {resume.experience.map((job, index) => {
        const { logo, stack } = homeJobDetails[index];
        return (
          <article key={job.company} className="resume-job">
            <div className="job-heading">
              <span className="job-logo"><img src={logo} alt="" /></span>
              <div><h3>{job.title}</h3><p>{job.company}</p></div>
              <span className="job-dates">{job.dates}</span>
            </div>
            <TechStack items={stack} linked />
            <ul>
              {job.points.map(point => (
                <li key={point}><Emphasis text={point} terms={['React/Tailwind', 'React', 'TypeScript', 'REST APIs', '3+ end-to-end client applications', 'relational database schemas']} /></li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}

export function ResumeEntryLink() {
  return <Link href="/resume" className="mini-button"><BriefcaseBusiness size={14} /> View web résumé <ArrowUpRight size={11} /></Link>;
}
