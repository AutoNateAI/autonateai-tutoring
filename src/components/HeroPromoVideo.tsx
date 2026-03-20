import React, {useEffect, useRef, useState} from 'react';

export default function HeroPromoVideo(): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  return (
    <div className="hero-video-shell hero-content-fade-in">
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

      <button
        type="button"
        onClick={() => setSoundOn((value) => !value)}
        className="hero-sound-toggle">
        {soundOn ? 'Sound On' : 'Tap For Sound'}
      </button>
    </div>
  );
}
