import React, { useState } from "react";
import { Button, Input, Modal, Card, Space, Segmented, Badge, Popconfirm } from "antd";
import { useAppStore } from "../stores/usestore";
import { useBooks } from "../hooks/useBooks";
import { BookForm } from "../components/Bookform";
import "./books.css";

export const Books: React.FC = () => {
  const books = useAppStore((state) => state.books);
  const session = useAppStore((state) => state.session);
  const theme = useAppStore((state) => state.theme);
  const { deleteBook } = useBooks();
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState("grid");
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const toggleDescription = (bookId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newBooks = [...filteredBooks];
    const draggedBook = newBooks[draggedIndex];
    newBooks.splice(draggedIndex, 1);
    newBooks.splice(dropIndex, 0, draggedBook);
    useAppStore.setState({ books: newBooks });

    setDraggedIndex(null);
  };

  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [currentPdf, setCurrentPdf] = useState<string | null>(null);

  const openPdf = (pdf?: string) => {
    if (!pdf) return;

    if (pdf.startsWith('data:')) {
      try {
        const base64Data = pdf.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        setCurrentPdf(blobUrl);
        setPdfModalVisible(true);
      } catch (error) {
        console.error('Error opening PDF:', error);
        
        setCurrentPdf(pdf);
        setPdfModalVisible(true);
      }
    } else {
      setCurrentPdf(pdf);
      setPdfModalVisible(true);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <div className="books-toolbar">
        <Space>
          {session.user?.role === "admin" && (
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Book
            </Button>
          )}
          <Input
            className="books-search"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Segmented options={["grid", "list"]} value={view} onChange={(v: any) => setView(v)} className="books-toggle" />
        </Space>
      </div>

      {view === "grid" ? (
        <div className="books-grid">
          {filteredBooks.length === 0 ? (
            <div className="books-empty">No books found.</div>
          ) : filteredBooks.map((book, index) => (
            <div
              key={book.id}
              style={{ width: '200px' }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Card className="book-card">
                <Badge.Ribbon text={book.pdf ? "PDF" : ""} color={book.pdf ? "#b89b72" : undefined}>
                  <img className="book-cover" src={book.image || "/bg.jpg"} alt={book.title} />
                </Badge.Ribbon>
                <div className="book-meta">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                  <div>
                    {expandedDescriptions.has(book.id) ? book.description : book.description.length > 100 ? `${book.description.substring(0, 100)}...` : book.description}
                    {book.description.length > 100 && (
                      <>
                        <br />
                        <Button type="link" size="small" onClick={() => toggleDescription(book.id)} style={{ padding: 0 }}>
                          {expandedDescriptions.has(book.id) ? 'Less' : 'More'}
                        </Button>
                      </>
                    )}
                  </div>
                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    {book.pdf ? <Button size="small" onClick={() => openPdf(book.pdf)}>View PDF</Button> : null}
                    <Popconfirm
                      title="Are you sure you want to delete this book?"
                      onConfirm={() => deleteBook(book.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="small" danger>Delete</Button>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {filteredBooks.length === 0 ? (
            <div className="books-empty">No books found.</div>
          ) : filteredBooks.map((book, index) => (
            <div
              key={book.id}
              style={{
                padding: 16,
                marginBottom: 8,
                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
                borderRadius: 4,
                color: theme === "dark" ? "#fff" : "#000",
              }}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <b>{book.title}</b> by {book.author}
              <div>
                {expandedDescriptions.has(book.id) ? book.description : book.description.length > 100 ? `${book.description.substring(0, 100)}...` : book.description}
                {book.description.length > 100 && (
                  <>
                    <br />
                    <Button type="link" size="small" onClick={() => toggleDescription(book.id)} style={{ padding: 0 }}>
                      {expandedDescriptions.has(book.id) ? 'Less' : 'More'}
                    </Button>
                  </>
                )}
              </div>
              <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                {book.pdf ? (
                  <Button onClick={() => openPdf(book.pdf)} size="small">
                    View PDF
                  </Button>
                ) : null}
                <Popconfirm
                  title="Are you sure you want to delete this book?"
                  onConfirm={() => deleteBook(book.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" danger>Delete</Button>
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title="Add Book"
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <BookForm onClose={() => setModalVisible(false)} />
      </Modal>

      <Modal
        title="PDF Viewer"
        open={pdfModalVisible}
        footer={null}
        onCancel={() => {
          setPdfModalVisible(false);
          setCurrentPdf(null);
        }}
        width="80%"
        style={{ top: 20 }}
        
      >
        {currentPdf && (
          <iframe
            src={currentPdf}
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="PDF Viewer"
          />
        )}
      </Modal>
    </div>
  );
};
