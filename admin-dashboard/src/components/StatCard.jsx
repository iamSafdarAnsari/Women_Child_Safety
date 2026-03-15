import React from "react";

export default function StatCard({ label, value, footnote }) {
  return (
    <article className="stat-card">
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <span className="stat-footnote">{footnote}</span>
    </article>
  );
}
