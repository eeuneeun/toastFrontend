"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Toast = {
  id: number;
  toastName: string;
  description: string;
  imgUrl: string;
};

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [toast, setToast] = useState({
    id: 1,
    toastName: "",
    description: "",
    imgUrl: "",
  });

  const getItem = async () => {
    const response = await fetch(`http://localhost:4000/toast/${id}`, {
      method: "GET",
    });
    const data: Toast = await response.json();
    setToast(data);
  };
  const delItem = async () => {
    const res = await fetch(`http://localhost:4000/toast/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status == 200) {
      router.push("../");
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <dl>
        <dt>{toast?.imgUrl}</dt>
        <dd>{toast?.toastName}</dd>
        <dd>{toast?.description}</dd>
      </dl>

      <Link href="../">상품 목록</Link>
      <Link
        href={{
          pathname: `/pages/nomal/modify/${toast.id}`,
          query: { id: toast.id, ref: "home" },
        }}
      >
        상품 수정
      </Link>
      <a onClick={() => delItem()}>상품 삭제</a>
    </div>
  );
}
