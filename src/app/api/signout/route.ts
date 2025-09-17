import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // ✅ 쿠키 제거
  res.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, // 즉시 만료
  });

  return res;
}
