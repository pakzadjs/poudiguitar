import Link from "next/link";
import Image from "next/image";

import { MdMusicNote } from "react-icons/md";
import { BsInstagram } from "react-icons/bs";

export default function Hero() {
  return (
    <header className="bg-blue-950/30 rounded-xl overflow-hidden bg-[url('/images/studio-hero.png')] bg-center bg-cover ">
      <div className="backdrop-blur-sm w-full px-10">
        <div className="z-20 flex gap-y-9 max-md:gap-y-1 flex-col-reverse items-center md:flex-row md:gap-x-5 md:items-center md:justify-between">
          <div className="text-center md:text-right m-10 max-md:m-8">
            <div className="mb-4 md:mb-4 md:text-base text-xs"></div>

            <h1 className="font-black text-2xl sm:text-[26px] md:text-[28px] lg:text-[45px] leading-relaxed mb-2 md:mb-4">
              از یادگیری موسیقی نترس
            </h1>

            <p className="text-xs md:text-md lg:text-[15px] font-medium text-slate-200 mb-6 md:mb-3">
              پودی گیتار اینجاست که دیگه دنبال مدرس موسیقی حضوری و آنلاین نگردی،
              <br />
              همیشه به مدرس و درس ها دسترسی داشته باشی تا مطمئن باشی چیزی برای یادگیری از قلم
              نمیافته.
            </p>

            <div className="max-w-screen-sm h-0.5 bg-[#BEC1F333] mb-4 md:mb-7"></div>

            <div className="flex items-center gap-2 max-md:justify-center">
              <Link href="/courses" className="">
                <button className="btn gap-1 max-sm:w-36">
                  <MdMusicNote size={20} />
                  <span className="max-md:text-sm max-sm:text-xs">مشاهده دوره ها</span>
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
                  <span className="max-md:text-sm">اینستاگرام</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="w-[80%] md:w-[45%] max-w-screen-sm relative pointer-events-none">
            <div className="aspect-w-4 aspect-h-4 mb-0">
              <Image
                src="/images/poudi-hero.png"
                alt="Hero Image"
                width={700}
                height={800}
                className="object-cover object-center z-10"
              />
            </div>
            <div className="absolute -bottom-0 w-full h-48 z-2"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
