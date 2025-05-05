// components/MapSection.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapSection() {
  // Coordinates for the map center (Ludhiana, India)
  const position = [30.9008, 75.8573]; // Latitude and Longitude for Ludhiana

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4"> {/* Added mt-20 to add more space from the top */}
      <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
        Find Us on the Map
      </h2>

      {/* Map Container */}
      <MapContainer center={position} zoom={12} style={{ height: "400px", width: "100%" }}>
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Marker for Ludhiana */}
        <Marker position={position}>
          <Popup>Ludhiana, India</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
