import { api } from "@/lib/api/server";
import { validateRequest } from "@/lib/auth";
import { Separator } from "@hirer/ui/separator";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CreateCandidateCard from "./_components/create-candidate-card";
import CreateJobCard from "./_components/create-job-card";
import NoActivityExists from "./_components/no-activity-exists";

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
    <div className="flex items-center gap-2 h-full">
      <div className="w-full flex-1 h-full flex flex-col">
        <div className="font-extrabold text-xl">Activity</div>
        <Separator className="mt-2 mb-4" />
        {activity.data.length > 0 ? (
          <div className="flex flex-col gap-1">
            {Object.entries(groupedActivity).map(([date, items]) => (
              <div key={date}>
                <div className="font-bold">{date}</div>
                <Separator className="mt-2 mb-4" />
                {items.map((item, key) => (
                  <div key={key}>
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
        ) : (
          <NoActivityExists className="flex-1 bg-zinc-50" />
        )}
      </div>
    </div>
  );
}
