import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import ProgramsCheckoutCard from '@site/src/components/ProgramsCheckoutCard';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const days = [
  ['Day 1', 'Foundations & portal setup', 'Portal review, AI copilot, GitHub, Firebase, Grants.gov, and USAspending.gov fundamentals.'],
  ['Day 2', 'Advanced search & systems thinking', 'Advanced filtering, opportunity mapping, money-flow tracing, and project continuation.'],
  ['Day 3', 'Regional opportunity challenge', 'Students own a region, find six high-potential opportunities, and validate organizations.'],
  ['Day 4', 'Build & solve', 'Design, code, prototype, test, and prepare an AI-assisted solution for showcase.'],
  ['Day 5', 'Visibility & outreach strategy', 'LinkedIn, Reddit, email outreach, personal brand foundation, and messaging practice.'],
  ['Day 6', 'Content creation & acceleration', 'Create AI-assisted content, build a work library, and begin posting or outreach.'],
  ['Day 7', 'Showcase & next steps', 'Present final projects, opportunity lists, reflections, and career pipeline next steps.'],
];

const impact = [
  'Trace federal spending to active organizations and vendors',
  'Discover opportunities matched to student goals and skills',
  'Build real solutions that solve real problems',
  'Create visibility that gets students noticed',
  'Open doors to internships, jobs, and collaborations',
];

export default function ProgramsPage(): React.JSX.Element {
  const title = 'AI-Powered Career Readiness Accelerator | AutoNateAI';
  const description =
    'A 7-day AutoNateAI program where students use AI, federal data, and project-based learning to research opportunities, build tools, and launch career visibility.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-programs.png" path="/programs" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to overview
            </Link>
            <span className={styles.kicker}>7-Day Program Experience</span>
            <Heading as="h1" className={styles.heroTitle}>
              AI-powered career readiness accelerator.
            </Heading>
            <HeroPromoVideo
              className={styles.heroVideoMobile}
              src="/video/programs-hero-promo.mp4"
              poster="/img/og-programs.png"
              soundLabel="Tap For Narration"
              fullscreenLabel="Full Screen Program Overview"
              objectFit="contain"
            />
            <p className={styles.heroShift}>Real data. Real opportunities. Real impact.</p>
            <p className={styles.heroBody}>
              A 7-day, hands-on program where students use AI and federal spending data to discover opportunities,
              build real solutions, grow visibility, and launch their careers with confidence.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#program-checkout">
                Launch A Cohort
              </a>
              <Link className={styles.secondaryCta} to="/workshop">
                Weekend Version
              </Link>
            </div>
          </div>
          <div className={`${styles.heroVisual} ${styles.programsHeroVisual}`}>
            <div className={`${styles.heroFrame} ${styles.programHeroFrame}`}>
              <HeroPromoVideo
                src="/video/programs-hero-promo.mp4"
                poster="/img/og-programs.png"
                soundLabel="Tap For Narration"
                fullscreenLabel="Full Screen Program Overview"
                objectFit="contain"
              />
            </div>
            <div className={styles.heroNote}>
              This is a repeatable workforce-development system: research, build, outreach, showcase, and next steps.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Program Flow</span>
              <Heading as="h2" className={styles.sectionTitle}>
                A structured week of discovery, building, and visibility.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Each day adds a concrete layer: portal fluency, search strategy, regional research, AI-assisted building,
              outreach, content, and final showcase.
            </p>
          </div>
          <div className={styles.timelineGrid}>
            {days.map(([day, titleText, copy]) => (
              <article key={day} className={styles.timelineCard}>
                <span className={styles.offerMeta}>{day}</span>
                <h3 className={styles.cardTitle}>{titleText}</h3>
                <p className={styles.cardCopy}>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Real Impact</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Students leave with practical proof of readiness.
              </Heading>
            </div>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {impact.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.midCta}>
          <div className={styles.midCtaPanel}>
            <span className={styles.kicker}>Built On A Repeatable System</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Powered by AI. Driven by impact.
            </Heading>
            <p className={styles.heroBody}>
              Give students the tools, show them the path, and help them build what is next. The pilot cohort creates a
              stronger workforce-development engine for tomorrow.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#program-checkout">
                Choose Program Option
              </a>
            </div>
          </div>
        </section>

        <section id="program-checkout" className={styles.section}>
          <div className={styles.centerHead}>
            <span className={styles.kicker}>Program Pricing</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Bring the accelerator to your cohort.
            </Heading>
          </div>
          <div className={styles.infoPanel}>
            <p className={styles.heroBody}>
              Use the cohort checkout to choose the package that fits your organization. We can align delivery around
              workforce readiness, college preparation, research, or regional opportunity discovery.
            </p>
          </div>
          <section className={styles.checkoutSection}>
            <BrowserOnly fallback={<div className={styles.loadingCard}>Loading secure checkout...</div>}>
              {() => <ProgramsCheckoutCard />}
            </BrowserOnly>
          </section>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Launch a 7-day accelerator.</strong>
          <span>Choose a cohort option and start the program conversation.</span>
        </div>
        <a className={styles.mobileStickyButton} href="#program-checkout">
          Cohort
        </a>
      </div>
    </Layout>
  );
}
