import Link from "next/link";
import { TbArrowLeftBar } from "react-icons/tb";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center">
      <div className="bg-blue-950/50 p-20 rounded-3xl min-w-xl flex flex-col items-center justify-center gap-3 my-40">
        <h1 className="sm:text-2xl font-bold text-red-600">صفحه موردنظر پیدا نشد</h1>
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-blue-500 transition-all duration-250"
        >
          <p> بازگشت به صفحه اصلی </p>
          <TbArrowLeftBar />
        </Link>
      </div>
    </main>
  );
}
