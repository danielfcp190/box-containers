import ContainerJson from "../../src/services/models/ContainerJson";
import nc from "next-connect";
import db from "../../src/services/db";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const containerJsons = await ContainerJson.findOne(req.query.id);
  res.status(200).json(containerJsons);

  await db.disconnect();
});

export default handler;
