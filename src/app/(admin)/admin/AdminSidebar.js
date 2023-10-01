"use client";

import Link from "next/link";
import Image from "next/image";
import { logout } from "@/services/authServices";
import {
  TbHome,
  TbLogout,
  TbBooks,
  TbSettings2,
  TbList,
  TbUsersGroup,
  TbCategory,
  TbFileText,
  TbUserStar,
  TbPercentage,
} from "react-icons/tb";

function AdminSideBar() {
  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  const listStyles =
    "w-full hover:bg-slate-400/20 py-3 px-3 rounded-2xl flex items-center transition-all duration-250";

  return (
    <aside>
      <Link href="/" className="font-bold text-inherit flex items-center mr-3">
        <Image src="/images/poudi-logo.png" alt="logo" width={50} height={0} />
      </Link>
      <ul className="flex flex-col space-y-2 pt-10 lg:pt-8">
        <li>
          <Link href="/" className={listStyles}>
            <TbHome size={20} className="ml-3" />
            صفحه اصلی
          </Link>
        </li>

        <li>
          <Link href="/admin" className={listStyles}>
            <TbSettings2 size={20} className="ml-3" />
            داشبورد
          </Link>
        </li>

        <li>
          <Link href="/admin/users" className={listStyles}>
            <TbUsersGroup size={20} className="ml-3" />
            کاربر ها
          </Link>
        </li>

        <li>
          <Link href="/admin/students" className={listStyles}>
            <TbUserStar size={20} className="ml-3" />
            هنرجو ها
          </Link>
        </li>

        <li>
          <Link href="/admin/products" className={listStyles}>
            <TbBooks size={20} className="ml-3" />
            محصولات
          </Link>
        </li>

        <li>
          <Link href="/admin/categories" className={listStyles}>
            <TbCategory size={20} className="ml-3" />
            دسته بندی
          </Link>
        </li>

        <li>
          <Link href="/admin/payments" className={listStyles}>
            <TbList size={20} className="ml-3" />
            پرداخت ها
          </Link>
        </li>

        <li>
          <Link href="/admin/static-pages" className={listStyles}>
            <TbFileText size={20} className="ml-3" />
            صفحه های استاتیک
          </Link>
        </li>

        <li>
          <Link href="/admin/coupons" className={listStyles}>
            <TbPercentage size={20} className="ml-3" />
            کد تخفیف
          </Link>
        </li>

        <li>
          <button onClick={logoutHandler} className={listStyles}>
            <TbLogout size={20} className="ml-3" />
            خروج از حساب
          </button>
        </li>
      </ul>
    </aside>
  );
}
export default AdminSideBar;
