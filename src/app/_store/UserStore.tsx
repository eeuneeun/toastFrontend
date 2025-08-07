import { create } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";

interface UserStore {
  id: string;
  name: string;
  accessToken: string | null;
  error: string | null;
  signIn: (userId: string, password: string) => Promise<boolean>;
  fetchAccToken: (accessToken: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: "",
      name: "",
      accessToken: "",
      error: null,
      // 로그인 처리
      signIn: async (userId, password) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userId,
                password: password,
              }),
            }
          );
          const data = await res.json();
          console.log("data", data);
          set({
            id: data.user.id,
            name: data.user.username,
            accessToken: data?.accToken,
          });

          return true;
        } catch (err: any) {
          console.log(err);
          return false;
        }
      },
      // accToken 갱신
      fetchAccToken: async (newAccToken) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/accToken`,
            {
              method: "GET",
            }
          );
          const data = await res.json();
          set({ accessToken: newAccToken });
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
