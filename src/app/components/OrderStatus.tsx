"use client";
import React from "react";
import { useOrderStore } from "../_store/OrderStore";

type Props = {};

export default function OrderStatus({}: Props) {
  const { orderStatus } = useOrderStore();

  return (
    <div className="order-status">
      {orderStatus !== "NONE" && (
        <div>
          {orderStatus == "WAITING"
            ? "주문 수락 중"
            : orderStatus == "INPROGRESS"
            ? "조리 중"
            : orderStatus == "DELIVERY"
            ? "배달 중"
            : orderStatus == "PICKUP"
            ? "픽업 대기 중"
            : orderStatus == "COMPLETE" && "수령 완료"}{" "}
        </div>
      )}
    </div>
  );
}
