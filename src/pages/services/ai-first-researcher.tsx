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
  const title = 'AutoNateAI Reports Setup | Operator Intelligence';
  const description =
    'Set up AutoNateAI reports for regional intelligence, funding monitoring, procurement visibility, subcontractor visibility, hiring pressure detection, and reporting automation.';

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
            <Heading as="h1" style={{color: '#ffffff'}}>AutoNateAI Reports Setup</Heading>
            <p style={{color: '#d0dae9', fontSize: '1.1rem', lineHeight: '1.7'}}>
              A paid setup path for organizations and operators that need practical intelligence reports. We scope the
              first report around your region, market, funding lane, procurement question, workforce signal, or
              operating opportunity.
            </p>
            <div style={{display: 'grid', gap: '0.65rem', margin: '1.5rem 0', color: '#ffffff'}}>
              <div><strong>Format:</strong> Initial paid reports setup</div>
              <div><strong>Starting Price:</strong> $189</div>
              <div><strong>Inside:</strong> Scope intake, report structure, signal categories, and delivery plan</div>
            </div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>Report Lanes</Heading>
            <ul style={{color: '#cbd5e0', lineHeight: '1.8'}}>
              <li>Regional intelligence and opportunity scans</li>
              <li>Funding monitoring across grants, awards, agencies, and recipients</li>
              <li>Procurement and subcontractor visibility briefs</li>
              <li>Hiring pressure detection and workforce signal reporting</li>
              <li>Reporting automation plans for recurring operator intelligence</li>
            </ul>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem'}}>How It Connects To Practice</Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7'}}>
              Free reports can build trust and show the research style. Paid reports go deeper: they identify money
              movement, organizations, pressure, and possible next moves for a specific operator or market.
            </p>
            <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
              <Link className="button button--secondary button--lg" to="/research">
                Browse Reports
              </Link>
            </div>
          </div>
        </section>
        <BrowserOnly fallback={<div className="margin-top--lg">Loading checkout…</div>}>
          {() => <SquareCheckoutCard initialProductId="ai-first-researcher" />}
        </BrowserOnly>
        <PortalPreviewEmbed
          title="See the report workspace before you buy"
          description="This is the working surface for report production: research intake, source organization, synthesis, and structured delivery."
          dashboardUrl={`${portalBase}/preview/researcher`}
          workflowUrl={`${portalBase}/preview/workflows/source-intake-sheet`}
          openUrl={`${portalBase}/preview/researcher`}
        />
        <FounderPanel compact />
      </main>
    </Layout>
  );
}
