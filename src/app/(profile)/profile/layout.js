import "../../globals.css";
import { Toaster } from "react-hot-toast";

import { Providers } from "@/pages/Providers";
import vazirFont from "@/constants/localFonts";
import SideBar from "./SideBar";
import Header from "./Header";

export const metadata = {
  title: "پروفایل کاربر",
  description: "پروفایل کاربر",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning={true} className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />

          <div className="grid grid-cols-12 h-screen bg-gradient-to-tl from-sky-950 from-10% via-blue-950 via-30% to-sky-900 to-90%">
            <div className="col-span-12 bg-slate-800/20 overflow-y-auto p-4 lg:col-span-3 xl:col-span-2 hidden lg:block">
              <SideBar />
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
