import { SpinnerGap } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-md font-extrabold animate-spin">
        <SpinnerGap />
      </div>
    </div>
  );
}
