"use client";

import { Tab, TabGroup, TabList } from "@tremor/react";
import { useParams, usePathname, useRouter } from "next/navigation";

const JobTabs: React.FC = () => {
  const path = usePathname();
  const { id, slug } = useParams() as { id?: string; slug?: string };
  const pathSegments = path.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const router = useRouter();

  const tabValues = ["/", "/candidates", "/config", "/metrics", "/sharing"];

  const defaultIndex = tabValues.findIndex(
    (value) => value === `/${lastSegment}`
  );

  const handleTabChange = (index: number) => {
    const selectedTabValue = tabValues[index];
    router.push(`/${slug}/job/${id}/${selectedTabValue}`);
  };

  return (
    <TabGroup
      onIndexChange={handleTabChange}
      defaultIndex={defaultIndex !== -1 ? defaultIndex : 0}
    >
      <TabList variant="line" color={"#000"}>
        <Tab value="/">Overview</Tab>
        <Tab value="/candidates">Candidates</Tab>
        <Tab value="/config">Configuration</Tab>
        <Tab value="/metrics">Metrics</Tab>
        <Tab value="/sharing">Sharing</Tab>
      </TabList>
    </TabGroup>
  );
};

export default JobTabs;
