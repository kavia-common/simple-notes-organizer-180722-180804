import React from 'react';
import { Note } from '../types';

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (arg0: string) => void;
  onEdit: (arg0: Note) => void;
  onDelete: (arg0: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * NotesList: Displays a list of notes with title and updated time.
 */
const NotesList: React.FC<Props> = ({ notes, selectedId, onSelect, onEdit, onDelete }) => {
  if (!notes.length) {
    return <div className="empty-state">No notes yet. Click the + button to add one.</div>;
  }

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <ul className="notes-list">
      {notes
        .slice()
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .map((note) => (
          <li
            key={note.id}
            className={`note-item ${selectedId === note.id ? 'selected' : ''}`}
            onClick={() => onSelect(note.id)}
          >
            <div className="note-meta">
              <div className="note-title">{note.title || 'Untitled'}</div>
              <div className="note-updated">Updated {formatTime(note.updatedAt)}</div>
            </div>
            <div className="note-actions">
              <button
                className="btn ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note);
                }}
              >
                Edit
              </button>
              <button
                className="btn danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default NotesList;
