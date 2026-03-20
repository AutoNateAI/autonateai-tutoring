import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CoursePromoVideo from '@site/src/components/CoursePromoVideo';
import PageSocialMeta from '@site/src/components/PageSocialMeta';
import PortalPreviewEmbed from '@site/src/components/PortalPreviewEmbed';

const portalBase = 'https://autonateai.github.io/autonateai-workshop-portal/#';

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
    title: 'AI-First Student',
    price: '$129',
    schedule: 'One-time purchase, instant access',
    audience: 'Students who want a real AI operating system for school, planning, and day-to-day execution.',
    description: (
      <p>
        A premium async course with narrated lecture slides, 6 workflow kits, prompt packs, and connected Google
        Sheets that help students plan, study, reflect, and organize with AI.
      </p>
    ),
    href: '/services/ai-first-student',
    ctaLabel: 'View Student Course',
  },
  {
    title: 'AI-First Researcher',
    price: '$189',
    schedule: 'One-time purchase, instant access',
    audience: 'Researchers who need stronger synthesis systems, better note infrastructure, and cleaner AI-assisted research workflows.',
    description: (
      <p>
        A premium async course with narrated lectures, 6 research workflow kits, prompt packs, and structured sheets
        designed for intake, synthesis, comparison, and insight generation.
      </p>
    ),
    href: '/services/ai-first-researcher',
    ctaLabel: 'View Research Course',
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
  const title = 'Choose Your AI Path | Async Courses and DevBox Setup';
  const description =
    'Pick the fastest path into usable AI: AI-First Student, AI-First Researcher, or a higher-touch DevBox setup.';

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
            Two premium async courses and one higher-touch service. Pick the path that gets you to usable AI the fastest.
          </p>
        </div>

        <div className="row">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <CoursePromoVideo
          title="Watch the async course portal in action"
          description="This short demo shows the actual portal experience: narrated lecture decks, workflow pages, prompt packs, and connected Sheets for both tracks."
        />

        <PortalPreviewEmbed
          title="Preview the actual portal students get after purchase"
          description="This is the real product surface, not a mockup. The premium courses unlock the narrated track dashboards, workflow pages, prompt packs, and linked Sheets inside the portal."
          dashboardUrl={`${portalBase}/preview/student`}
          workflowUrl={`${portalBase}/preview/workflows/daily-time-grid`}
          openUrl={`${portalBase}/preview/student`}
        />
      </main>
    </Layout>
  );
}
