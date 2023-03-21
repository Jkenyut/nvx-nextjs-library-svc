import { Tb_Buku } from "../Models/tb_buku";
import { errorHandler } from "controllers/error.js";
const { Op } = require("sequelize");
export const getAllBooks = async (req, res) => {
  try {
    const { nama } = req.query;
    let allBooks;
    if (nama) {
      allBooks = await Tb_Buku.findAll({
        order: [["judul_buku", "ASC"]],
        raw: true,
        nest: true,
        where: { judul_buku: { [Op.like]: `%${nama}%` } },
      });
    } else {
      allBooks = await Tb_Buku.findAll({
        raw: true,
        nest: true,
      });
    }
    if (!allBooks) {
      const error = new Error("server error");
      error.httpStatusCode = 500;
      throw error;
    }

    if (allBooks.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: allBooks, total_data: allBooks.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const addBook = async (req, res) => {
  try {
    const { kode_buku, judul_buku, penulis_buku, penerbit_buku, tahun_terbit, stok } = req.body;
    const haveBook = await Tb_Buku.findOne({ where: { kode_buku: kode_buku } });

    if (haveBook) {
      const error = new Error("kode buku sudah ada, ganti kode buku anda");
      error.httpStatusCode = 400;
      throw error;
    }
    const allBooks = await Tb_Buku.create({
      kode_buku: kode_buku,
      judul_buku: judul_buku,
      penulis_buku: penulis_buku,
      penerbit_buku: penerbit_buku,
      tahun_terbit: tahun_terbit,
      stok: stok,
    });
    if (!allBooks) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(201).json({ message: "success add book" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getOneBook = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid buku tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const book = await Tb_Buku.findOne({ where: { uuid_buku: uuid }, raw: true, nest: true });
    if (book.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: book, total_data: book.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateOneBook = async (req, res) => {
  try {
    const { uuid } = req.query;
    const { judul_buku, penulis_buku, penerbit_buku, tahun_terbit, stok } = req.body;
    if (!uuid) {
      const error = new Error("uuid buku tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    console.log(judul_buku);
    const book = await Tb_Buku.update(
      {
        judul_buku: judul_buku,
        penulis_buku: penulis_buku,
        penerbit_buku: penerbit_buku,
        tahun_terbit: tahun_terbit,
        stok: stok,
      },
      { where: { uuid_buku: uuid }, raw: true, nest: true }
    );
    if (!book) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(200).json({ message: "success update book" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteOneBook = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid buku tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const book = await Tb_Buku.destroy({ where: { uuid_buku: uuid } });
    if (!book) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: "success delete book" });
  } catch (err) {
    errorHandler(err, res);
  }
};
