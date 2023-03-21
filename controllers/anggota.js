import { errorHandler } from "controllers/error.js";
import { Tb_Anggota } from "../Models/tb_anggota";
const { Op } = require("sequelize");

export const getAllAnggota = async (req, res) => {
  try {
    const { nama } = req.query;
    let allAnggota;
    if (nama) {
      allAnggota = await Tb_Anggota.findAll({
        order: [["nama_anggota", "ASC"]],
        raw: true,
        nest: true,
        where: { nama_anggota: { [Op.like]: `%${nama}%` } },
      });
    } else {
      allAnggota = await Tb_Anggota.findAll({
        raw: true,
        nest: true,
      });
    }
    if (!allAnggota) {
      const error = new Error("server error");
      error.httpStatusCode = 500;
      throw error;
    }

    if (allAnggota.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: allAnggota, total_data: allAnggota.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const addAnggota = async (req, res) => {
  try {
    const {
      kode_anggota,
      nama_anggota,
      jurusan_anggota,
      jk_anggota,
      np_hp_anggota,
      alamat_anggota,
    } = req.body;

    const haveAnggota = await Tb_Anggota.findOne({
      where: { kode_anggota: kode_anggota },
    });

    if (haveAnggota) {
      const error = new Error("anggota sudah ada, ganti kode anggota anda");
      error.httpStatusCode = 400;
      throw error;
    }
    const allAnggota = await Tb_Anggota.create({
      kode_anggota: kode_anggota,
      nama_anggota: nama_anggota,
      jurusan_anggota: jurusan_anggota,
      jk_anggota: jk_anggota,
      np_hp_anggota: np_hp_anggota,
      alamat_anggota: alamat_anggota,
    });
    if (!allAnggota) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(201).json({ message: "success add anggota" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getOneAnggota = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid anggota tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const AnggotaData = await Tb_Anggota.findOne({
      where: { uuid_anggota: uuid },
      raw: true,
      nest: true,
    });
    if (AnggotaData.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: AnggotaData, total_data: AnggotaData.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateOneAnggota = async (req, res) => {
  try {
    const { uuid } = req.query;
    const { nama_anggota, jurusan_anggota, jk_anggota, np_hp_anggota, alamat_anggota } = req.body;
    if (!uuid) {
      const error = new Error("uuid anggota tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const anggota = await Tb_Anggota.update(
      {
        nama_anggota: nama_anggota,
        jurusan_anggota: jurusan_anggota,
        jk_anggota: jk_anggota,
        np_hp_anggota: np_hp_anggota,
        alamat_anggota: alamat_anggota,
      },
      { where: { uuid_anggota: uuid }, raw: true, nest: true }
    );
    if (!anggota) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(200).json({ message: "success update anggota" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteOneAnggota = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid anggota tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const anggota = await Tb_Anggota.destroy({
      where: { uuid_anggota: uuid },
    });
    if (!anggota) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: "success delete anggota" });
  } catch (err) {
    errorHandler(err, res);
  }
};
