
import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppStore, User } from "../stores/usestore";

const { Option } = Select;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const login = useAppStore((state) => state.login);
  const users = useAppStore((state) => state.users);
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      const user = users.find(u => u.email === values.email && u.password === values.password);
      if (user) {
        login(user);
        message.success("Login successful!");
        navigate("/", { replace: true });
      } else {
        message.error("Invalid email or password!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>



        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
