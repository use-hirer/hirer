import JobTabs from "@/modules/job/job-tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JobTabs />
      {children}
    </>
  );
}
