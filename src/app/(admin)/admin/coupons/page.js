import { IoIosArrowBack } from "react-icons/io";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import CouponsTable from "./CouponsTable";
import AddCoupon from "./AddCoupon";

export default function Coupons() {
  const coupons = [{}];

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex md:items-center gap-x-4 max-md:flex-col mb-4 justify-between">
        <h2 className="text-xl font-extrabold mr-1 flex items-center gap-2 max-md:mb-5">
          <span>کد های تخفیف:</span>
          <span className="px-2 py-1 rounded-md bg-blue-500/20">
            {/* {toPersianNumbers(coupons?.length)} */}
            کامینگ سون،  <br/>  آیتم زیر تستی هست.
          </span>
        </h2>

        <AddCoupon />
      </div>

      {/* Table */}
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {coupons ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1000px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">#</th>
                    <th className="table__th">کد</th>
                    <th className="table__th">مبلغ</th>
                    <th className="table__th">محدودیت استفاده</th>
                    <th className="table__th">تاریخ انقضا</th>
                    <th className="table__th">محصولات</th>
                    <th className="table__th">تنظیمات</th>
                  </tr>
                </thead>

                <tbody className="bg-blue-900/50">
                  {coupons?.map((coupon, index) => {
                    return <CouponsTable key={index} coupon={coupon} index={index} />;
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
            <p className="text-lg font-semibold mb-3">صفحه استاتیکی برای نمایش وجود ندارد</p>
            <Link href="/admin">
              <button className="btn">رفتن به داشبورد</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
