"use client";

import { useCartStore } from "@/app/_store/CartStore";
import { useOrderStore } from "@/app/_store/OrderStore";
import { useUserStore } from "@/app/_store/UserStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};
type reqCartData = {
  menuId: number;
  quantity: number;
};

type plusMinusData = {
  menuId: number;
  quantity: number;
};

export default function Cart({}: Props) {
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);

  const { id, name } = useUserStore();
  const { storeId, storeName, createOrder } = useOrderStore();
  const { cart, loading, error, getCart, updateCartItem, clearCart } =
    useCartStore();
  const fetchCart = useCartStore((state) => state.fetchCart);

  // ✅ 주문하기
  async function order() {
    let data: reqCartData[] = [];
    await cart?.cartMenus.map((item, idx) => {
      data.push({
        menuId: item.menu.id,
        quantity: item.quantity,
      });
    });

    console.log(storeId);
    //@ts-ignore
    const result = await createOrder(id, storeId, totalPrice, data);
    if (result) {
      clearCart(cart ? cart.id : 1);
      router.push("/");
    } else {
      alert("주문 중 오류가 발생했습니다!");
    }
  }

  // ✅ 메뉴 수량 추가 & 감소
  async function plusMinusMenu(params: plusMinusData) {
    if (cart?.id) {
      updateCartItem(cart.id, params.menuId, params.quantity);
    }
  }

  useEffect(() => {
    console.log(id);
    if (id) {
      fetchCart(id);
    }
  }, [id]);

  useEffect(() => {
    if (cart?.id) {
      getCart(cart.id);
    }
  }, [cart?.id]);

  useEffect(() => {
    let tmpTotalPrice = 0;

    cart?.cartMenus.map((item, idx) => {
      const eachMenuTotalPrice = item.menu.price * item.quantity;
      tmpTotalPrice = tmpTotalPrice + eachMenuTotalPrice;
    });
    setTotalPrice(tmpTotalPrice);
  }, [cart?.cartMenus]);

  return (
    <div className="cart">
      <h2>장바구니</h2>
      <h3>{storeName}</h3>
      <ol>
        {Array.isArray(cart?.cartMenus) ? (
          cart?.cartMenus.map((item, idx) => (
            <li className="flex-center" key={item.menu.name + idx}>
              <img src={item.menu.imgUrl} alt="기본 토스트" />
              <dl>
                <dt>{item.menu.name}</dt>
                <dd>
                  <ol className="flex-between">
                    <li className="common-cost">{item.menu.price}</li>
                    <li className="plus-minus">
                      <button
                        className="minus"
                        onClick={() => {
                          plusMinusMenu({
                            menuId: item.menu.id,
                            quantity: item.quantity - 1,
                          });
                        }}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="plus"
                        onClick={() => {
                          plusMinusMenu({
                            menuId: item.menu.id,
                            quantity: item.quantity + 1,
                          });
                        }}
                      >
                        +
                      </button>
                    </li>
                    <li>{item.menu.price * item.quantity}</li>
                  </ol>
                </dd>
              </dl>
              <button className="remove-btn">x</button>
            </li>
          ))
        ) : (
          <li>장바구니에 담긴 상품이 없습니다.</li>
        )}
      </ol>

      <p>장바구니에 담은 상품은 최대 30일간 보관됩니다.</p>

      <div className="total-cost">
        <dl className="flex-between">
          <dt>상품금액</dt>
          <dd>{totalPrice} 원</dd>
        </dl>
        <button onClick={order}>주문하기</button>
      </div>
    </div>
  );
}
