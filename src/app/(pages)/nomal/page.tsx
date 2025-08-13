"use client";

import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Nomal() {
  const [list, setList] = useState([
    {
      id: "1",
      name: "sample",
      title: "test",
      contents: "test",
      writeTime: "Wed, 21 Oct 2015 18:27:50 GMT",
      like: 10,
    },
  ]);

  // 데이터 불러오기
  async function request() {
    const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/board", {
      method: "GET",
    });
    const data = await response.json();
    setList(data);
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <div className="board">
        <ol>
          <li>
            <ol className="list">
              <li>No</li>
              <li>제목</li>
              <li>글쓴이</li>
              <li>추천수</li>
              <li>글쓴시각</li>
            </ol>
          </li>
          {list.map((item, index) => (
            <li key={index + item.id}>
              <Link
                href={{
                  pathname: `./nomal/view/${item.id}`,
                  query: { id: item.id, ref: "home" },
                }}
              >
                <ol className="list">
                  <li>{item.id}</li>
                  <li>{item.title}</li>
                  <li>{item.name}</li>
                  <li>{item.like}</li>
                  <li>{item.writeTime}</li>
                </ol>
              </Link>
            </li>
          ))}
          <li>
            <Link href={"./nomal/write"}>글쓰기</Link>
          </li>
        </ol>
        <Pagination count={10} color="secondary" />
      </div>
    </>
  );
}
