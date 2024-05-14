"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup, InputProps } from "@copilotkit/react-ui";
import { cn } from "@hirer/ui";
import { Button } from "@hirer/ui/button";
import { Input } from "@hirer/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@hirer/ui/tooltip";
import { Chat, PaperPlaneTilt, X } from "@phosphor-icons/react";
import React, { useState } from "react";
import HirerLogo from "./icons/hirer-logo";

interface ChatSidebarProps {}

const ChatSidebar: React.FC<ChatSidebarProps> = () => {
  return (
    <div>
      <CopilotKit runtimeUrl="/api/ai/chat">
        <CopilotPopup
          Button={({ setOpen, open }) => (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    className="h-14 w-14 bg-black rounded-full flex items-center justify-center shadow-md cursor-pointer"
                    onClick={() => setOpen(!open)}
                  >
                    <Chat color="white" size={24} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Hirer AI ⚡️</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          Header={({ setOpen }) => (
            <div className="rounded-none bg-white h-[50px] flex items-center justify-center md:rounded-t-lg border-b">
              <HirerLogo width={50} height={40} />
              <Button
                className="absolute right-4"
                variant={"ghost"}
                size="icon"
                onClick={() => {
                  console.log("clicked");
                  setOpen(false);
                }}
              >
                <X size={16} />
              </Button>
            </div>
          )}
          Input={(params) => <InputField {...params} />}
          Window={({ open, children }) => (
            <div
              className={cn([
                "fixed inset-0 origin-bottom flex flex-col",
                open ? "flex" : "hidden",
                "md:origin-bottom-right md:bottom-20 md:right-4 md:top-auto md:left-auto md:fixed md:mb-2 md:w-[400px] md:min-h-[200px] md:h-[600px] md:max-h-[calc(100vh_-_6rem)] md:bg-white md:border md:rounded-lg md:shadow-md md:flex-col",
              ])}
            >
              {children}
            </div>
          )}
        />
      </CopilotKit>
    </div>
  );
};

export default ChatSidebar;

const InputField: React.FC<InputProps> = ({ inProgress, onSend }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !inProgress) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="border-t flex p-2 gap-2 bg-white">
      <Input
        className="border"
        disabled={inProgress}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        disabled={inProgress || !input || input.trim().length === 0}
        className="flex gap-2"
        onClick={() => {
          onSend(input);
          setInput("");
        }}
      >
        Send
        <PaperPlaneTilt size={12} />
      </Button>
    </div>
  );
};
