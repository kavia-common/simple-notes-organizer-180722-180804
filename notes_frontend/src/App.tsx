import React, { useEffect, useMemo, useState } from 'react';
import AppBar from './components/AppBar';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import Fab from './components/Fab';
import { Note } from './types';
import { createNotesService } from './services/NotesService';

/**
 * App: Main layout and state orchestration for Notes UI.
 * - Uses NotesService abstraction (localStorage-backed by default)
 * - Provides create, edit, delete, and selection flows
 */
const App: React.FC = () => {
  const service = useMemo(() => createNotesService(), []);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await service.list();
      if (mounted) {
        setNotes(list);
        if (list.length > 0 && !selectedId) {
          setSelectedId(list[0].id);
        }
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [service]); // run once

  const handleAdd = () => {
    setEditingNote({
      id: '',
      title: '',
      content: '',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setIsEditorOpen(true);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    await service.remove(id);
    const list = await service.list();
    setNotes(list);
    if (selectedId === id) {
      setSelectedId(list.length ? list[0].id : null);
    }
  };

  const handleSave = async (note: Note) => {
    if (!note.id) {
      const created = await service.create({
        title: note.title,
        content: note.content,
        tags: note.tags,
      });
      const list = await service.list();
      setNotes(list);
      setSelectedId(created.id);
    } else {
      await service.update(note.id, {
        title: note.title,
        content: note.content,
        tags: note.tags,
      });
      const list = await service.list();
      setNotes(list);
      setSelectedId(note.id);
    }
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  const handleCancel = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="app-root">
      <AppBar />
      <div className="content-area">
        <Sidebar />
        <main className="main-surface">
          {loading ? (
            <div className="empty-state">Loading notes…</div>
          ) : (
            <div className="layout-split">
              <section className="notes-pane">
                <NotesList
                  notes={notes}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </section>
              <section className="editor-pane">
                {selectedNote ? (
                  <NoteEditor
                    key={selectedNote.id}
                    note={selectedNote}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    inline
                  />
                ) : (
                  <div className="empty-state">Select or create a note to start.</div>
                )}
              </section>
            </div>
          )}
        </main>
      </div>
      <Fab onClick={handleAdd} ariaLabel="Add note" />
      {isEditorOpen && !editingNote?.id && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <NoteEditor
              note={editingNote!}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
      {isEditorOpen && editingNote?.id && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <NoteEditor
              note={editingNote}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
