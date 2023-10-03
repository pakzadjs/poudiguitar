import Link from "next/link";

export default function Products() {
  return (
    <main className="xl:max-w-screen-xl m-auto">
      <h2 className="text-xl font-extrabold mr-1 mb-4">محصولات</h2>

      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex flex-col sm:flex-row items-center gap-3">
        {/* Courses */}
        <Link
          href="/admin/products/courses"
          className="btn w-32 flex items-center justify-center"
        >
          دوره ها
        </Link>

        {/* Downloads */}
        <Link
          href="/admin/products/downloads"
          className="btn w-32 flex items-center justify-center"
        >
          دانلود ها
        </Link>
      </div>
    </main>
  );
}
