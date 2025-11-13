import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Books } from "./pages/Books";
import { Users } from "./pages/Users";
import { useAppStore } from "./stores/usestore";
import { ConfigProvider, theme as antdTheme } from "antd";

const App: React.FC = () => {
  const { theme, setBooks, setUsers } = useAppStore();
  const isAuthenticated = useAppStore((state) => state.session.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setBooks(data.books);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setBooks, setUsers]);

  return (
    <div data-theme={theme}>
      <ConfigProvider theme={{ algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm, token: { colorPrimary: "#1890ff" } }}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} >
              <Route index element={<Books />} />
              <Route path="books" element={<Books />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
};

export default App;
