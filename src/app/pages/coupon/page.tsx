"use client";

import React, { useState } from "react";

type Props = {};

export default function Order({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="order">
      <h2>주문내역</h2>
      <ol>
        {list.map((item, idx) => (
          <li className="flex-center" key={item + idx}>
            <img src="/globe.svg" alt="기본 토스트" />
            <dl>
              <dt>기본 토스트</dt>
              <dd>
                <span>3000원</span>X<span>1개</span> =<span>3000원</span>
              </dd>
              <dd>2025년 7월 30일 10:10</dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
