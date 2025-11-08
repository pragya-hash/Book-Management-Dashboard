import { useAppStore } from "../stores/usestore";
import { User } from "../stores/usestore";

export const useUsers = () => {
  const users = useAppStore((state) => state.users);
  const setUsers = useAppStore((state) => state.setUsers);
  const addUser = useAppStore((state) => state.addUser);

  const updateUser = (updatedUser: User) => {
    setUsers(users.map((u) => (u.username === updatedUser.username ? updatedUser : u)));
  };

  const deleteUser = (username: string) => {
    setUsers(users.filter((u) => u.username !== username));
  };

  return { users, addUser, updateUser, deleteUser, setUsers };
};
