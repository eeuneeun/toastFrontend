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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
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
        <label htmlFor="userId">
          ID
          <input
            type="text"
            id="userId"
            {...register("userId", { required: true })}
          />
        </label>
        <label htmlFor="password">
          PASSWORD
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
        </label>

        <button>로그인</button>
      </form>
    </div>
  );
}
