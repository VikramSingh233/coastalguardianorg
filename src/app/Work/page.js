"use client";

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stateData, setStateData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/threat");
      const json = await res.json();
      setStateData(json);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">India Coastal States Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stateData.map((state) => (
          <div
            key={state.state}
            className="border border-blue-200 rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-3">{state.state}</h2>
            <p className="text-blue-700">Wave Height: <span className="font-medium">{state.wave} m</span></p>
            <p className="text-blue-700">Wind Speed: <span className="font-medium">{state.wind} km/h</span></p>
            <p className={`mt-3 font-bold ${
              state.threat === "Warning" ? "text-red-600" :
              state.threat === "Watch" ? "text-orange-500" :
              state.threat === "Advisory" ? "text-yellow-600" :
              "text-green-600"
            }`}>
              Threat Level: {state.threat}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
