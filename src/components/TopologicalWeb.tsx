import React from 'react';

export default function TopologicalWeb() {
  return (
    <div className="topological-web-container">
      <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" style={{overflow: 'visible'}}>
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#3578e5'}} />
            <stop offset="100%" style={{stopColor: '#25c2a0'}} />
          </linearGradient>
        </defs>
        
        {/* Traceable paths */}
        <path d="M50 60 L150 30 L250 60 L350 60" fill="none" stroke="url(#webGrad)" strokeWidth="3" strokeDasharray="15,5">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M50 60 L150 90 L250 60" fill="none" stroke="url(#webGrad)" strokeWidth="3" strokeDasharray="15,5">
          <animate attributeName="stroke-dashoffset" from="150" to="0" dur="8s" repeatCount="indefinite" />
        </path>

        {/* Nodes with pulsing animations */}
        <g>
          {/* Foundations Node */}
          <circle cx="50" cy="60" r="5" fill="#3578e5">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Systems Node */}
          <circle cx="150" cy="30" r="5" fill="#3578e5">
            <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          {/* Theory Node */}
          <circle cx="150" cy="90" r="5" fill="#3578e5">
            <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Applied Node */}
          <circle cx="250" cy="60" r="5" fill="#25c2a0">
            <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" />
          </circle>
          {/* Mastery Node (The Goal) */}
          <circle cx="350" cy="60" r="10" fill="#25c2a0">
            <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="fill" values="#25c2a0;#3578e5;#25c2a0" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Labels linked to nodes */}
        <g style={{fontWeight: '800', fontFamily: 'system-ui', textTransform: 'uppercase', letterSpacing: '1px'}}>
          <text x="50" y="80" fontSize="10" fill="currentColor" textAnchor="middle">Foundations</text>
          <text x="150" y="20" fontSize="10" fill="currentColor" textAnchor="middle">Systems</text>
          <text x="150" y="110" fontSize="10" fill="currentColor" textAnchor="middle">Theory</text>
          <text x="250" y="80" fontSize="10" fill="currentColor" textAnchor="middle">Applied</text>
          <text x="350" y="40" fontSize="14" fill="var(--ifm-color-primary)" textAnchor="middle">MASTERY</text>
        </g>
      </svg>
    </div>
  );
}
