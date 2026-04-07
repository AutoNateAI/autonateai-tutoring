import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import ProgramsCheckoutCard from '@site/src/components/ProgramsCheckoutCard';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const galleryCards = [
  {
    title: 'Narrated mindset shift',
    copy:
      'Students move from overload to structure through the story deck before they touch the deeper workflows.',
    type: 'video',
    src: '/video/portal-demos/student-lecture-desktop.mp4',
    poster: '/img/programs/student-lecture-desktop.png',
  },
  {
    title: 'Workflow installation',
    copy: 'The live workshop shows students how to use the systems, not just admire them.',
    type: 'video',
    src: '/video/portal-demos/student-setup-desktop.mp4',
    poster: '/img/programs/student-track-desktop.png',
  },
  {
    title: 'Prompt packs with real structure',
    copy: 'Students see the workflow prompts, fill them in fast, and copy structured instructions directly into action.',
    type: 'video',
    src: '/video/portal-demos/assignment-sprint-desktop.mp4',
    poster: '/img/programs/student-workflow-filled-desktop.png',
  },
  {
    title: 'Connected Google Sheet logic layer',
    copy: 'The Google Sheet makes the system visible so student work becomes retrievable, analyzable, and easier to sustain.',
    type: 'image',
    src: '/img/programs/student-day-grid-sheet-desktop.png',
  },
] as const;

const outcomeItems = [
  'Workforce-development language and delivery that centers practical AI fluency, organization, and follow-through',
  'College-prep framing that helps students manage applications, assignments, research, and competing life pressure',
  'Live 2 to 4 hour workshop options with lifetime portal access for every participating student',
  'A living portal that continues improving weekly with student feedback and new workflow features',
];

const roadmapItems = [
  'Director analytics dashboard in progress for prompt-pack usage and engagement visibility',
  'Monitoring signals that help programs show where funding is creating actual student leverage',
  'Ongoing portal innovation so the system gets stronger after the workshop instead of freezing in time',
];

export default function ProgramsPage(): React.JSX.Element {
  const title = 'Student Systems Workshop Programs | AutoNateAI';
  const description =
    'Book a live 2 to 4 hour student systems workshop for your cohort and give every student lifetime portal access, practical AI workflows, and a real operating upgrade.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={title}
        description={description}
        image="/img/og-programs.png"
        path="/programs"
      />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to student coaching
            </Link>
            <span className={styles.kicker}>Programs</span>
            <Heading as="h1" className={styles.heroTitle}>
              Install student systems across the whole cohort.
            </Heading>
            <HeroPromoVideo
              className={styles.heroVideoMobile}
              src="/video/programs-hero-promo.mp4"
              poster="/img/og-programs.png"
              soundLabel="Tap For Narration"
              fullscreenLabel="Full Screen Overview"
              objectFit="contain"
            />
            <p className={styles.heroShift}>2 to 4 live hours. Lifetime portal access. Practical workflows that stick.</p>
            <p className={styles.heroBody}>
              This offer is built for schools, directors, workforce-development programs, and college-prep organizations
              that want students to become more organized, more strategic, and more capable of using AI with real
              structure. We teach the mindset shift, install the tools, and coach students through the workflows live.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#program-checkout">
                Purchase Program
              </a>
              <Link className={styles.secondaryCta} to="/">
                View 1:1 Coaching
              </Link>
            </div>
          </div>
          <div className={`${styles.heroVisual} ${styles.programsHeroVisual}`}>
            <div className={`${styles.heroFrame} ${styles.programHeroFrame}`}>
              <HeroPromoVideo
                src="/video/programs-hero-promo.mp4"
                poster="/img/og-programs.png"
                soundLabel="Tap For Narration"
                fullscreenLabel="Full Screen Overview"
                objectFit="contain"
              />
            </div>
            <div className={styles.heroNote}>
              Once the organization pays to install the program, students receive the portal upgrade that keeps working
              after the workshop ends.
            </div>
          </div>
        </section>

        <section className={styles.inlineCtaSection}>
          <div className={styles.inlineCtaPanel}>
            <p className={styles.inlineCtaCopy}>Ready to lock the cohort package in now?</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#program-checkout">
                Choose Payment Option
              </a>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Why Programs Buy</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Built for the outcomes directors have to defend
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              This is not generic edtech. It is a live installation of student operating structure that can support
              workforce readiness, college preparation, organization, and real AI adoption in one system.
            </p>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {outcomeItems.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sectionCtaRow}>
            <a className={styles.primaryCta} href="#program-checkout">
              Pick Cohort Pricing
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Portal Upgrade</span>
              <Heading as="h2" className={styles.sectionTitle}>
                What students get after the live workshop
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The workshop introduces the thinking model live, then the portal keeps the experience alive with narrated
              slides, prompt packs, workbook systems, and practical workflow tools students can keep using.
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
                    <video
                      src={card.src}
                      poster={card.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img src={card.src} alt={card.title} loading="lazy" />
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.sectionCtaRow}>
            <a className={styles.primaryCta} href="#program-checkout">
              Get Students Into The Portal
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Director Roadmap</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Visibility keeps improving after the rollout
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              We know directors need more than inspiration. They need a way to show where the work is landing and how
              student usage evolves over time.
            </p>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {roadmapItems.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.sectionCtaRow}>
            <a className={styles.primaryCta} href="#program-checkout">
              Move To Checkout
            </a>
          </div>
        </section>

        <section id="program-checkout" className={styles.section}>
          <div className={styles.centerHead}>
            <span className={styles.kicker}>Program Pricing</span>
            <Heading as="h2" className={styles.sectionTitle}>
              Choose the cohort size and workshop length
            </Heading>
          </div>
          <div className={styles.infoPanel}>
            <p className={styles.heroBody}>
              Base pricing covers the first 2 hours. Every additional workshop hour adds $25 per student, with a maximum
              of 4 total hours for the full integration block.
            </p>
          </div>
          <section className={styles.checkoutSection}>
            <BrowserOnly fallback={<div className={styles.loadingCard}>Loading secure checkout…</div>}>
              {() => <ProgramsCheckoutCard />}
            </BrowserOnly>
          </section>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Ready to buy for your cohort?</strong>
          <span>Jump straight to the payment options.</span>
        </div>
        <a className={styles.mobileStickyButton} href="#program-checkout">
          Choose Payment
        </a>
      </div>
    </Layout>
  );
}
