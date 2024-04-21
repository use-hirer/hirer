import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import CreateCandidateCard from "@/modules/activity/create-candidate-card";
import CreateJobCard from "@/modules/activity/create-job-card";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Hirer: Activity Log",
};

interface ActivityItem {
  event: string;
  date: string;
  event_data: any;
}

interface GroupedActivity {
  [date: string]: ActivityItem[];
}

export default async function ActivityPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const activity = await api.activity.getActivityByOrgId({
    teamId: params.slug,
  });

  const groupedActivity: GroupedActivity = activity.data.reduce(
    (acc: GroupedActivity, item: ActivityItem) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <div className="font-extrabold text-xl">Activity</div>
        <Separator className="mt-2 mb-4" />
        <div className="flex flex-col gap-1">
          {Object.entries(groupedActivity).map(([date, items]) => (
            <div key={date}>
              <div className="font-bold">{date}</div>
              <Separator className="mt-2 mb-4" />
              {items.map((item, key) => (
                <div key={key} className="mb-2">
                  {item.event === "create_candidate" && (
                    <CreateCandidateCard
                      date={item.date}
                      event_data={item.event_data}
                    />
                  )}
                  {item.event === "create_job" && (
                    <CreateJobCard
                      date={item.date}
                      event_data={item.event_data}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
