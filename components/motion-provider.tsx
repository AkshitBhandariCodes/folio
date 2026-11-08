'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: .85, smoothWheel: true, syncTouch: false });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);

      function scrollToSection(event: MouseEvent) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
        if (!(event.target instanceof Element)) return;
        const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]:not(.skip-link)');
        const hash = link?.hash;
        const target = hash && document.getElementById(hash.slice(1));
        if (!hash || !target) return;

        event.preventDefault();
        if (location.hash !== hash) history.pushState(null, '', hash);
        lenis.scrollTo(target, {
          onComplete: () => {
            if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
            target.focus({ preventScroll: true });
          },
        });
      }

      for (const element of main.querySelectorAll('[data-scroll-reveal]')) {
        if (element.getBoundingClientRect().top < innerHeight * .9) continue;
        gsap.fromTo(element, { y: 18, opacity: .55 }, {
          y: 0, opacity: 1, duration: .65, ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        });
      }

      for (const divider of main.querySelectorAll('.page-divider')) {
        if (divider.getBoundingClientRect().top < innerHeight * .9) continue;
        gsap.fromTo(divider, { '--rule-opacity': .28 }, {
          '--rule-opacity': 1, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: divider, start: 'top 94%', once: true },
        });
      }

      const layout = new ResizeObserver(() => ScrollTrigger.refresh());
      layout.observe(main);
      document.addEventListener('click', scrollToSection);

      return () => {
        document.removeEventListener('click', scrollToSection);
        layout.disconnect();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => motion.revert();
  }, [pathname]);

  return children;
}
