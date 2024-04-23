import HirerLogo from "@/components/icons/hirer-logo";

export default async function NotFoundOrganisationPage({
  params,
}: {
  params: { domain: string };
}) {
  return (
    <div className="flex items-center justify-center h-[100dvh] flex-col gap-4">
      <HirerLogo width={100} />
      <div className="text-sm">Page Not Found</div>
    </div>
  );
}
