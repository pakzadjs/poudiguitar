"use client";

import Image from "next/image";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";
import { TbArrowLeft, TbUsers } from "react-icons/tb";
import { Button } from "@nextui-org/react";

import {
  toPersianNumbers,
  toPersianNumbersWithColon,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import AddToCart from "@/pages/(user)/courses/[slug]/AddToCart";
import Like from "./Like";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

export default function ProductCard({ product }) {
  return (
    <div className="bg-blue-950/50 shadow-lg shadow-blue-900/50 rounded-xl relative p-3 flex flex-col h-full hover:shadow-xl hover:shadow-blue-800/40 transition-all duration-300 ease-in-out">
      {/* image */}
      <div className="-mt-14 mb-6">
        <div className="relative shadow-lg rounded-xl shadow-blue-700/30">
          {product?.type == "course" ? (
            <Link href={`/courses/${product?.slug}`}>
              <div className="pointer-events-none">
                {product?.image ? (
                  <Image
                    src={`${baseUrl}/public/uploads/productImages/${product?.image}`}
                    width={300}
                    height={100}
                    alt={product?.slug}
                    className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                  />
                ) : (
                  <Image
                    src="/images/no-image.jpg"
                    width={300}
                    height={100}
                    alt={product?.slug}
                    className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                  />
                )}
              </div>
            </Link>
          ) : (
            <div className="pointer-events-none">
              {product?.image ? (
                <Image
                  src={`${baseUrl}/public/uploads/productImages/${product?.image}`}
                  width={300}
                  height={100}
                  alt={product?.slug}
                  className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                />
              ) : (
                <Image
                  src="/images/no-image.jpg"
                  width={300}
                  height={100}
                  alt={product?.slug}
                  className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                />
              )}
            </div>
          )}

          {/* Like button*/}
          <div className="flex items-center w-full justify-between absolute top-0 right-0 p-3">
            <Like
              product={product}
              styles={
                "text-rose-600 hover:text-rose-400 transition-all duration-250 bg-slate-100 px-1 rounded-md"
              }
              size={20}
            />

            <span className="bg-slate-100/90 px-1 rounded-md flex items-center text-slate-900 cursor-default">
              <TbUsers size={19} />
              <span className="text-sm mr-1 font-bold">{toPersianNumbers(1928)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* detail */}
      <div>
        {/* Title */}
        {product?.type == "course" ? (
          <Link
            href={`/courses/${product?.slug}`}
            className="text-gray-300 text-lg sm:text-lg block hover:text-blue-500 transition-all duration-500 ease-in-out mb-3 font-black"
          >
            {product?.title}
          </Link>
        ) : (
          <div className="text-gray-300 text-lg sm:text-lg block hover:text-blue-500 transition-all duration-500 ease-in-out mb-3 font-black">
            {product?.title}
          </div>
        )}

        {/* tags */}
        <div className="flex gap-x-6 items-center mb-3 text-sm">
          {product?.tags?.[0] && (
            <div className="flex items-center gap-x-1 text-gray-400">
              <BiTimeFive size={18} /> {toPersianNumbersWithColon(product?.tags?.[0])}
            </div>
          )}

          {product?.tags?.[1] && (
            <div className="flex items-center gap-x-1 text-green-600">
              {toPersianNumbers(product?.tags?.[1])}
            </div>
          )}
        </div>

        {/* Link */}
        {product?.type == "course" && (
          <Link
            href={`/courses/${product?.slug}`}
            className="flex items-center gap-x-2 text-sm font-bold text-sky-500 hover:text-sky-400 transition-all duration-300"
          >
            مشاهده اطلاعات دوره <TbArrowLeft />
          </Link>
        )}

        {/* downloadable description */}
        {product?.type == "downloadable" && (
          <p className="flex items-center gap-x-2 text-sm font-bold text-sky-500 hover:text-sky-400 transition-all duration-300">
            {product?.descriptionSummary}
          </p>
        )}

        <div className="border-b-1 border-slate-600/80 pb-6 mb-4"></div>

        {/* Add to cart & download button */}
        <div className="flex justify-between items-center">
          {product?.type == "course" ? (
            <AddToCart product={product} />
          ) : (
            <a
              target="_blank"
              href={`${baseUrl}/public/uploads/productFiles/${product?.file}`}
            >
              <Button color="primary" className={`btn`}>
                دانلود
              </Button>
            </a>
          )}

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
            {product?.price !== 0 && (
              <div className="font-bold flex items-center">
                <span className="text-gray-300 font-black ml-2 md:text-xl">
                  {product?.discount > 0
                    ? toPersianNumbersWithComma(product?.offPrice)
                    : toPersianNumbersWithComma(product?.price)}
                </span>
                <span className="text-xs text-gray-400">تومان</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
