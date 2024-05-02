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
            path={`/${params.slug}/job/${params.id}`}
            items={[
              { text: "Overview" },
              { text: "Candidates", slug: "candidates" },
              { text: "Metrics", slug: "metrics" },
              { text: "Sharing", slug: "sharing" },
              { text: "Settings", slug: "settings" },
            ]}
          />
        </div>
        <div className="flex-grow overflow-auto">{children}</div>
      </div>
    </>
  );
}
