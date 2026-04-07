import React, {useEffect, useMemo, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getProductById, type ProductId} from '@site/src/data/products';
import styles from '@site/src/pages/studentPortal.module.css';

type CheckoutState = 'idle' | 'loading' | 'ready' | 'processing' | 'success' | 'error';

const packageProductIds: Record<number, Record<number, ProductId>> = {
  25: {
    2: 'student-systems-program-25-2h',
    3: 'student-systems-program-25-3h',
    4: 'student-systems-program-25-4h',
  },
  50: {
    2: 'student-systems-program-50-2h',
    3: 'student-systems-program-50-3h',
    4: 'student-systems-program-50-4h',
  },
  100: {
    2: 'student-systems-program-100-2h',
    3: 'student-systems-program-100-3h',
    4: 'student-systems-program-100-4h',
  },
};

function loadSquareScript(environment: string) {
  const scriptId = 'square-web-payments-sdk';
  const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (existing) {
    return Promise.resolve();
  }

  const script = document.createElement('script');
  script.id = scriptId;
  script.src =
    environment === 'sandbox'
      ? 'https://sandbox.web.squarecdn.com/v1/square.js'
      : 'https://web.squarecdn.com/v1/square.js';
  script.async = true;

  return new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Square Web Payments SDK.'));
    document.body.appendChild(script);
  });
}

function resolveCheckoutUrl(baseUrl: string) {
  const trimmed = String(baseUrl || '').replace(/\/+$/, '');
  if (trimmed.endsWith('/createSquareCoursePayment')) {
    return trimmed;
  }
  return `${trimmed}/createSquareCoursePayment`;
}

function getSquareCardStyle() {
  return {
    '.input-container': {
      borderColor: 'rgba(137, 206, 255, 0.12)',
      borderRadius: '18px',
      borderWidth: '1px',
    },
    '.input-container.is-focus': {
      borderColor: '#25c2a0',
      borderWidth: '1px',
    },
    '.input-container.is-error': {
      borderColor: '#ff8d8d',
      borderWidth: '1px',
    },
    '.message-text': {
      color: '#8ea1b4',
    },
    '.message-text.is-error': {
      color: '#ffb4ab',
    },
    '.message-icon': {
      color: '#8ea1b4',
    },
    '.message-icon.is-error': {
      color: '#ffb4ab',
    },
    input: {
      backgroundColor: '#050e1d',
      color: '#dae2f8',
      fontFamily: 'Helvetica Neue',
      fontSize: '16px',
      fontWeight: '500',
    },
    'input::placeholder': {
      color: '#4a5b72',
    },
  };
}

function cohortRateLabel(studentCount: number) {
  if (studentCount === 25) {
    return '$129/student';
  }
  if (studentCount === 50) {
    return '$119/student';
  }
  return '$109/student';
}

function formatPackageLabel(studentCount?: number, workshopHours?: number) {
  return `Up to ${studentCount ?? 0} students · ${workshopHours ?? 0} hours`;
}

