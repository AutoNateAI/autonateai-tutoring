import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

export default function TopologicalWeb() {
  const cyRef = useRef(null);

  useEffect(() => {
    if (!cyRef.current) return;

    const cy = cytoscape({
      container: cyRef.current,
      elements: [
        // Nodes
        { data: { id: 'foundations', label: 'Foundations' } },
        { data: { id: 'systems', label: 'Systems' } },
        { data: { id: 'theory', label: 'Theory' } },
        { data: { id: 'applied', label: 'Applied' } },
        { data: { id: 'mastery', label: 'MASTERY' } },
        
        // Edges (Vertical Flow)
        { data: { source: 'foundations', target: 'systems' } },
        { data: { source: 'foundations', target: 'theory' } },
        { data: { source: 'systems', target: 'applied' } },
        { data: { source: 'theory', target: 'applied' } },
        { data: { source: 'applied', target: 'mastery' } },
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#25c2a0',
            'label': 'data(label)',
            'color': '#ffffff',
            'font-size': '12px',
            'font-weight': 'bold',
            'text-valign': 'center',
            'text-halign': 'center',
            'width': '80px',
            'height': '30px',
            'shape': 'round-rectangle',
            'opacity': 0, // Start hidden for animation
          }
        },
        {
          selector: '#mastery',
          style: {
            'background-color': '#ffffff',
            'color': '#3578e5',
            'width': '100px',
            'height': '40px',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': 'rgba(255, 255, 255, 0.3)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': 'rgba(255, 255, 255, 0.3)',
            'opacity': 0,
          }
        }
      ],
      layout: {
        name: 'preset', // We will manually position for perfect vertical tree
      },
      userZoomingEnabled: false,
      userPanningEnabled: false,
      autoungrabify: true,
    });

    // Vertical Hierarchy Positions
    const positions = {
      foundations: { x: 200, y: 50 },
      systems: { x: 100, y: 150 },
      theory: { x: 300, y: 150 },
      applied: { x: 200, y: 250 },
      mastery: { x: 200, y: 350 }
    };

    // Animation Sequence
    const animateNode = (id, delay) => {
      setTimeout(() => {
        const node = cy.$(`#${id}`);
        node.position(positions[id]);
        node.animate({
          style: { opacity: 1 },
          duration: 800
        });
        node.connectedEdges().animate({
          style: { opacity: 1 },
          duration: 800
        });
      }, delay);
    };

    animateNode('foundations', 500);
    animateNode('systems', 1200);
    animateNode('theory', 1200);
    animateNode('applied', 2000);
    animateNode('mastery', 2800);

    return () => cy.destroy();
  }, []);

  return <div id="cy" ref={cyRef} />;
}
