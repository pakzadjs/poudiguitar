"use client";

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import MyCoursesDetails from "./MyCoursesDetails";
import SpinnerComponent from "@/common/Spinner";
import { useGetPaidCourses } from "@/hooks/useProducts";

export default function MyCourses() {
  // const data = await getPaidCourses(strCookies);
  const { data, isLoading } = useGetPaidCourses();
  const { students } = data || {};

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <h2 className="text-xl font-extrabold mb-4 mr-1">دوره های من</h2>

      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {students ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[900px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">سفارش</th>
                    <th className="table__th">لایسنس</th>
                    <th className="table__th">روش دسترسی</th>
                    <th className="table__th">کانال تلگرام دوره</th>
                    <th className="table__th">مدرس دوره</th>
                    <th className="table__th">تاریخ</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900/50">
                  {students?.map((detail) => {
                    const { license, product, createdAt, _id } = detail;
                    return (
                      <MyCoursesDetails
                        license={license}
                        product={product}
                        createdAt={createdAt}
                        key={_id}
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
            <p className="text-lg font-semibold mb-3">شما در دوره ای ثبت نام نکردید</p>
            <Link href="/courses">
              <button className="btn">رفتن به صفحه دوره ها</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
// export default MyCourses;
