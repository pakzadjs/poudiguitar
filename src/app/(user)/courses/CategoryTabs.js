"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { TbArrowsSort, TbCategory } from "react-icons/tb";

import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

export default function CategoryTabs({ categories }) {
  return (
    <Tabs
      aria-label="Categories"
      key="Categories"
      color="primary"
      variant="solid"
      classNames={{ base: "flex justify-center md:inline-block", tabList: "bg-blue-50/90" }}
    >
      {/* Filter */}
      <Tab
        key="دسته بندی ها"
        title={
          <div className="flex items-center space-x-2 gap-1">
            <TbCategory />
            <span>دسته بندی ها</span>
          </div>
        }
      >
        <Card className="bg-blue-800/20 text-slate-100">
          <CardBody>
            <ProductsFilter categories={categories} />
          </CardBody>
        </Card>
      </Tab>

      {/* Sort */}
      <Tab
        key="مرتب سازی"
        title={
          <div className="flex items-center space-x-2 gap-1">
            <TbArrowsSort />
            <span>مرتب سازی</span>
          </div>
        }
      >
        <Card className="bg-blue-800/20 text-slate-100">
          <CardBody>
            <ProductsSort />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
