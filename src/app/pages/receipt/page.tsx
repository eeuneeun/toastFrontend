"use client";

import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function Receipt({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="receipt">
      <h2>주문 내역</h2>

      <ol className="order-list">
        {list.map((item, idx) => (
          <li key={item + idx}>
            <Link href="/pages/receipt/detail" className="flex-center">
              <img src="/banner01.png" alt="토스트" />
              <dl>
                <dt>계란 토스트 외 1건</dt>
                <dd>총 가격 18000원</dd>
              </dl>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
