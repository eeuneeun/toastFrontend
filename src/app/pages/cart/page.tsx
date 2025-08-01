"use client";

import PlusMinus from "@/app/components/PlusMinus";
import React, { useState } from "react";

type Props = {};

export default function Cart({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const storeName = "신림 프라임 법학원점";
  return (
    <div className="cart">
      <h2>장바구니</h2>
      <h3>{storeName}</h3>
      <ol>
        {list.map((item, idx) => (
          <li className="flex-center" key={item + idx}>
            <img src="/globe.svg" alt="기본 토스트" />
            <dl>
              <dt>기본 토스트</dt>
              <dd>
                <PlusMinus price={5000} />
              </dd>
            </dl>
            <button className="remove-btn">x</button>
          </li>
        ))}
      </ol>

      <p>장바구니에 담은 상품은 최대 30일간 보관됩니다.</p>

      <div className="total-cost">
        <dl className="flex-between">
          <dt>상품금액</dt>
          <dd>18,000 원</dd>
        </dl>
        <button>주문하기</button>
      </div>
    </div>
  );
}
