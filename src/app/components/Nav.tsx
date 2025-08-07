"use client";

import Link from "next/link";
import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link href="/">메인</Link>
        </li>
        <li>
          <Link href="/pages/menu">메뉴</Link>
        </li>
        <li>
          <Link href="/pages/order">토스트 오더</Link>
        </li>
        <li>
          <Link href="/pages/receipt">주문 내역</Link>
        </li>
      </ul>
    </div>
  );
}
