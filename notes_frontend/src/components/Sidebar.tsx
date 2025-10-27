import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar: Placeholder for categories/tags.
 * Currently non-functional; designed to be extended later.
 */
const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Categories</div>
      <ul className="sidebar-list">
        <li className="sidebar-item is-disabled">All Notes</li>
        <li className="sidebar-item is-disabled">Work</li>
        <li className="sidebar-item is-disabled">Personal</li>
        <li className="sidebar-item is-disabled">Ideas</li>
      </ul>
      <div className="sidebar-footer">Tags coming soon</div>
    </aside>
  );
};

export default Sidebar;
