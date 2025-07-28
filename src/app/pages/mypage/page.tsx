import Link from "next/link";

export default function MyPage() {
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
            <Link href="/pages/mypage/order">주문내역</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
