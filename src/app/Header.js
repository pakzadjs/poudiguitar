"use client";

import { useState } from "react";
import Link from "next/link";

import { CartIcon } from "@/public/icons/CartIcon";
import { BiLogoInstagram, BiLogoTelegram } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
import {
  HiOutlineLogin,
  HiOutlineExclamationCircle,
  HiOutlineChevronDown,
  HiOutlineDownload,
  HiBookOpen,
} from "react-icons/hi";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "دانلود ها", href: "/downloads" },
    { name: "دوره های آموزشی", href: "/courses" },
    { name: "ارتباط با ما", href: "/contact" },
    { name: "خروج", href: "#" },
  ];

  const linkStyles = "hover:text-blue-600 transition-all duration-250 mx-2";
  const iconStyles = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <header className={`sticky top-0 transiton-all duration-100 ease-out z-20 mb-6`}>
      <div className="container xl:max-w-screen-xl top-0 md:px-0 m-auto">
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-gray-100">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand>
              <Link href="/" className="font-bold text-inherit">
                پودی گیتار
              </Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
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

            <NavbarItem>
              <Link
                href="/courses"
                aria-current="page"
                className={`${linkStyles} flex items-center font-semibold  rounded-2xl hover:border p-2 hover:p-1`}
              >
                <FaBookOpen className="ml-1.5" /> <span>دوره های آموزشی</span>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Link color="foreground" href="#" className={linkStyles}>
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex items-center">
                      <HiOutlineChevronDown className="ml-1" /> <span> ارتباط با ما</span>
                    </div>
                  </DropdownTrigger>

                  <DropdownMenu
                    aria-label="Example with disabled actions"
                    disabledKeys={["edit", "delete"]}
                  >
                    <DropdownItem startContent={<BiLogoInstagram className={iconStyles} />}>
                      <a
                        href="https://www.instagram.com/poudiguitar/"
                        target="_blank rel=noopener"
                      >
                        صفحه اینستاگرام
                      </a>
                    </DropdownItem>
                    <DropdownItem
                      startContent={<HiOutlineExclamationCircle className={iconStyles} />}
                    >
                      <Link href="/about">درباره ما</Link>
                    </DropdownItem>
                    <DropdownItem startContent={<BiLogoTelegram className={iconStyles} />}>
                      <a href="https://t.me/pakzadjs" target="_blank rel=noopener">
                        کانال تلگرام
                      </a>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="flex">
              <Badge color="danger" content={3} classNames={"hidden"} size="lg">
                <Link href="/cart" className=" ml-4">
                  <CartIcon
                    size={30}
                    className="text-gray-700 hover:text-gray-500 transition-all duration-250"
                  />
                </Link>
              </Badge>
            </NavbarItem>

            <NavbarItem>
              <Link href="/auth">
                <Button
                  color="primary"
                  variant="ghost"
                  radius="full"
                  className="text-base transition-all duration-200 font-semibold"
                >
                  <HiOutlineLogin />
                  ورود
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  className="w-full"
                  href={item.href}
                  size="lg"
                >
                  {item.name}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </div>
    </header>
  );
}
export default Header;
