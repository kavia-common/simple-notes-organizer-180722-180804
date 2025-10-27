# simple-notes-organizer-180722-180804

This workspace contains the Simple Notes Application frontend.

- Container: notes_frontend (Vite-based React + TypeScript)
- Port: 3000 (strict)

## Getting Started

1. Change directory:
   cd notes_frontend

2. Install dependencies:
   npm install

3. Start the dev server:
   npm run dev

Then open the URL printed in your environment (e.g., http://localhost:3000).

## Features (Ocean Professional theme)

- Top app bar with title
- Sidebar placeholder for categories/tags
- Notes list with title and last updated time
- Create, edit, and delete notes
- Floating action button for adding a note
- Local persistence using localStorage through a NotesService abstraction
- Modular structure: components, services, types, utils, and theme CSS

## Structure

- notes_frontend/src/main.tsx — React entrypoint
- notes_frontend/src/App.tsx — App shell and orchestration
- notes_frontend/src/components/* — AppBar, Sidebar, NotesList, NoteEditor, Fab
- notes_frontend/src/services/NotesService.ts — LocalStorage-backed NotesService (swappable to REST)
- notes_frontend/src/styles/theme.css — Ocean Professional theme variables and styles
- notes_frontend/src/types.ts — Shared types
- notes_frontend/src/utils/storage.ts — localStorage helpers

## Backend Integration

No backend is required for local usage. To integrate with a REST API later, replace the methods in createNotesService() with fetch calls while keeping the same interface:

- list(): Promise<Note[]>
- get(id: string): Promise<Note | null>
- create(dto: NoteCreate): Promise<Note>
- update(id: string, dto: NoteUpdate): Promise<Note>
- remove(id: string): Promise<void>
