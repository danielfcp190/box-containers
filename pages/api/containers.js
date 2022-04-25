import nc from "next-connect";
import ContainerJson from "../../src/services/models/ContainerJson";
import db from "../../src/services/db";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newContainer = new ContainerJson({
    id: req.body.id,
    json: req.body.json,
  });
  const container = await newContainer.save();
  await db.disconnect();
  res.send(container);
});

handler.get(async (req, res) => {
  await db.connect();
  const containerJsons = await ContainerJson.find();
  res.status(200).json(containerJsons);

  await db.disconnect();
});

export default handler;
