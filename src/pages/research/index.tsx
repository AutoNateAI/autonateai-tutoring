import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';
import styles from '@site/src/components/research/research.module.css';

type BriefCard = {
  title: string;
  cadence: string;
  price: string;
  description: string;
  includes: string[];
};

type BriefCategory = {
  id: string;
  label: string;
  title: string;
  copy: string;
  cards: BriefCard[];
};

const categories: BriefCategory[] = [
  {
    id: 'regional',
    label: 'Regional',
    title: 'Regional opportunity briefs',
    copy:
      'Start here when you want a clean read on what is moving in a city, county, metro area, or West Michigan operating lane.',
    cards: [
      {
        title: 'Regional Opportunity Brief',
        cadence: 'Weekly',
        price: '$189 setup',
        description:
          'A concise weekly brief covering regional funding movement, active grants, likely subcontracting, hiring pressure, and organizational movement.',
        includes: ['Funding movement summary', 'Active grant watchlist', 'Organization movement signals'],
      },
      {
        title: 'City Opportunity Brief',
        cadence: 'Weekly or monthly',
        price: '$189 setup',
        description:
          'A city-level brief for local operators who need to see public money, recipients, agencies, and near-term opportunity signals.',
        includes: ['Local agency signals', 'Recipient movement', 'Near-term action list'],
      },
      {
        title: 'County Funding Brief',
        cadence: 'Monthly',
        price: '$189 setup',
        description:
          'A county-level scan for grants, awards, public-sector movement, program priorities, and partner activity.',
        includes: ['County funding map', 'Program priorities', 'Partner watchlist'],
      },
    ],
  },
  {
    id: 'buyers',
    label: 'Buyer Types',
    title: 'Buyer-specific briefs',
    copy:
      'Pick the version that matches who is buying the intelligence: consultants, nonprofits, vendors, staffing teams, or local businesses.',
    cards: [
      {
        title: 'Consultant Opportunity Brief',
        cadence: 'Weekly or monthly',
        price: '$189 setup',
        description:
          'For consultants who need to see where public money, local operators, procurement activity, and partner demand are creating reachable opportunities.',
        includes: ['Prospect signals', 'Procurement and partner leads', 'Recommended outreach angles'],
      },
      {
        title: 'Nonprofit Funding Brief',
        cadence: 'Weekly',
        price: '$189 setup',
        description:
          'For nonprofits tracking grants, agency priorities, local recipients, partnership chances, and service-demand pressure.',
        includes: ['Active grants', 'Agency priority shifts', 'Partner and recipient map'],
      },
      {
        title: 'Vendor & Subcontractor Brief',
        cadence: 'Weekly or monthly',
        price: '$189 setup',
        description:
          'For vendors that need visibility into prime awards, likely subcontracting activity, buyer movement, and regional demand signals.',
        includes: ['Prime award movement', 'Subcontracting indicators', 'Buyer and vendor map'],
      },
      {
        title: 'Staffing & Hiring Pressure Brief',
        cadence: 'Monthly',
        price: '$189 setup',
        description:
          'For staffing teams, training programs, and workforce operators tracking where labor demand is building.',
        includes: ['Hiring pressure indicators', 'Funding-backed workforce demand', 'Training opportunity signals'],
      },
      {
        title: 'Local Business Opportunity Brief',
        cadence: 'Monthly',
        price: '$189 setup',
        description:
          'For local businesses that want a simple read on regional growth signals, buyer movement, grants, and partnership openings.',
        includes: ['Local demand signals', 'Partnership openings', 'Practical next moves'],
      },
    ],
  },
  {
    id: 'signals',
    label: 'Signal Types',
    title: 'Signal-specific briefs',
    copy:
      'Use these when you already know the kind of movement you care about and want the brief focused tightly around that signal.',
    cards: [
      {
        title: 'Funding Movement Brief',
        cadence: 'Weekly',
        price: '$189 setup',
        description: 'A focused readout on grants, awards, agencies, recipients, and visible public-dollar movement.',
        includes: ['Award movement', 'Agency patterns', 'Recipient watchlist'],
      },
      {
        title: 'Active Grants Brief',
        cadence: 'Weekly',
        price: '$189 setup',
        description: 'A brief that tracks active grant windows, eligibility signals, deadlines, and likely fit by buyer type.',
        includes: ['Open grant windows', 'Eligibility notes', 'Fit assessment'],
      },
      {
        title: 'Subcontracting Activity Brief',
        cadence: 'Monthly',
        price: '$189 setup',
        description: 'A brief that follows prime awards, downstream vendor movement, and likely subcontracting opportunities.',
        includes: ['Prime award map', 'Vendor movement', 'Subcontracting angles'],
      },
      {
        title: 'Organizational Movement Brief',
        cadence: 'Monthly',
        price: '$189 setup',
        description: 'A brief that tracks organizations expanding, receiving funds, hiring, partnering, or changing program direction.',
        includes: ['Organization changes', 'Partnership signals', 'Outreach targets'],
      },
    ],
  },
  {
    id: 'custom',
    label: 'Custom',
    title: 'Custom scoped briefs',
    copy:
      'Use a custom brief when the question is specific: a city, agency, industry, organization type, funding lane, or strategic target list.',
    cards: [
      {
        title: 'Custom Opportunity Brief',
        cadence: 'Scoped',
        price: '$189 setup',
        description:
          'A custom brief for a specific city, region, industry, agency, funding lane, organization type, or strategic question.',
        includes: ['Custom scope', 'Signal categories', 'Decision-ready summary'],
      },
      {
        title: 'Target Account Brief',
        cadence: 'Scoped',
        price: '$189 setup',
        description:
          'A brief around a specific organization, prospect list, grant recipient set, or buyer category.',
        includes: ['Target account context', 'Funding and movement signals', 'Outreach notes'],
      },
      {
        title: 'Pilot Monitoring Brief',
        cadence: 'Recurring',
        price: '$189 setup',
        description:
          'A recurring pilot report for teams that want to test weekly or monthly monitoring before building a larger intelligence system.',
        includes: ['Pilot scope', 'Recurring delivery', 'Signal refinement'],
      },
    ],
  },
];

