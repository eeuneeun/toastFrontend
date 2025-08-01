"use client";
import PlusMinus from "@/app/components/PlusMinus";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Toast = {
  id: number;
  name: string;
  desc: string;
  imgUrl: string;
};

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [toast, setToast] = useState({
    id: 1,
    name: "",
    desc: "",
    imgUrl: "",
  });

  const getItem = async () => {
    const response = await fetch(`http://localhost:4000/menu/${id}`, {
      method: "GET",
    });
    const data: Toast = await response.json();
    setToast(data);
  };
  const delItem = async () => {
    const res = await fetch(`http://localhost:4000/menu/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      router.push("../");
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="menu-view">
      <dl>
        <dt>
          <img src={toast?.imgUrl} alt={toast?.name} />
        </dt>
        <dd>{toast?.name}</dd>
        <dd>{toast?.desc}</dd>
      </dl>

      <div>
        <Link href="/">제품 상세 정보 </Link>
      </div>

      <div>
        <PlusMinus price={6000} />
      </div>

      <div className="flex-between btn-wrap">
        <button className="now-btn">바로 주문</button>
        <button className="cart-btn">장바구니 담기</button>
      </div>
    </div>
  );
}
