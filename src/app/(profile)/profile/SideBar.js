"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { logout } from "@/services/authServices";
import { PiPasswordBold } from "react-icons/pi";
import { TbHome, TbLogout, TbBooks, TbUserEdit, TbSettings2, TbList } from "react-icons/tb";

function SideBar() {
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
            href="/profile"
            className={`sidebar__list ${pathname == "/profile" && "bg-slate-500/40"}`}
          >
            <TbSettings2 size={20} className="ml-3" />
            داشبورد
          </Link>
        </li>

        <li>
          <Link
            href="/profile/courses"
            className={`sidebar__list ${pathname == "/profile/courses" && "bg-slate-500/40"}`}
          >
            <TbBooks size={20} className="ml-3" />
            دوره ها
          </Link>
        </li>

        <li>
          <Link
            href="/profile/payments"
            className={`sidebar__list ${pathname == "/profile/payments" && "bg-slate-500/40"}`}
          >
            <TbList size={20} className="ml-3" />
            تراکنش ها
          </Link>
        </li>

        <li>
          <Link
            href="/profile/me"
            className={`sidebar__list ${pathname == "/profile/me" && "bg-slate-500/40"}`}
          >
            <TbUserEdit size={20} className="ml-3" />
            ویرایش مشخصات
          </Link>
        </li>

        <li>
          <Link
            href="/profile/password"
            className={`sidebar__list ${pathname == "/profile/password" && "bg-slate-500/40"}`}
          >
            <PiPasswordBold size={20} className="ml-3" />
            ویرایش گذرواژه
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
export default SideBar;
