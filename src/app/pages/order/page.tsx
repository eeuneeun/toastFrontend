"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Order({}: Props) {
  const [list, setList] = useState([]);

  // 인근의 스토어 불러오기
  async function getStoreAll() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store`, {
      method: "GET",
    });
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
        {list.map((item, idx) => (
          <li key={item + idx}>
            <Link href="/pages/menu" className="flex-center">
              <img src="/store01.png" alt="신림 프리임 법학원점" />
              <dl>
                <dt>신림 프리임 법학원점</dt>
                <dd>서울특별시 관악구 신림동 131-21</dd>
                <dd>163m</dd>
              </dl>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
