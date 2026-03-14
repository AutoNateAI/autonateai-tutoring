import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function TopologicalWeb() {
  const isBrowser = useIsBrowser();
  
  // Responsive viewBox and scaling
  const isMobile = isBrowser && window.innerWidth < 768;
  const viewBox = isMobile ? "150 0 500 350" : "0 0 800 350";

  return (
    <div className="topological-web-container">
      <svg 
        viewBox={viewBox} 
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Traceable Connection Lines */}
        <g stroke="var(--topo-line)" strokeWidth="3" fill="none">
          <path d="M400 50 L250 150 L400 250" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M400 50 L550 150 L400 250" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
          </path>
          
          {/* 3 Links from Applied to Mastery */}
          <path d="M400 250 L360 310" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M400 250 L400 310" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M400 250 L440 310" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Nodes and Labels - Clean Solid White for Readability */}
        <g>
          {/* Foundations Node */}
          <g>
            <circle cx="400" cy="50" r="8" fill="var(--topo-node-main)">
              <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="400" y="30" fill="#ffffff" fontSize="24" fontWeight="900" textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Foundations</text>
          </g>

          {/* Systems Node */}
          <g>
            <circle cx="250" cy="150" r="8" fill="var(--topo-node-accent)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="235" y="158" fill="#ffffff" fontSize="20" fontWeight="800" textAnchor="end">Systems</text>
          </g>

          {/* Theory Node */}
          <g>
            <circle cx="550" cy="150" r="8" fill="var(--topo-node-accent)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <text x="565" y="158" fill="#ffffff" fontSize="20" fontWeight="800" textAnchor="start">Theory</text>
          </g>

          {/* Applied Node */}
          <g>
            <circle cx="400" cy="250" r="8" fill="var(--topo-node-accent)">
              <animate attributeName="r" values="7;10;7" dur="4s" repeatCount="indefinite" />
            </circle>
            <text x="420" y="258" fill="#ffffff" fontSize="20" fontWeight="800" textAnchor="start">Applied</text>
          </g>

          {/* Mastery Node */}
          <g>
            <rect x="330" y="300" width="140" height="50" rx="25" fill="#ffffff" />
            <text x="400" y="333" fill="#3578e5" fontSize="26" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '1px' }}>MASTERY</text>
            
            {/* Ripple Effect */}
            <circle cx="400" cy="325" r="50" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="30;80" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}
