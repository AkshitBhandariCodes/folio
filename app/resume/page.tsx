import { Download } from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { PortfolioBrand } from '@/components/portfolio-brand';
import { resume } from '@/data/resume';

export const metadata = { title: 'Résumé' };

function Points({ points }: { points: string[] }) {
  return <ul className="resume-points">{points.map(point => <li key={point}>{point}</li>)}</ul>;
}

export default function ResumePage() {
  return (
    <main id="main" className="brief-shell resume-shell">
      <div className="site-toolbar"><PortfolioBrand /><Navigation /></div>
      <header className="brief-header">
        <span className="mini-label">WEB RÉSUMÉ</span>
        <h1>{resume.name}</h1>
        <p className="brief-overview">{resume.location}</p>
        <div className="resume-contacts">{resume.contacts.map(contact => <a key={contact.href} href={contact.href}>{contact.text}</a>)}</div>
        <div className="project-actions"><a href="/resume.pdf" target="_blank" rel="noreferrer"><Download size={14} /> Original PDF</a></div>
      </header>

      <section id="education" className="resume-section page-divider">
        <div data-scroll-reveal className="section-heading"><h2>Education</h2></div>
        <div className="resume-document-entry">
          <div className="resume-entry-heading"><h3>{resume.education.school}</h3><span>{resume.education.date}</span></div>
          <p>{resume.education.degree}</p>
        </div>
      </section>
      <section id="experience" className="resume-section page-divider">
        <div data-scroll-reveal className="section-heading"><h2>Experience</h2></div>
        {resume.experience.map(job => (
          <article key={job.company} className="resume-document-entry">
            <div className="resume-entry-heading"><h3>{job.title}</h3><span>{job.dates}</span></div>
            <p>{job.company}</p>
            <Points points={job.points} />
          </article>
        ))}
      </section>
      <section id="open-source" className="resume-section page-divider">
        <div data-scroll-reveal className="section-heading"><h2>Open Source Contributions</h2></div>
        <ul className="resume-points">
          {resume.openSource.map(item => {
            const parts = item.description.split(/(#\d+)/);
            return (
              <li key={item.name}><strong>{item.name}</strong>{parts.map((part, index) => {
                const link = item.links.find(link => link.text === part);
                return link ? <a key={index} href={link.href}>{part}</a> : part;
              })}</li>
            );
          })}
        </ul>
      </section>
      <section id="work" className="resume-section page-divider">
        <div data-scroll-reveal className="section-heading"><h2>Technical Projects</h2></div>
        {resume.projects.map(project => (
          <article key={project.name} className="resume-document-entry">
            <h3><a href={project.href}>{project.name}</a></h3>
            <p>{project.stack}</p>
            <Points points={project.points} />
          </article>
        ))}
      </section>
      <section id="skills" className="resume-section page-divider">
        <div data-scroll-reveal className="section-heading"><h2>Technical Skills</h2></div>
        <ul className="resume-points">{resume.skills.map(item => <li key={item.label}><strong>{item.label}:</strong> {item.text}</li>)}</ul>
      </section>
      <section id="achievements" className="resume-section page-divider">
        <div data-scroll-reveal className="section-heading"><h2>Achievements</h2></div>
        <ul className="resume-points">{resume.achievements.map(item => <li key={item.label}><strong>{item.label}:</strong> {item.text}</li>)}</ul>
      </section>
    </main>
  );
}
