import React, { useState } from "react";
import { Table, Button, Modal, Input, Space } from "antd";
import { useAppStore, User } from "../stores/usestore";
import { UserForm } from "../components/UserForm";
import "./users.css";

export const Users: React.FC = () => {
  const users = useAppStore((state) => state.users);
  const addUser = useAppStore((state) => state.addUser);
  const session = useAppStore((state) => state.session);
  const theme = useAppStore((state) => state.theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");


  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" }
  ];

  const adminColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" }
  ];

  const filtered = users.slice().reverse().filter(u => u.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div data-theme={theme}>
      <div className="users-toolbar">
        <Space>
          {session.user?.role === "admin" && (
            <Button onClick={() => setModalVisible(true)}>
              Add User
            </Button>
          )}
          <Input
            className="users-search"
            placeholder="Search users"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </Space>
      </div>

      <Table
        dataSource={filtered}
        columns={adminColumns}
        rowKey="username"
      />

      <Modal
        title="Add User"
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}

      >
        <UserForm onClose={() => setModalVisible(false)} />
      </Modal>
    </div>
  );
};
