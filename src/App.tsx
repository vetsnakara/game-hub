import { AxiosError } from "./services/apiClient";
import { userService, User } from "./services/userService";
import { useUsers } from "./hooks/useUsers";

function App() {
  const { users, error, isLoading, setError, setUsers } = useUsers();

  const deleteUser = ({ id }: User) => {
    const origUsers = [...users];

    setUsers(users.filter((user) => user.id !== id));

    // Promise.reject(new AxiosError("error"))
    userService.delete(id).catch((error) => {
      setError((error as AxiosError).message);
      setUsers(origUsers);
    });
  };

  const addUser = () => {
    const origUsers = [...users];
    const user: User = {
      id: 0,
      name: "New User",
    };

    setUsers([user, ...users]);

    userService
      .create(user)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((error) => {
        setError((error as AxiosError).message);
        setUsers(origUsers);
      });
  };

  const updateUser = (user: User) => {
    const origUsers = [...users];
    const updatedUser = { ...user, name: `${user.name}!!!` };

    setUsers((users) => users.map((u) => (u.id === user.id ? updatedUser : u)));

    userService.update(updatedUser).catch((error) => {
      setError((error as AxiosError).message);
      setUsers(origUsers);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.name}{" "}
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
