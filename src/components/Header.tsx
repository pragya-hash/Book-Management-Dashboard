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
        background: theme == "light" ? "linear-gradient(90deg,#fafafa,#fff)" : "linear-gradient(90deg,#222,#111)",
        padding: "0 24px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 18, color: theme === "light" ? "#001529" : "#fff" }}>Welcome to our library</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <Avatar size={36} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </Header>
  );
};

