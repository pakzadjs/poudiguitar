"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { cookies } from "next/headers";
// import queryString from "query-string";
import { IoIosArrowBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { toPersianNumbers } from "@/utils/toPersianNumbers";
// import { toStringCookies } from "@/utils/toStringCookies";
import SpinnerComponent from "@/common/Spinner";
import StudentsTable from "./StudentsTable";
import AddLicense from "./AddLicense";
import Search from "../users/Search";
import { useGetStudents } from "@/hooks/useStudents";

function Students() {
  // const cookieStore = cookies();
  // const strCookies = toStringCookies(cookieStore);

  // const data = await getAllStudents(strCookies, queryString.stringify(searchParams));
  // const { students } = data || {};

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const product = searchParams.get("product") || "";

  const { isLoading, data } = useGetStudents(search, product);
  const { students } = data || {};

  if (isLoading) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex md:items-center gap-x-4 max-md:flex-col">
        <h2 className="text-xl font-extrabold mr-1 flex items-center gap-2">
          <span>لایسنس های هنرجو ها:</span>
          <span className="px-2 py-1 rounded-md bg-blue-500/20">
            {toPersianNumbers(students?.length)}
          </span>
        </h2>

        {/* search */}
        <div className="ml-3">
          <Search />
        </div>

        {/* Reset searches */}
        <Link
          href="/admin/students"
          className="max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl flex justify-center transition-all duration-250"
        >
          <FaArrowRotateLeft
            size={25}
            className="text-blue-100/70 hover:text-white transition-all duration-250"
          />
        </Link>

        <AddLicense />
      </div>

      {/* Table */}
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {students ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1000px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">#</th>
                    <th className="table__th">نام</th>
                    <th className="table__th">شماره موبایل</th>
                    <th className="table__th">لایسنس</th>
                    <th className="table__th">دوره</th>
                    <th className="table__th">تاریخ</th>
                    <th className="table__th">تنظیمات</th>
                  </tr>
                </thead>

                <tbody className="bg-blue-900/50">
                  {students?.map((student, index) => {
                    return <StudentsTable key={index} student={student} index={index} />;
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
            <p className="text-lg font-semibold mb-3">کاربری برای نمایش وجود ندارد</p>
            <Link href="/admin">
              <button className="btn">رفتن به داشبورد</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;
