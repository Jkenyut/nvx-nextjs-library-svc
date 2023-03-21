import { DataTypes } from "sequelize";
import { sequelize } from "utils/pools.js";

export const Tb_Anggota = sequelize.define(
  "tb_anggota",
  {
    id_anggota: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    uuid_anggota: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    kode_anggota: { type: DataTypes.STRING, allowNull: false, unique: true },
    nama_anggota: { type: DataTypes.STRING, allowNull: false },
    jurusan_anggota: { type: DataTypes.STRING, allowNull: false },
    jk_anggota: { type: DataTypes.ENUM("Laki-laki", "Perempuan"), allowNull: false },
    np_hp_anggota: { type: DataTypes.STRING },
    alamat_anggota: { type: DataTypes.STRING },
  },
  {
    // options
    timestamps: true,
    freezeTableName: true,
  }
);
