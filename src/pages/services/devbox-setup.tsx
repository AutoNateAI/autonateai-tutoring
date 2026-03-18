import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';
import PageSocialMeta from '@site/src/components/PageSocialMeta';

const bookingLink = 'https://calendar.app.google/fTQpDxdnJXaYE8neA';

export default function DevboxSetupPage(): React.JSX.Element {
  const title = 'DevBox Setup | Build Your AI Workspace';
  const description =
    'A higher-touch setup path for professionals who want a cleaner AI environment, stronger tooling, and structured execution.';

  return (
    <Layout
      title={title}
      description={description}
      image="https://autonateai.com/img/og-devbox-setup.png">
      <PageSocialMeta
        title={`${title} | AutoNateAI | Daily AI Thought Experiments`}
        description={description}
        image="/img/og-devbox-setup.png"
        path="/services/devbox-setup"
      />
      <main className="container padding-vert--xl">
        <div className="margin-bottom--lg">
          <Link to="/booking">← Back to Programs</Link>
        </div>
        <section className="card shadow--md" style={{background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
          <div className="card__body" style={{padding: '2rem'}}>
            <Heading as="h1" style={{color: '#ffffff'}}>DevBox Setup</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              This is the higher-touch infrastructure path for professionals who want a stronger AI environment to build,
              test, and run workflows with less friction.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Format:</strong> Discovery call and scoped setup path</div>
              <div><strong>Best For:</strong> Professionals, founders, and operators who want their own working AI environment</div>
              <div><strong>Booking:</strong> Starts from the same Google booking flow previously used for business systems consults</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>What This Service Covers</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>Scoping the environment you actually need</li>
              <li>Discussing a DevBox-style setup for structured AI work</li>
              <li>Aligning tooling, workflows, and next-step implementation</li>
              <li>Creating a path from experiments to a cleaner working system</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>Why It Fits The Site</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              The thought experiments train the way you think. The cohorts help you build faster. The DevBox setup is for
              when you want the environment itself to support that way of thinking.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <a className="button button--primary button--lg" href={bookingLink} target="_blank" rel="noopener noreferrer">
                Continue To Google Booking
              </a>
              <Link className="button button--secondary button--lg" to="/thought-experiments/professionals/">
                Explore Professional Library
              </Link>
            </div>
          </div>
        </section>
        <FounderPanel compact />
      </main>
    </Layout>
  );
}
