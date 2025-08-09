import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

interface NowMenu {
  id: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  imgUrl: string;
}

interface MenuState {
  nowMenu: NowMenu;
  loading: boolean;
  error: string | null;
  setNowMenu: (nowMenu: NowMenu) => Promise<boolean>;
  clearNowMenu: () => void;
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      nowMenu: {
        id: 1,
        name: "토스트",
        desc: "맛있음",
        price: 2000,
        quantity: 1,
        imgUrl: "/banner01.png",
      },
      loading: false,
      error: null,
      setNowMenu: async (nowMenu) => {
        set({ nowMenu: nowMenu });
        return true;
      },
      clearNowMenu: () => {
        set({
          nowMenu: {
            id: 1,
            name: "토스트",
            desc: "맛있음",
            price: 2000,
            quantity: 1,
            imgUrl: "/banner01.png",
          },
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
