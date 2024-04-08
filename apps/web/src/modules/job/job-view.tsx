"use client";

import { Tab, TabGroup, TabList } from "@tremor/react";

const JobView = () => {
  return (
    <div>
      <div>
        <TabGroup onIndexChange={() => console.log("change")}>
          <TabList variant="line" defaultValue={"1"} color={"#000"}>
            <Tab value="1">Overview</Tab>
            <Tab value="2">Candidates</Tab>
            <Tab value="3">Configuration</Tab>
            <Tab value="3">Metrics</Tab>
            <Tab value="3">Sharing</Tab>
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
};

export default JobView;
