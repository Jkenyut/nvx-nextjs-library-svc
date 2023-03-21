import { addPengembalian, getAllPengembalian } from "../../../controllers/pengembalian";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      getAllPengembalian(req, res);
      break;
    case "POST":
      addPengembalian(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
