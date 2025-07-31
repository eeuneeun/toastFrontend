"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  title: string;
  contents: string;
};

export default function Modify() {
  const [items, setItems] = useState({
    id: 0,
    title: "",
    contents: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const getItem = async () => {
    const id = searchParams.get("id");
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    setItems(data);
  };

  const delItem = async () => {
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
  };

  async function updateItem(data: ItemContents) {
    const id = searchParams.get("id");
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "eeuneeun", //유저이름
        title: data.title,
        contents: data.contents,
        writeTime: new Date(),
        like: 0,
      }),
    });

    if (!res.ok) throw new Error("업데이트 실패");
    if (res.status == 200) {
      router.push("../");
    }
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemContents>();

  const onSubmit: SubmitHandler<ItemContents> = (data) => {
    updateItem(data);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <h2>수정하기</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="title"
            defaultValue={items?.title}
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <input
            type="text"
            id="title"
            defaultValue={items?.contents}
            {...register("contents", { required: true })}
          />
        </div>
        <Link href="../../nomal">글목록</Link>
        <a onClick={() => delItem()}>글삭제</a>
        <input type="submit" />
      </form>
    </div>
  );
}
