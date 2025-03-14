// src/components/TopBar.tsx
import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#1B8989', color: 'white', padding: '15px 10px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/image.png" alt="Logo" style={{ height: '100px', marginRight: '0 auto' }} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;