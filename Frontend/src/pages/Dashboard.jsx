import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    await API.post("/", { name });
    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add</button>

      {users.map((u) => (
        <div key={u._id}>
          {u.name}
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;