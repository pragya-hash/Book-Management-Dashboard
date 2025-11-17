import React from "react";
import { Layout, Button, Row, Card, Switch } from "antd";
import { BookOutlined, TeamOutlined, LogoutOutlined, LineChartOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/usestore";
import { HeaderComponent } from "../components/Header";
import "./dashboard.css";

const { Content, Sider } = Layout;

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAppStore((state) => state.logout);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const books = useAppStore((state) => state.books);
  const users = useAppStore((state) => state.users);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };



  
  const useCount = (value: number | string, duration = 700) => {
    const [count, setCount] = React.useState<string>(typeof value === "number" ? "0" : String(value));

    React.useEffect(() => {
      if (typeof value !== "number") {
        setCount(String(value));
        return;
      }
      let raf = 0;
      const start = performance.now();
      const from = 0;
      const to = value;

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const v = Math.floor(from + (to - from) * t);
        setCount(String(v));
        if (t < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [value, duration]);

    return count;
  };

  const booksCount = useCount(books.length);
  const usersCount = useCount(users ? users.length : "—");

  return (
    <Layout className={`dashboard-root ${theme}`} style={{ minHeight: "100vh" }} data-theme={theme}>
      <Sider
        collapsible
        trigger={null}
        width={240}
        className={`dashboard-sider ${theme}`}
        style={{
          color: 'var(--sider-color)',
          paddingTop: 24,
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
          fontSize: 24,
          textAlign: "center",
          padding: "16px 12px",
          fontWeight: 700,
          letterSpacing: '0.025em'
        }}>
          My Library
        </div>
        <div style={{ padding: 16 }}>
          <Button
            block
            icon={<BookOutlined />}
            onClick={() => navigate("/books")}
            style={{
              marginBottom: 16,
              borderRadius: 50,
              background: (location.pathname === "/" || location.pathname === "/books") ? "rgba(255, 255, 255, 0.25)" : "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: (location.pathname === "/" || location.pathname === "/books") ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none"
            }}
          >
            Books
          </Button>
          <Button
            block
            icon={<TeamOutlined />}
            onClick={() => navigate("/users")}
            style={{
              marginBottom: 16,
              borderRadius: 50,
              background: location.pathname === "/users" ? "rgba(255, 255, 255, 0.25)" : "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: location.pathname === "/users" ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none"
            }}
          >
            Users
          </Button>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 16,
            padding: 12,
            background: theme === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            borderRadius: 50,
            transition: 'all 0.3s ease'
          }}>
            <span style={{
              color: theme === 'dark' ? "#FFFFFF" : "#1a1a1a",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.01em'
            }}>
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              style={{
                background: theme === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                border: `1px solid ${theme === 'dark' ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
                transition: 'all 0.3s ease'
              }}
            />
          </div>
        </div>
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: "32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
            <div style={{ display: "grid", gap: 32 }}>
              <div>
                <Outlet />
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
