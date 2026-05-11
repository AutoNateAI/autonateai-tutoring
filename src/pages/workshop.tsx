import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const dayOne = [
  'Portal onboarding and AI setup with the portal, AI copilot, GitHub, and Firebase',
  'Intro to federal spending using Grants.gov and USAspending.gov',
  'Find and map active agencies, organizations, and opportunity networks',
  'Choose an organization and plan three useful public-facing tools',
];

const dayTwo = [
  'Rapid-build three AI-assisted tools with templates and real data',
  'Test, refine, and deploy the tools so they become shareable',
  'Create LinkedIn posts, outreach messages, and showcase content',
  'Present opportunity insights, final tools, next steps, and feedback',
];

const leavesWith = [
  'Three functional tools for a real organization',
  'A curated list of live opportunities',
  'Portfolio-ready projects and code',
  'AI-generated content and outreach assets',
  '30 days of free portal access to keep researching and building',
];

export default function WorkshopPage(): React.JSX.Element {
  const title = 'AI-Powered Weekend Career Accelerator | AutoNateAI';
  const description =
    'A 2-day weekend workshop where students use AI and real federal spending data to find opportunities, build three tools, and launch career visibility.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image="/img/og-homepage.png" path="/workshop" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to overview
            </Link>
            <span className={styles.kicker}>2-Day Weekend Experience</span>
            <Heading as="h1" className={styles.heroTitle}>
              AI-powered weekend career accelerator.
            </Heading>
            <HeroPromoVideo
              className={styles.heroVideoMobile}
              src="/video/autonateai-portal-promo.mp4"
              poster="/img/og-homepage.png"
              soundLabel="Tap For Narration"
              fullscreenLabel="Full Screen Workshop Promo"
              objectFit="contain"
            />
            <p className={styles.heroShift}>Find opportunities. Build real tools. Launch your future.</p>
            <p className={styles.heroBody}>
              A high-intensity weekend workshop where students use AI and real federal spending data to discover live
              opportunities and build three practical tools for publicly funded organizations.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#workshop-checkout">
                Register Now
              </a>
              <Link className={styles.secondaryCta} to="/programs">
                View 7-Day Program
              </Link>
            </div>
            <p className={styles.meta}>8 hours. $299 per student. Max 15 students per cohort.</p>
          </div>
          <div className={`${styles.heroVisual} ${styles.programsHeroVisual}`}>
            <div className={`${styles.heroFrame} ${styles.programHeroFrame}`}>
              <HeroPromoVideo
                src="/video/autonateai-portal-promo.mp4"
                poster="/img/og-homepage.png"
                soundLabel="Tap For Narration"
                fullscreenLabel="Full Screen Workshop Promo"
                objectFit="contain"
              />
            </div>
            <div className={styles.heroNote}>
              Students use the portal to trace federal spending, identify organizations, map opportunities, build
              solutions, and create career-facing visibility.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>How It Works</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Discover, research, map, build, launch.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Students move from live funding signals to real deployed assets in one weekend.
            </p>
          </div>
          <div className={styles.pillarGrid}>
            {['Discover live data', 'Research agencies and awards', 'Map opportunity networks', 'Build three tools'].map(
              (item) => (
                <article key={item} className={styles.pillarCard}>
                  <h3 className={styles.cardTitle}>{item}</h3>
                </article>
              ),
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Weekend Schedule</span>
              <Heading as="h2" className={styles.sectionTitle}>
                8 hours of practical career acceleration.
              </Heading>
            </div>
          </div>
          <div className={styles.scheduleGrid}>
            <article className={styles.scheduleCard}>
              <span className={styles.offerMeta}>Day 1 · Discover, research, plan · 4 hours</span>
              <ul className={styles.priceList}>
                {dayOne.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={styles.scheduleCard}>
              <span className={styles.offerMeta}>Day 2 · Build, launch, get seen · 4 hours</span>
              <ul className={styles.priceList}>
                {dayTwo.map((item) => (
                  <li key={item}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>You Leave With</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Portfolio assets, outreach, and momentum.
              </Heading>
            </div>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {leavesWith.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="workshop-checkout" className={styles.section}>
          <div className={styles.centerHead}>
            <span className={styles.kicker}>Invest In Your Future</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Register for the weekend accelerator.
            </Heading>
          </div>
          <div className={styles.pricingCard}>
            <div className={styles.priceBadge}>Limited Spots</div>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>$299</span>
              <span className={styles.priceUnit}>Per student</span>
            </div>
            <p className={styles.priceNote}>Includes the 2-day experience, focused mentorship, and 30 days of free portal access.</p>
          </div>
          <section className={styles.checkoutSection}>
            <BrowserOnly fallback={<div className={styles.loadingCard}>Loading secure checkout...</div>}>
              {() => <SquareCheckoutCard initialProductId="agentic-ai-workshop-apr-18-2026" />}
            </BrowserOnly>
          </section>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Weekend accelerator seats are limited.</strong>
          <span>Register and secure your spot.</span>
        </div>
        <a className={styles.mobileStickyButton} href="#workshop-checkout">
          Register
        </a>
      </div>
    </Layout>
  );
}
