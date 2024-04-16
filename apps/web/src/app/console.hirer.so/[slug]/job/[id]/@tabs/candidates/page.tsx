import CandidatesView from "@/modules/candidates/candidates-view";

export default function CandidateTab() {
  return (
    <div className="h-full pt-4 min-h-[500px]">
      <CandidatesView candidates={[]} />
    </div>
  );
}
