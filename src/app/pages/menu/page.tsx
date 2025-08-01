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
    const response = await fetch("http://localhost:4000/menu", {
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
        <ul className="tab">
          <li>
            <button className="active">신메뉴</button>
          </li>
          <li>
            <button>추천메뉴</button>
          </li>
          <li>
            <button>토스트</button>
          </li>
          <li>
            <button>커피</button>
          </li>
          <li>
            <button>음료</button>
          </li>
        </ul>

        <ol className="menu-wrap">
          {Array.isArray(list) &&
            list.map((item, index) => (
              <li key={item.name + index}>
                <Link
                  href={{
                    pathname: `./menu/view/${item.id}`,
                    query: { id: item.id, ref: "home" },
                  }}
                >
                  <div className="img-wrap">
                    <img src={item.imgUrl} alt={item.name} />
                  </div>
                  <dl>
                    <dt>{item.name}</dt>
                    <dd>{item.price} 원</dd>
                    <dd> {item.desc}</dd>
                  </dl>
                </Link>
              </li>
            ))}
        </ol>

        <Link href={"./menu/write"}>글쓰기</Link>
      </div>
    </>
  );
}
