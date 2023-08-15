import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="w-full">
      <Image
        src="/images/studio-hero.png"
        alt="Hero Image"
        width={1980}
        height={1320}
        className="w-full absolute left-0 top-0 pointer-events-none z-0"
      />

      <Image
        src="/images/poudi-hero.png"
        alt="Hero Image"
        width={1034}
        height={1320}
        className="w-[52%] absolute left-0 top-0 pointer-events-none z-10 max-sm:top-4"
      />
    </header>
  );
}
