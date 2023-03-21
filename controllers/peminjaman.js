import { errorHandler } from "controllers/error.js";
const { Op } = require("sequelize");
import { Tb_Karyawan } from "../Models/tb_karyawan";
import { Tb_Anggota } from "../Models/tb_anggota";
import { Tb_Peminjaman } from "../Models/tb_peminjaman";
import { Tb_Buku } from "../Models/tb_buku";
import { sequelize } from "utils/pools.js";
import { v4 as uuidv4 } from "uuid";
const { QueryTypes } = require("sequelize");
// SELECT *
// FROM tb_peminjaman
// INNER JOIN tb_karyawan ON tb_peminjaman.`id_petugas`=tb_karyawan.id_petugas
// INNER JOIN tb_anggota ON tb_peminjaman.`id_anggota`=tb_anggota.id_anggota
// INNER JOIN tb_buku ON tb_peminjaman.`id_buku`=tb_buku.id_buku;

export const getAllPeminjaman = async (req, res) => {
  try {
    const { nama } = req.query;
    let allPeminjaman;
    allPeminjaman = await sequelize.query("SELECT * FROM Tb_peminjaman", {
      type: QueryTypes.SELECT,
    });

    if (!allPeminjaman) {
      const error = new Error("server error");
      error.httpStatusCode = 500;
      throw error;
    }

    if (allPeminjaman.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: allPeminjaman, total_data: allPeminjaman.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const addPeminjaman = async (req, res) => {
  try {
    const { kode_buku, kode_anggota, kode_petugas, qty, tanggal_pinjam, tanggal_kembali } =
      req.body;

    const kodeBuku = await Tb_Buku.findOne({
      where: { kode_buku: kode_buku },
      raw: true,
      nest: true,
    });

    const kodeAnggota = await Tb_Anggota.findOne({
      where: { kode_anggota: kode_anggota },
      raw: true,
      nest: true,
    });
    const kodePetugas = await Tb_Karyawan.findOne({
      where: { kode_petugas: kode_petugas },
      raw: true,
      nest: true,
    });
    if (!kodeBuku || !kodePetugas || !kodeAnggota) {
      const error = new Error("tidak ditemukan data pada id");
      error.httpStatusCode = 500;
      throw error;
    }

    // const allPeminjaman = await Tb_Peminjaman.create(
    //   {
    //     qty: qty,
    //     tanggal_pinjam: tanggal_pinjam,
    //     tanggal_kembali: tanggal_kembali,
    //     Tb_Buku: [{ kode_buku: kodeBuku.id_buku }],
    //   },
    //   { included: [Tb_Buku] }
    // );

    const allPeminjaman = await sequelize.query(
      `INSERT INTO tb_peminjaman SET uuid_peminjaman=:uuid,qty=:qty,tanggal_pinjam=:tanggal_pinjam,tanggal_kembali=:tanggal_kembali,id_anggota=:id_anggota,id_buku=:id_buku,id_petugas=:id_petugas,createdAt=:CreatedAt,updatedAt=:UpdatedAt`,
      {
        replacements: {
          uuid: uuidv4(),
          qty: qty,
          tanggal_pinjam: tanggal_pinjam,
          tanggal_kembali: tanggal_kembali,
          CreatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          UpdatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          id_buku: kodeBuku.id_buku,
          id_petugas: kodePetugas.id_petugas,
          id_anggota: kodeAnggota.id_anggota,
        },
      }
    );
    console.log(allPeminjaman);
    if (!allPeminjaman) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(201).json({ message: "success add Peminjaman" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const getOnePeminjaman = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid peminjaman tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const peminjamanData = await sequelize.query(
      "SELECT * FROM Tb_peminjaman WHERE uuid_peminjaman =:uuid",
      { replacements: { uuid: uuid }, type: QueryTypes.SELECT }
    );
    if (peminjamanData.length === 0) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: peminjamanData, total_data: peminjamanData.length });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const updateOnePeminjaman = async (req, res) => {
  try {
    const { uuid } = req.query;
    const { kode_buku, kode_anggota, kode_petugas, qty, tanggal_pinjam, tanggal_kembali } =
      req.body;

    const kodeBuku = await Tb_Buku.findOne({
      where: { kode_buku: kode_buku },
      raw: true,
      nest: true,
    });

    const kodeAnggota = await Tb_Anggota.findOne({
      where: { kode_anggota: kode_anggota },
      raw: true,
      nest: true,
    });
    const kodePetugas = await Tb_Karyawan.findOne({
      where: { kode_petugas: kode_petugas },
      raw: true,
      nest: true,
    });
    if (!kodeBuku || !kodePetugas || !kodeAnggota) {
      const error = new Error("tidak ditemukan data pada id");
      error.httpStatusCode = 500;
      throw error;
    }

    if (!uuid) {
      const error = new Error("uuid peminjaman tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const peminjaman = await sequelize.query(
      `UPDATE tb_peminjaman SET qty=:qty,tanggal_pinjam=:tanggal_pinjam,tanggal_kembali=:tanggal_kembali,id_anggota=:id_anggota,id_buku=:id_buku,id_petugas=:id_petugas,updatedAt=:UpdatedAt WHERE uuid_peminjaman=:uuid`,
      {
        replacements: {
          uuid: uuid,
          qty: qty,
          tanggal_pinjam: tanggal_pinjam,
          tanggal_kembali: tanggal_kembali,
          UpdatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          id_buku: kodeBuku.id_buku,
          id_petugas: kodePetugas.id_petugas,
          id_anggota: kodeAnggota.id_anggota,
        },
      }
    );
    if (!peminjaman) {
      return res.status(400).json({ message: "data not saved" });
    }
    return res.status(200).json({ message: "success update peminjaman" });
  } catch (err) {
    errorHandler(err, res);
  }
};

export const deleteOnePeminjaman = async (req, res) => {
  try {
    const { uuid } = req.query;
    if (!uuid) {
      const error = new Error("uuid Peminjaman tidak ada");
      error.httpStatusCode = 500;
      throw error;
    }
    const peminjaman = await Tb_Peminjaman.destroy({
      where: { uuid_peminjaman: uuid },
    });
    if (!peminjaman) {
      return res.status(200).json({ message: "no data" });
    }
    return res.status(200).json({ message: "success delete peminjaman" });
  } catch (err) {
    errorHandler(err, res);
  }
};
