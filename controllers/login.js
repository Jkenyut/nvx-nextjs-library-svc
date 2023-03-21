import bcrypt from "bcrypt";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { Tb_Karyawan } from "../Models/tb_karyawan";
import { errorHandler } from "./error";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const findKaryawan = await Tb_Karyawan.findOne({
      where: { nama_petugas: username },
      raw: true,
      nest: true,
    });

    if (!findKaryawan) {
      const error = new Error("username tidak ditemukan");
      error.httpStatusCode = 400;
      throw error;
    }
    const valid = await bcrypt.compare(password, findKaryawan.password);
    if (!valid) {
      const error = new Error("password salah");
      error.httpStatusCode = 400;
      throw error;
    }
    const cookie = `username=${findKaryawan.nama_petugas}; Max-Age=3600; Secure; HttpOnly; path=/`;

    // mengirim cookie dalam respons
    res.setHeader("Set-Cookie", cookie);
    return res.status(200).json({ message: "ok" });
  } catch (err) {
    errorHandler(err, res);
  }
};
