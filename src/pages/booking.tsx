import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PageSocialMeta from '@site/src/components/PageSocialMeta';

type ServiceCardProps = {
  title: string;
  price: string;
  schedule?: string;
  audience: string;
  description: React.ReactNode;
  href: string;
  ctaLabel: string;
};

const services: ServiceCardProps[] = [
  {
    title: '2-Hour Student Systems Coaching',
    price: '$159',
    schedule: 'Live coaching + lifetime portal access',
    audience: 'Students who want the system installed with them, taught live, and reinforced with practical workflows they keep.',
    description: (
      <p>
        A live 2-hour coaching session that gets the tools installed, teaches the portal workflows, and gives students
        lifetime access to the living portal after payment.
      </p>
    ),
    href: '/services/ai-first-student',
    ctaLabel: 'View Student Coaching',
  },
  {
    title: 'Student Systems Workshop Programs',
    price: '$3,225 - $15,900',
    schedule: '2 to 4 live hours + lifetime portal access for each student',
    audience: 'Schools, college-prep programs, and workforce-development teams buying for cohorts of up to 100 students.',
    description: (
      <p>
        Live student systems workshops that teach the mindset shift, install the workflows, and give every student the
        portal upgrade that continues evolving over time.
      </p>
    ),
    href: '/programs',
    ctaLabel: 'View Programs',
  },
  {
    title: 'AutoNateAI Opportunity Brief Setup',
    price: '$189',
    schedule: 'Initial setup for paid opportunity brief delivery',
    audience: 'Consultants, nonprofits, vendors, economic development orgs, staffing teams, and local businesses.',
    description: (
      <p>
        Purchase a scoped brief around regional intelligence, funding movement, active grants, likely subcontracting,
        hiring pressure, organizational movement, and practical next moves.
      </p>
    ),
    href: '/services/ai-first-researcher',
    ctaLabel: 'Purchase Brief Setup',
  },
  {
    title: 'DevBox Setup',
    price: 'Discovery Call',
    audience: 'Professionals who want a cleaner AI environment, stronger tooling, and a ready-to-use setup.',
    description: (
      <p>
        This is the next-level service. We map what you need, discuss your workflow, and scope a DevBox-style
        environment that supports structured experimentation, automation, and applied AI work.
      </p>
    ),
    href: '/services/devbox-setup',
    ctaLabel: 'View DevBox Details',
  },
];

function ServiceCard({title, price, schedule, audience, description, href, ctaLabel}: ServiceCardProps) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className="card shadow--md" style={{height: '100%', background: '#0d1526', border: '1px solid rgba(37, 194, 160, 0.28)'}}>
        <div className="card__header">
          <Heading as="h3" style={{color: '#ffffff'}}>
            {title}
          </Heading>
          <div className="badge badge--secondary margin-bottom--sm" style={{fontSize: '1rem'}}>
            {price}
          </div>
          {schedule ? <p style={{color: '#cbd5e0', marginBottom: 0}}>{schedule}</p> : null}
        </div>
        <div className="card__body">
          <p style={{color: '#ffffff'}}>
            <strong>Best For:</strong> {audience}
          </p>
          <div style={{color: '#cbd5e0'}}>{description}</div>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={href}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage(): React.JSX.Element {
  const title = 'Choose Your AI Path | Coaching, Programs, and Systems';
  const description =
    'Pick the fastest path into usable AI: live student coaching, student workshop programs, opportunity briefs, or a higher-touch DevBox setup.';

  return (
    <Layout title={title} description={description}>
      <PageSocialMeta
        title={`${title} | AutoNateAI | Daily AI Thought Experiments`}
        description={description}
        image="/img/og-booking.png"
        path="/booking"
      />
      <main className="container padding-vert--xl">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2" style={{fontSize: '2.3rem'}}>Choose Your Next Step</Heading>
          <p className="hero__subtitle" style={{maxWidth: '780px', margin: '0.75rem auto 0', fontSize: '1.05rem'}}>
            Coaching for individuals, programs for cohorts, and higher-touch systems work for specialized use cases.
          </p>
        </div>

        <div className="row">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </main>
    </Layout>
  );
}
