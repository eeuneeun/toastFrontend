import { create } from "zustand";
import axios from "axios";

interface OrderStore {
  storeId: string | null;
  loading: boolean;
  error: string | null;
  createOrder: (
    userId: string,
    storeId: string,
    items: { menuId: number; quantity: number }[]
  ) => Promise<boolean>;
  clearStoreInfo: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  storeId: null,
  loading: false,
  error: null,

  // 주문 생성
  createOrder: async (userId, storeId, items) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: userId,
          storeId: storeId,
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
}));
