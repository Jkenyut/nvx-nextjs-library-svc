import { Tb_Akun } from "./tb_akun";
import { Tb_Anggota } from "./tb_anggota";
import { Tb_Buku } from "./tb_buku";
import { Tb_Peminjaman } from "./tb_peminjaman";
import { Tb_Pengembalian } from "./tb_pengembalian";
import { Tb_Karyawan } from "./tb_karyawan";
import { sequelize } from "utils/pools.js";
export const updateAllTabel = async () => {
  //peminjaman many-to-many
  Tb_Anggota.belongsToMany(Tb_Buku, { through: Tb_Peminjaman, foreignKey: "id_anggota" });
  Tb_Buku.belongsToMany(Tb_Anggota, { through: Tb_Peminjaman, foreignKey: "id_buku" });

  Tb_Karyawan.belongsToMany(Tb_Buku, { through: Tb_Peminjaman, foreignKey: "id_petugas" });
  Tb_Buku.belongsToMany(Tb_Karyawan, { through: Tb_Peminjaman, foreignKey: "id_buku" });

  Tb_Karyawan.belongsToMany(Tb_Anggota, { through: Tb_Peminjaman, foreignKey: "id_petugas" });
  Tb_Anggota.belongsToMany(Tb_Karyawan, { through: Tb_Peminjaman, foreignKey: "id_anggota" });

  //pengembalian many-to-many
  Tb_Anggota.belongsToMany(Tb_Buku, { through: Tb_Pengembalian, foreignKey: "id_anggota" });
  Tb_Buku.belongsToMany(Tb_Anggota, { through: Tb_Pengembalian, foreignKey: "id_buku" });

  Tb_Karyawan.belongsToMany(Tb_Buku, { through: Tb_Pengembalian, foreignKey: "id_petugas" });
  Tb_Buku.belongsToMany(Tb_Karyawan, { through: Tb_Pengembalian, foreignKey: "id_buku" });

  Tb_Karyawan.belongsToMany(Tb_Anggota, { through: Tb_Pengembalian, foreignKey: "id_petugas" });
  Tb_Anggota.belongsToMany(Tb_Karyawan, { through: Tb_Pengembalian, foreignKey: "id_anggota" });

  const update = await sequelize.sync({ alter: true });
  return update;
};
