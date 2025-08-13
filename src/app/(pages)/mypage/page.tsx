"use client";

import { useUserStore } from "@/app/_store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const { id, accessToken, signOut } = useUserStore();

  async function logout() {
    const result = await (accessToken && signOut(id, accessToken));
    if (result) {
      router.push("/");
    }
  }
  return (
    <div className="mypage">
      <h2>마이 페이지</h2>
      <div>
        <img src="/vercel.svg" alt="프로필 사진" />
        <ul>
          <li>
            이름 : 원은재
            <button>수정</button>
          </li>
          <li>
            닉네임 : 은은
            <button>수정</button>
          </li>
          <li>
            이메일 : sacroo@naver.com
            <button>수정</button>
          </li>
          <li>
            <Link href="/mypage/order">주문내역</Link>
          </li>
          <li>
            <button onClick={logout}>로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
