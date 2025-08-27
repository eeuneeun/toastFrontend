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
  menuGroups: [
    {
      group: {
        id: number;
        name: string;
        desc: string;
        groupOptions: [
          {
            id: number;
            option: {
              id: number;
              name: string;
              desc: string;
              price: number;
            };
          }
        ];
      };
      id: number;
      isRequired: boolean;
    }
  ];
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
        menuGroups: [
          {
            group: {
              id: 0,
              name: "",
              desc: "",
              groupOptions: [
                {
                  id: 0,
                  option: {
                    id: 0,
                    name: "",
                    desc: "",
                    price: 0,
                  },
                },
              ],
            },
            id: 0,
            isRequired: false,
          },
        ],
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
            menuGroups: [
              {
                group: {
                  id: 0,
                  name: "",
                  desc: "",
                  groupOptions: [
                    {
                      id: 0,
                      option: {
                        id: 0,
                        name: "",
                        desc: "",
                        price: 0,
                      },
                    },
                  ],
                },
                id: 0,
                isRequired: false,
              },
            ],
          },
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
