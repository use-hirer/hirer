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
      <div className="flex flex-col h-full">
        <div>
          <TabGroup
            path={`/${params.slug}/job/${params.id}`}
            items={[
              { text: "Overview" },
              { text: "Candidates", slug: "candidates" },
              { text: "Configuration", slug: "configuration" },
              { text: "Metrics", slug: "metrics" },
              { text: "Sharing", slug: "sharing" },
            ]}
          />
        </div>
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </>
  );
}
