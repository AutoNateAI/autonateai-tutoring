import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function TopologicalWeb() {
  const isBrowser = useIsBrowser();
  
  // Responsive viewBox and scaling
  const isMobile = isBrowser && window.innerWidth < 768;
  const viewBox = isMobile ? "120 0 560 480" : "0 0 800 500";
  const outputPill = isMobile
    ? {x: 240, y: 390, width: 320, height: 54, fontSize: 18}
    : {x: 260, y: 390, width: 280, height: 54, fontSize: 22};

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
          <path d="M400 60 L245 185 L400 315" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M400 60 L555 185 L400 315" strokeDasharray="15,8">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
          </path>
          
          {/* Main Highway to Mastery: Multiple Flowing Particles */}
          <path id="mastery-path" d="M400 315 L400 415" strokeDasharray="10,5" strokeWidth="4">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Data Particles flowing into Mastery */}
        <g fill="#ffffff">
          <circle r="3">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M400 315 L400 415" />
          </circle>
          <circle r="3">
            <animateMotion dur="1.5s" begin="0.4s" repeatCount="indefinite" path="M400 315 L400 415" />
          </circle>
          <circle r="3">
            <animateMotion dur="1.5s" begin="0.8s" repeatCount="indefinite" path="M400 315 L400 415" />
          </circle>
          <circle r="3">
            <animateMotion dur="1.5s" begin="1.2s" repeatCount="indefinite" path="M400 315 L400 415" />
          </circle>
        </g>

        {/* Nodes and Labels - Clean Solid White for Readability */}
        <g>
          {/* Foundations Node */}
          <g>
            <circle cx="400" cy="60" r="8" fill="var(--topo-node-main)">
              <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="400" y="34" fill="#ffffff" fontSize="24" fontWeight="900" textAnchor="middle" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>THOUGHT EXPERIMENTS</text>
          </g>

          {/* Systems Node */}
          <g>
            <circle cx="245" cy="185" r="8" fill="var(--topo-node-accent)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="228" y="192" fill="#ffffff" fontSize="18" fontWeight="800" textAnchor="end">DAILY REPS</text>
          </g>

          {/* Theory Node */}
          <g>
            <circle cx="555" cy="185" r="8" fill="var(--topo-node-accent)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <text x="572" y="192" fill="#ffffff" fontSize="18" fontWeight="800" textAnchor="start">LIVE COHORTS</text>
          </g>

          {/* Applied Node */}
          <g>
            <circle cx="400" cy="315" r="8" fill="var(--topo-node-accent)">
              <animate attributeName="r" values="7;10;7" dur="4s" repeatCount="indefinite" />
            </circle>
            <text x="420" y="322" fill="#ffffff" fontSize="18" fontWeight="800" textAnchor="start">AI SYSTEMS</text>
          </g>

          {/* Mastery Node */}
          <g>
            <rect x={outputPill.x} y={outputPill.y} width={outputPill.width} height={outputPill.height} rx="27" fill="#ffffff" />
            <text x="400" y="424" fill="#3578e5" fontSize={outputPill.fontSize} fontWeight="900" textAnchor="middle" style={{ letterSpacing: isMobile ? '0.5px' : '1px' }}>PRACTICAL OUTPUTS</text>
            
            {/* Ripple Effect */}
            <circle cx="400" cy="415" r="50" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="30;95" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}
