import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';
import PageSocialMeta from '@site/src/components/PageSocialMeta';

export default function AiFirstResearcherPage(): React.JSX.Element {
  const title = 'AI-First Researcher | Build Your Research Operating System';
  const description =
    'A premium async course for researchers who want narrated instruction, workflow kits, prompt packs, and structured Sheets for synthesis and insight.';

  return (
    <Layout title={title} description={description} image="https://autonateai.com/img/og-research-cohort.png">
      <PageSocialMeta
        title={`${title} | AutoNateAI | Daily AI Thought Experiments`}
        description={description}
        image="/img/og-research-cohort.png"
        path="/services/ai-first-researcher"
      />
      <main className="container padding-vert--xl">
        <div className="margin-bottom--lg">
          <Link to="/booking">← Back to Programs</Link>
        </div>
        <section className="card shadow--md" style={{background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
          <div className="card__body" style={{padding: '2rem'}}>
            <Heading as="h1" style={{color: '#ffffff'}}>AI-First Researcher</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              A premium async course for researchers who want cleaner synthesis, stronger note systems, and a structured
              AI-assisted workflow from source intake to insight.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Format:</strong> One-time purchase with instant access</div>
              <div><strong>Price:</strong> $189</div>
              <div><strong>Inside:</strong> Narrated lecture deck, 6 research workflow kits, prompt packs, and linked Google Sheets</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>What You Get</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>A narrated lecture that teaches graph thinking and systems thinking for research work</li>
              <li>6 workflow kits for intake, comparison, gap finding, synthesis, and narrative building</li>
              <li>3 prompts per workflow to structure the work with AI instead of leaving it scattered</li>
              <li>A portal-based system designed for mobile, tablet, and desktop use</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>How It Connects To Practice</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              The researchers library gives you daily practice. AI-First Researcher gives you the operating system that
              makes those reps easier to organize, compare, and turn into usable insight.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <Link className="button button--primary button--lg" to="/booking?product=ai-first-researcher">
                Get AI-First Researcher
              </Link>
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
