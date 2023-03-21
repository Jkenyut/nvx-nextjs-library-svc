import { DataTypes } from "sequelize";
import { sequelize } from "utils/pools.js";

export const Tb_Akun = sequelize.define(
  "tb_akun",
  {
    id_akun: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    uuid_akun: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    nama: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.ENUM("1", "2"), allowNull: false, defaultValue: "2" },
  },
  {
    // options
    timestamps: true,
    freezeTableName: true,
  }
);
