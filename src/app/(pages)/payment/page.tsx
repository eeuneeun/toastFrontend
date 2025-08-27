"use client";

import { useCartStore } from "@/app/_store/CartStore";
import { useOrderStore } from "@/app/_store/OrderStore";
import { useUserStore } from "@/app/_store/UserStore";
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

type reqCartData = {
  menuId: number;
  quantity: number;
};
export default function pages() {
  const router = useRouter();

  const { id, name } = useUserStore();
  const { storeId, createOrder } = useOrderStore();
  const { cart, totalPrice, getCart, updateCartItem, clearCart } =
    useCartStore();

  const payment = async (data: any) => {
    // 선택 메뉴 배열 세팅
    let menuArr: reqCartData[] = [];
    await cart?.cartMenus.map((item, idx) => {
      menuArr.push({
        menuId: item.menu.id,
        quantity: item.quantity,
      });
    });

    const paymentInfo = {
      storeId: storeId ? storeId : 0,
      totalPrice: totalPrice,
      paymentMethod: data.paymentMethod,

      customerId: id,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      deliveryMethod: data.deliveryMethod,
      deliveryAddress: data.deliveryAddress,
      status: "WAITING",
    };
    console.log(paymentInfo);
    //@ts-ignore
    const result = await createOrder(paymentInfo, menuArr);
    if (result) {
      clearCart(cart ? cart.id : 1);
      router.push("/");
    } else {
      alert("주문 중 오류가 발생했습니다!");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentInfo>();

  const onSubmit: SubmitHandler<PaymentInfo> = (data) => {
    payment(data);
  };
  return (
    <div>
      <h2>결제</h2>
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
          <select id="paymentMethod" {...register("paymentMethod")}>
            <option value="">선택하세요</option>
            <option value="card">카드</option>
            <option value="cash">현금</option>
          </select>
        </label>

        <label htmlFor="deliveryMethod">
          수령 방법
          <select id="deliveryMethod" {...register("deliveryMethod")}>
            <option value="">선택하세요</option>
            <option value="pickup">픽업</option>
            <option value="delivery">배달</option>
          </select>
        </label>

        <label htmlFor="deliveryAddress">
          배달 주소
          <input
            type="text"
            id="deliveryAddress"
            {...register("deliveryAddress", { required: true })}
          />
        </label>

        <button>결제하기</button>
      </form>
    </div>
  );
}
