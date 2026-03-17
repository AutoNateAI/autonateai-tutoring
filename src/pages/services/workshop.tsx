import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';

const bookingLink = 'https://calendar.app.google/Z34RvXUL5epXJk1K8';

export default function WorkshopDetailsPage(): React.JSX.Element {
  return (
    <Layout
      title="Student Workflow Cohort | Build Your AI System Faster"
      description="A live student cohort for turning ChatGPT, Sheets, and structured prompts into a usable workflow system."
      image="https://autonateai.com/img/og-student-workflow.png">
      <main className="container padding-vert--xl">
        <div className="margin-bottom--lg">
          <Link to="/booking">← Back to Programs</Link>
        </div>
        <section className="card shadow--md" style={{background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
          <div className="card__body" style={{padding: '2rem'}}>
            <Heading as="h1" style={{color: '#ffffff'}}>Student Workflow Cohort</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              A live 2-hour session for students who want to build practical AI workflows instead of collecting random
              prompts and messy notes.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Schedule:</strong> Monday and Wednesday, 7:30 PM to 9:30 PM EST</div>
              <div><strong>Price:</strong> $129 for the full two hours</div>
              <div><strong>Capacity:</strong> Maximum 25 students per cohort</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>What You Build</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>A structured note system powered by AI</li>
              <li>A stronger ChatGPT to Sheets workflow</li>
              <li>A repeatable process for turning ideas into organized outputs</li>
              <li>A clearer mental model for using AI as a system, not just a chatbot</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>Why It Works With The Library</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              The daily thought experiments give you reps. This cohort gives you the shortcuts, feedback, and live
              structure that help the reps compound faster.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <a className="button button--primary button--lg" href={bookingLink} target="_blank" rel="noopener noreferrer">
                Continue To Google Booking
              </a>
              <Link className="button button--secondary button--lg" to="/thought-experiments/students/">
                Explore Student Library
              </Link>
            </div>
          </div>
        </section>
        <FounderPanel compact />
      </main>
    </Layout>
  );
}
