import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

interface Menu {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

interface CartMenu {
  id: number;
  quantity: number;
  menu: Menu;
}

interface Cart {
  id: number;
  customerId: string;
  cartMenus: CartMenu[];
  createdAt: string;
}

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: (customerId: string) => Promise<void>;
  createCart: (
    customerId: string,
    items: { menuId: number; quantity: number }[]
  ) => Promise<void>;
  clearCart: (cartId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      loading: false,
      error: null,

      // 장바구니 불러오기
      fetchCart: async (customerId) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/customer/${customerId}/ensure`,
            {
              method: "GET",
            }
          );
          const data = await res.json();
          set({ cart: data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      // 장바구니 생성
      createCart: async (customerId, items) => {
        set({ loading: true, error: null });
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/cart`,
            {
              customerId,
              cartMenus: items,
            }
          );
          set({ cart: res.data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      // 장바구니 비우기
      clearCart: async (cartId) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          const result = await res.json();
          console.log(result);

          set({ cart: null, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
        set({ cart: null });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
