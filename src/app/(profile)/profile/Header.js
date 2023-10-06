"use client";

import { useState } from "react";
import Link from "next/link";

import { CartIcon } from "@/public/icons/CartIcon";

import {
  TbUser,
  TbUserStar,
  TbHome,
  TbLogout,
  TbBooks,
  TbUserEdit,
  TbSettings2,
  TbList,
} from "react-icons/tb";
import {
  Badge,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { PiPasswordBold } from "react-icons/pi";
import { useGetUser } from "@/hooks/useAuth";
import { logout } from "@/services/authServices";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const { cart } = user || {};

  const menuItems = [
    { name: "صفحه اصلی", href: "/", icon: <TbHome size={20} /> },
    { name: "داشبورد", href: "/profile", icon: <TbSettings2 size={20} /> },
    { name: "دوره ها", href: "/profile/courses", icon: <TbBooks size={20} /> },
    { name: "تراکنش ها", href: "/profile/payments", icon: <TbList size={20} /> },
    { name: "ویرایش مشخصات", href: "/profile/me", icon: <TbUserEdit size={20} /> },
    { name: "ویرایش گذرواژه", href: "/profile/password", icon: <PiPasswordBold size={20} /> },
    { name: "خروج", icon: <TbLogout size={20} /> },
  ];

  const logoutHandler = async () => {
    await logout();
    document.location.href = "/";
  };

  return (
    <header
      className={`sticky top-0 transiton-all duration-100 ease-out z-20 mb-6 text-sky-100 ${
        isLoading ? "blur-sm opacity-70" : ""
      }`}
    >
      <div className="container xl:max-w-screen-xl top-0 md:px-0 m-auto">
        <Navbar
          onMenuOpenChange={setIsMenuOpen}
          className="bg-slate sm:rounded-b-2xl lg:rounded-none min-[1535px]:rounded-b-2xl transition-all duration-300"
          isBlurred={true}
          isMenuOpen={isMenuOpen}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden"
            />

            <NavbarItem>
              <h1 className="lg:text-xl max-[430px]:hidden">
                درود بر تو <span className="font-bold">{user?.name}</span>، خوش اومدی جَوون😎.
              </h1>
              <h1 className="lg:text-xl max-[430px]:text-xs min-[430px]:hidden">
                درود بر تو <span className="font-bold">{user?.name}</span>،
                <div>خوش اومدی جَوون😎😎.</div>
              </h1>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            {/* Cart */}
            <NavbarItem className="flex">
              <Badge
                color="danger"
                content={cart ? user?.cart?.products?.length : 0}
                classNames={"hidden"}
                size="lg"
              >
                <Link href="/cart">
                  <CartIcon
                    size={30}
                    className="text-blue-100 hover:text-blue-500 transition-all duration-250"
                  />
                </Link>
              </Badge>
            </NavbarItem>

            {/* User button */}
            <NavbarItem className="flex items-center">
              {user?.role == "ADMIN" ? (
                <Link
                  href="/admin"
                  className={`hover:bg-blue-600 bg-blue-600/30 p-3 transition-all duration-250 rounded-2xl inline-block cursor-pointer`}
                >
                  <TbUserStar size={20} />
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className={`hover:bg-blue-600 bg-blue-600/30 p-3 transition-all duration-250 rounded-2xl inline-block cursor-pointer`}
                >
                  <TbUser size={20} />
                </Link>
              )}
            </NavbarItem>
          </NavbarContent>

          {/* Burger menu */}
          <NavbarMenu className="bg-gray">
            {menuItems.map((item, index) => (
              <div className="md:px-10" key={`${item}-${index}`}>
                {item.href ? (
                  <Link
                    className="w-full hover:bg-slate-400/20 py-3 px-3 rounded-2xl flex items-center transition-all duration-250"
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    href={item?.href}
                    size="lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="ml-3">{item?.icon}</div>
                    {item?.name}
                  </Link>
                ) : (
                  <button
                    className="w-full hover:bg-slate-400/20 py-3 px-3 rounded-2xl flex items-center transition-all duration-250"
                    onClick={logoutHandler}
                  >
                    <div className="ml-3">{item?.icon}</div>
                    {item?.name}
                  </button>
                )}
              </div>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    </header>
  );
}
export default Header;
