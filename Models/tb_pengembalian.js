import { DataTypes } from "sequelize";
import { sequelize } from "utils/pools.js";

export const Tb_Pengembalian = sequelize.define(
  "tb_pengembalian",
  {
    id_pengembalian: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    uuid_pengembalian: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    qty: { type: DataTypes.INTEGER, allowNull: false },
    tanggal_pengembalian: { type: DataTypes.DATE, allowNull: false },
  },
  {
    // options
    timestamps: true,
    freezeTableName: true,
  }
);
