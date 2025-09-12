import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentInfo } from "../(pages)/payment/page";

interface OrderStore {
  storeId: number | null;
  storeName: string | null;
  orderStatus: string;
  error: string | null;
  setStoreInfo: (storeId: number, storeName: string) => void;
  createOrder: (
    paymentInfo: PaymentInfo,
    items: { menuId: number; quantity: number }[]
  ) => Promise<boolean>;
  clearStoreInfo: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      storeId: 1,
      storeName: "낙성대점",
      orderStatus: "NONE",
      error: null,

      setStoreInfo: (storeId: number, storeName: string) => {
        set({ storeId: storeId, storeName: storeName });
      },

      // 주문 생성
      createOrder: async (paymentInfo: PaymentInfo, items) => {
        set({ orderStatus: "WAITING" });
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentInfo: paymentInfo,
              cartMenus: items,
            }),
          });

          const result = await res.json();
          console.log(result);

          return true;
        } catch (err: any) {
          set({ error: err.message, orderStatus: "NONE" });
          return false;
        }
      },

      // 주문 점포 비우기
      clearStoreInfo: () => set({ storeId: null, storeName: null }),
    }),
    {
      name: "store-storage",
    }
  )
);
