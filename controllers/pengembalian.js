import {errorHandler} from "controllers/error.js";
import {Tb_Karyawan} from "../models/tb_karyawan";
import {Tb_Anggota} from "../models/tb_anggota";
import {Tb_Buku} from "../models/tb_buku";
import {sequelize} from "utils/pools.js";
import {v4 as uuidv4} from "uuid";
import {Tb_Pengembalian} from "../models/tb_pengembalian";

const {Op} = require("sequelize");

const {QueryTypes} = require("sequelize");
// SELECT *
// FROM tb_peminjaman
// INNER JOIN tb_karyawan ON tb_peminjaman.`id_petugas`=tb_karyawan.id_petugas
// INNER JOIN tb_anggota ON tb_peminjaman.`id_anggota`=tb_anggota.id_anggota
// INNER JOIN tb_buku ON tb_peminjaman.`id_buku`=tb_buku.id_buku;

export const getAllPengembalian = async (req, res) => {
    try {
        const {nama} = req.query;
        let allPengembalian;
        allPengembalian = await sequelize.query("SELECT * FROM Tb_pengembalian", {
            type: QueryTypes.SELECT,
        });

        if (!allPengembalian) {
            const error = new Error("server error");
            error.httpStatusCode = 500;
            throw error;
        }

        if (allPengembalian.length === 0) {
            return res.status(200).json({message: "no data"});
        }
        return res.status(200).json({message: allPengembalian, total_data: allPengembalian.length});
    } catch (err) {
        errorHandler(err, res);
    }
};

export const addPengembalian = async (req, res) => {
    try {
        const {kode_buku, kode_anggota, kode_petugas, qty, tanggal_pengembalian} = req.body;

        const kodeBuku = await Tb_Buku.findOne({
            where: {kode_buku: kode_buku},
            raw: true,
            nest: true,
        });

        const kodeAnggota = await Tb_Anggota.findOne({
            where: {kode_anggota: kode_anggota},
            raw: true,
            nest: true,
        });
        const kodePetugas = await Tb_Karyawan.findOne({
            where: {kode_petugas: kode_petugas},
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

        const add = await sequelize.query(
            `INSERT INTO tb_pengembalian
             SET uuid_pengembalian=:uuid,qty=:qty,tanggal_pengembalian=:tanggal_pengembalian,id_anggota=:id_anggota,id_buku=:id_buku,id_petugas=:id_petugas,createdAt=:CreatedAt,updatedAt=:UpdatedAt`,
            {
                replacements: {
                    uuid: uuidv4(),
                    qty: qty,
                    tanggal_pengembalian: tanggal_pengembalian,
                    CreatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
                    UpdatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
                    id_buku: kodeBuku.id_buku,
                    id_petugas: kodePetugas.id_petugas,
                    id_anggota: kodeAnggota.id_anggota,
                },
            }
        );

        if (!add) {
            return res.status(400).json({message: "data not saved"});
        }
        return res.status(201).json({message: "success add pengembalian"});
    } catch (err) {
        errorHandler(err, res);
    }
};

export const getOnePengembalian = async (req, res) => {
    try {
        const {uuid} = req.query;
        if (!uuid) {
            const error = new Error("uuid pengembalian tidak ada");
            error.httpStatusCode = 500;
            throw error;
        }
        const pengembalianData = await sequelize.query(
            "SELECT * FROM Tb_pengembalian WHERE uuid_pengembalian =:uuid",
            {replacements: {uuid: uuid}, type: QueryTypes.SELECT}
        );
        if (pengembalianData.length === 0) {
            return res.status(200).json({message: "no data"});
        }
        return res.status(200).json({message: pengembalianData, total_data: pengembalianData.length});
    } catch (err) {
        errorHandler(err, res);
    }
};

export const updateOnePengembalian = async (req, res) => {
    try {
        const {uuid} = req.query;
        const {kode_buku, kode_anggota, kode_petugas, qty, tanggal_pengembalian} = req.body;

        const kodeBuku = await Tb_Buku.findOne({
            where: {kode_buku: kode_buku},
            raw: true,
            nest: true,
        });

        const kodeAnggota = await Tb_Anggota.findOne({
            where: {kode_anggota: kode_anggota},
            raw: true,
            nest: true,
        });
        const kodePetugas = await Tb_Karyawan.findOne({
            where: {kode_petugas: kode_petugas},
            raw: true,
            nest: true,
        });
        if (!kodeBuku || !kodePetugas || !kodeAnggota) {
            const error = new Error("tidak ditemukan data pada id");
            error.httpStatusCode = 500;
            throw error;
        }

        if (!uuid) {
            const error = new Error("uuid pengembalian tidak ada");
            error.httpStatusCode = 500;
            throw error;
        }
        const pengembalian = await sequelize.query(
            `UPDATE tb_pengembalian
             SET qty=:qty,
                 tanggal_pengembalian=:tanggal_pengembalian,
                 id_anggota=:id_anggota,
                 id_buku=:id_buku,
                 id_petugas=:id_petugas,
                 updatedAt=:UpdatedAt
             WHERE uuid_pengembalian = :uuid `,
            {
                replacements: {
                    uuid: uuid,
                    qty: qty,
                    tanggal_pengembalian: tanggal_pengembalian,
                    UpdatedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
                    id_buku: kodeBuku.id_buku,
                    id_petugas: kodePetugas.id_petugas,
                    id_anggota: kodeAnggota.id_anggota,
                },
            }
        );
        if (!pengembalian) {
            return res.status(400).json({message: "data not saved"});
        }
        return res.status(200).json({message: "success update pengembalian"});
    } catch (err) {
        errorHandler(err, res);
    }
};

export const deleteOnePengembalian = async (req, res) => {
    try {
        const {uuid} = req.query;
        if (!uuid) {
            const error = new Error("uuid Pengembalian tidak ada");
            error.httpStatusCode = 500;
            throw error;
        }
        const pengembalian = await Tb_Pengembalian.destroy({
            where: {uuid_pengembalian: uuid},
        });
        if (!pengembalian) {
            return res.status(200).json({message: "no data"});
        }
        return res.status(200).json({message: "success delete pengembalian"});
    } catch (err) {
        errorHandler(err, res);
    }
};
