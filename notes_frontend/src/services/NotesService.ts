import { Note, NoteCreate, NoteUpdate } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'notes.v1';

export interface NotesService {
  /** PUBLIC_INTERFACE: list all notes */
  list(): Promise<Note[]>;
  /** PUBLIC_INTERFACE: get a note by id */
  get(_: string): Promise<Note | null>;
  /** PUBLIC_INTERFACE: create a new note */
  create(_: NoteCreate): Promise<Note>;
  /** PUBLIC_INTERFACE: update an existing note */
  update(_: string, __: NoteUpdate): Promise<Note>;
  /** PUBLIC_INTERFACE: delete a note */
  remove(_: string): Promise<void>;
}

/**
 * createNotesService: returns a localStorage-backed NotesService.
 * To integrate with REST later, replace methods to call fetch() and keep the same interface.
 */
export function createNotesService(): NotesService {
  const readAll = (): Note[] => loadFromStorage<Note[]>(STORAGE_KEY, []);
  const writeAll = (items: Note[]) => saveToStorage(STORAGE_KEY, items);

  return {
    async list() {
      return readAll();
    },
    async get(id: string) {
      const found = readAll().find(n => n.id === id) || null;
      return found;
    },
    async create(dto: NoteCreate) {
      const items = readAll();
      const now = Date.now();
      const note: Note = {
        id: cryptoRandomId(),
        title: dto.title?.trim() || 'Untitled',
        content: dto.content?.trim() || '',
        tags: dto.tags ?? [],
        createdAt: now,
        updatedAt: now,
      };
      items.push(note);
      writeAll(items);
      return note;
    },
    async update(id: string, dto: NoteUpdate) {
      const items = readAll();
      const idx = items.findIndex(n => n.id === id);
      if (idx === -1) {
        throw new Error('Note not found');
      }
      const existing = items[idx];
      const updated: Note = {
        ...existing,
        title: dto.title !== undefined ? dto.title : existing.title,
        content: dto.content !== undefined ? dto.content : existing.content,
        tags: dto.tags !== undefined ? dto.tags : existing.tags,
        updatedAt: Date.now(),
      };
      items[idx] = updated;
      writeAll(items);
      return updated;
    },
    async remove(id: string) {
      const items = readAll().filter(n => n.id !== id);
      writeAll(items);
    },
  };
}

/**
 * Simple ID generator using crypto if available, otherwise fallback.
 */
/* global crypto */
function cryptoRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