const coverageSignals = [
  'Weekly opportunity reports for a region, sector, or operating lane',
  'Funding movement summaries across grants, awards, agencies, and recipients',
  'Active grants and near-term funding windows worth watching',
  'Likely subcontracting activity and prime-recipient movement',
  'Regional hiring pressure, organizational movement, and partnership openings',
];

export default function OpportunityBriefsPage(): React.JSX.Element {
  const title = 'Opportunity Briefs | AutoNateAI';
  const description =
    'Explore AutoNateAI opportunity briefs by category, including regional briefs, buyer-specific briefs, signal-specific briefs, and custom scoped briefs.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-research.png" path="/research" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Catalog Explorer</span>
            <Heading as="h1" className={styles.heroTitle}>
              Browse opportunity briefs by category.
            </Heading>
            <HeroPromoVideo
              src="/video/autonateai-research-promo.mp4"
              poster="/img/og-research.png"
              className={styles.heroVideoMobile}
              soundLabel="Tap For Sound"
              fullscreenLabel="Full Screen Opportunity Briefs Promo"
            />
            <p className={styles.heroShift}>Regional, buyer-specific, signal-specific, and custom briefs.</p>
            <p className={styles.heroBody}>
              Use the catalog to jump into the type of opportunity intelligence you need. Each row scrolls horizontally
              on mobile, so you can move through the choices without losing the category context.
            </p>
            <div className={styles.categoryNav}>
              {categories.map((category) => (
                <a key={category.id} href={`#${category.id}`}>
                  {category.label}
                </a>
              ))}
            </div>
          </div>
          <div className={`${styles.heroVisual} ${styles.heroVideoDesktop}`}>
            <div className={`${styles.heroImageFrame} ${styles.heroVideoFrame}`}>
              <HeroPromoVideo
                src="/video/autonateai-research-promo.mp4"
                poster="/img/og-research.png"
                className={styles.heroPromoVideo}
                soundLabel="Tap For Sound"
                fullscreenLabel="Full Screen Opportunity Briefs Promo"
              />
            </div>
          </div>
        </section>

        <section id="coverage" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Coverage</span>
              <Heading as="h2" className={styles.sectionTitle}>
                What every brief can track.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Every category can be scoped by region, buyer type, signal type, or strategic question.
            </p>
          </div>
          <div className={styles.overviewPanel}>
            <ul className={styles.signalList}>
              {coverageSignals.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="catalog" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Brief Categories</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Scroll each row to compare options.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The rows are grouped so homepage links can land directly on the right category.
            </p>
          </div>
          <div className={styles.catalogStack}>
            {categories.map((category) => (
              <section key={category.id} id={category.id} className={styles.catalogSection}>
                <div className={styles.catalogSectionHead}>
                  <div>
                    <span className={styles.kicker}>{category.label}</span>
                    <Heading as="h3" className={styles.catalogTitle}>
                      {category.title}
                    </Heading>
                  </div>
                  <p className={styles.sectionCopy}>{category.copy}</p>
                </div>
                <div className={styles.catalogRow}>
                  {category.cards.map((brief) => (
                    <article key={brief.title} className={styles.catalogCard}>
                      <div className={styles.cardMeta}>
                        <span>{brief.cadence}</span>
                        <span>{brief.price}</span>
                      </div>
                      <h4 className={styles.cardTitle}>{brief.title}</h4>
                      <p className={styles.cardCopy}>{brief.description}</p>
                      <ul className={styles.signalList}>
                        {brief.includes.map((item) => (
                          <li key={item}>
                            <span className={styles.check}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link className={styles.primaryCta} to="/services/ai-first-researcher">
                        Purchase Brief
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
