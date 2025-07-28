import Link from "next/link";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="header">
      <Link href="/">EUN TOAST</Link>
      <Link href="/pages/cart" className="cart">
        장바구니
      </Link>
    </div>
  );
}
