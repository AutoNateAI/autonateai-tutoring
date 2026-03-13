import React from 'react';

export default function EpiphanyEngine() {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '2rem auto', height: '150px' }}>
      <svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3578e5' }} />
            <stop offset="100%" style={{ stopColor: '#25c2a0' }} />
          </linearGradient>
          
          <filter id="glowSubtleNode" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* The Connection Path */}
        <path d="M50 60 L250 60 L550 60" stroke="var(--topo-line)" strokeWidth="2" fill="none" />
        
        {/* Flowing Data Particles */}
        <circle r="3" fill="url(#flowGrad)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M50 60 L250 60 L550 60" />
        </circle>
        <circle r="3" fill="url(#flowGrad)">
          <animateMotion dur="3s" begin="1s" repeatCount="indefinite" path="M50 60 L250 60 L550 60" />
        </circle>
        <circle r="3" fill="url(#flowGrad)">
          <animateMotion dur="3s" begin="2s" repeatCount="indefinite" path="M50 60 L250 60 L550 60" />
        </circle>

        {/* Mind Node (The Epiphany) */}
        <g>
          <circle cx="50" cy="60" r="15" fill="#3578e5" opacity="0.2" filter="url(#glowSubtleNode)">
            <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="60" r="6" fill="#3578e5" />
          <text x="50" y="95" fill="var(--topo-text-color)" fontSize="10" fontWeight="800" textAnchor="middle">MIND</text>
        </g>

        {/* Digital Node (The Computer) */}
        <g>
          <rect x="235" y="45" width="30" height="30" rx="4" fill="var(--ifm-color-emphasis-200)" opacity="0.1" />
          <path d="M240 50 L260 50 L260 70 L240 70 Z" fill="none" stroke="var(--autonate-teal)" strokeWidth="1" />
          <circle cx="250" cy="60" r="4" fill="var(--autonate-teal)">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
          </circle>
          <text x="250" y="95" fill="var(--topo-text-color)" fontSize="10" fontWeight="800" textAnchor="middle">COMPUTER</text>
        </g>

        {/* Physical Node (Reality) */}
        <g>
          <path d="M535 45 L565 60 L535 75 Z" fill="#25c2a0" />
          <text x="550" y="95" fill="var(--topo-text-color)" fontSize="10" fontWeight="800" textAnchor="middle">REALITY</text>
          <circle cx="550" cy="60" r="20" fill="none" stroke="#25c2a0" strokeWidth="1" opacity="0.5" filter="url(#glowSubtleNode)">
            <animate attributeName="r" values="10;30" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
