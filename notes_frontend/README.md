# Simple Notes Frontend

A Vite-based React (TypeScript) frontend for a simple notes app following the "Ocean Professional" theme.

## Features
- Top app bar with Ocean-themed styling
- Sidebar placeholder for categories/tags
- Notes list with title and last updated time
- Create, edit, delete notes
- Floating action button to add notes
- Local persistence using `localStorage` via `NotesService`
- Modular components, service abstraction ready for REST swap

## Development
- Dev server: Vite on port 3000 (strictPort true)

```bash
npm install
npm run dev
```

Open http://localhost:3000 (or the provided URL in your environment).

## Structure
- src/main.tsx — React app entry
- src/App.tsx — App layout and orchestration
- src/components/* — UI components
- src/services/NotesService.ts — `NotesService` abstraction (localStorage by default)
- src/styles/theme.css — Ocean Professional theme variables and styles
- src/types.ts — Shared types
- src/utils/storage.ts — Safe localStorage helpers

## Swapping to REST later
Replace the methods in `createNotesService()` with `fetch()` calls to your backend. Keep the same interface:

```ts
list(): Promise<Note[]>
get(id: string): Promise<Note | null>
create(dto: NoteCreate): Promise<Note>
update(id: string, dto: NoteUpdate): Promise<Note>
remove(id: string): Promise<void>
```

Avoid introducing required environment variables. Configure endpoints inside the service or via optional env vars if available.
