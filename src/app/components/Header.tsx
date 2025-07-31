import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <>
      <div className="header">
        <Link href="/">EUN TOAST</Link>
        <Link href="/pages/cart" className="cart">
          장바구니
        </Link>
      </div>

      <div className="auth-wrap">
        <ul className="auth">
          <li>
            <Link href={"/pages/signUp"}>회원가입</Link>
          </li>
          <li>
            <Link href={"/pages/signIn"}>로그인</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
