"use client";

import { useOrderStore } from "@/app/_store/OrderStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
export default function Toast() {
  const { storeId } = useOrderStore();
  const [tab, setTab] = useState("new");
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
  async function getMenuAll() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_OWNER_API_URL}/menu/store/${storeId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setList(data);
  }

  async function getMenuByCategory(category: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/category/${category}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setList(data);
  }

  useEffect(() => {
    getMenuAll();
  }, [storeId]);

  return (
    <>
      <div className="toast">
        <ul className="tab">
          <li>
            <button
              className={`${tab === "new" ? "active" : ""}`}
              onClick={() => {
                getMenuByCategory("new");
                setTab("new");
              }}
            >
              신메뉴
            </button>
          </li>
          <li>
            <button
              className={`${tab === "recommand" ? "active" : ""}`}
              onClick={() => {
                getMenuByCategory("recommand");
                setTab("recommand");
              }}
            >
              추천메뉴
            </button>
          </li>
          <li>
            <button
              className={`${tab === "toast" ? "active" : ""}`}
              onClick={() => {
                getMenuByCategory("toast");
                setTab("toast");
              }}
            >
              토스트
            </button>
          </li>
          <li>
            <button
              className={`${tab === "coffee" ? "active" : ""}`}
              onClick={() => {
                getMenuByCategory("coffee");
                setTab("coffee");
              }}
            >
              커피
            </button>
          </li>
          <li>
            <button
              className={`${tab === "bevarage" ? "active" : ""}`}
              onClick={() => {
                getMenuByCategory("bevarage");
                setTab("bevarage");
              }}
            >
              음료
            </button>
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
                    <img
                      src={item.imgUrl ? item?.imgUrl : "/banner01.png"}
                      alt={item.name}
                    />
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

        {/* <Link href={"./menu/write"}>글쓰기</Link> */}
      </div>
    </>
  );
}
