import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';

import styles from './studentPortal.module.css';

const checkoutPath = '/services/ai-first-student';
const portalImageBase = 'https://portal.autonateai.com/img/storyboards/student';

const abilityCards = [
  {
    icon: '▣',
    title: 'Daily Time Grid',
    copy: 'For when your day feels impossible and you need structure that respects real life instead of fake perfect schedules.',
    image: `${portalImageBase}/23-c.png`,
  },
  {
    icon: '⚡',
    title: 'Assignment Sprint Planner',
    copy: 'For when a big assignment feels too vague to start and you need the first visible moves mapped clearly.',
    image: `${portalImageBase}/24-c.png`,
  },
  {
    icon: '▤',
    title: 'Reading Capture Matrix',
    copy: 'For when you read and nothing sticks, and you need the ideas turned into durable structure.',
    image: `${portalImageBase}/25-b.png`,
  },
  {
    icon: '◫',
    title: 'Study Heatmap Board',
    copy: 'For when everything feels urgent and you need to see what actually deserves focus first.',
    image: `${portalImageBase}/26-d.png`,
  },
  {
    icon: '◉',
    title: 'Paper Source Matrix',
    copy: 'For when your sources and claims are scattered across tabs, notes, and half-finished drafts.',
    image: `${portalImageBase}/27-c.png`,
  },
  {
    icon: '◎',
    title: 'Day Debrief Lab',
    copy: 'For when you keep repeating the same bad patterns and need reflection that compounds into strategy.',
    image: `${portalImageBase}/28-d.png`,
  },
];

const workflowCards = [
  {
    title: 'Narrated Story Deck',
    copy:
      'A cinematic guided experience that teaches students why overload happens, how AI changes the game, and how to install structure instead of panic.',
    image: `${portalImageBase}/01-c.png`,
  },
  {
    title: 'Portal Thinking Systems',
    copy:
      'Reusable systems for planning, studying, reading, writing, and reflection that students can actually run against their current life.',
    image: `${portalImageBase}/21-f.png`,
  },
];

const pricingItems = [
  'Narrated student transformation experience',
  'Thinking Systems for planning, studying, reading, research, and reflection',
  'Connected workflow structure that turns AI into leverage',
  'One-time purchase with immediate portal access',
];

export default function Home(): React.JSX.Element {
  const title = 'AutoNateAI | Student Transformation';
  const description =
    'Stop drowning in school pressure. Build the AI-powered system that helps you think, plan, study, and execute.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={`${title} | AutoNateAI`}
        description={description}
        image="/img/og-student-workflow.png"
        path="/"
      />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Architecture For Excellence</span>
            <Heading as="h1" className={styles.heroTitle}>
              Stop drowning in school pressure.
            </Heading>
            <p className={styles.heroShift}>The gap is not intelligence. It is infrastructure.</p>
            <p className={styles.heroBody}>
              This is not a generic AI course. It is a narrated student operating upgrade that teaches overloaded
              students how to use AI, structured workbooks, and Thinking Systems to become calmer, clearer, and more
              effective.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to={checkoutPath}>
                Initialize System
              </Link>
              <a className={styles.secondaryCta} href="https://portal.autonateai.com/#/login">
                Already Bought? Sign In
              </a>
            </div>
            <p className={styles.meta}>$129 one time. Instant access after checkout.</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroFrame}>
              <img src={`${portalImageBase}/07-f.png`} alt="Student transformation portal preview" />
            </div>
            <div className={styles.heroNote}>
              High-agency students do not just work harder. They run better systems.
            </div>
          </div>
        </section>

        <section id="system" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Unlocked Abilities</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Thinking Systems for real student pressure
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              Each system is built for a specific kind of school pain: impossible days, vague assignments, weak
              retention, scattered sources, bad prioritization, and repeated patterns.
            </p>
          </div>
          <div className={styles.abilityGrid}>
            {abilityCards.map((card) => (
              <article key={card.title} className={styles.abilityCard}>
                <div className={styles.abilityIcon}>{card.icon}</div>
                <div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardCopy}>{card.copy}</p>
                </div>
                <div className={styles.cardFrame}>
                  <img src={card.image} alt={`${card.title} portal preview`} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="workflows" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Integrated Workflows</span>
              <Heading as="h2" className={styles.sectionTitle}>
                What students actually get
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The product is part cinematic story experience, part practical AI setup path, and part student operating
              system students can apply immediately.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            {workflowCards.map((card) => (
              <article key={card.title} className={styles.workflowCard}>
                <div className={styles.workflowCopy}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardCopy}>{card.copy}</p>
                </div>
                <div className={styles.workflowFrame}>
                  <img src={card.image} alt={card.title} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.midCta}>
          <div className={styles.midCtaPanel}>
            <Heading as="h2" className={styles.sectionTitle}>
              Ready to install leverage instead of more noise?
            </Heading>
            <Link className={styles.primaryCta} to={checkoutPath}>
              Go To Checkout
            </Link>
          </div>
        </section>

        <section id="pricing" className={styles.section}>
          <div className={styles.centerHead}>
            <span className={styles.kicker}>System Ownership</span>
            <Heading as="h2" className={styles.sectionTitle}>
              One-time student portal access
            </Heading>
          </div>
          <div className={styles.pricingCard}>
            <div className={styles.priceBadge}>Lifetime</div>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>$129</span>
              <span className={styles.priceUnit}>USD</span>
            </div>
            <ul className={styles.priceList}>
              {pricingItems.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className={styles.priceActions}>
              <Link className={styles.primaryCta} to={checkoutPath}>
                Buy Student Portal
              </Link>
              <a className={styles.secondaryCta} href="https://portal.autonateai.com/#/login">
                Existing Access
              </a>
            </div>
            <p className={styles.priceNote}>No subscription. No extra membership layer. One payment, then enter the portal.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
