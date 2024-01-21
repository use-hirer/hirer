declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DIRECT_URL: string;
      RESEND_API_KEY: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {};
