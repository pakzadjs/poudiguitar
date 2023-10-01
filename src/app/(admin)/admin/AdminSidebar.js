"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  return (
    <aside>
      <Link href="/" className="font-bold text-inherit flex items-center mr-3">
        <Image src="/images/poudi-logo.png" alt="logo" width={50} height={0} />
      </Link>
      <ul className="flex flex-col space-y-2 pt-10 lg:pt-8">
        <li>
          <Link href="/" className="sidebar__list">
            <TbHome size={20} className="ml-3" />
            صفحه اصلی
          </Link>
        </li>

        <li>
          <Link
            href="/admin"
            className={`sidebar__list ${pathname == "/admin" && "bg-slate-500/40"}`}
          >
            <TbSettings2 size={20} className="ml-3" />
            داشبورد
          </Link>
        </li>

        <li>
          <Link
            href="/admin/users"
            className={`sidebar__list ${pathname == "/admin/users" && "bg-slate-500/40"}`}
          >
            <TbUsersGroup size={20} className="ml-3" />
            کاربر ها
          </Link>
        </li>

        <li>
          <Link
            href="/admin/students"
            className={`sidebar__list ${pathname == "/admin/students" && "bg-slate-500/40"}`}
          >
            <TbUserStar size={20} className="ml-3" />
            هنرجو ها
          </Link>
        </li>

        <li>
          <Link
            href="/admin/products"
            className={`sidebar__list ${pathname == "/admin/products" && "bg-slate-500/40"}`}
          >
            <TbBooks size={20} className="ml-3" />
            محصولات
          </Link>
        </li>

        <li>
          <Link
            href="/admin/categories"
            className={`sidebar__list ${pathname == "/admin/categories" && "bg-slate-500/40"}`}
          >
            <TbCategory size={20} className="ml-3" />
            دسته بندی
          </Link>
        </li>

        <li>
          <Link
            href="/admin/payments"
            className={`sidebar__list ${pathname == "/admin/payments" && "bg-slate-500/40"}`}
          >
            <TbList size={20} className="ml-3" />
            پرداخت ها
          </Link>
        </li>

        <li>
          <Link
            href="/admin/static-pages"
            className={`sidebar__list ${
              pathname == "/admin/static-pages" && "bg-slate-500/40"
            }`}
          >
            <TbFileText size={20} className="ml-3" />
            صفحه های استاتیک
          </Link>
        </li>

        <li>
          <Link
            href="/admin/coupons"
            className={`sidebar__list ${pathname == "/admin/coupons" && "bg-slate-500/40"}`}
          >
            <TbPercentage size={20} className="ml-3" />
            کد تخفیف
          </Link>
        </li>

        <li>
          <button onClick={logoutHandler} className="sidebar__list">
            <TbLogout size={20} className="ml-3" />
            خروج از حساب
          </button>
        </li>
      </ul>
    </aside>
  );
}
export default AdminSideBar;
