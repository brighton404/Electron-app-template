import React, { ReactNode, useState } from 'react';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: TooltipPosition;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  const getPositionStyle = () => {
    const common = {
      position: 'absolute',
      zIndex: 1000,
      backgroundColor: '#333',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      whiteSpace: 'nowrap',
      transition: 'opacity 0.2s ease',
    } as React.CSSProperties;

    const offset = 8;

    switch (position) {
      case 'top':
        return { ...common, bottom: `calc(100% + ${offset}px)`, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { ...common, top: `calc(100% + ${offset}px)`, left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { ...common, right: `calc(100% + ${offset}px)`, top: '50%', transform: 'translateY(-50%)' };
      case 'right':
        return { ...common, left: `calc(100% + ${offset}px)`, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span tabIndex={0} aria-label={text} style={{ outline: 'none' }}>
        {children}
      </span>
      {visible && <div style={getPositionStyle()}>{text}</div>}
    </div>
  );
};

export default Tooltip;
