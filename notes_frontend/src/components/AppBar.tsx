import React from 'react';

/**
 * PUBLIC_INTERFACE
 * AppBar: Top navigation bar with title and subtle gradient background.
 */
const AppBar: React.FC = () => {
  return (
    <header className="app-bar">
      <div className="app-bar-inner">
        <div className="app-title">Simple Notes</div>
      </div>
    </header>
  );
};

export default AppBar;
