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
        width={220}
        className="dashboard-sider"
        style={{
          color: 'var(--sider-color)',
          paddingTop: 18,
          boxShadow: "2px 0 6px rgba(0,0,0,0.06)"
        }}
      >
        <div style={{ color: "#FFFFFF", fontSize: 20, textAlign: "center", padding: "12px 8px", fontWeight: 700 }}>
          My Library
        </div>
        <div style={{ padding: 12 }}>
          <Button
            block
            icon={<BookOutlined />}
            onClick={() => navigate("/books")}
            style={{
              marginBottom: 12,
              borderRadius: 20,
              background: (location.pathname === "/" || location.pathname === "/books") ? "rgba(255, 255, 255, 0.20)" : "transparent",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF"
            }}
          >
            Books
          </Button>
          <Button
            block
            icon={<TeamOutlined />}
            onClick={() => navigate("/users")}
            style={{
              marginBottom: 12,
              borderRadius: 20,
              background: location.pathname === "/users" ? "rgba(255, 255, 255, 0.20)" : "transparent",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF"
            }}
          >
            Users
          </Button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <span style={{ color: "#FFFFFF", fontSize: 14 }}>{theme === "light" ? "Light Mode" : "Dark Mode"}</span>
            <Switch checked={theme === "dark"} onChange={toggleTheme} />
          </div>
        </div>
      </Sider>
      <Layout>
        <HeaderComponent />
        <Content style={{ margin: "24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: 8 }}>
              <div style={{ display: "grid", gap: 20 }}>






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
