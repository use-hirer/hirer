export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen w-full bg-zinc-50 flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
