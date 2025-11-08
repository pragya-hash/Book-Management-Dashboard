import { useAppStore } from "../stores/usestore";
import { Book } from "../stores/usestore";

export const useBooks = () => {
  const books = useAppStore((state) => state.books);
  const setBooks = useAppStore((state) => state.setBooks);
  const addBook = useAppStore((state) => state.addBook);

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  return { books, addBook, updateBook, deleteBook, setBooks };
};
