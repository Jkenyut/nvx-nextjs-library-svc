import { getOneKaryawan ,updateOneKaryawan,deleteOneKaryawan} from "../../../controllers/karyawan";


export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      getOneKaryawan(req, res);
      break;
    case "PUT":
      updateOneKaryawan(req, res);
      break;
    case "DELETE":
      deleteOneKaryawan(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
