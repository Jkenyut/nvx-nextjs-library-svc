// middleware.ts

// This function can be marked `async` if using `await` inside
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
export async function middleware(req, res) {
  console.log("ok");
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
  api: {
    bodyParser: false,
  },
};
