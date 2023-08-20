"use client";

import { useState } from "react";
import CheckBox from "@/common/CheckBox";

export default function CategorySidebar({ categories }) {
  const [selectedCategories, setSelectedCategories] = useState();

  const categoryHandler = (e) => {};

  return (
    <div className="col-span-1">
      <p className="font-bold mb-4">دسته بندی ها</p>
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
              checked={selectedCategories?.includes(category?.englishTitle)}
            />
          );
        })}
      </ul>
    </div>
  );
}
