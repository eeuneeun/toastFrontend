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
        <Link href="/">EUN TOAST</Link>

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
          <div className="auth-wrap">
            <ul className="auth">
              <li>
                <Link href={"/pages/signUp"}>회원가입</Link>
              </li>
              <li>
                <Link href={"/pages/signIn"}>
                  <LoginIcon />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
