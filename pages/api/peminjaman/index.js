import { addPeminjaman, getAllPeminjaman } from "../../../controllers/peminjaman";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      getAllPeminjaman(req, res);
      break;
    case "POST":
      addPeminjaman(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
