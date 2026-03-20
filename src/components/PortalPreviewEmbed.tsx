import React from 'react';
import Heading from '@theme/Heading';

type PortalPreviewEmbedProps = {
  title: string;
  description: string;
  dashboardUrl: string;
  workflowUrl: string;
  openUrl: string;
};

function PreviewFrame({label, src}: {label: string; src: string}) {
  return (
    <div
      style={{
        border: '1px solid rgba(37, 194, 160, 0.22)',
        borderRadius: '20px',
        background: 'rgba(5, 10, 26, 0.82)',
        overflow: 'hidden',
      }}>
      <div
        style={{
          padding: '0.8rem 1rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          color: '#8cd9c8',
          fontWeight: 700,
          fontSize: '0.92rem',
        }}>
        {label}
      </div>
      <div style={{aspectRatio: '16 / 10', background: '#081121'}}>
        <iframe
          title={label}
          src={src}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            border: 0,
            background: '#081121',
          }}
        />
      </div>
    </div>
  );
}

export default function PortalPreviewEmbed({
  title,
  description,
  dashboardUrl,
  workflowUrl,
  openUrl,
}: PortalPreviewEmbedProps): React.JSX.Element {
  return (
    <section
      className="card shadow--md"
      style={{
        marginTop: '1.5rem',
        background: '#0d1526',
        border: '1px solid rgba(37, 194, 160, 0.28)',
      }}>
      <div className="card__body" style={{padding: '2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'start', flexWrap: 'wrap'}}>
          <div>
            <div style={{color: '#8cd9c8', fontWeight: 700, marginBottom: '0.45rem'}}>Live portal preview</div>
            <Heading as="h2" style={{color: '#ffffff', fontSize: '1.4rem', marginBottom: '0.6rem'}}>
              {title}
            </Heading>
            <p style={{color: '#cbd5e0', lineHeight: '1.7', marginBottom: 0, maxWidth: '760px'}}>
              {description}
            </p>
          </div>
          <a
            className="button button--secondary"
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer">
            Open Full Preview
          </a>
        </div>

        <div className="row margin-top--lg">
          <div className="col col--6 margin-bottom--md">
            <PreviewFrame label="Track dashboard preview" src={dashboardUrl} />
          </div>
          <div className="col col--6 margin-bottom--md">
            <PreviewFrame label="Workflow preview" src={workflowUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
