import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderStore {
  storeId: string | null;
  storeName: string | null;
  loading: boolean;
  error: string | null;
  setStoreInfo: (storeId: string, storeName: string) => void;
  createOrder: (
    userId: string,
    storeId: string,
    totalPrice: number,
    items: { menuId: number; quantity: number }[]
  ) => Promise<boolean>;
  clearStoreInfo: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      storeId: null,
      storeName: null,
      loading: false,
      error: null,

      setStoreInfo: (storeId: string, storeName: string) => {
        set({ storeId: storeId, storeName: storeName });
      },

      // 주문 생성
      createOrder: async (userId, storeId, totalPrice, items) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: userId,
              storeId: storeId,
              totalPrice: totalPrice,
              cartMenus: items,
            }),
          });

          const result = await res.json();
          console.log(result);

          set({ loading: false });
          return true;
        } catch (err: any) {
          set({ error: err.message, loading: false });
          return false;
        }
      },

      // 주문 점포 비우기
      clearStoreInfo: () => set({ storeId: null }),
    }),
    {
      name: "store-storage",
    }
  )
);
