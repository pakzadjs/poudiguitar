import CategoryTabs from "./CategoryTabs";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

export default function CategorySidebar({ categories }) {
  return (
    <>
      {/* category Sidebar */}
      <div className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 max-xl:pr-8 xl:pl-8">
        <ProductsFilter categories={categories} />
        <ProductsSort />
      </div>

      {/* Category Tabs */}
      <div className="lg:hidden px-5 col-span-12">
        <CategoryTabs categories={categories} />
      </div>
    </>
  );
}
