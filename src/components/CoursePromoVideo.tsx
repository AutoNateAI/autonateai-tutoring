import React from 'react';
import Heading from '@theme/Heading';

type CoursePromoVideoProps = {
  title?: string;
  description: string;
};

export default function CoursePromoVideo({
  title = 'See the portal before you buy',
  description,
}: CoursePromoVideoProps): React.JSX.Element {
  return (
    <section
      className="card shadow--md"
      style={{
        marginTop: '1.5rem',
        background: '#0d1526',
        border: '1px solid rgba(37, 194, 160, 0.28)',
      }}>
      <div className="card__body" style={{padding: '2rem'}}>
        <div style={{marginBottom: '1.25rem'}}>
          <div style={{color: '#8cd9c8', fontWeight: 700, marginBottom: '0.45rem'}}>Product demo</div>
          <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem', marginBottom: '0.6rem'}}>
            {title}
          </Heading>
          <p style={{color: '#cbd5e0', lineHeight: '1.7', marginBottom: 0, maxWidth: '760px'}}>
            {description}
          </p>
        </div>

        <div
          style={{
            border: '1px solid rgba(37, 194, 160, 0.22)',
            borderRadius: '20px',
            background: '#081121',
            overflow: 'hidden',
          }}>
          <video
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/img/og-booking.png"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              background: '#081121',
            }}>
            <source src="/video/autonateai-portal-promo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
