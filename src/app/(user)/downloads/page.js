import { cookies } from "next/headers";
import queryString from "query-string";

import { getDownloadsCategories } from "@/services/categoryService";
import { getDownloadables } from "@/services/productService";
import { toStringCookies } from "@/utils/toStringCookies";
import CategorySidebar from "../courses/CategorySidebar";
import ProductCard from "@/common/ProductCard";

export const dynamic = "force-dynamic"; // eq to {cache :"no-store"} or SSR in pages Dir.

export const metadata = {
  title: "پودی گیتار | دانلود ها",
  description: "آموزش موسیقی و گیتار",
};

async function Downloads({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const productsPromise = getDownloadables(queryString.stringify(searchParams), strCookies);
  const categoryPromise = getDownloadsCategories();

  const [{ products }, { categories }] = await Promise.all([productsPromise, categoryPromise]);

  return (
    <div className="max-w-6xl m-auto max-xl:px-14 max-md:px-0">
      <h1 className="text-xl font-extrabold mb-10 max-md:mr-8">دانلود ها</h1>
      <div className="grid grid-cols-12">
        <CategorySidebar categories={categories} />
        <div className="mt-12 col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 max-xl:px-5">
          <div className="grid grid-cols-12 gap-y-8 sm:gap-x-8 lg:gap-6 mb-10 lg:mb-0">
            {products?.map((product) => {
              return (
                <div className="mb-14 col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Downloads;
