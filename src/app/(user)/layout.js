import "../globals.css";
import Header from "./Header";
import { Providers } from "../Providers";
import { Toaster } from "react-hot-toast";

import vazirFont from "@/constants/localFonts";

export const metadata = {
  title: "پودی | آموزش موسیقی و گیتار",
  description: "آموزش موسیقی و گیتار",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Toaster />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
