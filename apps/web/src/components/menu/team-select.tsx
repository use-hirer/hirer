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
  CommandSeparator,
} from "@hirer/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@hirer/ui/dialog";
import { Input } from "@hirer/ui/input";
import { Label } from "@hirer/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@hirer/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hirer/ui/select";
import { Skeleton } from "@hirer/ui/skeleton";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
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
    { label: string; value: string }[]
  >([]);
  const [selectedTeam, setSelectedTeam] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const orgs = api.user.getOrgs.useQuery();

  useEffect(() => {
    if (orgs.isSuccess) {
      // setSelectedTeam(groups[0].teams[0]);

      if (orgs.data?.length > 0) {
        const newOrganisations = orgs.data.map((org) => ({
          label: org.name,
          value: org.id,
        }));
        setOrganisations(newOrganisations);

        const matchedTeam = newOrganisations.find(
          (team) => team.label === params.slug
        );

        if (matchedTeam) {
          setSelectedTeam(matchedTeam);
        } else {
          // Set a default team if no match is found
          setSelectedTeam(newOrganisations[0]);
        }
      }
    }
  }, [orgs.data, orgs.data?.length, orgs.isSuccess, params.slug]);

  if (orgs.isLoading) {
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
                src={`https://avatar.vercel.sh/${selectedTeam?.label}.png`}
                alt={selectedTeam?.label}
                className="grayscale"
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
                        src={`https://avatar.vercel.sh/${organisation.value}.png`}
                        alt={organisation.label}
                        className="grayscale"
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
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{" "}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{" "}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
