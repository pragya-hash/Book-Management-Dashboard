
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
        background: "linear-gradient(135deg, #1a0f49 0%, #2e4bea 100%)",
        transition: 'all 0.3s ease'
      }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(25px)",
          padding: 40,
          borderRadius: 22,
          minWidth: 320,
          color: "#FFFFFF",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{
            color: "#FFFFFF",
            marginBottom: 8,
            fontWeight: 600,
            letterSpacing: '0.01em'
          }}>
            Welcome Back
          </h2>
          <p style={{
            color: "#C9D3F5",
            fontSize: 14,
            letterSpacing: '0.01em'
          }}>
            Sign in to your account
          </p>
        </div>
        <Form.Item
          label={<span style={{ color: "#FFFFFF", fontWeight: 500 }}>Email</span>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            style={{
              background: "rgba(255, 255, 255, 0.22)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              borderRadius: 12,
              padding: "12px 16px",
              transition: 'all 0.3s ease'
            }}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#FFFFFF", fontWeight: 500 }}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            style={{
              background: "rgba(255, 255, 255, 0.22)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              borderRadius: 12,
              padding: "12px 16px",
              transition: 'all 0.3s ease'
            }}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              borderRadius: 12,
              fontWeight: 600,
              padding: "12px 24px",
              transition: 'all 0.3s ease'
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
