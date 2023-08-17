"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { CartIcon } from "@/public/icons/CartIcon";
import { BiLogoInstagram, BiLogoTelegram } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import { TbUser, TbUserStar, TbHome, TbSchool, TbLogout } from "react-icons/tb";
import {
  HiOutlineLogin,
  HiOutlineExclamationCircle,
  HiOutlineChevronDown,
  HiOutlineDownload,
} from "react-icons/hi";
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  User,
} from "@nextui-org/react";
import { useGetUser } from "@/hooks/useAuth";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};

  const menuItems = [
    { name: "دانلود ها", href: "/downloads" },
    { name: "دوره های آموزشی", href: "/courses" },
    { name: "ارتباط با ما", href: "/contact" },
    { name: "خروج", href: "#" },
  ];

  const linkStyles = "hover:bg-blue-600/30 py-1 px-3 transition-all duration-250 rounded-2xl";
  const iconStyles = "text-xl pointer-events-none flex-shrink-0";

  return (
    <header
      className={`sticky top-0 transiton-all duration-100 ease-out z-20 mb-6 text-sky-100 ${
        isLoading ? "blur-sm opacity-70" : ""
      }`}
    >
      <div className="container xl:max-w-screen-xl top-0 md:px-0 m-auto">
        <Navbar
          onMenuOpenChange={setIsMenuOpen}
          className="bg-gray-800/0 sm:rounded-b-2xl transition-all duration-300"
          isBlurred={true}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />

            {/* Logo */}
            <NavbarItem>
              <Link href="/" className="font-bold text-inherit flex items-center">
                <Image src="/images/poudi-logo.png" alt="logo" width={50} height={0} />
                {/* <h1>پودی</h1> */}
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {/* Downloads */}
            <NavbarItem>
              <Link
                color="foreground"
                href="/downloads"
                className={`${linkStyles} flex items-center`}
              >
                <HiOutlineDownload className="ml-1 mb-0.5" />
                <span>دانلود ها</span>
              </Link>
            </NavbarItem>

            {/* Courses */}
            <NavbarItem>
              <Link
                href="/courses"
                aria-current="page"
                className={`${linkStyles} flex items-center font-semibold hover:border border-gray-500`}
              >
                <FaBookOpen className="ml-1.5" /> <span>دوره های آموزشی</span>
              </Link>
            </NavbarItem>

            {/* Contact */}
            <NavbarItem>
              <Dropdown className="bg-blue-950">
                <DropdownTrigger className={`${linkStyles} cursor-pointer`}>
                  <div className="flex items-center">
                    <HiOutlineChevronDown className="ml-1" /> <span> ارتباط با ما</span>
                  </div>
                </DropdownTrigger>

                <DropdownMenu aria-label="contact us">
                  <DropdownItem
                    key="Instagram"
                    startContent={<BiLogoInstagram className={iconStyles} />}
                  >
                    <a
                      href="https://www.instagram.com/poudiguitar/"
                      target="_blank rel=noopener"
                    >
                      صفحه اینستاگرام
                    </a>
                  </DropdownItem>

                  <DropdownItem
                    key="About us"
                    startContent={<HiOutlineExclamationCircle className={iconStyles} />}
                  >
                    <Link href="/about">درباره ما</Link>
                  </DropdownItem>

                  <DropdownItem
                    key="Telegram"
                    startContent={<BiLogoTelegram className={iconStyles} />}
                  >
                    <a href="https://t.me/pakzadjs" target="_blank rel=noopener">
                      کانال تلگرام
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            {/* Cart */}
            <NavbarItem className="flex">
              <Badge
                color="danger"
                content={cart ? cart.payDetail.productIds.length : 0}
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

            {/* Login & User button */}
            <NavbarItem>
              {user ? (
                <Dropdown className="bg-gray-100/95 text-gray-800">
                  <DropdownTrigger
                    className={`hover:bg-blue-600 bg-blue-600/30 p-3 transition-all duration-250 rounded-2xl cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <HiOutlineChevronDown className="ml-1" /> <TbUser size={20} />
                    </div>
                  </DropdownTrigger>

                  <DropdownMenu aria-label="contact us">
                    {/* User data */}
                    <DropdownSection aria-label="Profile" showDivider>
                      <DropdownItem
                        isReadOnly
                        key="profile"
                        className="h-14 gap-2 cursor-default"
                      >
                        <User
                          name={user.name}
                          description={user.phoneNumber}
                          classNames={{
                            name: "text-default-600",
                            description: "text-default-500",
                          }}
                          avatarProps={{
                            size: "sm",
                            src: "",
                          }}
                        />
                      </DropdownItem>
                    </DropdownSection>

                    <DropdownSection aria-label="Actions">
                      {user?.role == "ADMIN" && (
                        <DropdownItem
                          key="admin"
                          startContent={<TbUserStar className={iconStyles} />}
                          className="py-3"
                          as={Link}
                          href="/admin"
                        >
                          پنل ادمین
                        </DropdownItem>
                      )}

                      <DropdownItem
                        key="user"
                        startContent={<TbHome className={iconStyles} />}
                        className="py-3"
                        as={Link}
                        href="/profile"
                      >
                        حساب کاربری
                      </DropdownItem>

                      <DropdownItem
                        key="My Courses"
                        startContent={<TbSchool className={iconStyles} />}
                        className="py-3"
                        as={Link}
                        href="/courses"
                      >
                        دوره های من
                      </DropdownItem>

                      <DropdownItem
                        key="Log out"
                        startContent={<TbLogout className={iconStyles} />}
                        className="py-3"
                      >
                        <button>خروج</button>
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link href="/auth" className="btn">
                  <HiOutlineLogin className="ml-1 h-5 w-5" />
                  <span>ورود</span>
                </Link>
              )}
            </NavbarItem>
          </NavbarContent>

          {/* Burger menu */}
          <NavbarMenu className="bg-gray">
            {menuItems.map((item, index) => (
              <Link
                key={`${item}-${index}`}
                className="w-full hover:bg-slate-400/20 py-2 px-3 rounded-2xl "
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    </header>
  );
}
export default Header;
