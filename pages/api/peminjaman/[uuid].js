import {
  deleteOnePeminjaman,
  getOnePeminjaman,
  updateOnePeminjaman,
} from "../../../controllers/peminjaman";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getOnePeminjaman(req, res);
      break;
    case "PUT":
      updateOnePeminjaman(req, res);
      break;
    case "DELETE":
      deleteOnePeminjaman(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
