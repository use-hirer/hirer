declare namespace PrismaJson {
  type ActivityData = {
    type: "JOB_CREATE" | "CANDIDATE_APPLY";
    message: string;
  };

  type UserData = {
    onboardingInfo: {
      role: string;
      source: string;
    };
  };
}
