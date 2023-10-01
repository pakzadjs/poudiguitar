import vazirFont from "@/constants/localFonts";
import "../../globals.css";

import { Toaster } from "react-hot-toast";
import { Providers } from "@/pages/Providers";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";

export const metadata = {
  title: "پروفایل ادمین",
  description: "پروفایل ادمین",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning={true} className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />

          <div className="grid grid-cols-12 h-screen main-bg-color">
            <div className="col-span-12 bg-slate-800/20 overflow-y-auto p-4 lg:col-span-3 xl:col-span-2 hidden lg:block">
              <AdminSidebar />
            </div>

            <div className="col-span-12 lg:col-span-9 xl:col-span-10 h-screen flex flex-col">
              <div>
                <Header />
              </div>
              <div className="col-span-4 overflow-y-auto p-4">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
