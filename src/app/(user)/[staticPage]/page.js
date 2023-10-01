import { getStaticPageBySlug } from "@/services/staticPagesService";
import { notFound } from "next/navigation";

async function StaticPage({ params }) {
  const { staticPage } = params || {};
  const data = await getStaticPageBySlug(staticPage);

  if (!data?.staticPage) {
    return notFound();
  }

  if (data?.staticPage) {
    return (
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h1 className="font-black text-lg md:text-3xl mb-6 ">{data?.staticPage?.title}</h1>
        <div className="text-sm md:text-base text-blue-100">
          {data?.staticPage?.description}
        </div>
      </div>
    );
  }
}

export default StaticPage;
