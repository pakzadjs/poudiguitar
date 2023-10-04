import "../globals.css";
import Header from "./Header";
import { Providers } from "../Providers";
import { Toaster } from "react-hot-toast";

import vazirFont from "@/constants/localFonts";
import Footer from "@/components/Footer";
import Head from "next/head";

export const metadata = {
  title: "پودی گیتار | آموزش موسیقی و گیتار",
  description: "آموزش موسیقی و گیتار",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <Head>
        <meta name="enamad" content="715307" />
      </Head>
      <body className={`${vazirFont.variable} font-sans main-bg-color`}>
        <Providers>
          <Toaster />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
