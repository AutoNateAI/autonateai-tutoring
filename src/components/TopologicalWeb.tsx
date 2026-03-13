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
        
        {/* Nodes */}
        <circle cx="50" cy="60" r="5" fill="#3578e5">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="30" r="5" fill="#3578e5">
          <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="90" r="5" fill="#3578e5">
          <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="60" r="5" fill="#25c2a0">
          <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="60" r="8" fill="#25c2a0">
          <animate attributeName="r" values="7;10;7" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Traceable paths */}
        <path d="M50 60 L150 30 L250 60 L350 60" fill="none" stroke="url(#webGrad)" strokeWidth="3" strokeDasharray="15,5">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M50 60 L150 90 L250 60" fill="none" stroke="url(#webGrad)" strokeWidth="3" strokeDasharray="15,5">
          <animate attributeName="stroke-dashoffset" from="150" to="0" dur="8s" repeatCount="indefinite" />
        </path>

        {/* Labels (Theme-aware via CSS) */}
        <g style={{fontWeight: 'bold', fontFamily: 'system-ui'}}>
          <text x="50" y="45" fontSize="10" fill="currentColor" textAnchor="middle">Foundations</text>
          <text x="150" y="20" fontSize="10" fill="currentColor" textAnchor="middle">Systems</text>
          <text x="150" y="110" fontSize="10" fill="currentColor" textAnchor="middle">Theory</text>
          <text x="250" y="45" fontSize="10" fill="currentColor" textAnchor="middle">Applied</text>
          <text x="350" y="40" fontSize="12" fill="var(--ifm-color-primary)" textAnchor="middle">MASTERY</text>
        </g>
      </svg>
    </div>
  );
}
