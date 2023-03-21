import { errorHandler } from "controllers/error.js";
const { Op } = require("sequelize");
import { Tb_Karyawan } from "../Models/Tb_Karyawan";
import bcrypt from "bcrypt";

export const getAllKarywan = async (req, res) => {
  try {
    const { nama } = req.query;
    let allKaryawans;
    if (nama) {
      allKaryawans = await Tb_Karyawan.findAll({
        attributes: { exclude: ["password"] },
        order: [["nama_petugas", "ASC"]],
        raw: true,
        nest: true,
        where: { nama_petugas: { [Op.like]: `%${nama}%` } },
      });
    } else {
      allKaryawans = await Tb_Karyawan.findAll({
        attributes: { exclude: ["password"] },
        raw: true,
        nest: true,
      });
    }
    if (!allKaryawans) {
      const error = new Error("server error");
      error.httpStatusCode = 500;
      throw error;
    }

    if (allKaryawans.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: allKaryawans, total_data: allKaryawans.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const addKaryawan = async (req, res) => {
  try {
    const {
      kode_petugas,
      nama_petugas,
      jabatan_petugas,
      jk_petugas,
      np_hp_petugas,
      alamat_petugas,
      password,
      level,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const haveKaryawan = await Tb_Karyawan.findOne({
      where: { kode_petugas: kode_petugas },
    });

    if (haveKaryawan) {
      const error = new Error("karyawan sudah ada, ganti kode karyawan anda");
      error.httpStatusCode = 400;
      throw error;
    }
    const allKaryawan = await Tb_Karyawan.create({
      kode_petugas: kode_petugas,
      nama_petugas: nama_petugas,
      jabatan_petugas: jabatan_petugas,
      jk_petugas: jk_petugas,
      np_hp_petugas: np_hp_petugas,
      alamat_petugas: alamat_petugas,
      password: hashPassword,
      level: level,
    });
    if (!allKaryawan) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(201).json({ message: "success add karyawan" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getOneKaryawan = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid karyawan tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const karyawanData = await Tb_Karyawan.findOne({
      attributes: { exclude: ["password"] },
      where: { uuid_petugas: uuid },
      raw: true,
      nest: true,
    });
    if (karyawanData.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: karyawanData, total_data: karyawanData.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateOneKaryawan = async (req, res) => {
  try {
    const { uuid } = req.query;
    const {
      kode_petugas,
      nama_petugas,
      jabatan_petugas,
      jk_petugas,
      np_hp_petugas,
      alamat_petugas,
      level,
    } = req.body;
    if (!uuid) {
      const error = new Error("uuid karyawan tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const karyawan = await Tb_Karyawan.update(
      {
        kode_petugas: kode_petugas,
        nama_petugas: nama_petugas,
        jabatan_petugas: jabatan_petugas,
        jk_petugas: jk_petugas,
        np_hp_petugas: np_hp_petugas,
        alamat_petugas: alamat_petugas,
        level: level,
      },
      { where: { uuid_petugas: uuid }, raw: true, nest: true }
    );
    if (!karyawan) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(200).json({ message: "success update karyawan" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteOneKaryawan = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid karyawan tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const karyawan = await Tb_Karyawan.destroy({
      where: { uuid_petugas: uuid },
    });
    if (!karyawan) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: "success delete karyawan" });
  } catch (err) {
    errorHandler(err, res);
  }
};
