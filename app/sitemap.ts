import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  return [{url:'https://akshitbhandari.codes', changeFrequency:'monthly', priority:1}, {url:'https://akshitbhandari.codes/resume', changeFrequency:'monthly', priority:0.8}, ...projects.map(p=>({url:`https://akshitbhandari.codes/projects/${p.slug}`,changeFrequency:'monthly' as const, priority:0.8}))];
}
