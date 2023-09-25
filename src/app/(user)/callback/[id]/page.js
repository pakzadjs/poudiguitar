import { cookies } from "next/headers";
import Link from "next/link";
import axios from "axios";
import { TbCircleCheckFilled, TbCircleXFilled } from "react-icons/tb";

import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { toLocalDateStringShort } from "@/utils/toLocalDate";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const getData = async (id) => {
  const cookieStore = cookies();
  const { value } = cookieStore.get("accessToken");

  const access = `accessToken=${value}`;

  try {
    const data = await axios
      .get(`${baseURL}/payment/${id}`, {
        headers: {
          Cookie: access,
          Origin: process.env.NEXT_PUBLIC_CLIENT_URL,
        },
      })
      .then(({ data }) => data.data);
    return data;
  } catch (error) {
    console.log(error?.response?.data);
  }
};

async function Callback({ params }) {
  const { id } = params;

  const { payment } = await getData(id);
  const { isPaid, amount, refId, paymentMethod, createdAt, user } = payment;
  const { name, phoneNumber } = user;

  return (
    <div className="mt-10">
      <section className="flex justify-center relative">
        <div className="receipt-section">
          {/* Payment status */}
          <div className="flex flex-col justify-center items-center gap-3 mb-6">
            {isPaid ? (
              <TbCircleCheckFilled
                size={60}
                className="text-green-500 shadow-xl shadow-green-900/50 rounded-full"
              />
            ) : (
              <TbCircleXFilled
                size={60}
                className="text-red-500 shadow-xl shadow-red-900/50 rounded-full"
              />
            )}

            {isPaid ? (
              <h2 className="text-xl font-bold">پرداخت شما موفقیت آمیز بود</h2>
            ) : (
              <h2 className="text-xl font-bold">پرداخت شما ناموفق بود</h2>
            )}
          </div>

          {/* Receipt */}
          {isPaid && (
            <div className="flex flex-col justify-center items-center mb-5 gap-2">
              <h3 className="font-semibold">رسید پرداخت آنلاین</h3>

              <div className="receipt-section2">
                <div className="flex justify-between bg-sky-900/70 p-3 rounded-xl mb-3">
                  <span>شماره پیگیری</span>
                  <span>{toPersianNumbers(refId)}</span>
                </div>

                {paymentMethod == "ZARINPAL" && (
                  <div className="flex justify-between">
                    <span>روش پرداخت</span>
                    <span>زرین پال</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>تاریخ</span>
                  <span>{toLocalDateStringShort(createdAt)}</span>
                </div>

                <div className="flex justify-between">
                  <span>نام کامل</span>
                  <span>{name}</span>
                </div>

                <div className="flex justify-between">
                  <span>شماره همراه</span>
                  <span>{toPersianNumbers(phoneNumber)}</span>
                </div>

                <div className="border-b-1 border-sky-600/80 pb-3 mb-2 mx-3"></div>

                <div className="flex justify-between">
                  <span>مبلغ</span>
                  <span>{toPersianNumbers(amount)} تومان</span>
                </div>
              </div>
            </div>
          )}

          {/* Button */}
          {isPaid ? (
            <Link href="/profile/courses">
              <button className="btn w-full flex justify-center">دریافت لایسنس</button>
            </Link>
          ) : (
            <Link href="/courses">
              <button className="btn w-full flex justify-center">رفتن به صفحه دوره ها</button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
export default Callback;
