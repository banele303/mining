'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet components to avoid SSR errors
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Southern Africa coordinates
const SA_CENTER: [number, number] = [-28.4793, 24.6727]; 

export default function RealMap({ height = "400px" }: { height?: string }) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Import leaflet to fix marker icon issue in Next.js
    import('leaflet').then(leaflet => {
      setL(leaflet);
      // Fix for default marker icons not showing in react-leaflet
      const DefaultIcon = leaflet.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      leaflet.Marker.prototype.options.icon = DefaultIcon;
    });
  }, []);

  if (!L) return <div style={{ height, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>;

  return (
    <div style={{ height, width: "100%", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)" }}>
      <MapContainer center={SA_CENTER} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Mock Markers for Southern Africa */}
        <Marker position={[-26.2041, 28.0473]}>
          <Popup>
            <strong>Johannesburg Gold Assets</strong><br />
            850 active listings
          </Popup>
        </Marker>
        
        <Marker position={[-22.5597, 17.0832]}>
          <Popup>
            <strong>Namibia Diamond Projects</strong><br />
            320 active listings
          </Popup>
        </Marker>

        <Marker position={[-24.6282, 25.9231]}>
          <Popup>
            <strong>Botswana Copper Belt</strong><br />
            280 active listings
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
