import { NextResponse, NextRequest } from "next/server";
import { SignJWT } from "jose";
import { redirect } from "next/navigation";

type resultData = {
  message: string;
  user: {
    id: string;
    password: string;
    name: string;
  };
};
export async function POST(req: Request) {
  const { userId, password } = await req.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      password: password,
    }),
    credentials: "include",
  });
  const data: resultData = await res.json();

  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  // 👉 여기는 DB나 외부 API 인증 로직 자리
  if (data.message == "Login successful") {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "dev-secret"
    );

    const token = await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      user: data.user,
      accessToken: token,
    });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // secure: false,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
