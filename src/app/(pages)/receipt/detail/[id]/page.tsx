"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

type Props = {};
type OrderInfo = {
  createdAt: "2025-08-20T19:54:14.013Z";
  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryMethod: string;
  id: number;
  orderMenus: [
    {
      id: number;
      quantity: number;
      totalPrice: number;
      menu: {
        id: number;
        category: string;
        create_at: string;
        desc: string;
        imgUrl: string;
        name: string;
        price: number;
      };
    }
  ];
  paymentMethod: string;
  status: string;
  storeId: number;
  totalPrice: number;
  updatedAt: string;
};

export default function Order({}: Props) {
  const [orderInfo, setOrderInfo] = useState<OrderInfo>();

  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  // 해당 유저 아이디의 주문내역 전체 호출
  async function getReceipt() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setOrderInfo(data[0]);
  }

  useEffect(() => {
    getReceipt();
  }, [orderId]);

  return (
    <div className="receipt detail">
      <h2>영수증</h2>
      <div className="contents">
        <h3>주문번호 : {orderInfo?.id}</h3>
        <div>
          <h4>주문 시간</h4>
          <div>{dayjs(orderInfo?.createdAt).format("YYYY-MM-DD hh:mm:ss")}</div>
        </div>

        <div>
          <h4>주문자 정보</h4>
          <dl className="flex start">
            <dt>이름</dt>
            <dd>{orderInfo?.customerName}</dd>
          </dl>

          <dl className="flex start">
            <dt>연락처</dt>
            <dd>{orderInfo?.customerPhone}</dd>
          </dl>
        </div>
        <div>
          <h4>주문 메뉴</h4>
          {orderInfo?.orderMenus?.map((item, idx) => (
            <ul key={item.menu.name + idx}>
              <li>
                <img src={item.menu.imgUrl} alt={item.menu.name} />
              </li>
              <li>{item.menu.name}</li>

              <li>
                {item.menu.price}X {item.quantity} 개 ={" "}
                {item.menu.price * item.quantity} 원
              </li>
              <li>총 가격 : {item.totalPrice}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
