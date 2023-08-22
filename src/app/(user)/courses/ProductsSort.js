"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";

import RadioInput from "@/common/RadioInput";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدیدترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

export default function ProductsSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = (e) => {
    const value = e.target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  return (
    <div className="bg-blue-800/20 p-5 rounded-xl">
      <div className="font-bold mb-4 flex items-center gap-x-2">
        <TbArrowsSort /> مرتب سازی
      </div>

      <div className="border-b-1 border-slate-600/80 pb-3 mb-5"></div>

      <div className="space-y-4">
        {sortOptions.map((item) => {
          return (
            <RadioInput
              id={item.id}
              key={item.id}
              label={item.label}
              name="product-sort"
              value={item.value}
              checked={sort == item.value}
              onChange={sortHandler}
            />
          );
        })}
      </div>
    </div>
  );
}
