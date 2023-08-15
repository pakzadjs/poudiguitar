"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { CartIcon } from "@/public/icons/CartIcon";
import { BiLogoInstagram, BiLogoTelegram } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";
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
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "دانلود ها", href: "/downloads" },
    { name: "دوره های آموزشی", href: "/courses" },
    { name: "ارتباط با ما", href: "/contact" },
    { name: "خروج", href: "#" },
  ];
  
  const linkStyles = "hover:bg-blue-600/30 py-1 px-3 transition-all duration-250 rounded-2xl";
  const iconStyles = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <header
      className={`sticky top-0 transiton-all duration-100 ease-out z-20 mb-6 text-sky-100`}
    >
      <div className="container xl:max-w-screen-xl top-0 md:px-0 m-auto">
        <Navbar
          onMenuOpenChange={setIsMenuOpen}
          className="bg-gray-800/0 rounded-b-2xl transition-all duration-300"
          isBlurred={scrollY > 12 ? true : false}
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />

            <Link href="/" className="font-bold text-inherit">
              پودی گیتار
            </Link>
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
                className={`${linkStyles} flex items-center font-semibold hover:border border-gray-500`}
              >
                <FaBookOpen className="ml-1.5" /> <span>دوره های آموزشی</span>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <Dropdown>
                <DropdownTrigger className={`${linkStyles} cursor-pointer`}>
                  <div className="flex items-center">
                    <HiOutlineChevronDown className="ml-1" /> <span> ارتباط با ما</span>
                  </div>
                </DropdownTrigger>

                <DropdownMenu
                  aria-label="Example with disabled actions"
                  disabledKeys={["edit", "delete"]}
                >
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
            <NavbarItem className="flex">
              <Badge color="danger" content={3} classNames={"hidden"} size="lg">
                <Link href="/cart" className="ml-3">
                  <CartIcon
                    size={30}
                    className="text-blue-100 hover:text-blue-500 transition-all duration-250"
                  />
                </Link>
              </Badge>
            </NavbarItem>

            <NavbarItem>
              <Link href="/auth" className="btn">
                <HiOutlineLogin className="ml-1 h-5 w-5" />
                <span>ورود</span>
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
