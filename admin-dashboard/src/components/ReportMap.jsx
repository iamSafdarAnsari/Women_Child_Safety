import React, { useEffect, useRef } from "react";
import L from "leaflet";

const markerColors = {
  harassment: "#c53030",
  "suspicious activity": "#d69e2e",
  "unsafe road": "#2f855a",
};

const getCenter = (reports) => {
  if (!reports.length) {
    return [28.6139, 77.209];
  }

  const latitudeTotal = reports.reduce(
    (sum, report) => sum + report.location.latitude,
    0,
  );
  const longitudeTotal = reports.reduce(
    (sum, report) => sum + report.location.longitude,
    0,
  );

  return [latitudeTotal / reports.length, longitudeTotal / reports.length];
};

export default function ReportMap({ reports = [] }) {
  const mapNodeRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) {
      return undefined;
    }

    mapRef.current = L.map(mapNodeRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    }).setView([28.6139, 77.209], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    layerRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !layerRef.current) {
      return;
    }

    layerRef.current.clearLayers();

    const validReports = reports.filter(
      (report) =>
        typeof report.location?.latitude === "number" &&
        typeof report.location?.longitude === "number",
    );

    if (!validReports.length) {
      mapRef.current.setView([28.6139, 77.209], 11);
      return;
    }

    const bounds = [];

    validReports.forEach((report) => {
      const color = markerColors[report.type] || "#4a5568";
      const coordinates = [report.location.latitude, report.location.longitude];
      bounds.push(coordinates);

      L.circleMarker(coordinates, {
        radius: 10,
        fillColor: color,
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      })
        .bindPopup(
          `<strong>${report.type}</strong><br/>${report.description}<br/>${
            report.location.address || "No address provided"
          }`,
        )
        .addTo(layerRef.current);
    });

    if (bounds.length === 1) {
      mapRef.current.setView(getCenter(validReports), 13);
      return;
    }

    mapRef.current.fitBounds(bounds, { padding: [32, 32] });
  }, [reports]);

  return <div ref={mapNodeRef} className="map-shell" />;
}
