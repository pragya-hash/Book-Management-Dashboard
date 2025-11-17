
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

  const theme = useAppStore((state) => state.theme);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1C0F5F 0%, #2364D2 100%)",
        transition: 'all 0.3s ease'
      }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        style={{
          background: theme === 'dark' ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.12)",
          border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          padding: 40,
          borderRadius: 20,
          minWidth: 320,
          color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF",
          boxShadow: theme === 'dark' ? "0 20px 40px rgba(0,0,0,0.3)" : "0 20px 40px rgba(0,0,0,0.1)",
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h2 style={{
            color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF",
            marginBottom: 8,
            fontWeight: 600,
            letterSpacing: '0.01em'
          }}>
            Welcome Back
          </h2>
          <p style={{
            color: theme === 'dark' ? "#D6DAE8" : "#FFFFFF",
            fontSize: 14,
            letterSpacing: '0.01em'
          }}>
            Sign in to your account
          </p>
        </div>
        <Form.Item
          label={<span style={{ color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF", fontWeight: 500 }}>Email</span>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            style={{
              background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.12)",
              border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.25)",
              color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF",
              borderRadius: 20,
              padding: "12px 16px",
              transition: 'all 0.3s ease',
              boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF", fontWeight: 500 }}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            style={{
              background: theme === 'dark' ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.12)",
              border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.25)",
              color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF",
              borderRadius: 20,
              padding: "12px 16px",
              transition: 'all 0.3s ease',
              boxShadow: theme === 'dark' ? "inset 0 2px 4px rgba(0, 0, 0, 0.1)" : "inset 0 2px 4px rgba(0, 0, 0, 0.1)"
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              background: theme === 'dark' ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.20)",
              border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.30)" : "1px solid rgba(255, 255, 255, 0.30)",
              color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF",
              borderRadius: 50,
              fontWeight: 600,
              padding: "12px 24px",
              transition: 'all 0.3s ease',
              boxShadow: theme === 'dark' ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
