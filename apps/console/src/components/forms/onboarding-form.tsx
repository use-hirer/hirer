"use client";

import { AnimatedLogo } from "@console/components/logo";
import StepIndicator from "@console/components/steps-indicator";
import { Button } from "@console/components/ui/button";
import { Form, FormControl, FormField } from "@console/components/ui/form";
import { Input } from "@console/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@console/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  role: z.string().min(1, "Role is required"),
  referral: z.string().min(1, "Referral is required"),
});

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      role: "",
      referral: "",
    },
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setLoading(true);
  };

  const renderStep = () => {
    return (
      <>
        {step === 1 && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <>
                <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
                  <Input
                    autoComplete="off"
                    placeholder="Elon Musk"
                    {...field}
                  />
                </div>
                <>
                  {fieldState.error && (
                    <p className="text-red-500 text-xs font-light mt-1 justify-center w-full flex">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
                <Button
                  className="min-w-[295px] mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  disabled={!form.watch("fullName")}
                  type="button"
                >
                  Next
                </Button>
              </>
            )}
          />
        )}
        {step === 2 && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <>
                <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    autoComplete="off"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Recruiter">Recruiter</SelectItem>
                      <SelectItem value="Hiring_Manager">
                        Hiring Manager
                      </SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="min-w-[295px] mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  disabled={!form.watch("role")}
                  type="button"
                >
                  Next
                </Button>
              </>
            )}
          />
        )}
        {step === 3 && (
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <>
                <div className="bg-white rounded-xl shadow-sm border-zinc-950/5 border p-4 min-w-[300px]">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How did you find us?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Google_Search">
                        Google Search
                      </SelectItem>
                      <SelectItem value="Social_Media">Social Media</SelectItem>
                      <SelectItem value="Word_of_Mouth">
                        Word of Mouth
                      </SelectItem>
                      <SelectItem value="Online_Ad">Online Ad</SelectItem>
                      <SelectItem value="Event_or_Conference">
                        Event or Conference
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="min-w-[295px] mt-4"
                  disabled={!form.watch("referral") || loading}
                  type="submit"
                >
                  {loading ? (
                    <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </>
            )}
          />
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <AnimatedLogo />
          <div className="flex flex-col items-center mb-4">
            <div className="font-light text-sm">
              {step === 1 && "Can you introduce yourself first 👋"}
              {step === 2 && "What is your role? 💼"}
              {step === 3 && "Where did you hear about us? 👂"}
            </div>
          </div>
          {renderStep()}
          <div className="mt-4">
            <StepIndicator currentStep={step} totalSteps={3} />
          </div>
        </form>
      </Form>
    </div>
  );
}
