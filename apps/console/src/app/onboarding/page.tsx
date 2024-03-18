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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role is required"),
  referral: z.string().min(1, "Referral is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful submission
        console.log("Form submitted successfully");
      } else {
        // Handle submission error
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleNext = () => {
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
              <Input
                autoComplete="off"
                placeholder="Elon Musk"
                {...register("fullName", { required: "Full name is required" })}
              />
            </div>
            <>
              {errors.fullName && (
                <p className="text-red-500 text-xs font-light mt-1 justify-center w-full flex">
                  {errors.fullName.message}
                </p>
              )}
            </>
          </>
        );
      case 2:
        return (
          <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  autoComplete="off"
                >
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
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
            <Controller
              name="referral"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  autoComplete="off"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google_Search">Google Search</SelectItem>
                    <SelectItem value="Social_Media">Social Media</SelectItem>
                    <SelectItem value="Word_of_Mouth">Word of Mouth</SelectItem>
                    <SelectItem value="Online_Ad">Online Ad</SelectItem>
                    <SelectItem value="Event_or_Conference">
                      Event or Conference
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
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
        {step !== 3 ? (
          <Button
            className="min-w-[295px] mt-4"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default button click action
              handleNext(); // Then call your handleNext function
            }}
            disabled={!isValid}
            type="button"
          >
            Next
          </Button>
        ) : (
          <Button
            className="min-w-[295px] mt-4"
            type="submit"
            disabled={!isValid}
          >
            Submit
          </Button>
        )}
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
      </form>
    </div>
  );
}
