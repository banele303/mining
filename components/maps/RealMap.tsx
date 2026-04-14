'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Dynamic import for Leaflet components to avoid SSR errors
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Africa coordinates
const AFRICA_CENTER: [number, number] = [2.0, 16.0]; 

type MapListing = {
  _id: string;
  title: string;
  latitude?: number;
  longitude?: number;
  commodity: string;
  commoditySector: string;
  country: string;
  priceMin?: number;
  priceMax?: number;
};

export default function RealMap({ 
  listings = [], 
  height = "600px" 
}: { 
  listings?: MapListing[];
  height?: string;
}) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    // Import leaflet for marker icons
    import('leaflet').then(leaflet => {
      setL(leaflet);
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

  if (!L) return (
    <div style={{ height, background: "#020617", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
      Connecting to Satellite...
    </div>
  );

  return (
    <div style={{ height, width: "100%", overflow: "hidden" }}>
      <MapContainer 
        center={AFRICA_CENTER} 
        zoom={3.5} 
        style={{ height: "100%", width: "100%", background: "#020617" }} 
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {listings.filter(l => l.latitude && l.longitude).map((listing) => (
          <Marker key={listing._id} position={[listing.latitude!, listing.longitude!]}>
            <Popup>
              <div style={{ minWidth: "200px", padding: "4px" }}>
                <p style={{ margin: "0 0 4px", fontSize: "10px", fontWeight: 700, color: "#f97316", textTransform: "uppercase" }}>
                  {listing.commoditySector}
                </p>
                <h4 style={{ margin: "0 0 8px", fontSize: "14px", fontWeight: 800 }}>{listing.title}</h4>
                <p style={{ margin: "0 0 12px", fontSize: "12px", color: "#64748b" }}>📍 {listing.country}</p>
                <Link 
                   href={`/listing/${listing._id}`}
                   style={{ 
                     display: "block", 
                     textAlign: "center", 
                     background: "#f97316", 
                     color: "white", 
                     padding: "8px", 
                     borderRadius: "8px",
                     fontWeight: 700,
                     textDecoration: "none",
                     fontSize: "12px"
                   }}
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style jsx global>{`
        .leaflet-container {
          font-family: var(--font-outfit), sans-serif !important;
        }
        .leaflet-popup-content-wrapper {
          background: #0f172a !important;
          color: white !important;
          border-radius: 12px !important;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .leaflet-popup-tip {
          background: #0f172a !important;
        }
      `}</style>
    </div>
  );
}
