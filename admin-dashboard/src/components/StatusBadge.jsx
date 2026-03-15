import React from "react";

const palette = {
  active: { background: "rgba(217, 75, 53, 0.14)", color: "#9d2518" },
  resolved: { background: "rgba(25, 118, 110, 0.14)", color: "#155f58" },
  monitoring: { background: "rgba(227, 181, 64, 0.2)", color: "#7f5a00" },
  default: { background: "rgba(94, 107, 102, 0.14)", color: "#556660" },
};

export default function StatusBadge({ value }) {
  const normalizedValue = String(value || "default").toLowerCase();
  const style = palette[normalizedValue] || palette.default;

  return (
    <span
      className="badge"
      style={{ background: style.background, color: style.color }}
    >
      {value}
    </span>
  );
}
