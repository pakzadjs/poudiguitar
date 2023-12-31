"use client";

import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import SpinnerComponent from "@/common/Spinner";
import { useGetCategories } from "@/hooks/useCategories";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

import CategoriesTable from "./CategoriesTable";
import AddCategory from "./AddCategory";

export default function Categories({ searchParams }) {
  // const cookieStore = cookies();
  // const strCookies = toStringCookies(cookieStore);

  // const data = await getAllCategories(strCookies);
  // const { categories } = data || {};

  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex md:items-center gap-x-4 max-md:flex-col mb-4 justify-between">
        <h2 className="text-xl font-extrabold mr-1 flex items-center gap-2 max-md:mb-5">
          <span>دسته بندی ها:</span>
          <span className="px-2 py-1 rounded-md bg-blue-500/20">
            {toPersianNumbers(categories?.length)}
          </span>
        </h2>

        <AddCategory />
      </div>

      {/* Table */}
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {categories?.[0] ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1000px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">#</th>
                    <th className="table__th">تیتر</th>
                    <th className="table__th">slug</th>
                    <th className="table__th">توضیحات</th>
                    <th className="table__th">Type</th>
                    <th className="table__th">تاریخ</th>
                    <th className="table__th">تنظیمات</th>
                  </tr>
                </thead>

                <tbody className="bg-blue-900/50">
                  {categories?.map((category, index) => {
                    return <CategoriesTable key={index} category={category} index={index} />;
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
            <p className="text-lg font-semibold mb-3">دسته بندی برای نمایش وجود ندارد</p>
            <Link href="/admin">
              <button className="btn">رفتن به داشبورد</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
