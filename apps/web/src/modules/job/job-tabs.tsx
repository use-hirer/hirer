"use client";

import { Tab, TabGroup, TabList } from "@tremor/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const JobTabs: React.FC = () => {
  const [index, setIndex] = useState(0);

  const path = usePathname();
  const { id, slug } = useParams() as { id?: string; slug?: string };
  const pathSegments = path.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const router = useRouter();

  const tabValues = ["/", "/candidates", "/config", "/metrics", "/sharing"];

  useEffect(() => {
    const defaultIndex = tabValues.findIndex(
      (value) => value === `/${lastSegment}`
    );

    if (defaultIndex !== index) {
      setIndex(defaultIndex);
    }
  }, [index, lastSegment, tabValues]);

  const defaultIndex = tabValues.findIndex(
    (value) => value === `/${lastSegment}`
  );

  const handleTabChange = (index: number) => {
    const selectedTabValue = tabValues[index];
    router.push(`/${slug}/job/${id}/${selectedTabValue}`);
  };

  return (
    <>
      <div>
        <TabGroup defaultIndex={index}>
          <TabList variant="line" color={"#000"}>
            <Tab
              value="/"
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(0);
              }}
            >
              Overview
            </Tab>
            <Tab
              value="/candidates"
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(1);
              }}
            >
              Candidates
            </Tab>
            <Tab
              value="/config"
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(2);
              }}
            >
              Configuration
            </Tab>
            <Tab
              value="/metrics"
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(3);
              }}
            >
              Metrics
            </Tab>
            <Tab
              value="/sharing"
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(4);
              }}
            >
              Sharing
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div className="my-4">
        <div className=""></div>
      </div>
    </>
  );
};

export default JobTabs;
