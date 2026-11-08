'use client';

import { Pause, Play } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';

export function ProfileBanner() {
  const clip = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function positionSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const banner = event.currentTarget;
    const box = banner.getBoundingClientRect();
    banner.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
    banner.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
    banner.classList.add('banner-revealing');
  }

  function togglePlayback() {
    const video = clip.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <div
      className="photo-banner"
      onPointerEnter={positionSpotlight}
      onPointerMove={positionSpotlight}
      onPointerLeave={event => event.currentTarget.classList.remove('banner-revealing')}
    >
      <video
        ref={clip} poster="/images/kohli-poster.jpg"
        autoPlay loop muted playsInline preload="auto" aria-label="Virat Kohli signing a camera lens"
        onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      >
        <source src="/video/kohli-signing.webm" type="video/webm" />
        <source src="/video/kohli-signing.mp4" type="video/mp4" />
      </video>
      <button type="button" className={`banner-playback ${playing ? '' : 'banner-paused'}`}
        onClick={togglePlayback} aria-label={playing ? 'Pause Kohli signing clip' : 'Play Kohli signing clip'}>
        {playing ? <Pause size={13} /> : <Play size={13} />}
      </button>
    </div>
  );
}
