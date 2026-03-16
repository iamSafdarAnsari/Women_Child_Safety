import React, { useEffect, useState } from "react";

import { getAdminOverview } from "../services/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [userSource, setUserSource] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const overview = await getAdminOverview();
        setUsers(overview.users);
        setUserSource("backend");
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Unable to load users.",
        );
      }
    };

    loadUsers();
  }, []);

  return (
    <>
      <section className="page-header">
        <div>
          <span className="eyebrow">Users</span>
          <h2>User registry overview</h2>
          <p>
            See known users from the admin endpoint when available, or inferred
            users from platform activity when that endpoint is not present yet.
          </p>
        </div>
        <div className="muted">Source: {userSource}</div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Known users</h3>
          <span className="muted">{users.length} users</span>
        </div>

        {error ? <div className="empty-state">{error}</div> : null}

        {!error && users.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {!error && !users.length ? (
          <div className="empty-state">No user records available.</div>
        ) : null}
      </section>
    </>
  );
}
