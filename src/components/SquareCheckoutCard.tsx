import React, {useEffect, useMemo, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {getProductById, products, type ProductId} from '@site/src/data/products';

type CheckoutState = 'idle' | 'loading' | 'ready' | 'processing' | 'success' | 'error';

declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId: string,
      ) => Promise<{
        card: () => Promise<{
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
  const portalBaseUrl = customFields.portalBaseUrl ?? 'https://workshop.autonateai.com';

  const [selectedProductId, setSelectedProductId] = useState<ProductId>(initialProductId ?? 'ai-first-student');
  const [status, setStatus] = useState<CheckoutState>('idle');
  const [message, setMessage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successUrl, setSuccessUrl] = useState('');
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
        const card = await payments.card();
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

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cardRef.current) {
      setStatus('error');
      setMessage('Payment form is not ready yet.');
      return;
    }

    if (!customerName.trim() || !email.trim() || password.length < 8) {
      setStatus('error');
      setMessage('Enter your name, a valid email, and a password with at least 8 characters.');
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
      const response = await fetch(`${checkoutApiBaseUrl}/createSquareCoursePayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          productId: selectedProduct.id,
          customerName,
          email,
          password,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? 'Payment failed.');
      }

      const nextUrl = payload.portalUrl ?? `${portalBaseUrl}${selectedProduct.portalPath}`;
      if (mountedRef.current) {
        setStatus('success');
        setSuccessUrl(nextUrl);
        setMessage(
          `Payment complete. Your portal account is ready. Use ${email} and the password you just created.`,
        );
      }
    } catch (error) {
      if (mountedRef.current) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Payment failed.');
      }
    }
  }

  return (
    <section
      className="card shadow--lg"
      style={{
        background: '#0d1526',
        border: '1px solid rgba(37, 194, 160, 0.28)',
        marginTop: '2rem',
      }}>
      <div className="card__body" style={{padding: '2rem'}}>
        <div style={{color: '#8cd9c8', fontWeight: 700, marginBottom: '0.45rem'}}>Native checkout</div>
        <h2 style={{color: '#ffffff', marginBottom: '0.75rem'}}>Buy the course and create the portal account in one flow</h2>
        <p style={{color: '#cbd5e0', lineHeight: '1.7', maxWidth: '760px'}}>
          Pick the track, enter the email and password you want to use at the portal, then pay with Square. When the payment clears, access gets granted immediately.
        </p>

        <form onSubmit={handleCheckout} style={{display: 'grid', gap: '1rem', marginTop: '1.5rem'}}>
          <div style={{display: 'grid', gap: '0.85rem'}}>
            {products.map((product) => {
              const active = product.id === selectedProductId;
              return (
                <label
                  key={product.id}
                  style={{
                    display: 'block',
                    padding: '1rem 1.1rem',
                    borderRadius: '18px',
                    border: active ? '1px solid #25c2a0' : '1px solid rgba(255,255,255,0.08)',
                    background: active ? 'rgba(37, 194, 160, 0.1)' : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer',
                  }}>
                  <input
                    type="radio"
                    name="productId"
                    value={product.id}
                    checked={active}
                    onChange={() => setSelectedProductId(product.id)}
                    style={{marginRight: '0.65rem'}}
                  />
                  <strong style={{color: '#ffffff'}}>{product.title}</strong>{' '}
                  <span style={{color: '#8cd9c8', fontWeight: 700}}>{product.priceLabel}</span>
                  <div style={{color: '#cbd5e0', marginTop: '0.45rem'}}>{product.description}</div>
                </label>
              );
            })}
          </div>

          <div className="row">
            <div className="col col--6 margin-bottom--md">
              <label style={{display: 'grid', gap: '0.35rem', color: '#ffffff'}}>
                <span>Full name</span>
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  className="input"
                  style={{padding: '0.9rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: '#081121', color: '#ffffff'}}
                />
              </label>
            </div>
            <div className="col col--6 margin-bottom--md">
              <label style={{display: 'grid', gap: '0.35rem', color: '#ffffff'}}>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input"
                  style={{padding: '0.9rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: '#081121', color: '#ffffff'}}
                />
              </label>
            </div>
          </div>

          <label style={{display: 'grid', gap: '0.35rem', color: '#ffffff'}}>
            <span>Portal password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input"
              style={{padding: '0.9rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: '#081121', color: '#ffffff'}}
            />
          </label>

          <div
            id="square-card-container"
            style={{
              minHeight: '90px',
              borderRadius: '16px',
              padding: '1rem',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#081121',
            }}
          />

          <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center'}}>
            <button
              type="submit"
              className="button button--primary button--lg"
              disabled={status === 'loading' || status === 'processing' || status === 'idle'}>
              {status === 'processing' ? `Pay ${selectedProduct.priceLabel}...` : `Pay ${selectedProduct.priceLabel}`}
            </button>
            {status === 'success' && successUrl ? (
              <a
                className="button button--secondary button--lg"
                href={successUrl}>
                Open portal
              </a>
            ) : null}
          </div>

          {message ? (
            <div
              style={{
                color: status === 'error' ? '#ffb4b4' : '#d7e3f4',
                background: status === 'error' ? 'rgba(185, 28, 28, 0.14)' : 'rgba(37, 194, 160, 0.08)',
                border: `1px solid ${status === 'error' ? 'rgba(248, 113, 113, 0.3)' : 'rgba(37, 194, 160, 0.22)'}`,
                borderRadius: '14px',
                padding: '0.95rem 1rem',
              }}>
              {message}
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
