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
  getCart: (cartId: number) => Promise<void>;
  fetchCart: (customerId: string) => Promise<void>;
  createCart: (
    customerId: string,
    items: { menuId: number; quantity: number }[]
  ) => Promise<void>;
  updateCartItem: (
    cartId: number,
    cartMenuId: number,
    quantity: number
  ) => Promise<void>; // ✅ 추가
  clearCart: (cartId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      loading: false,
      error: null,
      // ✅ 장바구니 불러오기
      getCart: async (cartId: number) => {
        if (!cartId) {
          console.warn("❌ cartId is empty. fetchCart skipped.");
          return;
        }
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}`,
            {
              method: "GET",
            }
          );
          const data = await res.json();
          console.log(data);
          set({ cart: data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      // ✅ 장바구니 동기화
      fetchCart: async (customerId) => {
        if (!customerId) {
          console.warn("❌ customerId is empty. fetchCart skipped.");
          return;
        }
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

      // ✅ 장바구니 생성
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

      // ✅ 장바구니 수량 변경
      updateCartItem: async (cartId, menuId, quantity) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/${cartId}/menu/${menuId}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ quantity }),
            }
          );

          if (!res.ok) {
            throw new Error(`Failed to update cart item: ${res.status}`);
          }

          const updatedItem = await res.json();

          // ✅ 상태 안전 업데이트
          set((state) => {
            if (!state.cart) return { loading: false }; // cart 없으면 종료

            const updatedCartMenus = state.cart.cartMenus.map((cm) =>
              cm.menu.id === menuId
                ? { ...cm, quantity: updatedItem.quantity }
                : cm
            );

            console.log(updatedCartMenus);

            return {
              cart: { ...state.cart, cartMenus: updatedCartMenus },
              loading: false,
            };
          });
        } catch (err: any) {
          set({ error: err.message ?? String(err), loading: false });
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
