import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { fetchUsers } from "./Fetchusers.jsx";
import UserCard from "./UserCard.jsx";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error}</p>;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="header">
          <h1 className="title">Käyttäjät</h1>
          <button className="add-button">
            <Plus size={16} />
            <span>Lisää käyttäjä</span>
          </button>
        </div>

        <div className="grid users-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
