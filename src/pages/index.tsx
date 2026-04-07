import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import HeroPromoVideo from '@site/src/components/HeroPromoVideo';

import styles from './studentPortal.module.css';

const coachingPath = '/services/ai-first-student';
const programsPath = '/programs';

type DemoCard = {
  icon?: string;
  title: string;
  copy: string;
  video: string;
  label: string;
};

const abilityCards: DemoCard[] = [
  {
    icon: '▣',
    title: 'Daily Time Grid',
    copy: 'For when the whole day feels impossible and a student needs a visible system for time, roles, priorities, and recovery.',
    video: '/video/portal-demos/daily-time-grid-mobile.mp4',
    label: 'Daily Time Grid workflow demo',
  },
  {
    icon: '⚡',
    title: 'Assignment Sprint Planner',
    copy: 'For when the work feels too big to start and the next useful actions need to become obvious immediately.',
    video: '/video/portal-demos/assignment-sprint-mobile.mp4',
    label: 'Assignment Sprint Planner workflow demo',
  },
  {
    icon: '▤',
    title: 'Reading Capture Matrix',
    copy: 'For when students read but nothing sticks and they need structured notes that survive pressure and repetition.',
    video: '/video/portal-demos/reading-capture-mobile.mp4',
    label: 'Reading Capture Matrix workflow demo',
  },
  {
    icon: '◫',
    title: 'Study Heatmap Board',
    copy: 'For when everything feels urgent and students need to see what deserves focus before burnout starts running the day.',
    video: '/video/portal-demos/study-heatmap-mobile.mp4',
    label: 'Study Heatmap Board workflow demo',
  },
  {
    icon: '◉',
    title: 'Paper Source Matrix',
    copy: 'For when the research is scattered across tabs, screenshots, and half-finished drafts and needs real structure.',
    video: '/video/portal-demos/paper-source-mobile.mp4',
    label: 'Paper Source Matrix workflow demo',
  },
  {
    icon: '◎',
    title: 'Day Debrief Lab',
    copy: 'For when bad patterns keep repeating and reflection needs to turn into signal, strategy, and better execution.',
    video: '/video/portal-demos/day-debrief-mobile.mp4',
    label: 'Day Debrief Lab workflow demo',
  },
];

const workflowCards: DemoCard[] = [
  {
    title: 'Live Installation Coaching',
    copy:
      'This is not a passive portal drop. The 2-hour coaching session gets the tools installed, shows students how to use the workflows, and helps the system click while support is live.',
    video: '/video/portal-demos/student-sheet-copy-mobile.mp4',
    label: 'Portal sheet copy demo',
  },
  {
    title: 'Narrated Story Deck + Thinking Systems',
    copy:
      'Students learn the mindset shift first, then move into practical systems for planning, studying, reading, writing, and reflection with AI.',
    video: '/video/portal-demos/student-lecture-mobile.mp4',
    label: 'Narrated story deck demo',
  },
];

const updateItems = [
  'Weekly portal updates and workflow improvements',
  'New features shaped by student feedback and real usage patterns',
  'Director analytics roadmap for program reporting and funding visibility',
];

