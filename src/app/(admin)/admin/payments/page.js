"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";

import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { getAllPayments } from "@/services/adminServices";
import PaginationComponent from "@/common/Pagination";
import SpinnerComponent from "@/common/Spinner";
import PaymentsTable from "./PaymentsTable";

export default function Payments() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageSearchParam = searchParams.get("page") || "";
  const limitSearchParam = searchParams.get("limit") || "";

  const { isLoading, data } = useQuery({
    queryKey: ["get-payments", { pageSearchParam, limitSearchParam }],
    queryFn: () => getAllPayments(pageSearchParam, limitSearchParam),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { payments, pagination } = data || {};

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <h2 className="text-xl font-extrabold mr-1 mb-4 flex items-center gap-2 max-md:mb-5">
        <span>تراکنش ها:</span>
        <span className="px-2 py-1 rounded-md bg-blue-500/20">
          {toPersianNumbers(payments?.length)}
        </span>
      </h2>

      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {payments?.[0] ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1000px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">وضعیت</th>
                    <th className="table__th">شماره پیگیری</th>
                    <th className="table__th">کاربر</th>
                    <th className="table__th">سفارش</th>
                    <th className="table__th">مبلغ</th>
                    <th className="table__th">روش پرداخت</th>
                    <th className="table__th">تاریخ</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900/50">
                  {payments?.map((detail) => {
                    const {
                      paymentMethod,
                      amount,
                      isPaid,
                      createdAt,
                      refId,
                      _id,
                      cart,
                      user,
                    } = detail || {};

                    return (
                      <PaymentsTable
                        paymentMethod={paymentMethod}
                        amount={amount}
                        isPaid={isPaid}
                        createdAt={createdAt}
                        refId={refId}
                        key={_id}
                        cart={cart}
                        user={user}
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
          <div className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:m-auto">
            <p className="text-lg font-semibold mb-3">تراکنشی برای نمایش وجود ندارد</p>
            <Link href="/courses">
              <button className="btn">رفتن به صفحه دوره ها</button>
            </Link>
          </div>
        )}
      </div>

      <PaginationComponent pagination={pagination} pathname={pathname} />
    </div>
  );
}
