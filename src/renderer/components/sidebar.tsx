import React, { useState } from 'react';
import { Home, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Tooltip from "./tooltip";

const navItems = [
  { to: '/', icon: <Home size={20} />, label: 'Home' },
  { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(prev => !prev);

  return (
    <aside id='app-aside'
      style={{
        width: collapsed ? '70px' : '200px',
        backgroundColor: '#1e1e1e',
        color: 'white',
        height: '100vh',
        transition: 'width 0.2s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ padding: '1rem', display: 'flex', justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && <strong style={{marginLeft: '8px'}}>My App</strong>}
        <button onClick={toggle} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0 1rem' }}>
        {navItems.map(item => (
          <Tooltip key={item.to} text={item.label} position="right">
            <NavLink to={item.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: isActive ? '#4ade80' : '#ccc',
                textDecoration: 'none',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: isActive ? '#2d2d2d' : 'transparent'
              })}
            >
              {item.icon}
              {!collapsed && item.label}
            </NavLink>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
