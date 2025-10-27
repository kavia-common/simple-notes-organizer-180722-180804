import React from 'react';

type Props = {
  onClick: () => void;
  ariaLabel?: string;
};

/**
 * PUBLIC_INTERFACE
 * Fab: Floating Action Button for adding new notes.
 */
const Fab: React.FC<Props> = ({ onClick, ariaLabel = 'Create' }) => {
  return (
    <button className="fab" onClick={onClick} aria-label={ariaLabel} title="Add note">
      +
    </button>
  );
};

export default Fab;
