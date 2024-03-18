"use client";

import { Button } from "@console/components/ui/button";
import { Input } from "@console/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@console/components/ui/select";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { useState } from "react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [referral, setReferral] = useState("");

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
            <Input
              placeholder="Elon Musk"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="CTO">CTO</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
            <Input
              placeholder="Where did you hear about us?"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        className="flex items-center data-[collapsed=true]:justify-center select-none cursor-pointer my-4"
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-md font-extrabold">
          <Sparkle />
        </div>
        <div className="font-bold text-2xl ml-1">Hirer</div>
      </motion.div>
      <div className="flex flex-col items-center mb-4">
        <div className="font-light text-sm">
          {step === 1 && "Can you introduce yourself first 👋"}
          {step === 2 && "What is your role? 💼"}
          {step === 3 && "Where did you hear about us? 👂"}
        </div>
      </div>
      {renderStep()}
      <Button
        className="min-w-[295px] mt-4"
        onClick={handleNext}
        disabled={step === 3}
      >
        {step === 3 ? "Submit" : "Next"}
      </Button>
      <div className="flex gap-1 mt-4">
        <div
          className={`h-2 w-2 rounded-[50%] ${
            step === 1 ? "bg-black" : "bg-black/10"
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-[50%] ${
            step === 2 ? "bg-black" : "bg-black/10"
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-[50%] ${
            step === 3 ? "bg-black" : "bg-black/10"
          }`}
        ></div>
      </div>
    </>
  );
}
