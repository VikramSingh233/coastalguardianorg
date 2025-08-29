"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const INDIA_GEO_JSON = "/india.geojson";

export default function StateMap() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch(INDIA_GEO_JSON)
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  // 🎯 Handle click on state
  const onEachState = (feature, layer) => {
    layer.on({
      click: () => {
        alert(`You clicked on: ${feature.properties.NAME_1}`);
        // 👆 Change NAME_1 if your geojson uses another property name
      },
    });
  };

  return (
    <MapContainer center={[22, 80]} zoom={4} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData && (
        <GeoJSON
          data={geoData}
          style={{
            fillColor: "#4CAF50",
            weight: 1,
            color: "black",
            fillOpacity: 0.5,
          }}
          onEachFeature={onEachState}
        />
      )}
    </MapContainer>
  );
}
