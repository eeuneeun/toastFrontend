import React, { useState } from "react";

type Props = { price: number };

export default function PlusMinus({ price: number }: Props) {
  const originCost = 7500;
  const [cost, setCost] = useState(7500);

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
        <span>1</span>
        <button className="plus" onClick={plus}>
          +
        </button>
      </li>
    </ol>
  );
}
