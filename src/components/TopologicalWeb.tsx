import React from 'react';

export default function TopologicalWeb() {
  return (
    <div className="topological-web-container">
      <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="webGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#3578e5'}} />
            <stop offset="100%" style={{stopColor: '#25c2a0'}} />
          </linearGradient>
        </defs>
        
        {/* Nodes */}
        <circle cx="50" cy="50" r="4" fill="#3578e5">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="30" r="4" fill="#3578e5">
          <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="150" cy="70" r="4" fill="#3578e5">
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="50" r="4" fill="#25c2a0">
          <animate attributeName="r" values="3;5;3" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="50" r="6" fill="#25c2a0">
          <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Traceable paths */}
        <path d="M50 50 L150 30 L250 50 L350 50" fill="none" stroke="url(#webGrad)" strokeWidth="2" strokeDasharray="10,5">
          <animate attributeName="stroke-dashoffset" from="150" to="0" dur="10s" repeatCount="indefinite" />
        </path>
        <path d="M50 50 L150 70 L250 50" fill="none" stroke="url(#webGrad)" strokeWidth="2" strokeDasharray="10,5">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="8s" repeatCount="indefinite" />
        </path>

        {/* Labels (subtle) */}
        <text x="40" y="40" fontSize="8" fill="var(--ifm-color-emphasis-600)" textAnchor="middle">Foundations</text>
        <text x="150" y="20" fontSize="8" fill="var(--ifm-color-emphasis-600)" textAnchor="middle">Systems</text>
        <text x="150" y="85" fontSize="8" fill="var(--ifm-color-emphasis-600)" textAnchor="middle">Theory</text>
        <text x="250" y="40" fontSize="8" fill="var(--ifm-color-emphasis-600)" textAnchor="middle">Applied</text>
        <text x="350" y="35" fontSize="10" fontWeight="bold" fill="var(--ifm-color-primary)" textAnchor="middle">MASTERY</text>
      </svg>
    </div>
  );
}
