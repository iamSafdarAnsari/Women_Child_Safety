import React, { useEffect, useState } from "react";

import ReportMap from "../components/ReportMap";
import { getReports } from "../services/api";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReports = async () => {
      try {
        setReports(await getReports());
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load safety reports.",
        );
      }
    };

    loadReports();
  }, []);

  return (
    <>
      <section className="page-header">
        <div>
          <span className="eyebrow">Reports</span>
          <h2>Unsafe area reports</h2>
          <p>
            Review harassment, unsafe road, and suspicious activity reports and
            inspect their positions on the map.
          </p>
        </div>
      </section>

      <section className="grid-2">
        <article className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Report map</h3>
            <span className="muted">{reports.length} mapped reports</span>
          </div>
          <ReportMap reports={reports} />
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Latest report details</h3>
            <span className="muted">Newest first</span>
          </div>

          {error ? <div className="empty-state">{error}</div> : null}

          {!error && reports.length ? (
            <div className="list">
              {reports.slice(0, 8).map((report) => (
                <div className="list-row" key={report.id}>
                  <div className="list-row-top">
                    <span className="row-title">{report.type}</span>
                    <span className="muted">
                      {report.timestamp
                        ? new Date(report.timestamp).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                  <div className="row-meta">{report.description}</div>
                  <div className="row-meta">
                    Coordinates: {report.latitude}, {report.longitude}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!error && !reports.length ? (
            <div className="empty-state">No reports found.</div>
          ) : null}
        </article>
      </section>
    </>
  );
}
