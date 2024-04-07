export type UserDataType = {
  onboardingInfo: {
    role: string;
    source: string;
  };
  userOnboarding?: boolean;
  teamOnboarding?: boolean;
};

export type ActivityDataType = {
  type: "JOB_CREATE" | "CANDIDATE_APPLY";
  message: string;
};

export * from "@prisma/client";
