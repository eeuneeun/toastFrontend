"use client";

import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function Order({}: Props) {
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="receipt detail">
      <h2>영수증</h2>
      <div></div>
    </div>
  );
}
