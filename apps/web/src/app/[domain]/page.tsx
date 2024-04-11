import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default async function ListingPage() {
  return (
    <div className="container mt-8 p-2 max-w-[1000px]">
      <div className="flex justify-center">
        <Image src={"/amazon.png"} alt="Amazon Logo" width={100} height={50} />
      </div>
      <div className="bg-white shadow-sm container mt-6 rounded-2xl p-4 max-w-[1000px]">
        <div>Todo ...</div>
      </div>
      <Link
        className="flex justify-center gap-1 items-center pt-6 cursor-pointer"
        href={"https://hirer.so"}
      >
        <div className="text-xs">Powered by</div>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-6 h-6 bg-black text-white rounded-full text-md font-extrabold">
            <Sparkle size={12} />
          </div>
          <div className="font-bold text-xl ml-[2px]">Hirer</div>
        </div>
      </Link>
    </div>
  );
}
