"use client";

import Link from "next/link";
import Image from "next/image";
import { logout } from "@/services/authServices";
import { TbHome, TbLogout, TbBooks, TbUserEdit, TbSettings2 } from "react-icons/tb";

function SideBar() {
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
          <Link href="/profile" className={listStyles}>
            <TbSettings2 size={20} className="ml-3" />
            داشبورد
          </Link>
        </li>
        <li>
          <Link href="/profile/me" className={listStyles}>
            <TbUserEdit size={20} className="ml-3" />
            ویرایش اطلاعات
          </Link>
        </li>
        <li>
          <Link href="/profile/payments" className={listStyles}>
            <TbBooks size={20} className="ml-3" />
            سفارشات
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
export default SideBar;
