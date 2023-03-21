import {
  deleteOnePengembalian,
  getOnePengembalian,
  updateOnePengembalian,
} from "../../../controllers/pengembalian";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getOnePengembalian(req, res);
      break;
    case "PUT":
      updateOnePengembalian(req, res);
      break;
    case "DELETE":
      deleteOnePengembalian(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
