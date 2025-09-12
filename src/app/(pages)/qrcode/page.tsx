// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function MenuPage() {
//   const searchParams = useSearchParams();
//   const tableId = searchParams.get("table");

//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`)
//       .then((res) => res.json())
//       .then(setMenus);
//   }, []);

//   const handleOrder = async (menuId: number) => {
//     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         tableId,
//         menuId,
//         quantity: 1,
//       }),
//     });
//     alert("주문 완료!");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold">메뉴판 (테이블 {tableId})</h1>
//       <ul className="space-y-4">
//         {menus.map((menu: any) => (
//           <li key={menu.id} className="border p-4 rounded-lg">
//             <p>{menu.name}</p>
//             <p>{menu.price}원</p>
//             <button
//               onClick={() => handleOrder(menu.id)}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               주문하기
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
