"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  id: number;
};

export default function View() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [article, setArticle] = useState({
    id: 1,
    title: "",
    contents: "`",
  });

  const getItem = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/board/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setArticle(data);
  };
  const delItem = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, {
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
        <dt>{article.title}</dt>
        <dd>{article.contents}</dd>
      </dl>

      <Link href="../">글목록</Link>
      <Link
        href={{
          pathname: `/nomal/modify/${article.id}`,
          query: { id: article.id, ref: "home" },
        }}
      >
        글수정
      </Link>
      <a onClick={() => delItem()}>글삭제</a>
      <a onClick={() => delItem()}>글삭제</a>
    </div>
  );
}
