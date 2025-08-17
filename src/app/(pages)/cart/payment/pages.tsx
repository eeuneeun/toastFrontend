"use client";

import { useCartStore } from "@/app/_store/CartStore";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export type PaymentInfo = {
  storeId: number;
  totalPrice: number;
  paymentMethod: string;

  customerId: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: string;
  deliveryAddress: string;

  status: string;
};
export default function pages() {
  const router = useRouter();
  const { cart } = useCartStore();

  const payment = async (data: PaymentInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storeId: data.storeId,
        totalPrice: data.totalPrice,
        paymentMethod: data.paymentMethod,

        customerId: data.customerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        deliveryMethod: data.deliveryMethod,
        deliveryAddress: data.deliveryAddress,
        status: "WAITING",
      }),
    });
    if (res.status == 201) {
      router.push("/signIn");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentInfo>();

  const onSubmit: SubmitHandler<PaymentInfo> = (data) => {
    console.log(data);
    payment(data);
  };
  return (
    <div>
      <h2>회원가입</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="customerName">
          주문자 성함
          <input
            type="text"
            id="customerName"
            {...register("customerName", { required: true })}
          />
        </label>
        <label htmlFor="customerPhone">
          연락처
          <input
            type="text"
            id="customerPhone"
            {...register("customerPhone", { required: true })}
          />
        </label>
        <label htmlFor="paymentMethod">
          걸제 수단
          <input
            type="text"
            id="paymentMethod"
            {...register("paymentMethod", { required: true })}
          />
        </label>

        <label htmlFor="deliveryMethod">
          수령 방법
          <input
            type="text"
            id="deliveryMethod"
            {...register("deliveryMethod", { required: true })}
          />
        </label>
        <label htmlFor="deliveryMethod">
          배달 주소
          <input
            type="text"
            id="deliveryMethod"
            {...register("deliveryMethod", { required: true })}
          />
        </label>

        <button>가입</button>
      </form>
    </div>
  );
}
