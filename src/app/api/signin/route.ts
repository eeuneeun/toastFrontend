import { NextResponse } from "next/server";
import { SignJWT } from "jose";

type resultData = {
  message: string;
  user: {
    id: string;
    password: string;
    name: string;
  };
};
export async function POST(req: Request): Promise<resultData> {
  const { userId, password } = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      password: password,
    }),
  });
  const data: resultData = await res.json();

  // 👉 여기는 DB나 외부 API 인증 로직 자리
  if (data.message == "Login successful") {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    const res = NextResponse.json({ success: true, userId });
    res.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });
  }

  return NextResponse.json({
    message: data.message,
    user: {
      id: data.user.id,
      password: data.user.password,
      name: data.user.name,
    },
  });
}
