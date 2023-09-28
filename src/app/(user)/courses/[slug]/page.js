import { cookies } from "next/headers";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import {
  TbClock,
  TbQuestionMark,
  TbSchool,
  TbCalendarBolt,
  TbCalendarCheck,
  TbCloudDownload,
} from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

import { getCourses, getOneProductBySlug } from "@/services/productService";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toStringCookies } from "@/utils/toStringCookies";
import AddToCart from "./AddToCart";
import {
  toPersianNumbers,
  toPersianNumbersWithColon,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Lessons from "./Lessons";
import FAQ from "./FAQ";
import Like from "@/common/Like";

export const dynamicParams = false;
const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

async function ProductDetail({ params }) {
  const { slug } = params;
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const { product } = await getOneProductBySlug(slug, strCookies);

  return (
    <main className="container mt-10 xl:max-w-screen-xl max-sm:px-4">
      {/* Course description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-14 bg-blue-950/50 rounded-2xl p-3 py-6 lg:p-5 mb-10">
        <div className="col-span-1 lg:col-span-7 xl:col-span-6">
          {/* Title and description summary */}
          <div>
            <h1 className="text-slate-100 font-black text-2xl mb-3">{product?.title}</h1>
            <p className="text-slate-300 text-sm md:text-base leading-7 font-bold md:leading-8 mb-7">
              {product?.descriptionSummary}
            </p>
          </div>

          <div className="flex gap-y-7 mb-8 justify-around">
            <div className="flex flex-col items-center gap-1">
              <TbClock size={70} className="p-4 bg-slate-700/60 rounded-3xl" />
              <h3 className="text-lg font-medium">
                {toPersianNumbersWithColon(product?.tags?.[0])}
              </h3>
            </div>

            <div className="flex flex-col items-center gap-1">
              <LiaChalkboardTeacherSolid
                size={70}
                className="p-4 bg-slate-700/60 rounded-3xl"
              />
              <h3 className="text-lg font-medium">
                {toPersianNumbers(product?.lessonsNumber)} جلسه
              </h3>
            </div>

            <div className="flex flex-col items-center gap-1">
              <BiSupport size={70} className="p-4 bg-slate-700/60 rounded-3xl" />
              <h3 className="font-bold text-[15px] md:text-[16px]">پشتیبانی دائمی</h3>
            </div>
          </div>

          {/* <div className="flex items-start gap-y-2 gap-x-3 flex-col md:flex-row md:items-center flex-wrap text-xs">
            <div>agshs</div>
          </div> */}
        </div>

        {/* Course demo video */}
        <div className="col-span-1 lg:col-span-5 xl:col-span-6 order-1 md:order-2 self-center">
          <div className="">
            <video
              className="rounded-xl w-full h-full"
              preload="none"
              controls
              poster={`${baseUrl}/public/uploads/productImages/${product?.image}`}
            >
              <source
                src={`${baseUrl}/public/uploads/productVideos/${product?.introductionVideo}`}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

      {/* more details and add to cart */}
      <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
        {/* add to cart */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 order-1 lg:order-1 space-y-4">
          <div className="rounded-xl p-3 lg:p-5 bg-blue-950/50">
            {/* Price */}
            <div className="flex md:flex-col md:gap-y-1 items-center justify-between mb-3">
              {/* off price */}
              {product?.discount > 0 && (
                <div className="flex items-center justify-between mb-1 gap-x-1">
                  <div className="text-base text-slate-400 lg:text-xl line-through font-bold">
                    {toPersianNumbersWithComma(product?.price)}
                  </div>
                  <div className="bg-rose-500 rounded-full py-0.5 px-2 text-white text-xs flex justify-center items-center">
                    {toPersianNumbers(`% ${product?.discount}`)}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="font-bold flex-1 flex items-center justify-end">
                <span className="text-3xl text-slate-50 font-black ml-2 lg:text-4xl">
                  {product?.discount > 0
                    ? toPersianNumbersWithComma(product?.offPrice)
                    : toPersianNumbersWithComma(product?.price)}
                </span>
                <span className="text-xs text-gray-400">تومان</span>
              </div>
            </div>

            {/* Add to cart Button */}
            <AddToCart product={product} widthFull={true} />
          </div>
          <div className="rounded-xl p-3 lg:p-5 bg-blue-950/50">
            <div className="bg-blue-900/30 p-3 my-2 rounded-lg">
              <div className="flex items-center">
                <TbCalendarCheck size={20} className="ml-2" /> تاریخ انتشار:
              </div>
              <span>{toLocalDateStringShort(product.createdAt)}</span>

              <div className="flex items-center mt-3">
                <TbCalendarBolt size={20} className="ml-2" /> آخرین بروزرسانی:
              </div>
              <span>{toLocalDateStringShort(product.updatedAt)}</span>
            </div>

            <div className="bg-blue-900/30 p-3 my-2 rounded-lg">
              <div className="flex items-center">
                <TbCloudDownload size={20} className="ml-2" /> روش دریافت:
              </div>
              اسپات پلیر
            </div>
          </div>
          <div className="">
            <Like product={product} styles={"productDetails__like"} />
          </div>
        </div>

        {/* more details */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 order-2 md:order-2 space-y-8">
          {/* more description */}
          <div className="bg-blue-950/50 rounded-xl p-3 lg:p-6">
            <h2 className="text-2xl font-black text-sky-500 mb-5">توضیحات دوره</h2>
            <div className="">
              <p>{product?.description}</p>
              <div></div>
            </div>
          </div>

          {/* Lessons */}
          <div className="relative bg-blue-950/50 rounded-xl p-3 lg:p-6 overflow-hidden">
            <div className="flex gap-1">
              <TbSchool size={28} className="text-yellow-300" />
              <h2 className="text-2xl font-black text-sky-500 mb-5">سرفصل ها</h2>
            </div>
            <Lessons product={product} />
          </div>

          {/* FAQ */}
          <div className="relative bg-blue-950/40 rounded-xl p-3 lg:p-6 overflow-hidden">
            <div className="flex">
              <TbQuestionMark size={30} className="text-yellow-300" />
              <h2 className="text-2xl font-black text-sky-500 mb-5">سوالات متداول</h2>
            </div>
            <FAQ product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
export default ProductDetail;

export async function generateStaticParams() {
  const { products } = await getCourses();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
