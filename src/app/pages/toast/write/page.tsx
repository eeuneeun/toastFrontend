"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  title: string;
  contents: string;
};

export default function Write({}: ItemContents) {
  const router = useRouter();

  const addItem = async (data: ItemContents) => {
    const res = await fetch("http://localhost:4000/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "eeuneeun", //유저이름
        title: data.title,
        contents: data.contents,
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
      <h2> Write</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">
          제목
          <input
            type="text"
            id="title"
            {...register("title", { required: true })}
          />
        </label>
        <label htmlFor="contents">
          글 내용
          <textarea
            id="contents"
            {...register("contents", { required: true })}
          />
        </label>
        <input type="submit" />
      </form>
      <Link href="../nomal">글목록</Link>
    </div>
  );
}
