"use client";

import Link from "next/link";
import Script from "next/script";

import { BsInstagram, BsYoutube, BsTelegram } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import Zarinpal from "./Zarinpal";

export default function Footer() {
  return (
    <footer className="py-6 md:py-8 text-slate-300 mt-10 bg-slate-400/30 px-4 rounded-t-3xl">
      <div className="grid gap-10 md:gap-14 grid-cols-5 grid-row-2 container md:max-w-screen-xl mx-auto px-3 lg:px-20">
        <div className="col-span-5 md:col-span-2 flex flex-col justify-start">
          <div>
            <h2 className="font-bold text-xs sm:text-sm mb-4 text-white">
              لورم ایپسوم با تولید سادگی نامفهوم از صنعت چاپ <strong>متن ساختگی</strong>
            </h2>

            <div className="sm:leading-7 text-xs sm:text-sm leading-5">
              <span className="text-white">
                <strong className="font-bold">پوریا احمدی هستم، موزیسین </strong>و مدیر وبسایت
                آموزش گیتار و موزیکِ پودی گیتار.
              </span>

              <p className="leading-5 md:leading-7">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطان امید داشت
                که تمام و دشواری موجود در ارائه راهکارها، و جوابگوی سوالات پیوسته اهل دنیای
                موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <ul className="flex  justify-between items-center w-full">
              {/* Instagram */}
              <li className="block">
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/poudiguitar/"
                  target="_blank"
                >
                  <BsInstagram
                    size={26}
                    className="hover:text-rose-500 transition-all duration-250"
                  />
                </a>
              </li>

              {/* Youtube */}
              <li className="block">
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/poudiguitar/"
                  target="_blank"
                >
                  <BsYoutube
                    size={26}
                    className="hover:text-red-500 transition-all duration-250"
                  />
                </a>
              </li>

              {/* Telegram */}
              <li className="block">
                <a rel="noreferrer" href="https://t.me/poudisupport" target="_blank">
                  <BsTelegram
                    size={26}
                    className="hover:text-sky-500 transition-all duration-250"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="col-span-5 md:col-span-1">div</div> */}

        <div className="col-span-5 md:col-span-2 md:mr-10">
          <h3 className="mb-4 font-bold text-white">بخش های سایت</h3>

          <ul>
            <li className="footer__list">
              <Link href="/courses">دوره های آموزشی</Link>
            </li>

            <li className="footer__list">
              <Link href="/downloads">دانلود ها</Link>
            </li>

            <li className="footer__list">
              <Link href="/about">درباره ما</Link>
            </li>
          </ul>
        </div>

        {/* Zarinpal */}
        <div className="col-span-5 md:col-span-1">
          <h3 className="mb-4 font-bold text-white">پرداخت امن زرین پال</h3>

          <div className="border inline-block border-slate-500 p-3 rounded-lg transition-all duration-250 hover:bg-blue-950/50">
            <Zarinpal />
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-5 flex items-center m-auto gap-3">
          <p className="text-center tex-xs">© تمامی حقوق برای پودی گیتار محفوظ است.</p>

          <a rel="noreferrer" href="https://github.com/pakzadjs" target="_blank">
            <FaGithub size={25} className="hover:text-white transition-all duration-250" />
          </a>
        </div>
      </div>
    </footer>
  );
}
