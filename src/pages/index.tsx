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
  cue: string;
  cueDetail: string;
};

const abilityCards: DemoCard[] = [
  {
    icon: '▣',
    title: 'Daily Time Grid',
    copy: 'For when the whole day feels impossible and a student needs a visible system for time, roles, priorities, and recovery.',
    video: '/video/portal-demos/daily-time-grid-desktop.mp4',
    label: 'Daily Time Grid workflow demo',
    cue: 'Map the chaos',
    cueDetail: 'Fill the prompt, then run the system.',
  },
  {
    icon: '⚡',
    title: 'Assignment Sprint Planner',
    copy: 'For when the work feels too big to start and the next useful actions need to become obvious immediately.',
    video: '/video/portal-demos/assignment-sprint-desktop.mp4',
    label: 'Assignment Sprint Planner workflow demo',
    cue: 'Break inertia',
    cueDetail: 'Turn vague pressure into next actions.',
  },
  {
    icon: '▤',
    title: 'Reading Capture Matrix',
    copy: 'For when students read but nothing sticks and they need structured notes that survive pressure and repetition.',
    video: '/video/portal-demos/reading-capture-desktop.mp4',
    label: 'Reading Capture Matrix workflow demo',
    cue: 'Catch the signal',
    cueDetail: 'Build notes that actually stay useful.',
  },
  {
    icon: '◫',
    title: 'Study Heatmap Board',
    copy: 'For when everything feels urgent and students need to see what deserves focus before burnout starts running the day.',
    video: '/video/portal-demos/study-heatmap-desktop.mp4',
    label: 'Study Heatmap Board workflow demo',
    cue: 'See the load',
    cueDetail: 'Surface what deserves your attention first.',
  },
  {
    icon: '◉',
    title: 'Paper Source Matrix',
    copy: 'For when the research is scattered across tabs, screenshots, and half-finished drafts and needs real structure.',
    video: '/video/portal-demos/paper-source-desktop.mp4',
    label: 'Paper Source Matrix workflow demo',
    cue: 'Organize the evidence',
    cueDetail: 'Bring scattered research into one frame.',
  },
  {
    icon: '◎',
    title: 'Day Debrief Lab',
    copy: 'For when bad patterns keep repeating and reflection needs to turn into signal, strategy, and better execution.',
    video: '/video/portal-demos/day-debrief-desktop.mp4',
    label: 'Day Debrief Lab workflow demo',
    cue: 'Read the pattern',
    cueDetail: 'Turn reflection into the next smarter move.',
  },
];

const workflowCards: DemoCard[] = [
  {
    title: 'Live Installation Coaching',
    copy:
      'This is not a passive portal drop. The 2-hour coaching session gets the tools installed, shows students how to use the workflows, and helps the system click while support is live.',
    video: '/video/portal-demos/student-setup-desktop.mp4',
    label: 'Portal setup demo',
    cue: 'Install the system',
    cueDetail: 'Start in Setup so the tools, access, and flow are ready.',
  },
  {
    title: 'Narrated Story Deck + Thinking Systems',
    copy:
      'Students learn the mindset shift first, then move into practical systems for planning, studying, reading, writing, and reflection with AI.',
    video: '/video/portal-demos/student-lecture-desktop.mp4',
    label: 'Narrated story deck demo',
    cue: 'Start with the shift',
    cueDetail: 'Narration frames the system before execution starts.',
  },
];

const updateItems = [
  'Weekly portal updates and workflow improvements',
  'New features shaped by student feedback and real usage patterns',
  'Director analytics roadmap for program reporting and funding visibility',
];