export default function ProgramsCheckoutCard(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const customFields = (siteConfig.customFields ?? {}) as Record<string, string>;
  const applicationId = customFields.squareAppId ?? '';
  const locationId = customFields.squareLocationId ?? '';
  const environment = customFields.squareEnvironment ?? 'sandbox';
  const checkoutApiBaseUrl = customFields.checkoutApiBaseUrl ?? '';
  const checkoutUrl = resolveCheckoutUrl(checkoutApiBaseUrl);

  const [selectedStudentCount, setSelectedStudentCount] = useState<25 | 50 | 100>(100);
  const [selectedWorkshopHours, setSelectedWorkshopHours] = useState<2 | 3 | 4>(2);
  const [status, setStatus] = useState<CheckoutState>('idle');
  const [message, setMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const cardRef = useRef<any>(null);
  const mountedRef = useRef(false);

  const selectedProductId = packageProductIds[selectedStudentCount][selectedWorkshopHours];
  const selectedProduct = useMemo(() => getProductById(selectedProductId), [selectedProductId]);
  const durationProducts = useMemo(
    () =>
      ([2, 3, 4] as const).map((hours) => ({
        hours,
        product: getProductById(packageProductIds[selectedStudentCount][hours]),
      })),
    [selectedStudentCount],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (!applicationId || !locationId) {
        setStatus('error');
        setMessage('Square is not configured yet.');
        return;
      }

      setStatus('loading');
      try {
        await loadSquareScript(environment);
        const square = window.Square;
        if (!square) {
          throw new Error('Square SDK did not initialize.');
        }

        const payments = await square.payments(applicationId, locationId);
        const card = await payments.card({
          style: getSquareCardStyle(),
        });
        await card.attach('#square-programs-card-container');
        if (!cancelled) {
          cardRef.current = card;
          setStatus('ready');
          setMessage('');
        }
      } catch (error) {
        if (!cancelled) {
          setStatus('error');
          setMessage(error instanceof Error ? error.message : 'Checkout failed to load.');
        }
      }
    }

    void boot();
    return () => {
      cancelled = true;
      cardRef.current = null;
      const container = document.getElementById('square-programs-card-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [applicationId, environment, locationId]);

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cardRef.current) {
      setStatus('error');
      setMessage('Payment form is not ready yet.');
      return;
    }

    if (!customerName.trim() || !email.trim() || !organizationName.trim()) {
      setStatus('error');
      setMessage('Enter your name, organization, and a valid email.');
      return;
    }

    setStatus('processing');
    setMessage('Tokenizing card...');

    try {
      const tokenResult = await cardRef.current.tokenize();
      if (tokenResult.status !== 'OK' || !tokenResult.token) {
        throw new Error(tokenResult.errors?.[0]?.message ?? 'Card tokenization failed.');
      }

      setMessage('Creating workshop payment...');
      const response = await fetch(checkoutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          productId: selectedProduct.id,
          customerName,
          email,
          organizationName,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Payment failed.');
      }

      if (mountedRef.current) {
        setStatus('success');
        setMessage(payload.successMessage ?? 'Payment complete.');
      }
    } catch (error) {
      if (mountedRef.current) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Payment failed.');
      }
    }
  }

  const summaryItems = [
    `${selectedProduct.workshopHours}-hour live student systems workshop`,
    `Lifetime portal access for up to ${selectedProduct.studentCount} students`,
    'Director follow-up for scheduling, rollout, and installation planning',
  ];

  return (
    <section className={styles.checkoutGrid}>
      <form id="programs-checkout-form" className={styles.checkoutFormPanel} onSubmit={handleCheckout}>
        <div className={styles.checkoutPanelHeader}>
          <h2 className={styles.checkoutPanelTitle}>Secure Program Checkout</h2>
          <p className={styles.checkoutPanelKicker}>Director Purchase Flow</p>
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlockLabel}>1. Choose Cohort Size</div>
          <div className={styles.selectorCarousel}>
            {([25, 50, 100] as const).map((count) => (
              <button
                key={count}
                type="button"
                className={selectedStudentCount === count ? styles.selectorCardActive : styles.selectorCard}
                onClick={() => setSelectedStudentCount(count)}>
                <span className={styles.selectorEyebrow}>Cohort</span>
                <strong>Up to {count} students</strong>
                <span className={styles.selectorMeta}>{cohortRateLabel(count)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlockLabel}>2. Choose Workshop Length</div>
          <div className={styles.selectorCarousel}>
            {durationProducts.map(({hours, product}) => (
              <button
                key={hours}
                type="button"
                className={selectedWorkshopHours === hours ? styles.selectorCardActive : styles.selectorCard}
                onClick={() => setSelectedWorkshopHours(hours as 2 | 3 | 4)}>
                <span className={styles.selectorEyebrow}>Workshop</span>
                <strong>{hours} hours</strong>
                <span className={styles.selectorMeta}>{product.priceLabel}</span>
                <span className={styles.selectorCopy}>
                  {hours === 2 ? 'Base package' : `Adds ${hours - 2} extra hour${hours > 3 ? 's' : ''} at $25 per student`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.checkoutSuccessCard}>
          <div className={styles.checkoutSuccessTitle}>Selected package</div>
          <div className={styles.packagePreviewRow}>
            <div>
              <strong>{formatPackageLabel(selectedProduct.studentCount, selectedProduct.workshopHours)}</strong>
              <div className={styles.productChoiceCopy}>{selectedProduct.description}</div>
            </div>
            <div className={styles.packagePreviewPrice}>{selectedProduct.priceLabel}</div>
          </div>
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlockLabel}>3. Director Information</div>
          <div className={styles.checkoutFieldGrid}>
            <label className={styles.checkoutField}>
              <span>Director Name</span>
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="NATE BAKER"
                autoComplete="name"
              />
            </label>
            <label className={styles.checkoutField}>
              <span>Work Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="DIRECTOR@PROGRAM.ORG"
                autoComplete="email"
              />
            </label>
            <label className={styles.checkoutField}>
              <span>Organization / Program</span>
              <input
                value={organizationName}
                onChange={(event) => setOrganizationName(event.target.value)}
                placeholder="WEST MICHIGAN COLLEGE PREP"
              />
            </label>
            <div className={styles.cardShellField}>
              <span className={styles.checkoutFieldLabel}>Card Details</span>
              <div id="square-programs-card-container" className={styles.squareCardContainer} />
            </div>
          </div>
        </div>

        {message ? (
          <div className={status === 'error' ? styles.checkoutMessageError : styles.checkoutMessage}>
            {message}
          </div>
        ) : null}
      </form>

      <aside className={styles.checkoutSummaryPanel}>
        <div className={styles.checkoutSummarySticky}>
          <div className={styles.checkoutBlockLabel}>Program Summary</div>
          <div className={styles.summaryHeader}>
            <div>
              <h3 className={styles.summaryTitle}>Student Systems Workshop</h3>
              <p className={styles.summarySubtitle}>{formatPackageLabel(selectedProduct.studentCount, selectedProduct.workshopHours)}</p>
            </div>
            <span className={styles.summaryPrice}>{selectedProduct.priceLabel}</span>
          </div>

          <div className={styles.summaryFeatureBox}>
            {summaryItems.map((item) => (
              <div key={item} className={styles.summaryFeature}>
                <span className={styles.check}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className={styles.summaryTotals}>
            <div>
              <span>Subtotal</span>
              <span>{selectedProduct.priceLabel}</span>
            </div>
            <div>
              <span>Network Fee</span>
              <span>$0.00</span>
            </div>
            <div className={styles.summaryTotalDue}>
              <span>Total Due</span>
              <span>{selectedProduct.priceLabel}</span>
            </div>
          </div>

          <div className={styles.summaryActions}>
            <button
              type="submit"
              form="programs-checkout-form"
              className={styles.checkoutSubmit}
              disabled={status === 'loading' || status === 'processing' || status === 'idle'}>
              {status === 'processing' ? `Process ${selectedProduct.priceLabel}...` : 'Complete Program Purchase'}
            </button>
            <div className={styles.summarySecurityNote}>
              Encrypted Square checkout. After payment, Nate follows up directly with scheduling and rollout steps.
            </div>
            <div className={styles.summarySecurityNote}>
              Portal improvements continue over time, and a director analytics dashboard is already in the roadmap.
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
