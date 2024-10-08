import "../globals.css";
import Header from "./Header";
import { Providers } from "../Providers";
import { Toaster } from "react-hot-toast";

import vazirFont from "@/constants/localFonts";
import Footer from "@/components/Footer";

export const metadata = {
  title: "پودی گیتار | آموزش موسیقی و گیتار",
  description: "آموزش موسیقی و گیتار",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="enamad" content="715307" />
      </head>
      <body className={`${vazirFont.variable} font-sans main-bg-color`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Toaster />
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
