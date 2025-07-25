"use client";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  title: string;
  contents: string;
};

export default function Write({}: ItemContents) {
  // 추가
  useState();
  const [items, setItems] = useState<{}>([]);

  const addItem = async (data: ItemContents) => {
    console.log(data);
    setItems({
      articleId: "1",
      name: "eeuneeun", //유저이름
      title: data.title,
      contents: data.contents,
      writeTime: "Wed, 21 Oct 2015 18:27:50 GMT",
      like: 10,
    });

    const res = await fetch("http://localhost:4000/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        articleId: "1",
        name: "eeuneeun", //유저이름
        title: data.title,
        contents: data.contents,
        writeTime: new Date(),
        like: 10,
      }),
    });
    console.log(res);
  };

  const delItem = async () => {
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
  };

  async function updateItem(id: number, newContents: {}) {
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "메롱 ",
        contents: "ㅂ부",
      }),
    });

    if (!res.ok) throw new Error("업데이트 실패");
    return res.json();
  }

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
    <div>
      Write
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id="title"
          {...register("title", { required: true })}
        />
        <input
          type="text"
          id="contents"
          {...register("contents", { required: true })}
        />
        <input type="submit" />
      </form>
      <Link href="../nomal">글목록</Link>
      <a onClick={() => delItem()}>글삭제</a>
      <a onClick={() => updateItem(1, {})}>글수정</a>
    </div>
  );
}
