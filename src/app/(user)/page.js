import Image from "next/image";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <main className="">
      {/* <Image
        src="/images/studio-hero.png"
        alt="Hero Image"
        width={800}
        height={700}
        className="absolute left-0 top-0 hidden md:block z-0"
      /> */}

      <div className="container mx-auto mt-6">
        <Hero />
      </div>

      <div className="">
        <Slider />
      </div>
    </main>
  );
}
