// components/TextCircle.js
import React from 'react';

const TextCircle = ({ 
  text, 
  size = 100, 
  backgroundColor = '#3B82F6', 
  textColor = 'white',
  x = 0,
  y = 0,
  style = {} 
}) => {
  // Calculate position style
  const positionStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`
  };

  return (
    <div 
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
        ...positionStyle,
        ...style
      }}
    >
      {text}
    </div>
  );
};

export default TextCircle;