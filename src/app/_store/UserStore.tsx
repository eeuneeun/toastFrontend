import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  id: string;
  userId: string;
  name: string;
  accessToken: string | null;
  error: string | null;
  signIn: (userId: string, password: string) => Promise<boolean>;
  signOut: (userId: string, accToken: string) => Promise<boolean>;
  fetchAccToken: (accessToken: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: "",
      userId: "",
      name: "",
      accessToken: null,
      error: null,
      // 로그인 처리
      signIn: async (userId, password) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SELF_API_URL}/api/signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: userId,
                password: password,
              }),
              credentials: "include",
            }
          );

          if (!res.ok) {
            set({ error: "로그인 실패" });
            return false;
          }
          const data = await res.json();

          set({
            id: data.user.id,
            name: data.user.username,
            accessToken: data.accessToken,
          });

          return true;
        } catch (err: any) {
          console.log(err);
          return false;
        }
      },
      signOut: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SELF_API_URL}/api/signout`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();

        set({
          id: "",
          name: "",
          accessToken: null,
        });

        return true;
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
