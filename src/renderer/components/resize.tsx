import React, { useRef, useState, useEffect, ReactNode } from 'react';

type Side = 'left' | 'right' | 'top' | 'bottom';

interface ResizableProps {
  children: ReactNode;
  side?: Side;
  minSize?: number;
  maxSize?: number;
}

const Resizable: React.FC<ResizableProps> = ({
  children,
  side = 'right',
  minSize = 150,
  maxSize = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState<number>(0);
  const [startSize, setStartSize] = useState<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const delta = side === 'left' || side === 'right'
        ? e.clientX - startPos
        : e.clientY - startPos;

      let newSize: number;

      if (side === 'right' || side === 'bottom') {
        newSize = startSize + delta;
      } else {
        newSize = startSize - delta;
      }

      newSize = Math.max(minSize, Math.min(maxSize, newSize));

      if (side === 'left' || side === 'right') {
        containerRef.current.style.width = `${newSize}px`;
      } else {
        containerRef.current.style.height = `${newSize}px`;
      }

    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startPos, startSize, side, minSize, maxSize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsResizing(true);

    setStartSize(
      side === 'right' || side === 'left'
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetHeight
    );

    setStartPos(
      side === 'right' || side === 'left'
        ? e.clientX
        : e.clientY
    );
  };

  const getHandleStyle = (): React.CSSProperties => {
    const common: React.CSSProperties = {
      position: 'absolute',
      background: '#2b2b2b',
      zIndex: 10,
    };

    switch (side) {
      case 'right':
        return { ...common, top: 0, right: 0, width: 2, height: '100%', cursor: 'col-resize' };
      case 'left':
        return { ...common, top: 0, left: 0, width: 2, height: '100%', cursor: 'col-resize' };
      case 'top':
        return { ...common, top: 0, left: 0, height: 5, width: '100%', cursor: 'row-resize' };
      case 'bottom':
        return { ...common, bottom: 0, left: 0, height: 5, width: '100%', cursor: 'row-resize' };
    }
  };

  return (
    <div ref={containerRef} className="resizable-container" style={{ position: 'relative' }}>
      {children}
      <div className="dragHandle" style={getHandleStyle()} onMouseDown={handleMouseDown} />
    </div>
  );
};

export default Resizable;
