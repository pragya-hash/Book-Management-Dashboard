import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useAppStore } from "../stores/usestore";

interface UserFormProps {
  onClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onClose }) => {
  const addUser = useAppStore((state) => state.addUser);

  const onFinish = (values: any) => {
    addUser({ username: values.username, name: values.name, email: values.email, password: values.password, role: values.role });
    onClose();
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ color: "#FFFFFF" }}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input placeholder="Username" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Email" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }} />
      </Form.Item>
      <Form.Item name="role" rules={[{ required: true }]}>
        <Select placeholder="Role" style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF", borderRadius: 20 }}>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="author">Author</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
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
