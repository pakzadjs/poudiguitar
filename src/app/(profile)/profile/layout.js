import "../../globals.css";
import { Toaster } from "react-hot-toast";

import { Providers } from "@/pages/Providers";
import vazirFont from "@/constants/localFonts";
import SideBar from "./SideBar";

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
          <div className="grid grid-cols-5 h-screen">
            <div className="col-span-1 bg-gray-800 overflow-y-auto p-4">
              <SideBar />
            </div>
            <div className="col-span-4 overflow-y-auto p-4">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