function PortalDemoPhone({src, label}: {src: string; label: string}): React.JSX.Element {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const jumpPastLoadIn = (): void => {
      if (!video.duration || Number.isNaN(video.duration)) {
        return;
      }

      video.currentTime = Math.min(1, Math.max(0, video.duration - 0.25));
    };

    if (video.readyState >= 1) {
      jumpPastLoadIn();
    } else {
      video.addEventListener('loadedmetadata', jumpPastLoadIn, {once: true});
    }

    return () => {
      video.removeEventListener('loadedmetadata', jumpPastLoadIn);
    };
  }, [src]);

  return (
    <div className={styles.demoMediaShell}>
      <div className={styles.demoGlow} />
      <div className={styles.demoPhoneFrame}>
        <video
          ref={videoRef}
          className={styles.demoPhoneVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  const title = 'AutoNateAI | Student Systems Coaching';
  const description =
    'Book a live 2-hour student systems coaching session, get the portal installed, and keep lifetime access to practical AI workflows that reduce overload.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={`${title} | AutoNateAI`}
        description={description}
        image="/img/og-homepage.png"
        path="/"
      />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Student Systems Coaching</span>
            <Heading as="h1" className={styles.heroTitle}>
              Stop drowning in school pressure.
            </Heading>
            <HeroPromoVideo className={styles.heroVideoMobile} />
            <p className={styles.heroShift}>The gap is not intelligence. It is infrastructure.</p>
            <p className={styles.heroBody}>
              AutoNateAI is now a live 2-hour coaching session that gets the system installed, teaches students how to
              use the workflows, and gives them lifetime access to the portal they keep building on after the session
              ends.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to={coachingPath}>
                Book 2-Hour Coaching
              </Link>
              <Link className={styles.secondaryCta} to={programsPath}>
                Explore Programs
              </Link>
            </div>
            <p className={styles.meta}>$159 per student for 1:1 coaching. Org workshops available for up to 100 students.</p>
          </div>
          <div className={styles.heroVisual}>
            <HeroPromoVideo className={styles.heroVideoDesktop} />
            <div className={styles.heroNote}>
              Students do not need more noise. They need a system that can hold their load and teach them how to think
              with AI on purpose.
            </div>
          </div>
        </section>

        <section id="system" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Unlocked Abilities</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Real workflows for real student pressure
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              These are not random prompts. They are Thinking Systems tied to specific forms of overload so students can
              leave the coaching session with workflows they can run immediately.
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
                <div className={styles.demoCardFrame}>
                  <PortalDemoPhone src={card.video} label={card.label} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="workflows" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Installed With You</span>
              <Heading as="h2" className={styles.sectionTitle}>
                What the coaching actually delivers
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The session combines live setup, the narrated portal experience, practical workbook workflows, and a
              lasting student operating system students can keep applying after the call.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            {workflowCards.map((card) => (
              <article key={card.title} className={styles.workflowCard}>
                <div className={styles.workflowCopy}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardCopy}>{card.copy}</p>
                </div>
                <div className={styles.demoWorkflowFrame}>
                  <PortalDemoPhone src={card.video} label={card.label} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Living Portal</span>
              <Heading as="h2" className={styles.sectionTitle}>
                This system keeps getting better
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              The portal is living and breathing. We update it weekly, listen to student feedback, and actively build new
              features that make students more efficient over time.
            </p>
          </div>
          <div className={styles.infoPanel}>
            <ul className={styles.priceList}>
              {updateItems.map((item) => (
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
            <Heading as="h2" className={styles.sectionTitle}>
              Need this installed across a school, workforce-development cohort, or college-prep program?
            </Heading>
            <p className={styles.heroBody}>
              The same system can be delivered live to groups in 2 to 4 hours, with lifetime portal access for each
              student and a roadmap toward director analytics over time.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to={programsPath}>
                View Programs
              </Link>
              <Link className={styles.secondaryCta} to={coachingPath}>
                Start With 1:1 Coaching
              </Link>
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.section}>
          <div className={styles.centerHead}>
            <span className={styles.kicker}>Student Offer</span>
            <Heading as="h2" className={styles.sectionTitle}>
              2-hour coaching + lifetime portal access
            </Heading>
          </div>
          <div className={styles.pricingCard}>
            <div className={styles.priceBadge}>Live</div>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>$159</span>
              <span className={styles.priceUnit}>Per student</span>
            </div>
            <ul className={styles.priceList}>
              <li>
                <span className={styles.check}>✓</span>
                <span>Live 2-hour coaching session focused on installation and practical workflow use</span>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <span>Automatic lifetime access to the student portal after payment</span>
              </li>
              <li>
                <span className={styles.check}>✓</span>
                <span>Real practical systems for planning, studying, reading, writing, and reflection</span>
              </li>
            </ul>
            <div className={styles.priceActions}>
              <Link className={styles.primaryCta} to={coachingPath}>
                Buy Coaching Session
              </Link>
              <a className={styles.secondaryCta} href="https://portal.autonateai.com/#/login">
                Already Bought? Sign In
              </a>
            </div>
            <p className={styles.priceNote}>
              After purchase, portal access is created automatically and Nate follows up by email with calendar
              availability for the live coaching session.
            </p>
          </div>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Ready to book your coaching session?</strong>
          <span>Jump straight to secure checkout and get the portal installed.</span>
        </div>
        <Link className={styles.mobileStickyButton} to={coachingPath}>
          Buy Coaching
        </Link>
      </div>
    </Layout>
  );
}
