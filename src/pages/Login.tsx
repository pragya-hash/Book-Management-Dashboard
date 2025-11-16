
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
        background: "linear-gradient(135deg, #0A2A88 0%, #6A2BAF 100%)",
      }}
    >
      <Form
        name="login"
        onFinish={onFinish}
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(20px)",
          padding: 32,
          borderRadius: 20,
          minWidth: 300,
          color: "#FFFFFF"
        }}
      >
        <Form.Item
          label={<span style={{ color: "#FFFFFF" }}>Email</span>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF" }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: "#FFFFFF" }}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ background: "rgba(255, 255, 255, 0.12)", border: "1px solid rgba(255, 255, 255, 0.25)", color: "#FFFFFF" }} />
        </Form.Item>



        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{
              background: "rgba(255, 255, 255, 0.20)",
              border: "1px solid rgba(255, 255, 255, 0.30)",
              color: "#FFFFFF",
              borderRadius: 20
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
