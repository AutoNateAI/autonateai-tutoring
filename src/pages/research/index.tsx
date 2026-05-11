import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';
import styles from '@site/src/components/research/research.module.css';

const briefSignals = [
  'Weekly opportunity reports for a region, sector, or operating lane',
  'Funding movement summaries across grants, awards, agencies, and recipients',
  'Active grants and near-term funding windows worth watching',
  'Likely subcontracting activity and prime-recipient movement',
  'Regional hiring pressure, organizational movement, and partnership openings',
];

const audiences = ['Consultants', 'Nonprofits', 'Vendors', 'Economic development orgs', 'Staffing teams', 'Local businesses'];

const briefCards = [
  {
    title: 'Regional Opportunity Brief',
    cadence: 'Weekly',
    price: '$189 setup',
    description:
      'The fastest starting point: a concise regional brief covering funding movement, active grants, likely subcontracting, hiring pressure, and organizational movement.',
    includes: ['Funding movement summary', 'Active grant watchlist', 'Organization movement signals'],
  },
  {
    title: 'Consultant Opportunity Brief',
    cadence: 'Weekly or monthly',
    price: '$189 setup',
    description:
      'A brief for consultants who need to see where public money, local operators, procurement activity, and partner demand are creating reachable opportunities.',
    includes: ['Prospect signals', 'Procurement and partner leads', 'Recommended outreach angles'],
  },
  {
    title: 'Nonprofit Funding Brief',
    cadence: 'Weekly',
    price: '$189 setup',
    description:
      'A funding and program brief for nonprofits tracking grants, agency priorities, local recipients, partnership chances, and service-demand pressure.',
    includes: ['Active grants', 'Agency priority shifts', 'Partner and recipient map'],
  },
  {
    title: 'Vendor & Subcontractor Brief',
    cadence: 'Weekly or monthly',
    price: '$189 setup',
    description:
      'A brief for vendors that need visibility into prime awards, likely subcontracting activity, buyer movement, and regional demand signals.',
    includes: ['Prime award movement', 'Subcontracting indicators', 'Buyer and vendor map'],
  },
  {
    title: 'Hiring Pressure Brief',
    cadence: 'Monthly',
    price: '$189 setup',
    description:
      'A workforce signal brief for staffing teams, training programs, and economic development operators tracking where demand is building.',
    includes: ['Hiring pressure indicators', 'Funding-backed workforce demand', 'Training opportunity signals'],
  },
  {
    title: 'Custom Opportunity Brief',
    cadence: 'Scoped',
    price: '$189 setup',
    description:
      'A custom brief for a specific city, region, industry, agency, funding lane, organization type, or strategic question.',
    includes: ['Custom scope', 'Signal categories', 'Decision-ready summary'],
  },
];

export default function OpportunityBriefsPage(): React.JSX.Element {
  const title = 'Opportunity Briefs | AutoNateAI';
  const description =
    'AutoNateAI opportunity briefs help consultants, nonprofits, vendors, economic development organizations, staffing teams, and local businesses track regional funding movement, active grants, subcontracting activity, hiring pressure, and organizational movement.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-research.png" path="/research" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Opportunity Briefs</span>
            <Heading as="h1" className={styles.heroTitle}>
              Buy regional opportunity intelligence without building the research engine.
            </Heading>
            <HeroPromoVideo
              src="/video/autonateai-research-promo.mp4"
              poster="/img/og-research.png"
              className={styles.heroVideoMobile}
              soundLabel="Tap For Sound"
              fullscreenLabel="Full Screen Opportunity Briefs Promo"
            />
            <p className={styles.heroShift}>Weekly opportunity reports. Funding movement. Active grants. Local operating signals.</p>
            <p className={styles.heroBody}>
              AutoNateAI Opportunity Briefs are purchasable reports for people who need to know where opportunity is
              moving: consultants, nonprofits, vendors, economic development teams, staffing operators, and local
              businesses.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#catalog">
                Explore Catalog
              </a>
              <a className={styles.secondaryCta} href="#coverage">
                What You Get
              </a>
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
                Fastest path to regional opportunity visibility.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Each brief compresses public-data monitoring and AI-assisted research into a readable report with
              immediate next-move value.
            </p>
          </div>
          <div className={styles.overviewPanel}>
            <div className={styles.overviewGrid}>
              <ul className={styles.signalList}>
                {briefSignals.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.statsGrid}>
                <article className={styles.statCard}>
                  <div className={styles.statValue}>6</div>
                  <span className={styles.statLabel}>Buyer Types</span>
                  <p className={styles.statNote}>{audiences.join(', ')}.</p>
                </article>
                <article className={styles.statCard}>
                  <div className={styles.statValue}>Fast</div>
                  <span className={styles.statLabel}>Brief Format</span>
                  <p className={styles.statNote}>Readable, decision-oriented, and designed for recurring delivery.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Catalog Explorer</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Choose the opportunity brief you want to purchase.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Start with a standard brief or scope a custom one around your region, funding lane, sector, or target
              audience.
            </p>
          </div>
          <div className={styles.paginationPanel}>
            <div className={styles.cardsGrid}>
              {briefCards.map((brief) => (
                <article key={brief.title} className={styles.articleCard}>
                  <div className={styles.cardMeta}>
                    <span>{brief.cadence}</span>
                    <span>{brief.price}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{brief.title}</h3>
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
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.featuredPanel}>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Who Buys</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Built for people who need opportunity before it becomes obvious.
              </Heading>
              <div className={styles.cardsGrid}>
                {audiences.map((audience) => (
                  <article key={audience} className={styles.articleCard}>
                    <h3 className={styles.cardTitle}>{audience}</h3>
                  </article>
                ))}
              </div>
              <div className={styles.heroActions}>
                <Link className={styles.primaryCta} to="/services/ai-first-researcher">
                  Purchase A Brief
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
