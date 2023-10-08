"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PiPasswordBold } from "react-icons/pi";

import { logout } from "@/services/authServices";
import SpinnerComponent from "@/common/Spinner";
import { TbHome, TbLogout, TbBooks, TbUserEdit, TbSettings2, TbList } from "react-icons/tb";

function SideBar() {
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const pathname = usePathname();

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  const coursesLoadingHandler = () => {
    if (pathname !== "/profile/courses") {
      setCoursesLoading(true);
    }
  };

  const paymentsLoadingHandler = () => {
    if (pathname !== "/profile/payments") {
      setPaymentsLoading(true);
    }
  };

  const infoLoadingHandler = () => {
    if (pathname !== "/profile/me") {
      setInfoLoading(true);
    }
  };

  const passwordLoadingHandler = () => {
    if (pathname !== "/profile/password") {
      setPasswordLoading(true);
    }
  };

  useEffect(() => {
    if (pathname == "/profile/courses") {
      setCoursesLoading(false);
    }

    if (pathname == "/profile/payments") {
      setPaymentsLoading(false);
    }

    if (pathname == "/profile/me") {
      setInfoLoading(false);
    }

    if (pathname == "/profile/password") {
      setPasswordLoading(false);
    }
  }, [pathname]);

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

        {/* Dashboard */}
        <li>
          <Link
            href="/profile"
            className={`sidebar__list ${pathname == "/profile" && "bg-slate-500/40"}`}
          >
            <TbSettings2 size={20} className="ml-3" />
            داشبورد
          </Link>
        </li>

        {/* My Courses */}
        <li>
          <Link
            href="/profile/courses"
            className={`sidebar__list ${pathname == "/profile/courses" && "bg-slate-500/40"}`}
            onClick={coursesLoadingHandler}
          >
            {coursesLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbBooks size={20} className="ml-3" />
                دوره ها
              </div>
            )}
          </Link>
        </li>

        {/* My Payments */}
        <li>
          <Link
            href="/profile/payments"
            className={`sidebar__list ${pathname == "/profile/payments" && "bg-slate-500/40"}`}
            onClick={paymentsLoadingHandler}
          >
            {paymentsLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbList size={20} className="ml-3" />
                تراکنش ها
              </div>
            )}
          </Link>
        </li>

        {/* My Info */}
        <li>
          <Link
            href="/profile/me"
            className={`sidebar__list ${pathname == "/profile/me" && "bg-slate-500/40"}`}
            onClick={infoLoadingHandler}
          >
            {infoLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbUserEdit size={20} className="ml-3" />
                ویرایش مشخصات
              </div>
            )}
          </Link>
        </li>

        {/* Change Password */}
        <li>
          <Link
            href="/profile/password"
            className={`sidebar__list ${pathname == "/profile/password" && "bg-slate-500/40"}`}
            onClick={passwordLoadingHandler}
          >
            {passwordLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <PiPasswordBold size={20} className="ml-3" />
                ویرایش گذرواژه
              </div>
            )}
          </Link>
        </li>

        {/* Logout */}
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
