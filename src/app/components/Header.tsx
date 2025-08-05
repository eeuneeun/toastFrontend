"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useCartStore } from "../_store/CartStore";

type Props = {};

export default function Header({}: Props) {
  const { cart, loading, error, fetchCart } = useCartStore();

  useEffect(() => {
    console.log(cart);
  }, []);
  return (
    <>
      <div className="header">
        <Link href="/">EUN TOAST</Link>
        <Link
          href="/pages/cart"
          className={`${cart?.cartMenus ? "active" : ""} cart-btn`}
        >
          장바구니
        </Link>
      </div>

      <div className="auth-wrap display-none">
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
