import Link from "next/link";
import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/pages/toast">toast</Link>
        </li>
        <li>
          <Link href="/pages/order">order</Link>
        </li>
        <li>
          <Link href="/pages/mypage">mypage</Link>
        </li>
      </ul>
    </div>
  );
}
