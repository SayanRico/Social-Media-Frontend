import React from "react";
import { useSelector } from "react-redux";
import RegisterAdmin from "./RegisterAdmin";

const AdminManagement = () => {
  const { auth } = useSelector((state) => state);

  return (
    <>
      <header className="admin-page-header">
        <h1>Admin Management</h1>
        <p>
          Hello {auth.user.username} — create additional administrator accounts.
        </p>
      </header>

      <div className="admin-panel">
        <h2 className="admin-panel__title">Register new admin</h2>
        <p className="admin-panel__sub">
          New admins can access this console after signing in with Admin mode.
        </p>
        <RegisterAdmin />
      </div>
    </>
  );
};

export default AdminManagement;
