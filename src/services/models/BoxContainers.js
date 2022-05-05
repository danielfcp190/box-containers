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
