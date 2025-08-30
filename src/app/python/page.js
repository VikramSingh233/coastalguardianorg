'use client';
import { useState } from "react";
// import * as ort from "onnxruntime-node";

export default function Home() {
   const [features, setFeatures] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
   const featureArray = features
  .split(",")
  .map(f => f.trim())        // remove spaces
  .filter(f => f !== "")     // remove empty entries (fixes null issue)
  .map(Number);              // convert to numbers




// Convert to Float32Array for ONNX
// const tensor = new ort.Tensor("float32", Float32Array.from(featureArray), [1, featureArray.length]);

// console.log(tensor);

    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: featureArray }),
    });

    const data = await res.json();
    console.log("data",data);
    setPrediction(data.prediction);
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Enter features (comma-separated):</h1>
      <input
        type="text"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 text-white"
      />
      <button className="text-white" onClick={handlePredict}>Predict</button>
      {prediction !== null && <p className="text-white h-5">Predicted Value: {prediction}</p>}
    </div>
  );
}