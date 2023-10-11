"use client";

import { useEffect, useState } from "react";
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
  TbKey,
  TbPercentage,
} from "react-icons/tb";
import SpinnerComponent from "@/common/Spinner";

function AdminSideBar() {
  const [usersLoading, setUsersLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [couponsLoading, setCouponsLoading] = useState(false);

  const pathname = usePathname();

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  const usersLoadingHandler = () => {
    if (pathname !== "/admin/users") {
      setUsersLoading(true);
    }
  };

  const studentsLoadingHandler = () => {
    if (pathname !== "/admin/students") {
      setStudentsLoading(true);
    }
  };

  const productsLoadingHandler = () => {
    if (pathname !== "/admin/products") {
      setProductsLoading(true);
    }
  };

  const categoriesLoadingHandler = () => {
    if (pathname !== "/admin/categories") {
      setCategoriesLoading(true);
    }
  };

  const paymentsLoadingHandler = () => {
    if (pathname !== "/admin/payments") {
      setPaymentsLoading(true);
    }
  };

  const pagesLoadingHandler = () => {
    if (pathname !== "/admin/static-pages") {
      setPagesLoading(true);
    }
  };

  const couponsLoadingHandler = () => {
    if (pathname !== "/admin/coupons") {
      setCouponsLoading(true);
    }
  };

  useEffect(() => {
    if (pathname == "/admin/users") {
      setUsersLoading(false);
    }

    if (pathname == "/admin/students") {
      setStudentsLoading(false);
    }

    if (pathname == "/admin/products") {
      setProductsLoading(false);
    }

    if (pathname == "/admin/categories") {
      setCategoriesLoading(false);
    }

    if (pathname == "/admin/payments") {
      setPaymentsLoading(false);
    }

    if (pathname == "/admin/static-pages") {
      setPagesLoading(false);
    }

    if (pathname == "/admin/coupons") {
      setCouponsLoading(false);
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

        {/* dashboard */}
        <li>
          <Link
            href="/admin"
            className={`sidebar__list ${pathname == "/admin" && "bg-slate-500/40"}`}
          >
            <TbSettings2 size={20} className="ml-3" />
            داشبورد
          </Link>
        </li>

        {/* Users */}
        <li>
          <Link
            href="/admin/users"
            className={`sidebar__list ${pathname == "/admin/users" && "bg-slate-500/40"}`}
            onClick={usersLoadingHandler}
          >
            {usersLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbUsersGroup size={20} className="ml-3" />
                کاربر ها
              </div>
            )}
          </Link>
        </li>

        {/* Students */}
        <li>
          <Link
            href="/admin/students"
            className={`sidebar__list ${pathname == "/admin/students" && "bg-slate-500/40"}`}
            onClick={studentsLoadingHandler}
          >
            {studentsLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbKey size={20} className="ml-3" />
                لایسنس ها
              </div>
            )}
          </Link>
        </li>

        {/* Products */}
        <li>
          <Link
            href="/admin/products"
            className={`sidebar__list ${pathname == "/admin/products" && "bg-slate-500/40"}`}
            onClick={productsLoadingHandler}
          >
            {productsLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbBooks size={20} className="ml-3" />
                محصولات
              </div>
            )}
          </Link>
        </li>

        {/* Categories */}
        <li>
          <Link
            href="/admin/categories"
            className={`sidebar__list ${pathname == "/admin/categories" && "bg-slate-500/40"}`}
            onClick={categoriesLoadingHandler}
          >
            {categoriesLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbCategory size={20} className="ml-3" />
                دسته بندی
              </div>
            )}
          </Link>
        </li>

        {/* Payments */}
        <li>
          <Link
            href="/admin/payments"
            className={`sidebar__list ${pathname == "/admin/payments" && "bg-slate-500/40"}`}
            onClick={paymentsLoadingHandler}
          >
            {paymentsLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbList size={20} className="ml-3" />
                پرداخت ها
              </div>
            )}
          </Link>
        </li>

        {/* Static pages */}
        <li>
          <Link
            href="/admin/static-pages"
            className={`sidebar__list ${
              pathname == "/admin/static-pages" && "bg-slate-500/40"
            }`}
            onClick={pagesLoadingHandler}
          >
            {pagesLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbFileText size={20} className="ml-3" />
                صفحه های استاتیک
              </div>
            )}
          </Link>
        </li>

        {/* Coupons */}
        <li>
          <Link
            href="/admin/coupons"
            className={`sidebar__list ${pathname == "/admin/coupons" && "bg-slate-500/40"}`}
            onClick={couponsLoadingHandler}
          >
            {couponsLoading ? (
              <SpinnerComponent size={"sm"} />
            ) : (
              <div className="flex items-center">
                <TbPercentage size={20} className="ml-3" />
                کد تخفیف
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
export default AdminSideBar;
