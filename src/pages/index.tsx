import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const signalCards = [
  {
    title: 'Funding Movement',
    copy: 'Track grants, awards, agencies, recipients, and public-dollar movement before the opportunity is obvious.',
  },
  {
    title: 'Active Grants',
    copy: 'Surface near-term funding windows, open programs, agency priorities, and the organizations most likely to move.',
  },
  {
    title: 'Subcontracting Signals',
    copy: 'Map prime awards, likely downstream activity, vendor movement, and partnership openings in a region or sector.',
  },
  {
    title: 'Hiring Pressure',
    copy: 'Connect funding, organizational movement, and workforce demand so staffing and training operators can act faster.',
  },
];

const briefCards = [
  {
    title: 'Regional Opportunity Brief',
    meta: 'Weekly report',
    copy: 'A concise brief covering regional funding movement, active grants, likely subcontracting, hiring pressure, and organizational movement.',
  },
  {
    title: 'Buyer-Specific Brief',
    meta: 'Consultants · nonprofits · vendors · staffing · local business',
    copy: 'A scoped brief built around the buyer you care about, with practical next moves and outreach angles.',
  },
];

const outcomes = [
  'Weekly opportunity reports that are readable and decision-oriented',
  'Funding movement summaries tied to real agencies, awards, and recipients',
  'Active grants, likely subcontracting activity, and organizational movement',
  'Regional hiring pressure and workforce signals for operators',
  'A faster way to know where opportunity is moving before everyone else sees it',
];

export default function Home(): React.JSX.Element {
  const title = 'AutoNateAI | Opportunity Briefs';
  const description =
    'AutoNateAI sells opportunity briefs for consultants, nonprofits, vendors, economic development organizations, staffing teams, and local businesses that need regional funding and operating intelligence.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-homepage.png" path="/" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Opportunity Briefs</span>
            <Heading as="h1" className={styles.heroTitle}>
              Know where regional opportunity is moving.
            </Heading>
            <HeroPromoVideo className={styles.heroVideoMobile} />
            <p className={styles.heroShift}>
              Weekly briefs for funding movement, active grants, subcontracting signals, hiring pressure, and
              organizational movement.
            </p>
            <p className={styles.heroBody}>
              AutoNateAI turns public data and AI-assisted research into purchasable opportunity briefs for consultants,
              nonprofits, vendors, economic development organizations, staffing teams, and local businesses.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to="/research#regional">
                Explore Briefs
              </Link>
              <Link className={styles.secondaryCta} to="/services/ai-first-researcher">
                Purchase Setup
              </Link>
            </div>
            <p className={styles.meta}>Built for people who need opportunity before it becomes obvious.</p>
          </div>
          <div className={styles.heroVisual}>
            <HeroPromoVideo className={styles.heroVideoDesktop} />
            <div className={styles.heroNote}>
              The work is simple: monitor the signals, compress the noise, and deliver a brief that helps operators make
              the next move.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>What Briefs Track</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Public data turned into operator intelligence.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Each brief is built around the signals that show where money, organizations, vendors, and workforce demand
              are moving.
            </p>
          </div>
          <div className={styles.pillarGrid}>
            {signalCards.map((card) => (
              <article key={card.title} className={styles.pillarCard}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardCopy}>{card.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Catalog</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Start with a regional brief or scope a buyer-specific one.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The catalog is designed to scale from a simple weekly regional report into paid, scoped intelligence for a
              specific buyer or market.
            </p>
          </div>
          <div className={styles.offerGrid}>
            {briefCards.map((card) => (
              <article key={card.title} className={styles.offerCard}>
                <span className={styles.offerMeta}>{card.meta}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardCopy}>{card.copy}</p>
                <Link className={styles.secondaryCta} to={card.title === 'Regional Opportunity Brief' ? '/research#regional' : '/research#buyers'}>
                  View Catalog
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.midCta}>
          <div className={styles.midCtaPanel}>
            <span className={styles.kicker}>Why Buy</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Faster opportunity awareness without building the research engine.
            </Heading>
            <ul className={styles.priceList}>
              {outcomes.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to="/services/ai-first-researcher">
                Purchase A Brief
              </Link>
              <Link className={styles.secondaryCta} to="/research#catalog">
                Browse Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Opportunity briefs are live.</strong>
          <span>Browse the catalog or purchase setup.</span>
        </div>
        <Link className={styles.mobileStickyButton} to="/research#catalog">
          Briefs
        </Link>
      </div>
    </Layout>
  );
}
