"use client";

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

import AddDownload from "./AddDownload";
import DownloadsTable from "./DownloadsTable";
import SpinnerComponent from "@/common/Spinner";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetDownloads } from "@/hooks/useProducts";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

export default function AllDownloads() {
  const { data: productsData, isLoading } = useGetDownloads();
  const { products } = productsData || {};

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories();
  const { categories } = categoriesData || {};

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex max-xs:flex-col items-center xs: justify-between mb-4">
        <h2 className="text-xl font-extrabold mr-1 flex items-center gap-2">
          <span>دانلود ها:</span>
          <span className="px-2 py-1 rounded-md bg-blue-500/20">
            {toPersianNumbers(products?.length)}
          </span>
        </h2>

        <div className="flex items-center gap-1 hover:text-green-500 transition-all duration-250">
          <AddDownload categories={categories} />
        </div>
      </div>
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {products?.[0] ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1000px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">#</th>
                    <th className="table__th">عنوان</th>
                    <th className="table__th">دسته بندی</th>
                    <th className="table__th">حجم</th>
                    <th className="table__th">تاریخ</th>
                    <th className="table__th">تنظیمات</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900/50">
                  {products?.map((download, index) => {
                    return (
                      <DownloadsTable
                        key={index}
                        index={index}
                        download={download}
                        categories={categories}
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
            <p className="text-lg font-semibold mb-3">دانلودی برای نمایش وجود ندارد</p>
            <Link href="/admin">
              <button className="btn">رفتن به داشبورد</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
