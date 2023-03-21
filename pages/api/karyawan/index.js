import { addKaryawan, getAllKarywan } from "../../../controllers/karyawan";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      // Get data from your database
      getAllKarywan(req, res);
      break;
    case "POST":
      addKaryawan(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
