"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SpinnerComponent from "@/common/Spinner";
import CourseCreationGuide from "./CourseCreationGuide";
import DownloadCreationGuide from "./DownloadCreationGuide";

export default function Products() {
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [downloadsLoading, setDownloadsLoading] = useState(false);

  const pathname = usePathname();

  const coursesLoadingHandler = () => {
    if (pathname !== "/admin/products/courses") {
      setCoursesLoading(true);
    }
  };

  const downloadsLoadingHandler = () => {
    if (pathname !== "/admin/products/downloads") {
      setDownloadsLoading(true);
    }
  };

  useEffect(() => {
    if (pathname == "/admin/products/courses") {
      setCoursesLoading(false);
    }

    if (pathname == "/admin/products/downloads") {
      setDownloadsLoading(false);
    }
  }, [pathname]);

  return (
    <main className="xl:max-w-screen-xl m-auto">
      <h2 className="text-xl font-extrabold mr-1 mb-4">محصولات</h2>

      <div className="z-30 bg-blue-950/50 p-10 rounded-3xl flex flex-col sm:flex-row items-center gap-3">
        {/* Courses */}

        <div className="flex flex-col items-center max-md:mb-5">
          <Link
            href="/admin/products/courses"
            className="btn w-32 flex items-center justify-center mb-3"
            onClick={coursesLoadingHandler}
          >
            {coursesLoading ? (
              <SpinnerComponent color={"default"} size={"sm"} />
            ) : (
              <div>دوره ها</div>
            )}
          </Link>

          <CourseCreationGuide />
        </div>

        {/* Downloads */}
        <div className="">
          <Link
            href="/admin/products/downloads"
            className="btn w-32 flex items-center justify-center mb-3"
            onClick={downloadsLoadingHandler}
          >
            {downloadsLoading ? (
              <SpinnerComponent color={"default"} size={"sm"} />
            ) : (
              <div>دانلود ها</div>
            )}
          </Link>

          <DownloadCreationGuide />
        </div>
      </div>
    </main>
  );
}
