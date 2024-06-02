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

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);
  return formattedDate.replace(`${day}`, `${day}${daySuffix}`);
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
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
      const date = formatDate(item.date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {}
  );

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="flex items-center gap-2 h-full">
      <div className="w-full flex-1 h-full flex flex-col">
        <div className="font-extrabold text-xl flex items-center gap-2">
          Activity <span className="text-xs font-normal">(Last 30 Days)</span>
        </div>
        <Separator className="mt-2 mb-4" />
        {activity.data.length > 0 ? (
          <div className="flex flex-col gap-1">
            {Object.entries(groupedActivity).map(([date, items]) => (
              <div key={date}>
                <div className="font-bold bg-zinc-50 rounded-md border p-2 text-sm shadow-sm">
                  {date}
                </div>
                {/* <Separator className="mt-2 mb-4" /> */}
                {/* Add a table here */}

                <div className="py-2 rounded-md flex gap-y-1 flex-col">
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
