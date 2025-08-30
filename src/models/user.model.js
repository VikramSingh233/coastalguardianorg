import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: String,
  },

  country: {
    type: String,
  },

  state: {
    type: String,
  },

  organization: {
    type: String,
  },

  // Notification Preferences
  notificationPreference: {
    floodingAlerts: {
      selected: { type: Boolean, default: false },
      messages: [{ message: { type: String } }],
    },
    cyclonicalActivity: {
      selected: { type: Boolean, default: false },
      messages: [{ message: { type: String } }],
    },
    seaLevelRise: {
      selected: { type: Boolean, default: false },
      messages: [{ message: { type: String } }],
    },
  },

  // Notifications (array of objects)
  notifications: [
    {
      title: { type: String, required: true },
      description: { type: String },
      markAsRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
