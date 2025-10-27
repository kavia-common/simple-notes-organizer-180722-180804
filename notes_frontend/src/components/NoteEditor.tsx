import React, { useEffect, useState } from 'react';
import { Note } from '../types';

type Props = {
  // Note to edit/create; used via internal state initialization.
  note: Note;
  onSave: (arg0: Note) => void;
  onCancel: () => void;
  inline?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * NoteEditor: Create/edit note form. Works inline or within modal.
 */
const NoteEditor: React.FC<Props> = ({ note, onSave, onCancel, inline = false }) => {
  const [title, setTitle] = useState(note.title ?? '');
  const [content, setContent] = useState(note.content ?? '');
  const [tagsInput, setTagsInput] = useState((note.tags ?? []).join(', '));

  useEffect(() => {
    setTitle(note.title ?? '');
    setContent(note.content ?? '');
    setTagsInput((note.tags ?? []).join(', '));
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onSave({
      ...note,
      title: title.trim(),
      content: content.trim(),
      tags,
      updatedAt: Date.now(),
      createdAt: note.createdAt || Date.now(),
    });
  };

  return (
    <div className={`editor ${inline ? 'editor-inline' : ''}`}>
      {!inline && <h2 className="editor-title">{note.id ? 'Edit note' : 'New note'}</h2>}
      <form onSubmit={handleSubmit} className="editor-form">
        <label className="form-field">
          <span className="label">Title</span>
          <input
            type="text"
            className="input"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="form-field">
          <span className="label">Content</span>
          <textarea
            className="textarea"
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={inline ? 16 : 10}
          />
        </label>

        <label className="form-field">
          <span className="label">Tags (comma separated)</span>
          <input
            type="text"
            className="input"
            placeholder="e.g. work, idea, personal"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </label>

        <div className="editor-actions">
          <button type="button" className="btn ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
