import {addBook, getAllBooks} from "../../../controllers/buku";

export default async function handler(req, res, next) {
    const {method} = req;
    switch (method) {
        case "GET":
            // Get data from your database
            getAllBooks(req, res);
            break;
        case "POST":
            addBook(req, res, next);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
