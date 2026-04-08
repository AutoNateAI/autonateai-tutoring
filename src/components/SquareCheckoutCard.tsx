import React, {useEffect, useMemo, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getProductById, type ProductId} from '@site/src/data/products';
import styles from '@site/src/pages/studentPortal.module.css';

type CheckoutState = 'idle' | 'loading' | 'ready' | 'processing' | 'success' | 'error';

declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId: string,
      ) => Promise<{
        card: (options?: unknown) => Promise<{
          attach: (selector: string) => Promise<void>;
          tokenize: () => Promise<{status: string; token?: string; errors?: Array<{message?: string}>}>;
        }>;
      }>;
    };
  }
}

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
    'input.is-focus': {
      backgroundColor: '#050e1d',
      color: '#dae2f8',
      fontFamily: 'Helvetica Neue',
      fontSize: '16px',
      fontWeight: '500',
    },
    'input.is-error': {
      color: '#ffb4ab',
    },
    '@media screen and (max-width: 600px)': {
      input: {
        fontSize: '16px',
      },
    },
  };
}

export default function SquareCheckoutCard({
  initialProductId,
}: {
  initialProductId?: ProductId;
}): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const customFields = (siteConfig.customFields ?? {}) as Record<string, string>;
  const applicationId = customFields.squareAppId ?? '';
  const locationId = customFields.squareLocationId ?? '';
  const environment = customFields.squareEnvironment ?? 'sandbox';
  const checkoutApiBaseUrl = customFields.checkoutApiBaseUrl ?? '';
  const checkoutUrl = resolveCheckoutUrl(checkoutApiBaseUrl);
  const portalBaseUrl = customFields.portalBaseUrl ?? 'https://workshop.autonateai.com';

  const [selectedProductId, setSelectedProductId] = useState<ProductId>(initialProductId ?? 'ai-first-student');
  const [status, setStatus] = useState<CheckoutState>('idle');
  const [message, setMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [successUrl, setSuccessUrl] = useState('');
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
  const [soldOut, setSoldOut] = useState(false);
  const cardRef = useRef<any>(null);
  const mountedRef = useRef(false);

  const selectedProduct = useMemo(() => getProductById(selectedProductId), [selectedProductId]);

  useEffect(() => {
    mountedRef.current = true;
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product') as ProductId | null;
    if (productParam === 'ai-first-student' || productParam === 'ai-first-researcher') {
      setSelectedProductId(productParam);
    }
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
        await card.attach('#square-card-container');
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
      const container = document.getElementById('square-card-container');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [applicationId, environment, locationId]);

  useEffect(() => {
    let cancelled = false;

    async function loadAvailability() {
      if (!selectedProduct.maxSuccessfulPayments) {
        setRemainingSeats(null);
        setSoldOut(false);
        return;
      }

      try {
        const response = await fetch(`${checkoutUrl}?productId=${encodeURIComponent(selectedProduct.id)}`);
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error ?? 'Could not load workshop availability.');
        }

        if (!cancelled) {
          setRemainingSeats(typeof payload.remainingSeats === 'number' ? payload.remainingSeats : null);
          setSoldOut(Boolean(payload.soldOut));
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(error instanceof Error ? error.message : 'Could not load workshop availability.');
        }
      }
    }

    void loadAvailability();
    return () => {
      cancelled = true;
    };
  }, [checkoutUrl, selectedProduct.id, selectedProduct.maxSuccessfulPayments]);

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (soldOut) {
      setStatus('error');
      setMessage('This workshop is sold out. No more seats are available.');
      return;
    }

    if (!cardRef.current) {
      setStatus('error');
      setMessage('Payment form is not ready yet.');
      return;
    }

    if (!customerName.trim() || !email.trim()) {
      setStatus('error');
      setMessage('Enter your name and a valid email.');
      return;
    }

    setStatus('processing');
    setMessage('Tokenizing card...');

    try {
      const tokenResult = await cardRef.current.tokenize();
      if (tokenResult.status !== 'OK' || !tokenResult.token) {
        throw new Error(tokenResult.errors?.[0]?.message ?? 'Card tokenization failed.');
      }

      setMessage('Creating payment and portal account...');
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
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Payment failed.');
      }

      const nextUrl = payload.portalUrl ?? `${portalBaseUrl}${selectedProduct.portalPath}`;
      if (mountedRef.current) {
        setStatus('success');
        setSuccessUrl(payload.portalUrl ? nextUrl : '');
        setTemporaryPassword(payload.temporaryPassword ?? '');
        setMessage(payload.successMessage ?? 'Payment complete.');
      }
    } catch (error) {
      if (mountedRef.current) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Payment failed.');
      }
    }
  }

  async function handleCopyTemporaryPassword() {
    if (!temporaryPassword) {
      return;
    }
    try {
      await navigator.clipboard.writeText(temporaryPassword);
      setMessage('Temporary password copied. Open the portal and paste it in.');
    } catch (error) {
      setMessage('Could not copy automatically. Select the temporary password and copy it manually.');
    }
  }

  const summaryItems =
    selectedProduct.id === 'ai-first-student'
      ? [
          'Live 2-hour coaching session with Nate',
          'Lifetime student portal access after payment',
          'Weekly portal updates and new workflow improvements',
        ]
      : selectedProduct.id === 'agentic-ai-workshop-apr-11-2026'
        ? [
            'Live workshop on Saturday, April 11, 2026',
            'Laptop setup with Codex, Gemini, or Claude',
            'Lifetime portal access with narrated slides and prompt packs',
          ]
      : [
          'Lifetime core portal updates',
          'Thinking Systems for daily execution',
          'Secure access creation after payment',
        ];

  return (
    <section className={styles.checkoutGrid}>
      <form id="secure-checkout-form" className={styles.checkoutFormPanel} onSubmit={handleCheckout}>
        <div className={styles.checkoutPanelHeader}>
          <h2 className={styles.checkoutPanelTitle}>Secure Checkout</h2>
          <p className={styles.checkoutPanelKicker}>System Initialization Protocol</p>
        </div>

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlockLabel}>Payment Selection</div>
          <div className={styles.paymentChoiceGrid}>
            <div className={`${styles.paymentChoice} ${styles.paymentChoiceActive}`}>
              <span className={styles.paymentChoiceIcon}>◫</span>
              <span>Credit Card</span>
            </div>
            <div className={styles.paymentChoiceMuted}>
              <span className={styles.paymentChoiceIcon}>◎</span>
              <span>Secure</span>
            </div>
            <div className={styles.paymentChoiceMuted}>
              <span className={styles.paymentChoiceIcon}>◌</span>
              <span>Protected</span>
            </div>
          </div>
        </div>

          <div className={`${styles.checkoutBlock} ${styles.productAccessBlock}`}>
          <div className={styles.checkoutBlockLabel}>Portal Access</div>
          <div className={styles.productChoiceStack}>
            <label className={styles.productChoiceActive}>
              <input type="radio" name="productId" value={selectedProduct.id} checked readOnly />
              <div className={styles.productChoiceBody}>
                <div className={styles.productChoiceTopRow}>
                  <strong>{selectedProduct.title}</strong>
                  <span>{selectedProduct.priceLabel}</span>
                </div>
                <div className={styles.productChoiceCopy}>{selectedProduct.description}</div>
              </div>
            </label>
          </div>
        </div>

        {selectedProduct.id === 'agentic-ai-workshop-apr-11-2026' ? (
          <div className={styles.checkoutSuccessCard}>
            <div className={styles.checkoutSuccessTitle}>Workshop seat status</div>
            <div className={styles.checkoutSuccessRow}>
              <span>{selectedProduct.eventDateLabel}</span>
              <strong>
                {soldOut
                  ? 'Sold out'
                  : remainingSeats == null
                    ? 'Checking seats...'
                    : `${remainingSeats} of ${selectedProduct.maxSuccessfulPayments} seats left`}
              </strong>
            </div>
          </div>
        ) : null}

        <div className={styles.checkoutBlock}>
          <div className={styles.checkoutBlockLabel}>Billing Information</div>
          <div className={styles.checkoutFieldGrid}>
            <label className={styles.checkoutField}>
              <span>Full Name</span>
              <input
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="ALEXANDER VANCE"
                autoComplete="name"
              />
            </label>
            <label className={styles.checkoutField}>
              <span>Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ARCHITECT@AUTONATE.AI"
                autoComplete="email"
              />
            </label>
            <div className={styles.cardShellField}>
              <span className={styles.checkoutFieldLabel}>Card Details</span>
              <div id="square-card-container" className={styles.squareCardContainer} />
            </div>
          </div>
        </div>

        {status === 'success' && temporaryPassword ? (
          <div className={styles.checkoutSuccessCard}>
            <div className={styles.checkoutSuccessTitle}>Temporary portal password</div>
            <div className={styles.checkoutSuccessRow}>
              <code>{temporaryPassword}</code>
              <button type="button" className={styles.inlineAction} onClick={handleCopyTemporaryPassword}>
                Copy password
              </button>
            </div>
          </div>
        ) : null}

        {message ? (
          <div className={status === 'error' ? styles.checkoutMessageError : styles.checkoutMessage}>
            {message}
          </div>
        ) : null}
      </form>

      <aside className={styles.checkoutSummaryPanel}>
        <div className={styles.checkoutSummarySticky}>
          <div className={styles.checkoutBlockLabel}>Order Summary</div>
          <div className={styles.summaryHeader}>
            <div>
              <h3 className={styles.summaryTitle}>
                {selectedProduct.id === 'ai-first-student'
                  ? 'Book Coaching'
                  : selectedProduct.id === 'agentic-ai-workshop-apr-11-2026'
                    ? 'Reserve Workshop Seat'
                    : 'Initialize System'}
              </h3>
              <p className={styles.summarySubtitle}>
                {selectedProduct.id === 'ai-first-student'
                  ? '2-Hour Student Systems Coaching'
                  : selectedProduct.id === 'agentic-ai-workshop-apr-11-2026'
                    ? `${selectedProduct.eventDateLabel} · ${selectedProduct.eventTimeLabel}`
                    : 'Student Transformation Portal'}
              </p>
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
              form="secure-checkout-form"
              className={styles.checkoutSubmit}
              disabled={status === 'loading' || status === 'processing' || status === 'idle' || soldOut}>
              {soldOut
                ? 'Workshop Sold Out'
                : status === 'processing'
                  ? `Complete Purchase ${selectedProduct.priceLabel}...`
                  : 'Complete Purchase'}
            </button>
            {status === 'success' && successUrl ? (
              <a className={styles.openPortalButton} href={successUrl}>
                Open Portal
              </a>
            ) : null}
            <div className={styles.summarySecurityNote}>Encrypted Square checkout. Portal access is created after payment.</div>
            {selectedProduct.id === 'ai-first-student' ? (
              <div className={styles.summarySecurityNote}>
                After payment, portal access is created automatically and Nate follows up by email with calendar availability
                for your live 2-hour coaching session.
              </div>
            ) : null}
            {selectedProduct.id === 'agentic-ai-workshop-apr-11-2026' ? (
              <div className={styles.summarySecurityNote}>
                Seats close automatically after 50 successful payments. Once you pay, your portal access is created and your
                workshop seat is locked.
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </section>
  );
}
