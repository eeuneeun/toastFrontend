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
          <Link href="/pages/dataGrid">DataGrid Version</Link>
        </li>
      </ul>
    </div>
  );
}
