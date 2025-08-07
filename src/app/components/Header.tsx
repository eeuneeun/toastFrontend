"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "../_store/CartStore";
import { useUserStore } from "../_store/UserStore";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";

type Props = {};

export default function Header({}: Props) {
  const { cart, loading, error, fetchCart } = useCartStore();
  const { id, name } = useUserStore();
  useEffect(() => {
    console.log(id, name);
  }, [name]);
  return (
    <>
      <div className="header">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="토스트롱" />
        </Link>

        {id ? (
          <div>
            <Link href="/pages/mypage" className="mypage-btn">
              <AccountBoxIcon />
            </Link>
            <Link
              href="/pages/cart"
              className={`${cart?.cartMenus ? "active" : ""} cart-btn`}
            >
              <ShoppingBagIcon />
            </Link>
          </div>
        ) : (
          <>
            <Link href={"/pages/signUp"} className="signup-btn"></Link>
            <Link href={"/pages/signIn"} className="signout-btn">
              <LoginIcon />
            </Link>
          </>
        )}
      </div>
    </>
  );
}
