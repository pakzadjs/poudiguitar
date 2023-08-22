import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

export default function CategorySidebar({ categories }) {
  return (
    <div className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 max-xl:pr-8 xl:pl-8">
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}
