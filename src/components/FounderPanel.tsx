import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

type FounderPanelProps = {
  compact?: boolean;
};

export default function FounderPanel({compact = false}: FounderPanelProps): React.JSX.Element {
  return (
    <section
      className="margin-top--xl shadow--lw"
      style={{
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        borderRadius: '18px',
        overflow: 'hidden',
      }}>
      <div className="row no-gutters" style={{alignItems: 'stretch'}}>
        <div className="col col--4">
          <Link to="/services/researchers" style={{display: 'block', height: '100%'}}>
            <img
              src="/img/nate-instructor.jpg"
              alt="Nate Baker - Founder, Instructor, and Principal Consultant at AutoNateAI"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                minHeight: compact ? '260px' : '320px',
                objectPosition: 'center 20%',
                display: 'block',
              }}
            />
          </Link>
        </div>
        <div className="col col--8 padding--lg" style={{padding: '1.6rem'}}>
          <Heading as="h2" style={{fontSize: compact ? '1.5rem' : '1.8rem', marginBottom: '0.9rem'}}>
            Meet The Founder
          </Heading>
          <p style={{fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '0.9rem'}}>
            I’m <span className="highlight-job">Nate Baker</span>, the
            <span className="highlight-brand"> Founder</span>,
            <span className="highlight-focus"> Instructor</span>, and
            <span className="highlight-job"> Principal Consultant</span> behind AutoNateAI.
          </p>
          <p style={{fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.9rem'}}>
            I run the workshop business, design the thought experiments, and lead the consulting work myself. The goal
            is simple: help students, researchers, and professionals turn AI concepts into systems they can actually use.
          </p>
          <p style={{fontSize: '0.95rem', lineHeight: '1.6', marginBottom: 0}}>
            The live cohorts speed up the learning. The thought experiments keep the reps going every day.
          </p>
          <div style={{marginTop: '1.15rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
            <Link className="button button--primary" to="/services/researchers">
              Read More
            </Link>
            <Link className="button button--secondary" to="/thought-experiments/">
              Explore The Library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
