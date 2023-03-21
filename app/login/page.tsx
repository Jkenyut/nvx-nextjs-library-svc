import Image from "next/image";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Cookies from "js-cookie";
import React from "react";
import LoginPage from "./LoginPage";
// async function getData(data: object) {
//   const res = await fetch("http://localhost:3000/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data),
//   });
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   return res.json();
// }

async function Home() {
  //   const data = {
  //     username: "okefoe",
  //     password: "ifneifn",
  //   };
  //   const hasil = await getData(data);

  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default Home;
