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

  const theme = useAppStore((state) => state.theme);

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a" }}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input
          placeholder="Name"
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
      <Form.Item name="username" rules={[{ required: true }]}>
        <Input
          placeholder="Username"
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
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input
          placeholder="Email"
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
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password
          placeholder="Password"
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
      <Form.Item name="role" rules={[{ required: true }]}>
        <Select
          placeholder="Role"
          style={{
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.9)",
            border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(0, 0, 0, 0.1)",
            color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
            borderRadius: 20,
            padding: "4px 12px",
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        >
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
