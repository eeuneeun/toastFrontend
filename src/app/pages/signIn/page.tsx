"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  userId: string;
  password: string;
  name: string;
  email: string;
  nickname: string;
};
export default function SignIn() {
  const router = useRouter();

  const addItem = async (data: User) => {
    const res = await fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
      }),
    });
    if (res.status == 201) {
      router.push("/pages/nomal");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    addItem(data);
  };
  return (
    <div>
      <h2>로그인</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id="userId"
          {...register("userId", { required: true })}
        />
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
        />

        <button>로그인</button>
      </form>
    </div>
  );
}
