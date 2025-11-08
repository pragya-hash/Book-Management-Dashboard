import create from "zustand";
import { persist } from "zustand/middleware";


export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "author";
}


export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pdf?: string; 
  image?: string; 
}

interface AppState {
  theme: "light" | "dark";
  view: "list" | "grid";
  session: { user: User | null };
  books: Book[];
  users: User[];
  toggleTheme: () => void;
  setView: (view: "list" | "grid") => void;
  login: (user: User) => void;
  logout: () => void;
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  reorderBooks: (books: Book[]) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      view: "list",
      session: { user: null },
      books: [],
      users: [],
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setView: (view) => set({ view }),
      login: (user) => set({ session: { user } }),
      logout: () => set({ session: { user: null } }),
      setBooks: (books) => set({ books }),
      addBook: (book) => set((state) => ({ books: [...state.books, book] })),
      reorderBooks: (books) => set({ books }),
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] }))
    }),
    {
      name: "app-storage-v2",
      partialize: (state) => ({ theme: state.theme, session: state.session, books: state.books })
    }
  )
);
