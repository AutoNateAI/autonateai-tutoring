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
    title: 'Student Workflow Cohort',
    price: '$129',
    schedule: 'Monday and Wednesday, 7:30 PM to 9:30 PM EST',
    audience: 'Students who want a faster path from AI confusion to structured execution.',
    description: (
      <p>
        This is the student-facing live session. You learn how to turn ChatGPT, Google Sheets, and structured prompts
        into a student workflow system you can actually use. Maximum 25 students.
      </p>
    ),
    href: '/services/workshop',
    ctaLabel: 'View Student Details',
  },
  {
    title: 'Research Cohort',
    price: '$189',
    schedule: 'Tuesday and Thursday, 7:30 PM to 9:30 PM EST',
    audience: 'Researchers who need cleaner note systems, stronger synthesis workflows, and better research organization.',
    description: (
      <p>
        Built for research-heavy work. The same live cohort cadence, but framed around structured notes, evidence
        extraction, synthesis, and research workflows. Maximum 25 students.
      </p>
    ),
    href: '/services/researchers',
    ctaLabel: 'View Research Details',
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
  const title = 'Choose Your AI Path | Cohorts and DevBox Setup';
  const description =
    'Pick the fastest path into usable AI: Student Workflow Cohort, Research Cohort, or a higher-touch DevBox setup.';

  return (
    <Layout
      title={title}
      description={description}
      image="https://autonateai.com/img/og-booking.png">
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
            Three doors. Pick the one that gets you to usable AI the fastest.
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
