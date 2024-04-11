import { Separator } from "@hirer/ui/separator";
import { Tab } from "./tabs";

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
  parallelRoutesKey?: string;
};

export const TabGroup = ({
  path,
  parallelRoutesKey,
  items,
}: {
  path: string;
  parallelRoutesKey?: string;
  items: Item[];
}) => {
  return (
    <>
      <div className="flex gap-4">
        {items.map((item) => (
          <Tab
            key={path + item.slug}
            item={item}
            path={path}
            parallelRoutesKey={parallelRoutesKey}
          />
        ))}
      </div>
      <Separator className="-mt-[1px]" />
    </>
  );
};
