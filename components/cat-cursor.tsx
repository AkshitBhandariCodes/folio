'use client';

import { useEffect, useRef } from 'react';

const stoppingDistance = 24;

const runFrames = [
  [[3, 0], [3, 1]], // East
  [[5, 1], [5, 2]],
  [[6, 3], [7, 2]],
  [[5, 3], [6, 1]],
  [[4, 2], [4, 3]], // West
  [[1, 0], [1, 1]],
  [[1, 2], [1, 3]],
  [[0, 2], [0, 3]],
];

export function CatCursor() {
  const cat = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sprite = cat.current;
    if (!sprite) return;

    const media = window.matchMedia('(any-pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    let lastTime = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const chase = (time: number) => {
      frame = 0;
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      if (distance <= stoppingDistance + .1) {
        sprite.dataset.pose = 'idle';
        return;
      }

      const step = Math.min(distance - stoppingDistance, Math.min(time - lastTime, 32) * .19);
      x += dx * step / distance;
      y += dy * step / distance;
      lastTime = time;

      const direction = (Math.round(Math.atan2(dy, dx) * 4 / Math.PI) + 8) % 8;
      const [column, row] = runFrames[direction][Math.floor(time / 105) % 2];
      sprite.dataset.pose = 'run';
      sprite.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      sprite.style.backgroundPosition = `${-32 * column}px ${-32 * row}px`;
      frame = requestAnimationFrame(chase);
    };

    const follow = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === 'touch') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!sprite.classList.contains('cat-visible')) {
        x = targetX + (targetX > innerWidth / 2 ? -52 : 52);
        y = Math.max(16, Math.min(innerHeight - 16, targetY + 22));
        sprite.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
        sprite.classList.add('cat-visible');
      }

      if (!frame && Math.hypot(targetX - x, targetY - y) > stoppingDistance + .1) {
        lastTime = performance.now();
        frame = requestAnimationFrame(chase);
      }
    };

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      sprite.classList.remove('cat-visible');
      sprite.removeAttribute('data-pose');
    };

    window.addEventListener('pointermove', follow, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    media.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', follow);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      media.removeEventListener('change', hide);
    };
  }, []);

  return <div ref={cat} className="cat-cursor" aria-hidden="true" />;
}
