import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const workshopDate = 'Saturday, April 11, 2026';
const workshopTime = '10:00 AM - 12:30 PM';

const galleryCards = [
  {
    title: 'Narrated mindset shift',
    copy:
      'Students get the deeper agentic AI coaching ideas first, so the tools stop feeling random and start feeling like leverage.',
    type: 'video',
    src: '/video/portal-demos/student-lecture-desktop.mp4',
    poster: '/img/programs/student-lecture-desktop.png',
  },
  {
    title: 'Laptop setup, live',
    copy:
      'Students get their machine set up with Codex, Gemini, or Claude so they leave with a real working stack instead of a vague intention.',
    type: 'video',
    src: '/video/portal-demos/student-setup-desktop.mp4',
    poster: '/img/programs/student-track-desktop.png',
  },
  {
    title: 'Prompt packs that actually move work',
    copy:
      'The workshop shows how to fill the prompts, copy fast, and turn agentic AI into visible execution instead of decorative hype.',
    type: 'video',
    src: '/video/portal-demos/assignment-sprint-desktop.mp4',
    poster: '/img/programs/student-workflow-filled-desktop.png',
  },
  {
    title: 'Knowledge that stays retrievable',
    copy:
      'Connected sheets and workflow structure stop notes, tasks, and ideas from evaporating the minute life gets noisy.',
    type: 'image',
    src: '/img/programs/student-day-grid-sheet-desktop.png',
  },
] as const;

const workshopBenefits = [
  'Live agentic AI coaching with the deeper thinking systems, mental models, and strategic framing',
  'Laptop setup with the student’s AI agent of choice: Codex, Gemini, or Claude',
  'Portal access included with the narrated slides, prompt packs, and mental-model material',
  'Real workflow reps around schedule control, knowledge capture, and cleaner execution',
];

const audienceNotes = [
  'Students who are tired of fake productivity and want a sharper way to operate',
  'People who need their AI stack set up correctly instead of playing button roulette alone',
  'Anyone who wants to leave Saturday with an actual system instead of another inspirational screenshot',
];

export default function WorkshopPage(): React.JSX.Element {
  const title = 'Agentic AI Live Workshop | AutoNateAI';
  const description =
    'Reserve a seat for the live Agentic AI workshop on Saturday, April 11, 2026 from 10:00 AM to 12:30 PM. Get your laptop set up, portal access unlocked, and practical workflow systems installed live.';
  const socialImage = '/img/og-workshop.jpg';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta title={title} description={description} image={socialImage} path="/workshop" />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to coaching
            </Link>
            <span className={styles.kicker}>Workshop</span>
            <Heading as="h1" className={styles.heroTitle}>
              Pull up Saturday and get your AI stack wired correctly.
            </Heading>
            <HeroPromoVideo
              className={styles.heroVideoMobile}
              src="/video/autonateai-portal-promo.mp4"
              poster="/img/og-homepage.png"
              soundLabel="Tap For Narration"
              fullscreenLabel="Full Screen Workshop Promo"
              objectFit="contain"
            />
            <p className={styles.heroShift}>
              {workshopDate} · {workshopTime}
            </p>
            <p className={styles.heroBody}>
              This live workshop is for students who want the deeper agentic AI coaching ideas, their laptop set up with
              the right AI agent, and real workflow structure installed in one shot. We will cover the narrated slides,
              the prompt packs, the mental models, and the practical systems that help students control schedule,
              knowledge acquisition, and execution with more precision.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#workshop-checkout">
                Reserve Your Seat
              </a>
              <Link className={styles.secondaryCta} to="/programs">
                View Programs
              </Link>
            </div>
            <p className={styles.meta}>$159 per student. Payments close automatically after 50 confirmed seats.</p>
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
              Students leave with live setup, portal access, prompt packs, and a cleaner relationship with AI than the
              average “watch this quick tutorial” victim.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>What Happens Live</span>
              <Heading as="h2" className={styles.sectionTitle}>
                This is not a lecture. It is an installation.
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The workshop combines coaching, setup, and workflow practice so students leave with a working stack instead
              of theory floating around the room looking important.
            </p>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {workshopBenefits.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sectionCtaRow}>
            <a className={styles.primaryCta} href="#workshop-checkout">
              Lock Your Seat
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Portal Access</span>
              <Heading as="h2" className={styles.sectionTitle}>
                What students keep after Saturday ends
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The workshop is live, but the portal is the persistent layer: narrated slides, prompt packs, connected
              sheets, and mental models that keep the system alive after the event.
            </p>
          </div>
          <div className={styles.programGallery}>
            {galleryCards.map((card) => (
              <article key={card.title} className={styles.workflowCard}>
                <div className={styles.workflowCopy}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardCopy}>{card.copy}</p>
                </div>
                <div className={styles.workflowFrame}>
                  {card.type === 'video' ? (
                    <video src={card.src} poster={card.poster} autoPlay muted loop playsInline preload="metadata" />
                  ) : (
                    <img src={card.src} alt={card.title} loading="lazy" />
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.sectionCtaRow}>
            <a className={styles.primaryCta} href="#workshop-checkout">
              Get Into The Workshop
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Who Should Pull Up</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Students who want more than vibes and browser tabs
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              If a student wants a stronger operating system, cleaner AI usage, and a more structured future, this is
              for them.
            </p>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {audienceNotes.map((item) => (
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
            <span className={styles.kicker}>Workshop Checkout</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Reserve your seat for {workshopDate}
            </Heading>
          </div>
          <div className={styles.infoPanel}>
            <p className={styles.heroBody}>
              The live workshop runs from {workshopTime}. After payment, portal access is created automatically and your
              seat is counted against the 50-student cap.
            </p>
          </div>
          <section className={styles.checkoutSection}>
            <BrowserOnly fallback={<div className={styles.loadingCard}>Loading secure checkout…</div>}>
              {() => <SquareCheckoutCard initialProductId="agentic-ai-workshop-apr-11-2026" />}
            </BrowserOnly>
          </section>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Workshop seats are limited.</strong>
          <span>Jump straight to the payment section.</span>
        </div>
        <a className={styles.mobileStickyButton} href="#workshop-checkout">
          Reserve Seat
        </a>
      </div>
    </Layout>
  );
}
