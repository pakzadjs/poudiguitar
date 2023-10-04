"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard from "@/common/ProductCard";
import useWindowSize from "@/hooks/useWindowSize";

import "swiper/css";
import "swiper/css/navigation";

export default function Slider({ courses }) {
  const { width, height } = useWindowSize();

  return (
    <div className="">
      <Swiper
        spaceBetween={50}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={width < 400 ? 1 : width < 1024 ? 2 : width < 1280 ? 3 : 4}
        navigation={true}
        grabCursor={true}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Navigation]}
        className="mySwiper cursor-grab"
      >
        {courses?.map((course, i) => {
          return (
            <SwiperSlide className="swiper-slide" key={i}>
              <div className="my-20">
                <div className="">
                  <ProductCard product={course} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
