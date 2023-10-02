import Link from "next/link";
import Image from "next/image";

import { MdMusicNote } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";

export default function Hero() {
  return (
    <header className="bg-blue-950/30 px-10 rounded-xl">
      <div className="z-20 flex gap-y-9 flex-col-reverse items-center md:flex-row md:gap-x-5 md:items-center md:justify-between">
        <div className="text-center md:text-right m-10">
          <div className="mb-4 md:mb-4 md:text-base text-xs"></div>

          <h1 className="font-black text-2xl sm:text-[28px] md:text-[35px] lg:text-[45px] leading-relaxed mb-2 md:mb-4">
            گیتار و موزیک رو اصولی و درست یاد بگیر
          </h1>

          <p className="text-xs md:text-lg font-medium text-slate-200 mb-6 md:mb-2">
            ما کنارتون هستیم تا عمیق یاد بگیرید،
            <br />و با بهترین مسیر ممکن به مقصدتون برسید.
          </p>

          <div className="max-w-screen-sm h-0.5 bg-[#BEC1F333] mb-4 md:mb-7"></div>

          <div className="flex items-center gap-2">
            <Link href="/courses" className="">
              <button className="btn gap-1">
                <MdMusicNote size={20}/>
                <span>مشاهده دوره ها</span>
              </button>
            </Link>

            <Link
              rel="noreferrer"
              href="https://www.instagram.com/poudiguitar/"
              target="_blank"
              className=""
            >
              <button className="btn__fifth">
                <BsInstagram />
                <span>اینستاگرام</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="w-[80%] md:w-[45%] max-w-screen-sm relative">
          <div className="aspect-w-4 aspect-h-4 mb-4">
            <Image
              src="/images/poudi-hero.png"
              alt="Hero Image"
              width={700}
              height={800}
              className="object-cover object-center z-10"
            />
          </div>
          <div className="absolute -bottom-0 w-full h-48 z-2"></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
}
