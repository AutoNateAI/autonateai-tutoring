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

  return (
    <div className="card-slam-container" style={{
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1000px',
      margin: '2rem 0',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <style>{`
        @keyframes slamIn {
          0% { transform: translateZ(500px) scale(3); opacity: 0; filter: blur(20px); }
          70% { transform: translateZ(-50px) scale(0.95); opacity: 1; filter: blur(0); }
          100% { transform: translateZ(0) scale(1); opacity: 1; }
        }
        .slam-active {
          animation: slamIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .card-slam-inner {
          background: #0d1526;
          border: 2px solid var(--autonate-teal);
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          max-width: 800px;
          opacity: 0;
        }
      `}</style>
      
      <div className={clsx('card-slam-inner', slammed && 'slam-active')}>
        <h1 style={{ 
          color: '#ffffff', 
          fontSize: '3rem', 
          fontWeight: '900',
          margin: 0,
          lineHeight: '1.1'
        }}>
          {question}
        </h1>
        {subtext && (
          <p style={{ 
            color: 'var(--autonate-teal)', 
            fontSize: '1.2rem', 
            marginTop: '1.5rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            {subtext}
          </p>
        )}
      </div>
      
      <div style={{ marginTop: '2rem', opacity: slammed ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
        <p style={{ color: 'var(--ifm-color-emphasis-500)', fontWeight: 'bold' }}>
          SCROLL TO COMMENCE MISSION ↓
        </p>
      </div>
    </div>
  );
}
