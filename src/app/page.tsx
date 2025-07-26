"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/pages/nomal">Nomal Version</Link>
        </li>
        <li>
          <Link href="/pages/dataGridBoard">DataGrid Version</Link>
        </li>
      </ul>
      <Link href={"/pages/signUp"}>회원가입</Link>
      <Link href={"/pages/signIn"}>로그인</Link>
    </div>
  );
}
