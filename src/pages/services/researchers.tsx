import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';

const bookingLink = 'https://calendar.app.google/LTN9pu8uPV7Qwbmd7';

export default function ResearcherDetailsPage(): React.JSX.Element {
  return (
    <Layout
      title="Research Cohort | Organize Research With AI"
      description="A live research cohort for cleaner synthesis, stronger note systems, and more structured AI-powered research workflows."
      image="https://autonateai.com/img/og-research-cohort.png">
      <main className="container padding-vert--xl">
        <div className="margin-bottom--lg">
          <Link to="/booking">← Back to Programs</Link>
        </div>
        <section className="card shadow--md" style={{background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
          <div className="card__body" style={{padding: '2rem'}}>
            <Heading as="h1" style={{color: '#ffffff'}}>Research Cohort</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              A live cohort for researchers who want cleaner synthesis, stronger note systems, and more structured ways
              to move from sources to usable insight.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Schedule:</strong> Tuesday and Thursday, 7:30 PM to 9:30 PM EST</div>
              <div><strong>Price:</strong> $189 for the full two hours</div>
              <div><strong>Capacity:</strong> Maximum 25 students per cohort</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>What You Focus On</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>Turning messy notes into structured outputs</li>
              <li>Using AI to organize claims, evidence, and themes</li>
              <li>Building repeatable synthesis workflows in Sheets and related tools</li>
              <li>Creating research systems that are easier to search, compare, and extend</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>How It Connects To Practice</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              The researchers library gives you the daily practice surface. This cohort helps you install the structure
              faster so the daily reps become useful systems instead of scattered experiments.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <a className="button button--primary button--lg" href={bookingLink} target="_blank" rel="noopener noreferrer">
                Continue To Google Booking
              </a>
              <Link className="button button--secondary button--lg" to="/thought-experiments/researchers/">
                Explore Research Library
              </Link>
            </div>
          </div>
        </section>
        <FounderPanel compact />
      </main>
    </Layout>
  );
}
