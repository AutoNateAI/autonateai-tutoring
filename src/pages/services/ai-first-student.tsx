import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';
import PageSocialMeta from '@site/src/components/PageSocialMeta';

export default function AiFirstStudentPage(): React.JSX.Element {
  const title = 'AI-First Student | Build Your Student Operating System';
  const description =
    'A premium async course for students who want narrated instruction, workflow kits, prompt packs, and connected Sheets to build a real AI system.';

  return (
    <Layout title={title} description={description} image="https://autonateai.com/img/og-student-workflow.png">
      <PageSocialMeta
        title={`${title} | AutoNateAI | Daily AI Thought Experiments`}
        description={description}
        image="/img/og-student-workflow.png"
        path="/services/ai-first-student"
      />
      <main className="container padding-vert--xl">
        <div className="margin-bottom--lg">
          <Link to="/booking">← Back to Programs</Link>
        </div>
        <section className="card shadow--md" style={{background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
          <div className="card__body" style={{padding: '2rem'}}>
            <Heading as="h1" style={{color: '#ffffff'}}>AI-First Student</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              A premium async course for students who want to turn AI into a real operating system for school, planning,
              reflection, and daily execution.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Format:</strong> One-time purchase with instant access</div>
              <div><strong>Price:</strong> $129</div>
              <div><strong>Inside:</strong> Narrated lecture deck, 6 workflow kits, prompt packs, and linked Google Sheets</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>What You Get</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>A narrated mini-lecture that teaches graph thinking and systems thinking for student life</li>
              <li>6 sheet-based workflow kits designed for planning, studying, and debriefing</li>
              <li>3 prompts per workflow so you can move from messy input to structured outputs</li>
              <li>A portal experience that works on mobile, tablet, and desktop</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>How It Fits The Free Library</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              The daily thought experiments build the reps. AI-First Student gives you the narrated framework and the
              concrete workflow system so those reps compound into an actual way of working.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <Link className="button button--primary button--lg" to="/booking?product=ai-first-student">
                Get AI-First Student
              </Link>
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
