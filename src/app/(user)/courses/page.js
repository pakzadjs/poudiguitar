import queryString from "query-string";

import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySidebar from "./CategorySidebar";

async function Courses({ searchParams }) {
  const { products } = await getProducts(queryString.stringify(searchParams));
  const { categories } = await getCategories();

  return (
    <div className="max-w-5xl m-auto">
      <h1 className="text-xl font-bold mb-6">دوره ها</h1>
      <div className="grid grid-cols-4">
        <CategorySidebar categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {products?.map((product) => {
            return (
              <div key={product?._id} className="col-span-1 rounded-xl shadow-xl p-4">
                <h2 className="font-bold">{product?.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Courses;
