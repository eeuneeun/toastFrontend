"use client";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

export default function Write({}: Props) {
  // 추가
  useState();
  const [items, setItems] = useState<{}>([]);

  const addItem = async () => {
    const aa = JSON.stringify(items);
    console.log(aa);
    const res = await fetch("http://localhost:4000/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    console.log(res);
  };

  const delItem = async () => {
    const res = await fetch("http://localhost:4000/board/3", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 3 }),
    });
    console.log(res);
    // const newItem = await res.json();
    // setItems([...items, newItem]);
  };

  async function updateItem(id: number, newContents: {}) {
    const res = await fetch(`http://localhost:4000/board/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "오예",
        contents: "수정",
      }),
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

  return (
    <div>
      Write
      <form action="post">
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => handleChange(e)}
        />
        <input type="text" name="contents" id="contents" />
      </form>
      <Link href="../nomal">글목록</Link>
      <a onClick={() => addItem()}>업로드</a>
      <a onClick={() => delItem()}>글삭제</a>
      <a onClick={() => updateItem(1, {})}>글수정</a>
    </div>
  );
}
