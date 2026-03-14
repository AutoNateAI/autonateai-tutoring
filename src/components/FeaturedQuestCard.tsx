import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

interface FeaturedQuestCardProps {
  title: string;
  domain: string;
  difficulty: string;
  description: string;
  link: string;
  image: string;
}

export default function FeaturedQuestCard({ title, domain, difficulty, description, link, image }: FeaturedQuestCardProps) {
  return (
    <div className="featured-quest-container" style={{ margin: '3rem 0' }}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .featured-card {
          display: flex;
          flex-direction: column;
          background: #0d1526;
          border: 2px solid var(--autonate-teal);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          animation: float 4s ease-in-out infinite;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none !important;
        }
        .featured-card:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
        }
        .featured-image-side {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .featured-content-side {
          padding: 2rem;
        }
        @media (min-width: 768px) {
          .featured-card {
            flex-direction: row;
          }
          .featured-image-side {
            width: 40%;
            height: auto;
          }
          .featured-content-side {
            width: 60%;
          }
        }
      `}</style>

      <Link to={link} className="featured-card">
        <img src={image} className="featured-image-side" alt={title} />
        
        <div className="featured-content-side">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge--primary">{domain}</span>
            <span className="badge badge--info">{difficulty}</span>
          </div>
          
          <Heading as="h2" style={{ color: '#ffffff', marginBottom: '1rem' }}>{title}</Heading>
          
          <p style={{ color: '#cbd5e0', fontSize: '1.1rem', lineHeight: '1.5' }}>
            {description}
          </p>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', color: 'var(--autonate-teal)', fontWeight: 'bold' }}>
            COMMENCE MISSION →
          </div>
        </div>
      </Link>
    </div>
  );
}
