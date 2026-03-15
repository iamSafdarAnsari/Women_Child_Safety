import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Alerts", to: "/alerts" },
  { label: "Reports", to: "/reports" },
  { label: "Users", to: "/users" },
];

export default function Layout() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-badge">WC</div>
          <div>
            <h1>Safety Admin Desk</h1>
            <p>
              Monitor alerts, track unsafe locations, and review platform
              activity from a single control surface.
            </p>
          </div>
        </div>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <strong>Operations Note</strong>
          <span>
            The dashboard can infer user count from alert and report activity if
            a dedicated admin users endpoint is not available yet.
          </span>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
