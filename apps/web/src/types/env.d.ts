declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      DIRECT_URL: string;
      RESEND_API_KEY: string;
      AUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      TINYBIRD_API_KEY: string;
      KV_URL: string;
      KV_REST_API_URL: string;
      KV_REST_API_TOKEN: string;
      KV_REST_API_READ_ONLY_TOKEN: string;
      TRIGGER_API_KEY: string;
      TRIGGER_API_URL: string;
      NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY: string;
    }
  }
}

export {}
