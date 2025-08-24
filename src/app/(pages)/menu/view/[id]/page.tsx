"use client";
import PlusMinus from "@/app/components/PlusMinus";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/app/_store/CartStore";
import { useMenuStore } from "@/app/_store/MenuStore";
import { useUserStore } from "@/app/_store/UserStore";
import { BasicModal } from "@/app/components/Modal";
import { useOrderStore } from "@/app/_store/OrderStore";
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
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  const [open, setOpen] = React.useState(false);

  const { id, accessToken } = useUserStore();
  const { nowMenu, setNowMenu } = useMenuStore();
  const { cart, loading, error, fetchCart } = useCartStore();
  const { storeId } = useOrderStore();

  console.log(storeId);
  //@ts-ignore
  const nowMenuId = parseInt(paramId, 10);

  const getItem = async () => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_OWNER_API_URL
      }/menu/${nowMenuId}/store/${Number(storeId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data: Toast = await response.json();
    console.log(data);
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

    fetchCart(customerId);
    if (res.status == 201) {
      setOpen(true);
      // router.push("../../menu");
    }
  }

  useEffect(() => {
    getItem();
  }, [nowMenuId]);

  useEffect(() => {
    console.log(cart);
  }, [fetchCart]);

  return (
    <>
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
            onClick={() => addToCart(id, nowMenu.id, nowMenu.quantity)}
          >
            장바구니 담기
          </button>
        </div>
      </div>
      <BasicModal
        title=""
        contents="장바구니에 담겼습니다"
        btnTxt="닫기"
        isOpen={open}
        setIsOpen={setOpen}
      />
    </>
  );
}
