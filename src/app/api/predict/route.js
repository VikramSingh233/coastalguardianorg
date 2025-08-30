// import * as ort from "onnxruntime-node";

// let session;

// export async function POST(req) {
//   try {
//     if (!session) {
//       session = await ort.InferenceSession.create("public/knn_model_1.onnx");
//         console.log("Model Inputs:", session.inputNames);
//   console.log("Model Outputs:", session.outputNames);
//     }



//     const { features } = await req.json(); // e.g., [0.2, 1.5, 3.1]
//              // convert to numbers

//     const inputTensor = new ort.Tensor(
//       "float32",
//       Float32Array.from(features),
//       [1, features.length]
//     );
//     console.log("feature", features);

//     console.log("inputtensor", inputTensor);
//     const feeds = { input: inputTensor }; // match your ONNX input name
//     console.log("features.length:", features.length);
// console.log("feeds:", feeds);

//     const results = await session.run(feeds);

//     console.log("results", results);

//     const output = results[Object.keys(results)[0]].data;

//     console.log("output", output);

//     return new Response(JSON.stringify({ prediction: output }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: err.toString() }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }










import * as ort from "onnxruntime-node";

let session;

export async function POST(req) {
  try {
    if (!session) {
      session = await ort.InferenceSession.create("public/knn_pipeline.onnx");
      console.log("Model Inputs:", session.inputNames);
      console.log("Model Outputs:", session.outputNames);
    }

    const { features } = await req.json(); // e.g., [2.0, 256.0, 7.75, ...]
    const inputTensor = new ort.Tensor(
      "float32",
      Float32Array.from(features),
      [1, features.length]
    );
    console.log("feature", features);
    console.log("inputTensor", inputTensor);

    // Use a different variable name instead of 'feeds'
    const modelInputs = { [session.inputNames[0]]: inputTensor };
    // console.log("kdahcviqhvcqkb",session.inputNames[0]);

    console.log("modelInputs:", modelInputs);

    const results = await session.run(modelInputs); // same as before
    console.log("results:", results);

    const output = results[Object.keys(results)[0]].data;
    console.log("output:", output);

    return new Response(JSON.stringify({ prediction: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ONNX ERROR:", err);
    return new Response(JSON.stringify({ error: err.toString() }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
