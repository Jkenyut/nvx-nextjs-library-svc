import {DataTypes} from "sequelize";
import {sequelize} from "utils/pools.js";

export const Tb_Karyawan = sequelize.define(
    "tb_karyawan",
    {
        id_petugas: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        uuid_petugas: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
        },
        kode_petugas: {type: DataTypes.STRING, allowNull: false, unique: true},
        nama_petugas: {type: DataTypes.STRING, allowNull: false},
        jabatan_petugas: {type: DataTypes.STRING, allowNull: false},
        jk_petugas: {type: DataTypes.ENUM("Laki-laki", "Perempuan"), allowNull: false},
        np_hp_petugas: {type: DataTypes.STRING},
        alamat_petugas: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING, allowNull: false},
        level: {type: DataTypes.ENUM("1", "2"), allowNull: false, defaultValue: "2"},
    },
    {
        // options
        timestamps: true,
        freezeTableName: true,
    }
);
