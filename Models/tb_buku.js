import { DataTypes } from "sequelize";
import { sequelize } from "utils/pools.js";

export const Tb_Buku = sequelize.define(
  "tb_buku",
  {
    id_buku: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    uuid_buku: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    kode_buku: { type: DataTypes.STRING, allowNull: false, unique: true },
    judul_buku: { type: DataTypes.STRING, allowNull: false },
    penulis_buku: { type: DataTypes.STRING, allowNull: false },
    penerbit_buku: { type: DataTypes.STRING, allowNull: false },
    tahun_terbit: { type: DataTypes.INTEGER },
    stok: { type: DataTypes.INTEGER },
  },
  {
    // options
    timestamps: true,
    freezeTableName: true,
  }
);

