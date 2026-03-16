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
    (sum, report) => sum + report.latitude,
    0,
  );
  const longitudeTotal = reports.reduce(
    (sum, report) => sum + report.longitude,
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
        typeof report.latitude === "number" &&
        typeof report.longitude === "number",
    );

    if (!validReports.length) {
      mapRef.current.setView([28.6139, 77.209], 11);
      return;
    }

    const bounds = [];

    validReports.forEach((report) => {
      const normalizedType = String(report.type || "").replace(/_/g, " ");
      const color = markerColors[normalizedType] || "#4a5568";
      const coordinates = [report.latitude, report.longitude];
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
          `<strong>${normalizedType}</strong><br/>${report.description}<br/>Risk: ${report.riskLevel}`,
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
