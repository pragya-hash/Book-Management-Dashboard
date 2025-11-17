import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useAppStore } from "../stores/usestore";
import { v4 as uuidv4 } from "uuid";

interface BookFormProps {
  onClose: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ onClose }) => {
  const addBook = useAppStore((state) => state.addBook);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [imgData, setImgData] = useState<string | null>(null);

  const onFinish = (values: any) => {
    addBook({
      id: uuidv4(),
      title: values.title,
      author: values.author,
      description: values.description,
      pdf: pdfData ?? undefined,
      image: imgData ?? undefined
    });
    onClose();
  };

  const theme = useAppStore((state) => state.theme);

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a" }}>
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input
          placeholder="Title"
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 20,
            padding: "12px 16px",
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
      </Form.Item>
      <Form.Item name="author" rules={[{ required: true }]}>
        <Input
          placeholder="Author"
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 20,
            padding: "12px 16px",
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea
          placeholder="Description"
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 20,
            padding: "12px 16px",
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
      </Form.Item>
      <Form.Item label={<span style={{ color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a", fontWeight: 500 }}>PDF (optional)</span>}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              setPdfData(reader.result as string);
            };
            reader.readAsDataURL(file);
          }}
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 20,
            padding: 12,
            width: '100%',
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
      </Form.Item>
      <Form.Item label={<span style={{ color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a", fontWeight: 500 }}>Image (optional)</span>}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              setImgData(reader.result as string);
            };
            reader.readAsDataURL(file);
          }}
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 20,
            padding: 12,
            width: '100%',
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
        {imgData ? (
          <div style={{ marginTop: 12 }}>
            <img
              src={imgData}
              alt="preview"
              style={{
                width: 80,
                height: 100,
                objectFit: "cover",
                borderRadius: 20,
                border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
                transition: 'all 0.3s ease'
              }}
            />
          </div>
        ) : null}
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.30)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 50,
            padding: "12px 24px",
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.1)"
          }}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
