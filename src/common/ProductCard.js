"use client";

import Image from "next/image";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";
import { TbArrowLeft } from "react-icons/tb";
import { Button } from "@nextui-org/react";

import {
  toPersianNumbers,
  toPersianNumbersWithColon,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";

export default function ProductCard({ product }) {
  return (
    <div className="bg-blue-950/50 shadow-lg shadow-blue-900/50 rounded-xl relative p-3 flex flex-col h-full hover:shadow-xl hover:shadow-blue-800/40 transition-all duration-300 ease-in-out">
      {/* image */}
      <div className="-mt-14 mb-6">
        <div className="relative shadow-lg rounded-xl shadow-blue-700/30">
          <Link href={`/courses/${product.slug}`}>
            <div className="h-[170px]">
              <Image
                src={product?.imageLink}
                width={100}
                height={50}
                className="object-cover object-center h-full w-full rounded-xl"
              />
            </div>
          </Link>
          <div className="flex items-center w-full justify-between absolute top-0 right-0 p-3">
            {/* Like button*/}
            <button></button>
          </div>
        </div>
      </div>

      {/* detail */}
      <div>
        {/* Title */}
        <Link
          href={`/courses/${product.slug}`}
          className="text-gray-300 text-lg sm:text-lg block hover:text-blue-500 transition-all duration-500 ease-in-out mb-3 font-black"
        >
          {product?.title}
        </Link>

        {/* tags */}
        <div className="flex gap-x-6 items-center mb-3 text-sm">
          {product?.tags?.[0] && (
            <div className="flex items-center gap-x-1 text-gray-400">
              <BiTimeFive size={18} /> {toPersianNumbersWithColon(product?.tags?.[0])}
            </div>
          )}

          {product?.tags?.[1] && (
            <div className="flex items-center gap-x-1 text-green-600">
              {product?.tags?.[1]}
            </div>
          )}
        </div>

        {/* Link */}
        <Link
          href={`/courses/${product.slug}`}
          className="flex items-center gap-x-2 text-sm font-bold text-sky-500 hover:text-sky-400 transition-all duration-300"
        >
          مشاهده اطلاعات دوره <TbArrowLeft />
        </Link>

        <div className="border-b-1 border-slate-600/80 pb-6 mb-4"></div>

        {/* Add to cart btn */}
        <div className="flex justify-between items-center">
          <Button
            color="primary"
            className="shadow-lg shadow-blue-800/70 hover:shadow-blue-700"
          >
            ثبت نام
          </Button>

          {/* Price */}
          <div className="flex flex-col justify-between ">
            {/* Off price */}

            {product?.discount > 0 && (
              <div className="flex items-center justify-between mb-1 gap-x-1">
                <div className="text-gray-400 text-sm line-through">
                  {toPersianNumbersWithComma(product?.price)}
                </div>
                <div className="bg-rose-500 rounded-full py-0.5 px-2 text-white text-xs flex justify-center items-center">
                  {toPersianNumbers(`% ${product?.discount}`)}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="font-bold flex items-center">
              <span className="text-gray-300 font-black ml-2 md:text-xl">
                {product?.discount > 0
                  ? toPersianNumbersWithComma(product?.offPrice)
                  : toPersianNumbersWithComma(product?.price)}
              </span>
              <span className="text-xs text-gray-400">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
