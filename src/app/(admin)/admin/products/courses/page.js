import { cookies } from "next/headers";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { TbPlus } from "react-icons/tb";

import { toStringCookies } from "@/utils/toStringCookies";
import { getAllCourses } from "@/services/adminServices";
import CoursesTable from "./CoursesTable";

async function Allcourses() {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const data = await getAllCourses(strCookies);
  const { products } = data || {};

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex max-xs:flex-col items-center xs: justify-between mb-4">
        <h2 className="text-xl font-extrabold mr-1">دوره ها</h2>

        <div className="flex items-center gap-1 hover:text-green-500 transition-all duration-250">
          <p>اضافه کردن دوره جدید</p>
          <TbPlus size={25} />
        </div>
      </div>
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {products ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1100px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">#</th>
                    <th className="table__th">عنوان</th>
                    <th className="table__th">دسته بندی</th>
                    <th className="table__th">قیمت</th>
                    <th className="table__th">تخفیف</th>
                    <th className="table__th">قیمت با تخفیف</th>
                    <th className="table__th">تاریخ</th>
                    <th className="table__th">تنظیمات</th>
                  </tr>
                </thead>
                <tbody className="bg-blue-900/50">
                  {products?.map((course, index) => {
                    return <CoursesTable key={index} index={index} course={course} />;
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
            <p className="text-lg font-semibold mb-3">دوره ای برای نمایش وجود ندارد</p>
            <Link href="/admin">
              <button className="btn">رفتن به داشبورد</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allcourses;
