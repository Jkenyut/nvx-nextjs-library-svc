import {deleteOneBook, getOneBook, updateOneBook} from "../../../controllers/buku";

export default async function handler(req, res) {
    const {method} = req;
    switch (method) {
        case "GET":
            getOneBook(req, res);
            break;
        case "PUT":
            updateOneBook(req, res);
            break;
        case "DELETE":
            deleteOneBook(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
