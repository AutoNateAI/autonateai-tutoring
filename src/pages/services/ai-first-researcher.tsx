import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FounderPanel from '@site/src/components/FounderPanel';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import PortalPreviewEmbed from '@site/src/components/PortalPreviewEmbed';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';

const portalBase = 'https://portal.autonateai.com/#';

export default function AiFirstResearcherPage(): React.JSX.Element {
  const title = 'AutoNateAI Opportunity Brief Setup | Operator Intelligence';
  const description =
    'Purchase an AutoNateAI opportunity brief setup for regional intelligence, funding movement summaries, active grants, likely subcontracting activity, regional hiring pressure, and organizational movement.';

  return (
    <Layout title={title} description={description}>
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
            <Heading as="h1" style={{color: '#ffffff'}}>AutoNateAI Opportunity Brief Setup</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              Purchase the setup for a paid opportunity brief. We scope the first brief around your region, market,
              funding lane, procurement question, workforce signal, or operating opportunity.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Format:</strong> Initial paid opportunity brief setup</div>
              <div><strong>Starting Price:</strong> $189</div>
              <div><strong>Inside:</strong> Scope intake, brief structure, signal categories, and delivery plan</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>Brief Lanes</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>Weekly opportunity reports</li>
              <li>Funding movement summaries and active grant watchlists</li>
              <li>Likely subcontracting activity and procurement visibility</li>
              <li>Regional hiring pressure and workforce signal reporting</li>
              <li>Organizational movement and practical next-move recommendations</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>How It Connects To Practice</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              Free briefs can build trust and show the research style. Paid briefs go deeper: they identify money
              movement, organizations, pressure, and possible next moves for a specific buyer or market.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <Link className="button button--secondary button--lg" to="/research">
                Browse Opportunity Briefs
              </Link>
            </div>
          </div>
        </section>
        <BrowserOnly fallback={<div className="margin-top--lg">Loading checkout…</div>}>
          {() => <SquareCheckoutCard initialProductId="ai-first-researcher" />}
        </BrowserOnly>
        <PortalPreviewEmbed
          title="See the brief workspace before you buy"
          description="This is the working surface for opportunity brief production: research intake, source organization, synthesis, and structured delivery."
          dashboardUrl={`${portalBase}/preview/researcher`}
          workflowUrl={`${portalBase}/preview/workflows/source-intake-sheet`}
          openUrl={`${portalBase}/preview/researcher`}
        />
        <FounderPanel compact />
      </main>
    </Layout>
  );
}
