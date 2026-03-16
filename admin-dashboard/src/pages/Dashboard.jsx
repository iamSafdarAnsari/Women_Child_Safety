import React, { useEffect, useState } from "react";

import ReportMap from "../components/ReportMap";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { getAdminOverview } from "../services/api";

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const response = await getAdminOverview();
        setOverview(response);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load dashboard data. Check the backend connection.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOverview();
  }, []);

  const stats = overview?.stats || {
    totalUsers: 0,
    activeAlerts: 0,
    unsafeLocations: 0,
  };

  const recentAlerts = overview?.alerts?.slice(0, 4) || [];
  const mapReports = overview?.reports || [];

  return (
    <>
      <section className="page-header">
        <div>
          <span className="eyebrow">Admin Overview</span>
          <h2>Platform command center</h2>
          <p>
            Review users, live SOS activity, and unsafe area reporting from a
            single dashboard built for operational awareness.
          </p>
        </div>
        <div className="muted">
          User totals source: {overview?.userSource || "loading"}
        </div>
      </section>

      {error ? <section className="empty-state">{error}</section> : null}

      <section className="grid-3">
        <StatCard
          label="Total Users"
          value={loading ? "..." : stats.totalUsers}
          footnote="Total known users based on admin feed or inferred activity."
        />
        <StatCard
          label="Active SOS Alerts"
          value={loading ? "..." : stats.activeAlerts}
          footnote="Alerts currently marked active in the backend history feed."
        />
        <StatCard
          label="Reported Unsafe Locations"
          value={loading ? "..." : stats.unsafeLocations}
          footnote="Reports submitted for harassment, unsafe roads, or suspicious activity."
        />
      </section>

      <section className="grid-2">
        <article className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Safety report map</h3>
            <span className="muted">Leaflet report visualization</span>
          </div>
          <ReportMap reports={mapReports} />
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Recent SOS activity</h3>
            <span className="muted">Latest alert history entries</span>
          </div>
          <div className="list">
            {recentAlerts.length ? (
              recentAlerts.map((alert) => (
                <div className="list-row" key={alert.id}>
                  <div className="list-row-top">
                    <span className="row-title">
                      {alert.triggerType} trigger
                    </span>
                    <StatusBadge value={alert.status} />
                  </div>
                  <div className="row-meta">
                    {alert.userId || "Unknown user"} at {alert.latitude},{" "}
                    {alert.longitude}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">No alert history available.</div>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
