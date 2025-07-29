"use client";

import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Toast() {
  const [list, setList] = useState<any[]>([
    {
      toastName: "",
      price: 0,
      desc: "",
      imgUrl: "",
      writeTime: "",
    },
  ]);

  // 데이터 불러오기
  async function request() {
    const response = await fetch("http://localhost:4000/toast", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setList(data);
  }

  useEffect(() => {
    request();
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
                  <img src={item.imgUrl} alt={item.toastName} />
                  <dl>
                    <dt>{item.toastName}</dt>
                    <dd>{item.price} 원</dd>
                    <dd> {item.desc}</dd>
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
