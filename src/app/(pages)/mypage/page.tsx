"use client";

import { useUserStore } from "@/app/_store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const router = useRouter();
  const { id, name, accessToken, signOut } = useUserStore();

  if (accessToken == null) {
    router.push("/signIn");
  }

  async function logout() {
    const result = await signOut(id, accessToken);
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
            아이디 : {id}
            <button>수정</button>
          </li>
          <li>
            닉네임 : {name}
            <button>수정</button>
          </li>
          <li>
            이메일 : sacroo@naver.com
            <button>수정</button>
          </li>
          <li>
            <Link href="/mypage/store">주문내역</Link>
          </li>
          <li>
            <button onClick={logout}>로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
