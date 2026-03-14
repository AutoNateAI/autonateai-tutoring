import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

interface CardSlamProps {
  question: string;
  subtext?: string;
}

export default function CardSlam({ question, subtext }: CardSlamProps) {
  const [slammed, setSlammed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlammed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Helper to convert string to Title Case with Acronym support
  const toTitleCase = (str: string) => {
    return str.toLowerCase().split(' ').map(word => {
      // Handle specific acronyms like AI
      if (word === 'ai') return 'AI';
      if (word === 'cs') return 'CS';
      if (word === 'swe') return 'SWE';
      if (word === 'dag') return 'DAG';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  return (
    <div className="card-slam-container" style={{
      minHeight: '350px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1000px',
      margin: '1.5rem 0',
      textAlign: 'center',
      padding: '1rem'
    }}>
      <style>{`
        @keyframes slamIn {
          0% { transform: translateZ(500px) scale(2.5); opacity: 0; filter: blur(15px); }
          70% { transform: translateZ(-30px) scale(0.98); opacity: 1; filter: blur(0); }
          100% { transform: translateZ(0) scale(1); opacity: 1; }
        }
        .slam-active {
          animation: slamIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .card-slam-inner {
          background: #0d1526;
          border: 2px solid var(--autonate-teal);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
          max-width: 700px;
          opacity: 0;
          width: 100%;
        }
        .slam-title {
          color: #ffffff;
          font-size: 1.8rem; /* Mobile font size */
          font-weight: 900;
          margin: 0;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .slam-title {
            font-size: 2.5rem; /* Desktop font size */
          }
          .card-slam-inner {
            padding: 3rem;
          }
        }
      `}</style>
      
      <div className={clsx('card-slam-inner', slammed && 'slam-active')}>
        <h1 className="slam-title">
          {toTitleCase(question)}
        </h1>
        {subtext && (
          <p style={{ 
            color: 'var(--autonate-teal)', 
            fontSize: '1rem', 
            marginTop: '1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1.5px'
          }}>
            {toTitleCase(subtext)}
          </p>
        )}
      </div>
      
      <div style={{ marginTop: '1.5rem', opacity: slammed ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
        <p style={{ color: 'var(--ifm-color-emphasis-500)', fontWeight: 'bold', fontSize: '0.9rem' }}>
          SCROLL TO COMMENCE MISSION ↓
        </p>
      </div>
    </div>
  );
}
