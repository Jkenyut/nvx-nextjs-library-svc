import { addAnggota, getAllAnggota } from "../../../controllers/anggota";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      getAllAnggota(req, res);
      break;
    case "POST":
      addAnggota(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
