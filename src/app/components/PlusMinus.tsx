import React, { useState } from "react";

type Props = { price: number; quantity: number };

export default function PlusMinus({ price, quantity }: Props) {
  const originCost = 7500;
  const [cost, setCost] = useState(price);

  function plus() {
    setCost(cost + originCost);
  }
  function minus() {
    setCost(cost - originCost);
  }
  return (
    <ol className="flex-between">
      <li className="common-cost">{cost}</li>
      <li className="plus-minus">
        <button className="minus" onClick={minus}>
          -
        </button>
        <span>{quantity ? quantity : 1}</span>
        <button className="plus" onClick={plus}>
          +
        </button>
      </li>
    </ol>
  );
}
