import { use, useEffect, useRef } from "react";
import type { FieldCoordinates } from "../../api/types/field";
import type React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MACEDONIA_CENTER: [number, number] = [41.6086, 21.7453];
const DEFAULT_ZOOM = 8;

interface Props {
  value?: FieldCoordinates | undefined;
  onChange: (coordinates: FieldCoordinates) => void;
}

export default function LocationPickerMap({
  value,
  onChange,
}: Props): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const createIcon = () =>
    L.divIcon({
      className: "",
      html: `<div style="
        width:28px;height:28px;border-radius:50% 50% 50% 0;
        background:#2e5d40;border:3px solid #fff;
        box-shadow:0 2px 6px rgba(0,0,0,.35);
        transform:rotate(-45deg);
      "></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });

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

    const icon = createIcon();

    if (value) {
      markerRef.current = L.marker([value.latitude, value.longitude], {
        icon,
      }).addTo(map);
      map.setView([value.latitude, value.longitude], DEFAULT_ZOOM);
    }

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
      }

      onChange({
        latitude: parseFloat(lat.toFixed(6)),
        longitude: parseFloat(lng.toFixed(6)),
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [onChange, value]);

  // Sync external value changes (e.g. user typed coordinates manually)
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (value) {
      if (markerRef.current) {
        markerRef.current.setLatLng([value.latitude, value.longitude]);
      } else {
        markerRef.current = L.marker([value.latitude, value.longitude], {
          icon: createIcon(),
        }).addTo(map);
      }
      map.setView(
        [value.latitude, value.longitude],
        Math.max(map.getZoom(), 12),
      );
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "280px",
        width: "100%",
        borderRadius: "10px",
        border: "1px solid var(--color-border)",
        overflow: "hidden",
      }}
    />
  );
}
