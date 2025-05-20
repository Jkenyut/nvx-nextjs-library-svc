import {deleteOneAnggota, getOneAnggota, updateOneAnggota} from "../../../controllers/anggota";

export default async function handler(req, res) {
    const {method} = req;
    switch (method) {
        case "GET":
            getOneAnggota(req, res);
            break;
        case "PUT":
            updateOneAnggota(req, res);
            break;
        case "DELETE":
            deleteOneAnggota(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
