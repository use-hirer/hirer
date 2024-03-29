"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@hirer/ui/drawer";
import { Bell, Confetti } from "@phosphor-icons/react";
import React from "react";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Bell
        size={20}
        weight="bold"
        className="cursor-pointer"
        type="button"
        onClick={() => setOpen(true)}
      />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="text-center flex items-center flex-col">
            <DrawerTitle>Latest Notifications</DrawerTitle>
            <DrawerDescription>
              View all your teams latest notifications.
            </DrawerDescription>
          </DrawerHeader>
          <div className="pt-10 pb-16 flex items-center justify-center">
            <div className="border bg-green-200/25 border-green-600 text-green-900 p-4 rounded font-bold gap-1 flex items-center">
              No new notifications
              <Confetti />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Notifications;
