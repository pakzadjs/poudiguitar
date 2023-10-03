"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@nextui-org/react";
import { TbSearch } from "react-icons/tb";

export default function SearchByProducts({ placeholder }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchParam, setSearchParam] = useState(null);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const searchInputHandler = (e) => {
    const value = e.target.value;
    setSearchParam(value);
  };

  const searchHandler = (e) => {
    const value = searchParam;
    router.replace(`${pathname}?${createQueryString("product", value)}`);
  };

  return (
    <div className="flex items-center">
      <Input
        onChange={searchInputHandler}
        // label="جستجو"
        isClearable
        radius="lg"
        classNames={{
          base: "p-4",
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-blue-200/80",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder={placeholder ? placeholder : "جستجو"}
      />

      <button className="btn rounded-2xl py-[13px] px-5" onClick={searchHandler}>
        <TbSearch />
      </button>
    </div>
  );
}
