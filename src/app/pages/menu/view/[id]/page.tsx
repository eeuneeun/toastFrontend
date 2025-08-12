"use client";
import PlusMinus from "@/app/components/PlusMinus";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { userAgent } from "next/server";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCartStore } from "@/app/_store/CartStore";
import { useMenuStore } from "@/app/_store/MenuStore";
type Toast = {
  id: number;
  name: string;
  desc: string;
  imgUrl: string;
  price: number;
  create_at: Date;
};

type Cart = {
  customerId: string;
  createdAt: Date;
  cartMenus: CartMenu[];
};

type CartMenu = {
  menuId: number;
  quantity: number;
};

export default function View() {
  const router = useRouter();
  const { nowMenu, setNowMenu } = useMenuStore();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  //@ts-ignore
  const nowMenuId = parseInt(paramId, 10);

  const { cart, loading, error, fetchCart } = useCartStore();

  const getItem = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${nowMenuId}`,
      {
        method: "GET",
      }
    );
    const data: Toast = await response.json();
    setNowMenu({
      ...data,
      quantity: 1,
    });
  };

  async function addToCart(
    customerId: string,
    menuId: number,
    quantity: number
  ) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: customerId,
        menuId: menuId,
        quantity: quantity,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status == 201) {
      router.push("../../menu");
    }
  }

  useEffect(() => {
    getItem();
  }, [nowMenuId]);

  useEffect(() => {
    fetchCart("sacroo");
    console.log(cart);
  }, [fetchCart]);

  return (
    <div className="menu-view">
      <dl>
        <dt>
          <img
            src={nowMenu?.imgUrl ? nowMenu?.imgUrl : "/banner01.png"}
            alt={nowMenu?.name ? nowMenu?.name : "토스트"}
          />
        </dt>
        <dd>{nowMenu?.name}</dd>
        <dd>{nowMenu?.desc}</dd>
      </dl>

      <div>
        <Link href="/">제품 상세 정보 </Link>
      </div>

      <div>
        <PlusMinus
          price={nowMenu?.price ? nowMenu?.price : 2000}
          quantity={nowMenu?.quantity ? nowMenu?.quantity : 1}
        />
      </div>

      <div className="flex-between btn-wrap">
        <button className="now-btn">바로 주문</button>
        <button
          className="cart-btn"
          onClick={() => addToCart("sacroo", nowMenuId, 1)}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
