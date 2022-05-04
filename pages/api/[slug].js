import BoxContainers from "../../src/services/models/BoxContainers";
import nc from "next-connect";
import db from "../../src/services/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const containerJsons = await BoxContainers.findOne({ box: req.query.slug });
  res.status(200).json(containerJsons.json);

  await db.disconnect();
});

export default handler;
