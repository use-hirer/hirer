import Image from "next/image";

export default async function ListingPage() {
  return (
    <>
      <div className="container mt-8 p-2 max-w-[1000px] flex justify-center">
        <Image src={"/amazon.png"} alt="Amazon Logo" width={100} height={50} />
      </div>
      <div className="bg-white shadow-sm h-[calc(100dvh)] container mt-6 rounded-t-2xl p-4 max-w-[1000px]">
        <div>Company Name</div>
      </div>
    </>
  );
}
