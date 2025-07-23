"use client";

import { Pagination } from "@mui/material";
export default function Nomal() {
  return (
    <div className="board">
      <ol>
        <li>
          <ol className="list">
            <li>No</li>
            <li>제목</li>
            <li>글쓴이</li>
            <li>작성시간</li>
            <li>조회수</li>
          </ol>
        </li>
      </ol>
      <Pagination count={10} color="secondary" />
    </div>
  );
}
