import React, {useEffect, useRef, useState} from 'react';

type HeroPromoVideoProps = {
  className?: string;
};

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export default function HeroPromoVideo({className = ''}: HeroPromoVideoProps): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = !soundOn;
    video.volume = soundOn ? 1 : 0;
    void video.play().catch(() => {});
  }, [soundOn]);

  const handleFullscreen = async () => {
    const video = videoRef.current as FullscreenVideo | null;
    const shell = shellRef.current;
    if (!video) {
      return;
    }

    setSoundOn(true);
    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;
    await video.play().catch(() => {});

    if (typeof video.webkitEnterFullscreen === 'function') {
      video.webkitEnterFullscreen();
      return;
    }

    if (document.fullscreenElement !== shell && shell?.requestFullscreen) {
      await shell.requestFullscreen().catch(() => {});
      return;
    }

    if (document.fullscreenElement !== video && video.requestFullscreen) {
      await video.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div ref={shellRef} className={`hero-video-shell hero-content-fade-in ${className}`.trim()}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/img/og-homepage.png"
        className="hero-demo-video">
        <source src="/video/autonateai-portal-promo.mp4" type="video/mp4" />
      </video>

      <div className="hero-video-actions">
        <button
          type="button"
          onClick={() => setSoundOn((value) => !value)}
          className="hero-sound-toggle">
          {soundOn ? 'Sound On' : 'Tap For Sound'}
        </button>
        <button type="button" onClick={() => void handleFullscreen()} className="hero-fullscreen-toggle">
          Full Screen Demo
        </button>
      </div>
    </div>
  );
}
