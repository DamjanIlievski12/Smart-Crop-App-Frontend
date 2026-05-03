import { useEffect, useRef } from "react";
import type { Field } from "../../api/types/field";
import type React from "react";
import L, { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

const MACEDONIA_CENTER: [number, number] = [41.6086, 21.7453];
const DEFAULT_ZOOM = 8;

interface Props {
  fields: Field[];
}

function getRiskColor(risk?: string) {
  switch (risk) {
    case "Low":
      return "#2e5d40";
    case "Medium":
      return "#d97706";
    case "High":
      return "#dc2626";
    default:
      return "#9ca3af"; // Not assessed
  }
}

function formatHealth(health: number | null | undefined) {
  if (health === null || health === undefined) {
    return { width: "0%", label: "No data" };
  }

  return {
    width: `${health}%`,
    label: `${health}%`,
  };
}

function createIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:28px;height:28px;border-radius:50% 50% 50% 0;
      background:${color};border:3px solid #fff;
      box-shadow:0 2px 6px rgba(0,0,0,.35);
      transform:rotate(-45deg);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

export default function FieldsOverviewMap({
  fields,
}: Props): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current).setView(
      MACEDONIA_CENTER,
      DEFAULT_ZOOM,
    );
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // Re-render markers whenever fields change
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const fieldWithCoords = fields.filter((field) => field.coordinates);

    const validFields = fields.filter(
      (f) =>
        f.coordinates &&
        f.coordinates.latitude !== 0 &&
        f.coordinates.longitude !== 0,
    );

    fieldWithCoords.forEach((field) => {
      const { latitude, longitude } = field.coordinates!;

      const colour = getRiskColor(field.risk);

      const health = formatHealth(field.health);

      const marker = L.marker([latitude, longitude], {
        icon: createIcon(colour),
      }).addTo(map).bindPopup(`
                  <div style="min-width:160px;font-family:system-ui,sans-serif">
          <strong style="font-size:14px">${field.name}</strong><br/>

          <span style="color:#6b7280;font-size:12px">
            ${field.crop} · ${field.size}
          </span><br/>

          <span style="color:#6b7280;font-size:12px">
            ${field.location}
          </span><br/>

          <span style="color:#9ca3af;font-size:11px">
            ${field.risk ? `Risk: ${field.risk}` : "No analysis yet"}
          </span>

          <div style="margin-top:6px;display:flex;align-items:center;gap:6px">
            <div style="height:6px;flex:1;background:#e5e7eb;border-radius:9px;overflow:hidden">
              <div style="height:100%;width:${health.width};background:${colour};border-radius:9px"></div>
            </div>
            <span style="font-size:12px;font-weight:600">
              ${health.label}
            </span>
          </div>
        </div>
      `);

      markersRef.current.push(marker);
    });

    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }, [fields]);

  const visibleCount = fields.filter(
    (f) =>
      f.coordinates &&
      f.coordinates.latitude !== 0 &&
      f.coordinates.longitude !== 0,
  ).length;

  return (
    <div
      className="bg-white border rounded-xl overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h2 className="text-base font-semibold text-gray-900">Fields Map</h2>
        <span className="text-xs text-gray-400">
          {visibleCount} of {fields.length} fields with location
        </span>
      </div>

      {visibleCount === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
          <p className="text-sm">
            No fields have map coordinates yet.
            <br />
            Add coordinates when creating a field.
          </p>
        </div>
      ) : (
        <div ref={containerRef} style={{ height: "380px", width: "100%" }} />
      )}

      {visibleCount > 0 && (
        <div
          className="flex items-center gap-4 px-5 py-3 border-t bg-gray-50 text-xs text-gray-500"
          style={{ borderColor: "var(--color-border)" }}
        >
          {[
            { colour: "#2e5d40", label: "Low risk" },
            { colour: "#d97706", label: "Medium risk" },
            { colour: "#dc2626", label: "High risk" },
            { colour: "#9ca3af", label: "Not assessed" },
          ].map(({ colour, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: colour,
                }}
              />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
