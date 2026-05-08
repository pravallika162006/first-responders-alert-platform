const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

  emergencyType: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  latitude: {
    type: Number,
    default: 0,
  },

  longitude: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Request",
  requestSchema
);