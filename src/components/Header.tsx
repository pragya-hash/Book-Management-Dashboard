import React from "react";
import { Layout, Switch, Avatar, Dropdown, Menu, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAppStore } from "../stores/usestore";
import { useNavigate } from "react-router-dom";

export const { Header } = Layout;

export const HeaderComponent: React.FC = () => {
  const { theme, toggleTheme, session, logout } = useAppStore();
  const navigate = useNavigate();
  const user = session.user;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menu = (
    <Menu style={{ minWidth: 220, padding: 12 }}>
        <Menu.Item key="user-info" disabled style={{ cursor: "default", background: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar size={40} icon={<UserOutlined />} />
            <div>
              <div style={{ fontWeight: 700 }}>{user?.name || "User"}</div>
              <div style={{ fontSize: 13, color: "#888" }}>{user?.email || "user@example.com"}</div>
              <div style={{ fontSize: 12, color: "#b89b72" }}>{user?.role || "Role"}</div>
            </div>
          </div>
        </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(25px)",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#FFFFFF",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme === 'dark' ? "#FFFFFF" : "#FFFFFF",
          letterSpacing: '0.01em'
        }}>
          Welcome to our library
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Avatar
            size={40}
            icon={<UserOutlined />}
            style={{
              cursor: "pointer",
              background: theme === 'dark' ? "rgba(255, 255, 255, 0.20)" : "rgba(255, 255, 255, 0.20)",
              border: theme === 'dark' ? "1px solid rgba(255, 255, 255, 0.30)" : "1px solid rgba(255, 255, 255, 0.30)",
              transition: 'all 0.3s ease'
            }}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

