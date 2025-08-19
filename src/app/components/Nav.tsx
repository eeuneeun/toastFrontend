"use client";

import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link href="/">메인</Link>
        </li>
        <li>
          <Link href="/menu">메뉴</Link>
        </li>
        <li>
          <Link href="/store">토스트 오더</Link>
        </li>
        <li>
          <Link href="/receipt">주문 내역</Link>
        </li>
      </ul>
    </div>
  );
}
