import { cookies } from "next/headers";
import Link from "next/link";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import MyPaymentsDetails from "./MyPaymentsDetails";
import { toStringCookies } from "@/utils/toStringCookies";
import { getPayments } from "@/services/paymentService";

export const metadata = {
  title: "تراکنش ها",
  description: "پروفایل کاربر",
};

async function MyPayments() {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const data = await getPayments(strCookies);
  const { payments } = data || {};

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <h2 className="text-xl font-extrabold mb-4 mr-1">تراکنش ها</h2>

      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {payments ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[900px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">وضعیت</th>
                    <th className="table__th">شماره پیگیری</th>
                    <th className="table__th">سفارش</th>
                    <th className="table__th">مبلغ</th>
                    <th className="table__th">روش پرداخت</th>
                    <th className="table__th">تاریخ</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900/50">
                  {payments?.map((detail) => {
                    const { paymentMethod, amount, isPaid, createdAt, refId, _id, cart } =
                      detail || {};

                    return (
                      <MyPaymentsDetails
                        paymentMethod={paymentMethod}
                        amount={amount}
                        isPaid={isPaid}
                        createdAt={createdAt}
                        refId={refId}
                        key={_id}
                        cart={cart}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div class="absolute inset-0 pointer-events-none border border-white/5 rounded-xl"></div>

            <div className="absolute left-0 top-0 h-full items-center ml-3 hidden max-xl:flex">
              <IoIosArrowBack
                size={30}
                className="shadow-md rounded-full p-1 shadow-sky-800/80"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg font-semibold mb-3">تراکنشی برای نمایش وجود ندارد</p>
            <Link href="/courses">
              <button className="btn">رفتن به صفحه دوره ها</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPayments;
