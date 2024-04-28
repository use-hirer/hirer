"use client";

import { useSelectedLayoutSegment } from "next/navigation";

const TabGroup: React.FC<{ parallelRoutesKey?: string }> = ({}) => {
  const loginSegment = useSelectedLayoutSegment();
  console.log(loginSegment);

  return <div>tab group</div>;
};

export default TabGroup;
