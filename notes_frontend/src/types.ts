export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
};

export type NoteCreate = {
  title?: string;
  content?: string;
  tags?: string[];
};

export type NoteUpdate = {
  title?: string;
  content?: string;
  tags?: string[];
};
