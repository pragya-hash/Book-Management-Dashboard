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

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ color: "#FFFFFF" }}>
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input placeholder="Title" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item name="author" rules={[{ required: true }]}>
        <Input placeholder="Author" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="Description" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item label={<span style={{ color: "#FFFFFF" }}>PDF (optional)</span>}>
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
          style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20, padding: 8 }}
        />
      </Form.Item>
      <Form.Item label={<span style={{ color: "#FFFFFF" }}>Image (optional)</span>}>
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
          style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20, padding: 8 }}
        />
        {imgData ? (
          <div style={{ marginTop: 8 }}>
            <img src={imgData} alt="preview" style={{ width: 80, height: 100, objectFit: "cover", borderRadius: 20 }} />
          </div>
        ) : null}
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          style={{
            background: "rgba(255, 255, 255, 0.20)",
            border: "1px solid rgba(255, 255, 255, 0.30)",
            color: "#FFFFFF",
            borderRadius: 20
          }}
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
