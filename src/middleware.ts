// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  try {
    // jose는 Uint8Array 키를 사용해야 함
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "dev-secret"
    );

    // JWT 검증
    await jwtVerify(token, secret);

    // 유효하면 진행
    return NextResponse.next();
  } catch (err) {
    console.error("JWT 검증 실패:", err);
    return NextResponse.redirect(new URL("/signIn", request.url));
  }
}

// 보호할 경로 지정
export const config = {
  matcher: [],
};
