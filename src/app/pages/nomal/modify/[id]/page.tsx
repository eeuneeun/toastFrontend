"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { title } from "process";
import React, { useEffect, useState } from "react";

type Props = {
  id: number;
};

export default function Modify() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);

  const [items, setItems] = useState({});

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

  async function updateItem(id: number, newContents: {}) {
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContents),
    });

    if (!res.ok) throw new Error("업데이트 실패");
    return res.json();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems({
      articleId: "1",
      name: "sample",
      title: "test",
      contents: "test",
      writeTime: "Wed, 21 Oct 2015 18:27:50 GMT",
      like: 10,
    });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <h2>수정하기</h2>
      <div>
        <div>{items?.title}</div>
        <div>{items?.contents}</div>
      </div>
      <Link href="../../nomal">글목록</Link>
      <a onClick={() => delItem()}>글삭제</a>
      <a onClick={() => updateItem(1, {})}>글수정</a>
    </div>
  );
}
