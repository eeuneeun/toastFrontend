"use client";

import { useUserStore } from "@/app/_store/UserStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Receipt({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const { id } = useUserStore();

  // 인근의 스토어 불러오기
  async function getReceiptAll() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "GET",
      headers: {
        customerId: id,
      },
    });
    const data = await response.json();
    console.log(data);
    setList(data);
  }

  useEffect(() => {
    getReceiptAll();
  }, []);
  return (
    <div className="receipt">
      <h2>주문 내역</h2>

      <ol className="order-list">
        {list.map((item, idx) => (
          <li key={item + idx}>
            <Link href="/pages/receipt/detail" className="flex-center">
              <img src="/banner01.png" alt="토스트" />
              <dl>
                <dt>{item?.orderMenus[0]?.menu?.name} 외 1건</dt>
                <dd>총 가격 18000원</dd>
              </dl>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