function PortalDemoPhone({
  src,
  label,
  cue,
  cueDetail,
}: {
  src: string;
  label: string;
  cue: string;
  cueDetail: string;
}): React.JSX.Element {
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
      video.playbackRate = 0.72;
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
      <div className={styles.demoCue}>
        <strong>{cue}</strong>
        <span>{cueDetail}</span>
      </div>
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
  const title = 'AutoNateAI | Agentic AI Coaching';
  const description =
    'Book a live 2-hour Agentic AI coaching session, get the portal installed, and keep lifetime access to practical AI workflows that reduce overload and improve execution.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={title}
        description={description}
        image="/img/og-homepage.png"
        path="/"
      />
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Agentic AI Coaching</span>
            <Heading as="h1" className={styles.heroTitle}>
              Install agentic AI into how you think and execute.
            </Heading>
            <HeroPromoVideo className={styles.heroVideoMobile} />
            <p className={styles.heroShift}>The gap is not talent. It is workflow, tooling, and retrieval.</p>
            <p className={styles.heroBody}>
              AutoNateAI is a live 2-hour Agentic AI coaching session. I install the tools, teach the workflows, and
              show students how to use AI with structure so they leave with cleaner execution and lifetime portal access.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} to={coachingPath}>
                Book 2-Hour Coaching
              </Link>
              <Link className={styles.secondaryCta} to={programsPath}>
                Explore Programs
              </Link>
            </div>
            <p className={styles.meta}>$159 per student for 1:1 Agentic AI coaching. Org programs available for up to 100 students.</p>
          </div>
          <div className={styles.heroVisual}>
            <HeroPromoVideo className={styles.heroVideoDesktop} />
            <div className={styles.heroNote}>
              Students do not need more noise. They need agentic AI coaching that installs a real system and makes AI usable on purpose.
            </div>
          </div>
        </section>

        <section id="system" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.kicker}>Unlocked Abilities</span>
              <Heading as="h2" className={styles.sectionTitle}>
                Real workflows for real pressure
              </Heading>
            </div>
            <p className={styles.sectionCopy}>
              These are not random prompts. They are agentic Thinking Systems tied to specific forms of overload so students can
              leave the coaching session with workflows they can run immediately.
            </p>
          </div>
          <div className={styles.abilityGrid}>
            {abilityCards.map((card) => (
              <article key={card.title} className={styles.abilityCard}>
                <div className={styles.abilityIcon}>{card.icon}</div>
                <div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
                <div className={styles.demoCardFrame}>
                  <PortalDemoPhone src={card.video} label={card.label} cue={card.cue} cueDetail={card.cueDetail} />
                </div>
                <p className={styles.cardCopy}>{card.copy}</p>
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
              The session combines live setup, agentic workflow coaching, the narrated portal experience, and practical
              workbook systems students can keep applying after the call.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            {workflowCards.map((card) => (
              <article key={card.title} className={styles.workflowCard}>
                <div className={styles.workflowCopy}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
                <div className={styles.demoWorkflowFrame}>
                  <PortalDemoPhone src={card.video} label={card.label} cue={card.cue} cueDetail={card.cueDetail} />
                </div>
                <div className={styles.workflowBody}>
                  <p className={styles.cardCopy}>{card.copy}</p>
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
              The portal is living and breathing. We update it weekly, listen to student feedback, and actively build
              new features that make agentic AI work more cleanly over time.
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
              The same Agentic AI coaching model can be delivered live to groups in 2 to 4 hours, with lifetime portal
              access for each student and a roadmap toward director analytics over time.
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
            <span className={styles.kicker}>1:1 Offer</span>
            <Heading as="h2" className={styles.sectionTitle}>
              2-hour Agentic AI coaching + lifetime portal access
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
                <span>Live 2-hour coaching session focused on agentic AI installation and practical workflow use</span>
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
              availability for the live Agentic AI coaching session.
            </p>
          </div>
        </section>
      </main>
      <div className={styles.mobileStickyCta}>
        <div className={styles.mobileStickyCopy}>
          <strong>Ready to book your Agentic AI coaching session?</strong>
          <span>Jump straight to secure checkout and get the portal installed.</span>
        </div>
        <Link className={styles.mobileStickyButton} to={coachingPath}>
          Buy Coaching
        </Link>
      </div>
    </Layout>
  );
}
