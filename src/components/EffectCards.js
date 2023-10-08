"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
const SwiperSlideStyles = "flex items-center justify-center rounded-xl bg-blue-900";

export default function EffectCardsComponent() {
  return (
    <div className="flex max-md:flex-col max-md:pb-10 max-md:gap-6 items-center justify-center bg-gradient-to-r from-blue-950/70 to-sky-700/50 rounded-xl">
      {/* Picture */}
      <div className="w-[65%] md:w-[35%] max-w-screen-sm relative">
        <div className="aspect-w-4 aspect-h-4 mb-0 max-md:mt-4">
          <Image
            src="/images/poudi-about.png"
            alt="Hero Image"
            width={700}
            height={800}
            className=" z-10"
          />
        </div>
        <div className="absolute -bottom-0 w-full h-48 z-2"></div>
      </div>

      <Swiper
        effect={"cards"}
        // pagination={true}
        navigation={true}
        grabCursor={true}
        modules={[EffectCards, Pagination, Navigation]}
        className="xl:w-[600px] xl:h-[350px] lg:w-[500px] lg:h-[300px] md:w-[350px] md::h-[250px] w-80"
      >
        <SwiperSlide className={SwiperSlideStyles}>
          <div className="xl:py-[70px] xl:px-20 lg:py-10 lg:px-16 md:py-8 px-12 py-10">
            <h5 className="text-2xl max-lg:text-lg font-extrabold mb-6">من کی ام؟</h5>
            <p className="max-lg:text-xs">
              <strong>من پوریا هستم، پودی صدام میکنن،</strong> از سال 84 یادگیری گیتارو شروع
              کردم، از سال 90 تو استودیو تولید موسیقی به عنوان نوازنده و تنظیم کننده فعالیت
              کردم. نوازنده و تنظیم کننده و بند لیدر بند های خواننده های پاپ بودم و الان به
              صورت تخصصی تنظیم موسیقی، مهندسی صدا و نوازندگی استودیویی انجام میدم.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={SwiperSlideStyles}>
          <div className="xl:py-[70px] xl:px-20 lg:py-10 lg:px-16 md:py-8 px-12  py-10">
            <h5 className="text-2xl max-lg:text-lg font-extrabold mb-6">
              چی میتونی ازم یاد بگیری؟
            </h5>
            <p className="max-lg:text-xs">
              تمام تلاش من انتقال درست تمام توانایی هام به تو جَوون هنرمنده ! صدا سازی اصولی
              گیتار الکتریک، نوازندگی گیتار الکتریک از مبتدی تا حرفه ای، تنظیم موسیقی پاپ و
              راک، میکس و مسترینگ، تئوری موسیقی و هارمونی و آهنگسازی. تمام اتفاقاتی که تورو به
              اون رویای موسیقایی توی سرت برسونه.
            </p>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide className={SwiperSlideStyles}>Slide 3</SwiperSlide>
        <SwiperSlide className={SwiperSlideStyles}>Slide 4</SwiperSlide> */}
      </Swiper>
    </div>
  );
}
