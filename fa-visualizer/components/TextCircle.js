// components/TextCircle.js
import React from 'react';

const TextCircle = ({ 
  id,
  text, 
  size = 100, 
  backgroundColor = '#3B82F6', 
  textColor = 'white',
  x = 0,
  y = 0,
  onClick = () => {},
  isSelected = false,
  style = {} 
}) => {
  // Calculate center point of the circle
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  
  // Calculate position style
  const positionStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`
  };

  // Add selection indicator style if selected
  const selectionStyle = isSelected ? {
    boxShadow: '0 0 0 3px #FF9500',
  } : {};

  return (
    <div 
      onClick={() => onClick(id)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor,
        color: textColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size / 4}px`,
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        ...positionStyle,
        ...selectionStyle,
        ...style
      }}
      data-center-x={centerX}
      data-center-y={centerY}
      data-id={id}
    >
      {text}
    </div>
  );
};

export default TextCircle;