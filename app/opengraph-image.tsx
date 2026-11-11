import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Akshit Bhandari, full-stack software engineer, with his pixel mascot above a dithered moon.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const image = await readFile(join(process.cwd(), 'public', 'images', 'og-portfolio.png'));
  return new Response(new Uint8Array(image), {
    headers: { 'Content-Type': contentType },
  });
}
