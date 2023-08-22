"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TbCategory } from "react-icons/tb";

import CheckBox from "@/common/CheckBox";

export default function ProductsFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(categories);
      router.push(pathname + "?" + createQueryString("category", categories));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname + "?" + createQueryString("category", [...selectedCategories, value])
      );
    }
  };

  return (
    <div className="bg-blue-800/20 p-5 rounded-xl mb-5">
      <div className="font-bold mb-4 flex items-center gap-x-2">
        <TbCategory /> دسته بندی ها
      </div>
      
      <div className="border-b-1 border-slate-600/80 pb-3 mb-5"></div>
      
      <ul className="space-y-4">
        {categories?.map((category) => {
          return (
            <CheckBox
              key={category?._id}
              id={category?._id}
              value={category?.englishTitle}
              name="product-type"
              label={category?.title}
              onChange={categoryHandler}
              checked={selectedCategories.includes(category?.englishTitle)}
            />
          );
        })}
      </ul>
    </div>
  );
}
