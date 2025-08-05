"use client";

import { useCartStore } from "@/app/_store/CartStore";
import PlusMinus from "@/app/components/PlusMinus";
import React, { useState } from "react";

type Props = {};

export default function Cart({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const storeName = "신림 프라임 법학원점";
  const { cart, loading, error, fetchCart } = useCartStore();

  return (
    <div className="cart">
      <h2>장바구니</h2>
      <h3>{storeName}</h3>
      <ol>
        {cart?.cartMenus.map((item, idx) => (
          <li className="flex-center" key={item.menu.name + idx}>
            <img src={item.menu.imgUrl} alt="기본 토스트" />
            <dl>
              <dt>{item.menu.name}</dt>
              <dd>
                <PlusMinus price={item.menu.price} />
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
