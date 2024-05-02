"use client";

import JobDeleteCard from "./job-delete-card";

interface SettingsViewProps {}

const GeneralJobConfigurationView: React.FC<SettingsViewProps> = ({}) => {
  return (
    <div className="flex gap-6 flex-col">
      <JobDeleteCard />
    </div>
  );
};

export default GeneralJobConfigurationView;
