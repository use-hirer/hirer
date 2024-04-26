import { api } from "@/lib/api/react";
import { cn } from "@hirer/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@hirer/ui/avatar";
import { Button } from "@hirer/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@hirer/ui/command";
import { Dialog } from "@hirer/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@hirer/ui/popover";
import { Skeleton } from "@hirer/ui/skeleton";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const params = useParams<{ slug: string }>();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [organisations, setOrganisations] = useState<
    { label: string; value: string; avatar: string | null }[]
  >([]);
  const [selectedTeam, setSelectedTeam] = useState<{
    label: string;
    value: string;
    avatar: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const orgs = api.user.getOrgs.useQuery();

  useEffect(() => {
    setLoading(true);
    if (orgs.isSuccess) {
      // setSelectedTeam(groups[0].teams[0]);

      if (orgs.data?.length > 0) {
        const newOrganisations = orgs.data.map((org) => ({
          label: org.name,
          value: org.slug,
          avatar: org.avatar,
        }));
        setOrganisations(newOrganisations);

        const matchedTeam = newOrganisations.find(
          (team) => team.value === params.slug
        );

        if (matchedTeam) {
          setSelectedTeam(matchedTeam);
        } else {
          console.log("not found");
          // Set a default team if no match is found
          setSelectedTeam(newOrganisations[0]);
        }
      }
      setLoading(false);
    }
  }, [orgs.data, orgs.data?.length, orgs.isSuccess, params.slug]);

  if (loading) {
    return <Skeleton className="h-9 w-[225px]" />;
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-full px-3 justify-between bg-white", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={
                  selectedTeam?.avatar ||
                  `https://avatar.vercel.sh/${selectedTeam?.label}.png`
                }
                alt={selectedTeam?.label}
              />
              <AvatarFallback>acme-inc</AvatarFallback>
            </Avatar>
            {selectedTeam?.label}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[225px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup key="organisation" heading="Organisations">
                {organisations.map((organisation) => (
                  <CommandItem
                    key={organisation.value}
                    onSelect={() => {
                      setSelectedTeam(organisation);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={
                          selectedTeam?.avatar ||
                          `https://avatar.vercel.sh/${selectedTeam?.label}.png`
                        }
                        alt={organisation.label}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {organisation.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        organisation.value === organisation.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
