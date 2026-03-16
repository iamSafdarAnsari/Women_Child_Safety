import React, { useEffect, useState } from "react";

import StatusBadge from "../components/StatusBadge";
import { getAlerts } from "../services/api";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        setAlerts(await getAlerts());
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load alert history.",
        );
      }
    };

    loadAlerts();
  }, []);

  return (
    <>
      <section className="page-header">
        <div>
          <span className="eyebrow">Alerts</span>
          <h2>SOS alert monitoring</h2>
          <p>
            Track active, resolved, and cancelled alerts with location context
            and user details.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Alert history</h3>
          <span className="muted">{alerts.length} total alerts</span>
        </div>

        {error ? <div className="empty-state">{error}</div> : null}

        {!error && alerts.length ? (
          <div className="list">
            {alerts.map((alert) => (
              <div className="list-row" key={alert.id}>
                <div className="list-row-top">
                  <span className="row-title">
                    {alert.userId || "Unknown user"}
                  </span>
                  <StatusBadge value={alert.status} />
                </div>
                <div className="row-meta">
                  Trigger: {alert.triggerType} | Coordinates: {alert.latitude},{" "}
                  {alert.longitude}
                </div>
                <div className="row-meta">
                  {alert.timestamp
                    ? new Date(alert.timestamp).toLocaleString()
                    : "No timestamp available"}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!error && !alerts.length ? (
          <div className="empty-state">No alerts found.</div>
        ) : null}
      </section>
    </>
  );
}
