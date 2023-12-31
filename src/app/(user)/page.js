import Link from "next/link";
import { cookies } from "next/headers";
import queryString from "query-string";
import { TbArrowBigLeftFilled } from "react-icons/tb";

import { toStringCookies } from "@/utils/toStringCookies";
import { getCourses } from "@/services/productService";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import EffectCardsComponent from "@/components/EffectCards";

async function Home({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const data = await getCourses(queryString.stringify(searchParams), strCookies);
  const { products } = data || [];

  return (
    <main>
      <div className="container mx-auto mt-6 mb-4">
        <Hero />
      </div>

      <div
        className="container rounded-xl p-3 md:p-8 bg-transparent bg-gradient-to-r from-blue-950/30 to-blue-950/30"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl max-md:text-xl font-black">جدید ترین دوره ها</h2>
            <Link href="/courses" className="btn gap-2">
              <span className="max-md:text-sm">همه دوره ها</span>
              <TbArrowBigLeftFilled size={20} />
            </Link>
          </div>

          <div className="flex-1 overflow-x-hidden rounded-lg overflow-hidden">
            <Slider courses={products} />
          </div>

          <div>
            <EffectCardsComponent />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
