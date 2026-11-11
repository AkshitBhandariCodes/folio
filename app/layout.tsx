import type { Metadata } from 'next';
import { MotionProvider } from '@/components/motion-provider';
import { CatCursor } from '@/components/cat-cursor';
import { VisitorPresence } from '@/components/visitor-badge';
import './globals.css';
import './pixel.css';
import './playful.css';
import './dividers.css';
import './guestbook.css';
import './open-source.css';
import './footer.css';
export const metadata: Metadata = { metadataBase: new URL('https://akshitbhandari.codes'), title: {default: 'Akshit Bhandari — Software Engineer & Builder', template: '%s — Akshit Bhandari'}, description: 'Selected projects and experience from Akshit Bhandari. Explore full stack, backend, cloud and DevOps, or systems design.', openGraph: {title: 'Akshit Bhandari — Software Engineer & Builder', description: 'Projects, challenges, and engineering experience.', type: 'website'}, twitter: {card: 'summary_large_image'}, robots: {index:true,follow:true} };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {/* Browser extensions can add attributes to the body before React hydrates. */}
      <body suppressHydrationWarning>
        <MotionProvider>
          <VisitorPresence>{children}</VisitorPresence>
          <CatCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
