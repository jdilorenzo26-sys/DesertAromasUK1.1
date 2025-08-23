// middleware.js
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin"], // protect only the admin page; add APIs if you want
};

export function middleware(req) {
  const basicAuth = req.headers.get("authorization");
  const USER = process.env.BASIC_AUTH_USER || "";
  const PASS = process.env.BASIC_AUTH_PASS || "";

  if (!USER || !PASS) {
    // If not configured, don't block (avoid lockout in dev)
    return NextResponse.next();
  }

  if (basicAuth) {
    const [, hash] = basicAuth.split(" ");
    try {
      const [user, pass] = atob(hash).split(":");
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch (_) {
      // fall through to challenge
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
