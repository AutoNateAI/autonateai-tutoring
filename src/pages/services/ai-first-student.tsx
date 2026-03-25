import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import BrowserOnly from '@docusaurus/BrowserOnly';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import SquareCheckoutCard from '@site/src/components/SquareCheckoutCard';

import styles from '../studentPortal.module.css';

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
        <section className={styles.checkoutPageIntro}>
          <div className={styles.checkoutCopy}>
            <Link className={styles.backLink} to="/">
              ← Back to landing page
            </Link>
            <span className={styles.kicker}>Secure Checkout</span>
            <Heading as="h1" className={styles.checkoutPageTitle}>
              Initialize the student portal
            </Heading>
            <p className={styles.heroBody}>
              This flow keeps the live Square payment logic intact. After payment, the system creates your paid portal
              access and routes you into the student experience.
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
