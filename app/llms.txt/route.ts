import { resume } from '@/data/resume';

export const dynamic = 'force-static';

export function GET() {
  const bullets = (points: string[]) => points.map(point => `- ${point}`).join('\n');
  const { education } = resume;
  const text = [
    `# ${resume.name}`,
    [resume.location, ...resume.contacts.map(contact => `[${contact.text}](${contact.href})`)].join(' | '),
    '## Education',
    `${education.school} | ${education.degree} | ${education.date}`,
    '## Experience',
    ...resume.experience.map(job => `### ${job.company} | ${job.title} | ${job.dates}\n\n${bullets(job.points)}`),
    '## Open Source Contributions',
    resume.openSource.map(item => {
      const description = item.links.reduce(
        (value, link) => value.replace(link.text, `[${link.text}](${link.href})`),
        item.description,
      );
      return `- ${item.name}${description}`;
    }).join('\n'),
    '## Technical Projects',
    ...resume.projects.map(project => `### [${project.name}](${project.href}) | ${project.stack}\n\n${bullets(project.points)}`),
    '## Technical Skills',
    resume.skills.map(item => `- **${item.label}:** ${item.text}`).join('\n'),
    '## Achievements',
    resume.achievements.map(item => `- **${item.label}:** ${item.text}`).join('\n'),
  ].join('\n\n');
  return new Response(text + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
