import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const pillars = [
  {
    title: 'Real Federal Data',
    copy: 'Students work with Grants.gov and USAspending.gov signals to trace where money is moving, who receives it, and which organizations need help.',
  },
  {
    title: 'AI Copilot Research',
    copy: 'The AutoNateAI portal helps students filter agencies, awards, subrecipients, regions, and opportunity patterns with AI-supported analysis.',
  },
  {
    title: 'Project-Based Learning',
    copy: 'Every experience pushes students toward real tools, dashboards, outreach assets, and portfolio-ready proof of work.',
  },
  {
    title: 'Visibility & Outreach',
    copy: 'Students learn how to package their work, connect with organizations, and turn research into career-facing opportunity.',
  },
];

const programCards = [
  {
    title: '2-Day Weekend Career Accelerator',
    meta: '8 hours · $299 per student · max 15 students',
    copy: 'A focused weekend sprint where students discover funding flows, map live opportunities, build three AI-assisted tools, and leave with portfolio-ready assets.',
    to: '/workshop',
  },
  {
    title: '7-Day Career Readiness Accelerator',
    meta: 'Structured week · cohort and partner delivery',
    copy: 'A deeper workforce-development program covering portal setup, advanced search, regional opportunity research, AI-assisted builds, outreach, content, and final showcase.',
    to: '/programs',
  },
];

const outcomes = [
  'Real opportunity research skills',
  'Portfolio-ready projects and code',
  'Professional visibility and outreach practice',
  'Stronger confidence using AI for real problems',
  'Career-ready mindset and execution habits',
];

export default function Home(): React.JSX.Element {
  const title = 'AutoNateAI | Workforce Development Programs';
  const description =
    'AutoNateAI runs AI-powered workforce development programs where students use real federal spending data to discover opportunities, build useful tools, and grow career visibility.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-homepage.png" path="/" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Workforce Development Programs</span>
            <Heading as="h1" className={styles.heroTitle}>
              Real data. Real opportunities. Real career leverage.
            </Heading>
            <HeroPromoVideo className={styles.heroVideoMobile} />
            <p className={styles.heroShift}>
              AutoNateAI helps students use AI and federal spending data to build solutions that matter.
            </p>
            <p className={styles.heroBody}>
              We run hands-on career readiness experiences where students research live funding opportunities, identify
              active organizations, build AI-assisted tools, and package their work into a portfolio they can use for
              internships, jobs, scholarships, and collaborations.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to="/workshop">
                Weekend Workshop
              </Link>
              <Link className={styles.secondaryCta} to="/programs">
                7-Day Program
              </Link>
            </div>
            <p className={styles.meta}>Built on real government data, guided AI workflows, and project-based execution.</p>
          </div>
          <div className={styles.heroVisual}>
            <HeroPromoVideo className={styles.heroVideoDesktop} />
            <div className={styles.heroNote}>
              Students do not just learn about AI. They use it to follow money, find organizations, build solutions, and
              open doors.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>What We Do</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Workforce development built around live opportunity.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The portal gives students a practical system for research, filtering, project building, and outreach. The
              programs turn that system into guided reps.
            </p>
          </div>
          <div className={styles.pillarGrid}>
            {pillars.map((pillar) => (
              <article key={pillar.title} className={styles.pillarCard}>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardCopy}>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Program Paths</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Two ways to launch opportunity.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Start with a focused weekend sprint or bring the full 7-day accelerator to a cohort.
            </p>
          </div>
          <div className={styles.offerGrid}>
            {programCards.map((card) => (
              <article key={card.title} className={styles.offerCard}>
                <span className={styles.offerMeta}>{card.meta}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardCopy}>{card.copy}</p>
                <Link className={styles.secondaryCta} to={card.to}>
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.midCta}>
          <div className={styles.midCtaPanel}>
            <span className={styles.kicker}>Student Outcomes</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Students leave with more than notes.
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
              <Link className={styles.primaryCta} to="/programs">
                Build A Cohort
              </Link>
              <Link className={styles.secondaryCta} to="/workshop">
                Run A Weekend Sprint
              </Link>
            </div>
          </div>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Workforce programs are live.</strong>
          <span>Choose the weekend workshop or full accelerator.</span>
        </div>
        <Link className={styles.mobileStickyButton} to="/programs">
          Programs
        </Link>
      </div>
    </Layout>
  );
}
