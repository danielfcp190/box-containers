// const mongoose = require("mongoose");

// const ContainerJson = mongoose.model("ContainerJson", {
//   json: String,
//   id: Number,
// });

// module.exports = ContainerJson;

import mongoose from "mongoose";

const boxContainersSchema = new mongoose.Schema(
  {
    box: { type: Number, required: true },
    json: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

const BoxContainers =
  mongoose.models.BoxContainers ||
  mongoose.model("BoxContainers", boxContainersSchema);
export default BoxContainers;
