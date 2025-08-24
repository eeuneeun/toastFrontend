"use client";

import React, { useEffect, useState } from "react";
import { useMenuStore } from "../_store/MenuStore";

type Props = { price: number; quantity: number };

export default function PlusMinus({ price, quantity }: Props) {
  const { nowMenu, setNowMenu } = useMenuStore();
  const [totalCost, setTotalCost] = useState(0);

  function plus() {
    const tmpData = nowMenu;

    //@ts-ignore
    setNowMenu({
      ...tmpData,
      quantity: tmpData?.quantity + 1,
    });
  }

  function minus() {
    const tmpData = nowMenu;

    setNowMenu({
      ...tmpData,
      quantity: tmpData?.quantity - 1,
    });
  }

  useEffect(() => {
    setTotalCost(Number(nowMenu.price) * nowMenu.quantity);
  }, [nowMenu.quantity]);
  return (
    <ol className="flex-between">
      <li className="common-cost">{nowMenu.price}</li>
      <li className="plus-minus">
        <button className="minus" onClick={minus}>
          -
        </button>
        <span>{quantity ? quantity : 1}</span>
        <button className="plus" onClick={plus}>
          +
        </button>
      </li>
      <li>{totalCost}</li>
    </ol>
  );
}
