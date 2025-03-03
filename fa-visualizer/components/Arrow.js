// components/Arrow.js
import React from 'react';

const Arrow = ({ startX, startY, endX, endY, color = '#333', thickness = 2, arrowSize = 10 }) => {
  // Calculate the angle of the line
  const angle = Math.atan2(endY - startY, endX - startX);
  
  // Calculate the length of the line
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  
  // Calculate arrow head coordinates
  const arrowPoint1X = endX - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endY - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endX - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endY - arrowSize * Math.sin(angle + Math.PI / 6);
  
  return (
    <svg 
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* Main line */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={thickness}
      />
      
      {/* Arrow head */}
      <polyline
        points={`${arrowPoint1X},${arrowPoint1Y} ${endX},${endY} ${arrowPoint2X},${arrowPoint2Y}`}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
      />
    </svg>
  );
};

export default Arrow;