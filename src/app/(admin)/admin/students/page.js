import { cookies } from "next/headers";
import queryString from "query-string";
import { IoIosArrowBack } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { toStringCookies } from "@/utils/toStringCookies";
import { getAllStudents } from "@/services/adminServices";
import SpinnerComponent from "@/common/Spinner";
import StudentsTable from "./StudentsTable";
import Search from "../users/Search";
import SearchByProducts from "./SearchByProducts";
import Link from "next/link";

async function Students({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const data = await getAllStudents(strCookies, queryString.stringify(searchParams));
  const { students } = data || {};

  if (!students) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex md:items-center gap-x-4 max-md:flex-col">
        <h2 className="text-xl font-extrabold mr-1">لایسنس های هنرجو ها</h2>

        <div className="ml-3">
          <Search />
        </div>

        <div className="ml-3">
          <SearchByProducts placeholder="جستجو با آیدیِ دوره" />
        </div>

        <Link href="/admin/students">
          <FaArrowRotateLeft
            size={25}
            className="text-blue-100/70 hover:text-white transition-all duration-250"
          />
        </Link>
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
