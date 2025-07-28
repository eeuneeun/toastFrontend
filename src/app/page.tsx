"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="main flex-center">
      <ul>
        <li>
          <Link href="/pages/nomal">Nomal Version</Link>
        </li>
        <li>
          <Link href="/pages/dataGridBoard">DataGrid Version</Link>
        </li>
        <li>
          <Link href="/pages/toast">Toast</Link>
        </li>
        <li className="flex-center auth">
          <Link href={"/pages/signUp"}>회원가입</Link>
          <Link href={"/pages/signIn"}>로그인</Link>
        </li>
      </ul>
    </div>
  );
}
