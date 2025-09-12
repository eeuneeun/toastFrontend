"use client";

import { useOrderStore } from "@/app/_store/OrderStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type ListItem = {
  id: string;
  name: string;
  address: string;
};

export default function Order() {
  const [list, setList] = useState<ListItem[]>([]);
  const { storeId, setStoreInfo } = useOrderStore();

  // 인근의 스토어 불러오기
  async function getStoreAll() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OWNER_API_URL}/store`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setList(data);
  }

  useEffect(() => {
    getStoreAll();
  }, []);

  return (
    <div className="order">
      <h2>매장선택</h2>
      <p>내 주변에 22개의 매장이 있습니다.</p>
      <ul className="tab">
        <li>
          <button className="active">리스트로 선택</button>
        </li>
        <li>
          <button>지도로 선택</button>
        </li>
        <li>
          <button>즐겨찾기</button>
        </li>
      </ul>

      <ol>
        {Array.isArray(list) ? (
          list.map((item, idx) => (
            <li key={item.name + idx}>
              <Link
                href="/menu"
                className="flex-center"
                onClick={() => setStoreInfo(item?.id, item?.name)}
              >
                <img src="/store01.png" alt={item?.name} />
                <dl>
                  <dt>{item?.name}</dt>
                  <dd>{item?.address}</dd>
                  <dd>163m</dd>
                </dl>
              </Link>
            </li>
          ))
        ) : (
          <li>근처에 매장이 없습니다.</li>
        )}
      </ol>
    </div>
  );
}
