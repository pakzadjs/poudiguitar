import "./globals.css";
import Header from "./Header";
import { Providers } from "./Providers";

import vazirFont from "@/constants/localFonts";

export const metadata = {
  title: "پودی",
  description: "آموزش موسیقی و گیتار",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
