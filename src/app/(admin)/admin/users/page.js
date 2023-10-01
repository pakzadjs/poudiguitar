import Link from "next/link";
import { cookies } from "next/headers";
import queryString from "query-string";
import { IoIosArrowBack } from "react-icons/io";

import Search from "./Search";
import UsersTable from "./UsersTable";
import SpinnerComponent from "@/common/Spinner";
import { getAllUsers } from "@/services/adminServices";
import { toStringCookies } from "@/utils/toStringCookies";

async function Users({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const data = await getAllUsers(strCookies, queryString.stringify(searchParams));
  const { users } = data || {};

  if (!users) return <SpinnerComponent />;

  return (
    <div className="xl:max-w-screen-xl m-auto">
      <div className="flex md:items-center gap-x-4 max-md:flex-col">
        <h2 className="text-xl font-extrabold mr-1">کاربر ها</h2>
        <div className="ml-3">
          <Search />
        </div>
      </div>

      {/* Table */}
      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex items-center">
        {users ? (
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-auto my-8">
              <table className="border-collapse table-auto w-full min-w-[1000px] text-sm">
                <thead>
                  <tr>
                    <th className="table__th">#</th>
                    <th className="table__th">نام</th>
                    <th className="table__th">شماره موبایل</th>
                    <th className="table__th">تاریخ پیوستن</th>
                    <th className="table__th">ایمیل</th>
                    <th className="table__th">ID</th>
                    <th className="table__th">OTP</th>
                  </tr>
                </thead>

                <tbody className="bg-blue-900/50">
                  {users?.map((detail, index) => {
                    const {
                      otp,
                      phoneNumber,
                      isVerifiedPhoneNumber,
                      createdAt,
                      email,
                      _id,
                      name,
                      cart,
                      avatar,
                    } = detail || {};

                    return (
                      <UsersTable
                        otp={otp}
                        phoneNumber={phoneNumber}
                        isVerifiedPhoneNumber={isVerifiedPhoneNumber}
                        createdAt={createdAt}
                        email={email}
                        id={_id}
                        key={index}
                        cart={cart}
                        name={name}
                        avatar={avatar}
                        index={index}
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

export default Users;