import { TabGroup } from "./tab-group";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string; id: string };
}) {
  return (
    <>
      <div className="">
        <div>
          <TabGroup
            path={`/${params.slug}/candidate/${params.id}`}
            items={[
              { text: "Overview" },
              { text: "Applications", slug: "applications" },
            ]}
          />
        </div>
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </>
  );
}
