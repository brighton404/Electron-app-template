import React, { useRef, useState, useEffect, ReactNode } from 'react';
type ResizeLayoutProps = {
  children: [ReactNode, ReactNode]; // Expect 2 children: [main, resizable panel]
};

const ResizeLayout: React.FC<ResizeLayoutProps> = ({ children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return;

      const totalWidth = window.innerWidth;
      const newWidth = totalWidth - e.clientX;

      const minWidth = 150;
      const maxWidth = 600;

      panelRef.current.style.width = `${Math.min(Math.max(newWidth, minWidth), maxWidth)}px`;
    };

    const stopResizing = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  return (
    <div className="resize-container">
      <div className="resize-main">{children[0]}</div>
      <div
        className="resize-divider"
        onMouseDown={() => setIsResizing(true)}
      />
      <div className="resize-panel-right" ref={panelRef}>
        {children[1]}
      </div>
    </div>
  );
};

export default ResizeLayout;
