import React from 'react';

export default function EpiphanyEngine() {
  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '1rem auto 0 auto', height: '180px' }}>
      <svg viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="epiphanyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3578e5' }} />
            <stop offset="100%" style={{ stopColor: '#ff4d4d' }} />
          </linearGradient>
          
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="realityGlowRed" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feFlood floodColor="#ff4d4d" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Interconnected Network Paths */}
        <g stroke="var(--ifm-color-emphasis-200)" strokeWidth="1.5" fill="none" opacity="0.4">
          <path d="M100 75 L250 40 L400 75 L550 75" />
          <path d="M100 75 L250 110 L400 75" />
          <path d="M250 40 L250 110" />
          <path d="M400 75 L550 75" strokeWidth="3" stroke="url(#epiphanyGrad)" strokeDasharray="10,5">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Moving Insight Particles (Flowing to Red Reality) */}
        <circle r="3" fill="#3578e5">
          <animateMotion dur="4s" repeatCount="indefinite" path="M100 75 L250 40 L400 75 L550 75" />
        </circle>
        <circle r="3" fill="#ff4d4d">
          <animateMotion dur="5s" repeatCount="indefinite" path="M100 75 L250 110 L400 75 L550 75" />
        </circle>

        {/* Nodes */}
        <g>
          {/* Mind Node */}
          <circle cx="100" cy="75" r="8" fill="#3578e5" filter="url(#nodeGlow)">
            <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="100" y="105" fill="var(--ifm-font-color-base)" fontSize="12" fontWeight="900" textAnchor="middle" style={{ textTransform: 'uppercase' }}>Mind</text>
          
          {/* Theory Node */}
          <circle cx="250" cy="40" r="5" fill="var(--ifm-color-emphasis-500)" />
          <text x="250" y="25" fill="var(--ifm-font-color-base)" fontSize="10" fontWeight="700" textAnchor="middle">Theory</text>

          {/* Workflow Node */}
          <circle cx="250" cy="110" r="5" fill="var(--ifm-color-emphasis-500)" />
          <text x="250" y="130" fill="var(--ifm-font-color-base)" fontSize="10" fontWeight="700" textAnchor="middle">Workflow</text>

          {/* Computer Node */}
          <circle cx="400" cy="75" r="8" fill="var(--autonate-teal)" filter="url(#nodeGlow)">
            <animate attributeName="r" values="7;10;7" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="400" y="105" fill="var(--ifm-font-color-base)" fontSize="12" fontWeight="900" textAnchor="middle" style={{ textTransform: 'uppercase' }}>Computer</text>

          {/* Reality Node (Dope RED Glow & Animation) */}
          <g filter="url(#realityGlowRed)">
            <rect x="535" y="60" width="30" height="30" rx="4" fill="#ffffff" stroke="#ff4d4d" strokeWidth="2">
              <animate attributeName="stroke-width" values="2;5;2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="fill" values="#ffffff;#fff5f5;#ffffff" dur="2s" repeatCount="indefinite" />
            </rect>
            {/* Pulsing Ripple Red */}
            <circle cx="550" cy="75" r="20" fill="none" stroke="#ff4d4d" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="15;35" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </g>
          <text x="550" y="105" fill="var(--ifm-font-color-base)" fontSize="12" fontWeight="900" textAnchor="middle" style={{ textTransform: 'uppercase' }}>Reality</text>
        </g>
      </svg>
    </div>
  );
}
