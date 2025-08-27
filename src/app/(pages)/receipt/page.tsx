"use client";

import { useUserStore } from "@/app/_store/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// type Props = {};

export default function Receipt() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [firstMenuNameArr, setFirstMenuNameArr] = useState([]);
  const { id } = useUserStore();

  async function getMenuById(menuId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      method: "GET",
      headers: {
        customerId: id,
      },
    });
    const data = await response.json();
    console.log(data);
  }

  // 해당 유저 아이디의 주문내역 전체 호출
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

    let tmpMenuNameArr = [];
    data.map((item, idx) => {
      item.orderMenus[0].menuId;
    });
  }

  useEffect(() => {
    console.log(id);
    if (id !== undefined && id !== null) {
      getReceiptAll();
    } else {
      router.push("/signIn");
    }
  }, [id]);
  return (
    <div className="receipt">
      <h2>주문 내역</h2>

      <ol className="order-list">
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, idx) => (
            <li key={item + idx}>
              <Link
                href={{
                  pathname: `./receipt/detail/${item?.id}`,
                  query: { id: item?.id, ref: "receipt" },
                }}
                className="flex-center"
              >
                <img src={item.imgUrl} alt={item.id} />
                <dl>
                  {/* @ts-ignore */}
                  <dt>{item?.orderMenus[0]?.menu?.name} 외 1건</dt>
                  {/* @ts-ignore */}
                  <dd>총 가격 {item.totalPrice}원</dd>
                </dl>
              </Link>
            </li>
          ))
        ) : (
          <li>주문내역이 없습니다.</li>
        )}
      </ol>
    </div>
  );
}
