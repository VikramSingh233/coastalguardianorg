import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// India GeoJSON file (you can download one specific to Indian states)
const INDIA_TOPO_JSON = "/coastalthreat/src/app/Component/india.json";

const IndiaMap = () => {
  const [selectedState, setSelectedState] = useState("");

  return (
    <div>
      <h2>Selected State: {selectedState || "None"}</h2>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1000 }}>
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => setSelectedState(geo.properties.name)}
                style={{
                  default: { fill: "#E0E0E0", outline: "none" },
                  hover: { fill: "#90CAF9", outline: "none" },
                  pressed: { fill: "#1976D2", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
