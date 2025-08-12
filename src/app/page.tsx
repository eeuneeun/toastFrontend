"use client";
import Link from "next/link";

import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { setMaxListeners } from "events";
import { useEffect, useState } from "react";
import { useUserStore } from "./_store/UserStore";

export default function Home() {
  const { name } = useUserStore();
  const [recomlist, recomSetList] = useState<any[]>([
    {
      name: "토스트",
      price: 0,
      desc: "",
      imgUrl: "",
      created_at: "",
    },
  ]);
  // 데이터 불러오기
  async function request() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    recomSetList(data);
  }

  useEffect(() => {
    request();
  }, []);
  return (
    <div className="main flex-center">
      {name && <div className="greeting">{name}님 안녕하세요</div>}
      <div className="banner promotion">
        <img src="/banner01.jpg" alt="배너" />
      </div>

      <div className="recommend">
        <h3>추천 메뉴</h3>
        <ul>
          {recomlist.map((item, idx) => (
            <li key={item.name + idx}>
              <Link href="/pages/menu">
                <img src={item.imgUrl || undefined} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="category">
        <h3>카테고리</h3>
        <ul>
          <li>
            <Link href="/pages/menu">
              <BreakfastDiningIcon />
              <span>Toast</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/menu">
              <EmojiFoodBeverageIcon />
              <span>Beverage</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/menu">
              <KebabDiningIcon />
              <span>Side</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/menu">
              <FastfoodIcon />
              <span> Set</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="news">
        <h3>새 소식</h3>
        <ul>
          <li>
            <Link href="/pages/menu">
              <img src="/banner01.png" alt="news01" />
              <span>올여름 시원한 아이스 아메리카노와 토스트!</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/menu">
              <img src="/banner01.png" alt="news01" />
              <span>올여름 시원한 아이스 아메리카노와 토스트!</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/menu">
              <img src="/banner01.png" alt="news01" />
              <span>올여름 시원한 아이스 아메리카노와 토스트!</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/menu">
              <img src="/banner01.png" alt="news01" />
              <span>올여름 시원한 아이스 아메리카노와 토스트!</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
