// const mongoose = require("mongoose");

// const ContainerJson = mongoose.model("ContainerJson", {
//   json: String,
//   id: Number,
// });

// module.exports = ContainerJson;

import mongoose from "mongoose";

const containerJsonSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    json: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContainerJson =
  mongoose.models.ContainerJson ||
  mongoose.model("ContainerJson", containerJsonSchema);
export default ContainerJson;
