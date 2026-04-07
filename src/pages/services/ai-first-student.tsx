import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';

import styles from '../studentPortal.module.css';

export default function AiFirstStudentPage(): React.JSX.Element {
  const title = '2-Hour Student Systems Coaching | AutoNateAI';
  const description =
    'Book a live 2-hour student systems coaching session, get lifetime portal access, and learn how to use practical AI workflows for school and life.';

  return (
    <Layout title={title} description={description} wrapperClassName={styles.layout}>
      <PageSocialMeta
        title={`${title} | AutoNateAI`}
        description={description}
        image="/img/og-student-workflow.png"
        path="/services/ai-first-student"
      />
      <main className={styles.shell}>
        <section className={styles.checkoutPageIntro}>
          <div className={styles.checkoutCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to landing page
            </Link>
            <span className={styles.kicker}>Secure Checkout</span>
            <Heading as="h1" className={styles.checkoutPageTitle}>
              Book the live student systems coaching session
            </Heading>
            <p className={styles.heroBody}>
              After payment, the system creates your lifetime portal access automatically. Nate then follows up by email
              with calendar availability so you can choose your live 2-hour coaching session and learn how to use the
              workflows for real.
            </p>
          </div>
        </section>

        <section className={styles.checkoutSection}>
          <BrowserOnly fallback={<div className={styles.loadingCard}>Loading secure checkout…</div>}>
            {() => <SquareCheckoutCard initialProductId="ai-first-student" />}
          </BrowserOnly>
        </section>
      </main>
    </Layout>
  );
}
