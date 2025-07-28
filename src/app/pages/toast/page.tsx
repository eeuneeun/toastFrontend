"use client";

import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Toast() {
  const [list, setList] = useState<any[]>([
    {
      toastName: "기본토스트",
      price: 3000,
      description: "맛있는 기본 토스트",
    },
    {
      toastName: "기본토스트",
      price: 3000,
      description: "맛있는 기본 토스트",
    },
    {
      toastName: "기본토스트",
      price: 3000,
      description: "맛있는 기본 토스트",
    },
  ]);

  // 데이터 불러오기
  async function request() {
    const response = await fetch("http://localhost:4000/toast", {
      method: "GET",
    });
    const data = await response.json();
    setList(data);
  }

  useEffect(() => {
    // request();
  }, []);

  return (
    <>
      <div className="toast">
        <ol>
          {Array.isArray(list) &&
            list.map((item, index) => (
              <li key={item.toastName + index}>
                <Link
                  href={{
                    pathname: `./toast/view/${item.id}`,
                    query: { id: item.id, ref: "home" },
                  }}
                >
                  <img src="http://localhost:3000/file.svg" alt="기본 토스트" />
                  <dl>
                    <dt>기본 토스트</dt>
                    <dd>3,000 원</dd>
                    <dd> 맛있는 기본 토스트 진짜 맛이 좋습니다</dd>
                  </dl>
                </Link>
              </li>
            ))}
        </ol>

        <Link href={"./toast/write"}>글쓰기</Link>
      </div>
    </>
  );
}
