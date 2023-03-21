import { DataTypes } from "sequelize";
import { sequelize } from "utils/pools.js";

export const Tb_Peminjaman = sequelize.define(
  "tb_peminjaman",
  {
    id_peminjaman: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    uuid_peminjaman: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    qty: { type: DataTypes.INTEGER, allowNull: false },
    tanggal_pinjam: { type: DataTypes.DATE, allowNull: false },
    tanggal_kembali: { type: DataTypes.DATE, allowNull: false },
  },
  {
    // options
    timestamps: true,
    freezeTableName: true,
  }
);
