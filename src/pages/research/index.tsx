import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';
import {featuredResearchArticle} from '@site/src/data/researchArticles';
import styles from '@site/src/components/research/research.module.css';

const operatorSignals = [
  'Regional intelligence for where funding, partners, and operating pressure are moving',
  'Funding monitoring across public grants, awards, agencies, and local opportunity signals',
  'Operational opportunity discovery for programs, vendors, nonprofits, and civic operators',
  'Procurement and subcontractor visibility so organizations can see who is getting paid',
  'Hiring pressure detection and reporting automation for teams that need faster decisions',
];

const reportCards = [
  {
    title: 'Regional Opportunity Scan',
    access: 'Free',
    price: '$0',
    description:
      'A public-facing scan that shows what kinds of funding, organizations, and opportunity patterns are active in a region.',
    cta: 'Read Sample',
    to: `/research/${featuredResearchArticle.slug}`,
  },
  {
    title: 'Funding Monitoring Report',
    access: 'Paid',
    price: 'Priced per scope',
    description:
      'A deeper report for organizations that need recurring visibility into grants, awards, agencies, recipients, and movement in their lane.',
    cta: 'Request Report',
    to: '/services/ai-first-researcher',
  },
  {
    title: 'Procurement & Subcontractor Visibility Brief',
    access: 'Paid',
    price: 'Priced per scope',
    description:
      'A decision brief that maps prime awards, subcontractor patterns, vendors, local recipients, and possible partnership openings.',
    cta: 'Request Report',
    to: '/services/ai-first-researcher',
  },
  {
    title: 'Hiring Pressure & Workforce Signal Report',
    access: 'Paid',
    price: 'Priced per scope',
    description:
      'A report for operators who want to connect labor demand, funding movement, program needs, and training opportunities.',
    cta: 'Request Report',
    to: '/services/ai-first-researcher',
  },
];

const valueProps = [
  'Immediate ROI because the report points at money, organizations, gaps, and next moves',
  'Institutional pain relief for teams that do not have time to manually track every signal',
  'High-value B2B intelligence that can become recurring monitoring over time',
];

export default function ReportsPage(): React.JSX.Element {
  const title = 'Reports | AutoNateAI';
  const description =
    'AutoNateAI reports provide regional intelligence, funding monitoring, procurement visibility, subcontractor visibility, hiring pressure detection, and reporting automation for organizations and operators.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-research.png" path="/research" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Reports</span>
            <Heading as="h1" className={styles.heroTitle}>
              Intelligence reports for organizations and operators.
            </Heading>
            <HeroPromoVideo
              src="/video/autonateai-research-promo.mp4"
              poster="/img/og-research.png"
              className={styles.heroVideoMobile}
              soundLabel="Tap For Sound"
              fullscreenLabel="Full Screen Reports Promo"
            />
            <p className={styles.heroShift}>Regional intelligence. Funding monitoring. Operational opportunity discovery.</p>
            <p className={styles.heroBody}>
              This section holds AutoNateAI reports: some free, some paid. Reports turn public data and AI-assisted
              analysis into practical visibility for organizations that need to see funding movement, procurement
              patterns, subcontractor openings, hiring pressure, and regional opportunities.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#reports">
                Browse Reports
              </a>
              <a className={styles.secondaryCta} href="#operator-intelligence">
                What Reports Cover
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
                fullscreenLabel="Full Screen Reports Promo"
              />
            </div>
          </div>
        </section>

        <section id="operator-intelligence" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Operator Intelligence</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Reports that find pressure, money, and openings.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Built for operators, directors, founders, nonprofits, vendors, and workforce-development teams that need
              fast visibility without building the whole research engine themselves.
            </p>
          </div>
          <div className={styles.overviewPanel}>
            <div className={styles.overviewGrid}>
              <ul className={styles.signalList}>
                {operatorSignals.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.statsGrid}>
                <article className={styles.statCard}>
                  <div className={styles.statValue}>B2B</div>
                  <span className={styles.statLabel}>Operator Market</span>
                  <p className={styles.statNote}>Reports are built for organizations that need immediate decision support.</p>
                </article>
                <article className={styles.statCard}>
                  <div className={styles.statValue}>ROI</div>
                  <span className={styles.statLabel}>Action-Oriented</span>
                  <p className={styles.statNote}>Each report is framed around next moves, not research theater.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="reports" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Report Catalog</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Free samples and paid intelligence reports.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The catalog can hold public reports, premium reports, and scoped custom monitoring. Free reports build
              trust; paid reports solve operator pain.
            </p>
          </div>
          <div className={styles.paginationPanel}>
            <div className={styles.cardsGrid}>
              {reportCards.map((report) => (
                <article key={report.title} className={styles.articleCard}>
                  <div className={styles.cardMeta}>
                    <span>{report.access}</span>
                    <span>{report.price}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{report.title}</h3>
                  <p className={styles.cardCopy}>{report.description}</p>
                  <Link className={styles.primaryCta} to={report.to}>
                    {report.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.featuredPanel}>
            <div className={styles.featuredGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.kicker}>Why This Works</span>
                <Heading as="h2" className={styles.sectionTitle}>
                  This market already exists.
                </Heading>
                <ul className={styles.signalList}>
                  {valueProps.map((item) => (
                    <li key={item}>
                      <span className={styles.check}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.heroActions}>
                  <Link className={styles.primaryCta} to="/services/ai-first-researcher">
                    Set Up Paid Reports
                  </Link>
                </div>
              </div>
              <div className={styles.featuredImageFrame}>
                <img src={featuredResearchArticle.image} alt={featuredResearchArticle.imageAlt} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
