import sys, json, pickle, numpy as np

# Load model + scaler once
with open("models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)
with open("models/knn_model.pkl", "rb") as f:
    model = pickle.load(f)

# Read features from Node.js
features = json.loads(sys.argv[1])
features = np.array(features).reshape(1, -1)

# Scale + predict
scaled = scaler.transform(features)
pred = model.predict(scaled)

print(json.dumps(int(pred[0])))  # Send prediction back