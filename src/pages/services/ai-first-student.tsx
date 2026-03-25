import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import FounderPanel from '@site/src/components/FounderPanel';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import PortalPreviewEmbed from '@site/src/components/PortalPreviewEmbed';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';

import styles from '../studentPortal.module.css';

const portalBase = 'https://portal.autonateai.com/#';
const portalImageBase = 'https://portal.autonateai.com/img/storyboards/student';

const checkoutBullets = [
  'Narrated student transformation deck with real portal visuals',
  'Thinking Systems for planning, assignments, reading, studying, and reflection',
  'Immediate portal access created after payment',
  'One-time purchase at $129',
];

export default function AiFirstStudentPage(): React.JSX.Element {
  const title = 'AI-First Student | Build Your Student Operating System';
  const description =
    'Buy the AutoNateAI student portal and unlock narrated instruction, Thinking Systems, workflow structure, and real AI leverage for school.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={`${title} | AutoNateAI`}
        description={description}
        image="/img/og-student-workflow.png"
        path="/services/ai-first-student"
      />
      <main className={styles.shell}>
        <section className={styles.checkoutHero}>
          <div className={styles.checkoutCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to landing page
            </Link>
            <span className={styles.kicker}>Checkout</span>
            <Heading as="h1" className={styles.heroTitle}>
              Buy the student operating upgrade
            </Heading>
            <p className={styles.heroBody}>
              This checkout unlocks the narrated portal, the Thinking Systems, and the student workflow structure that
              turns AI into real leverage instead of random noise.
            </p>
            <div className={styles.checkoutPriceRow}>
              <span className={styles.priceAmount}>$129</span>
              <span className={styles.priceUnit}>one time</span>
            </div>
            <ul className={styles.checkoutList}>
              {checkoutBullets.map((item) => (
                <li key={item}>
                  <span className={styles.check}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.checkoutVisual}>
            <div className={styles.heroFrame}>
              <img src={`${portalImageBase}/30-e.png`} alt="Student portal preview" />
            </div>
          </div>
        </section>

        <section className={styles.checkoutSection}>
          <BrowserOnly fallback={<div className={styles.loadingCard}>Loading secure checkout…</div>}>
            {() => <SquareCheckoutCard initialProductId="ai-first-student" />}
          </BrowserOnly>
        </section>

        <PortalPreviewEmbed
          title="See the real portal before you buy"
          description="This is the live student experience: the cinematic deck, the portal dashboard, and the workflow system students use after checkout."
          dashboardUrl={`${portalBase}/preview/student`}
          workflowUrl={`${portalBase}/preview/workflows/daily-time-grid`}
          openUrl={`${portalBase}/preview/student`}
        />

        <FounderPanel compact />
      </main>
    </Layout>
  );
}
