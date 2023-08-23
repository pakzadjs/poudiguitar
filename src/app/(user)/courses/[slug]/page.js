import { getOneProductBySlug, getProducts } from "@/services/productService";
import AddToCart from "./AddToCart";

export const dynamic = "force-static"; // SSG or {cache : "force-cache"}
export const dynamicParams = false;

async function ProductDetail({ params }) {
  const { slug } = params;
  const { product } = await getOneProductBySlug(slug);

  return (
    <div>
      {product?.title} <AddToCart product={product} />
    </div>
  );
}
export default ProductDetail;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
