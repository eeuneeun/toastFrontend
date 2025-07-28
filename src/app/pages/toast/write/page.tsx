"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  id: number;
  toastName: string;
  description: string;
  imgUrl: string;
};

export default function Write({}: ItemContents) {
  const router = useRouter();

  const addItem = async (data: ItemContents) => {
    const res = await fetch("http://localhost:4000/toast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toastName: data.toastName,
        description: data.description,
        imgUrl: data.imgUrl,
        writeTime: new Date(),
        like: 0,
      }),
    });
    if (res.status == 201) {
      router.push("../nomal");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemContents>();

  const onSubmit: SubmitHandler<ItemContents> = (data) => {
    console.log(data);
    addItem(data);
  };

  return (
    <div className="write">
      <h2>상품 등록</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="toastName">
          상품명
          <input
            type="text"
            id="toastName"
            {...register("toastName", { required: true })}
          />
        </label>
        <label htmlFor="description">
          상품 설명
          <textarea
            id="description"
            {...register("description", { required: true })}
          />
        </label>
        <label htmlFor="imgUrl">
          상품 이미지
          <input
            type="file"
            id="imgUrl"
            {...register("imgUrl", { required: true })}
          />
        </label>
        <input type="submit" />
      </form>
      <Link href="../nomal">글목록</Link>
    </div>
  );
}
