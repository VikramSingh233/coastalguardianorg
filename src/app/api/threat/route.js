const coastalStates = [
  { name: "Gujarat", lat: 22.2587, lon: 69.1958, avgWave: 2, avgWind: 10 },
  { name: "Maharashtra", lat: 19.076, lon: 72.8777, avgWave: 1.8, avgWind: 12 },
  { name: "Goa", lat: 15.2993, lon: 74.124, avgWave: 1.5, avgWind: 8 },
  { name: "Karnataka", lat: 13.3400, lon: 74.7491, avgWave: 1.2, avgWind: 6 },
  { name: "Kerala", lat: 10.8505, lon: 76.2711, avgWave: 1.5, avgWind: 7 },
  { name: "Tamil Nadu", lat: 11.1276, lon: 78.6569, avgWave: 1.8, avgWind: 9 },
  { name: "Andhra Pradesh", lat: 17.3616, lon: 78.4747, avgWave: 1.7, avgWind: 8 },
  { name: "Odisha", lat: 20.9517, lon: 85.0985, avgWave: 2, avgWind: 10 },
  { name: "West Bengal", lat: 22.9868, lon: 87.855, avgWave: 1.5, avgWind: 7 }
];

function getThreatLevel(wave, wind) {
  if (wave > 5 || wind > 80) return "Warning";
  if (wave > 3 || wind > 50) return "Watch";
  if (wave > 1.5 || wind > 30) return "Advisory";
  return "Safe";
}

function getFirstAvailable(valueObj) {
  if (!valueObj) return null;
  return valueObj.sg ?? valueObj.noaa ?? valueObj.meto ?? null;
}

export async function GET() {
  const results = await Promise.all(
    coastalStates.map(async (state) => {
      try {
        const res = await fetch(
          `https://api.stormglass.io/v2/weather/point?lat=${state.lat}&lng=${state.lon}&params=waveHeight,windSpeed`,
          {
            headers: {
              'Authorization': '6c8859b8-8559-11f0-b41a-0242ac130006-6c885a1c-8559-11f0-b41a-0242ac130006'
            }
          }
        );

        const data = await res.json();
        const latest = data.hours && data.hours.length > 0 ? data.hours[0] : null;

        // Use real data if available
        let wave = getFirstAvailable(latest?.waveHeight);
        let wind = getFirstAvailable(latest?.windSpeed);

        // Fallback to **state-specific average** if missing
        if (wave === null) wave = state.avgWave;
        if (wind === null) wind = state.avgWind;

        const threat = getThreatLevel(wave, wind);

        return {
          state: state.name,
          wave,
          wind,
          threat
        };
      } catch (err) {
        console.error(state.name, err);
        return {
          state: state.name,
          wave: state.avgWave,
          wind: state.avgWind,
          threat: getThreatLevel(state.avgWave, state.avgWind)
        };
      }
    })
  );

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
