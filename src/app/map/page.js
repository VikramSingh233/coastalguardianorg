"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then(mod => mod.GeoJSON),
  { ssr: false }
);

const INDIA_GEO_JSON = "/india.geojson";

export default function IndiaMap() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch(INDIA_GEO_JSON)
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const onEachDistrict = (feature, layer) => {
    layer.on({
      click: () => {
        // You can switch between district or st_nm
        alert(`You clicked on: ${feature.properties.district}, State: ${feature.properties.st_nm}`);
      },
    });
  };

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[23, 92]} // Roughly Mizoram’s center
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
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
            onEachFeature={onEachDistrict}
          />
        )}
      </MapContainer>
    </div>
  );
}
