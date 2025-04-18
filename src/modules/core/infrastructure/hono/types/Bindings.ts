export type Bindings = {
  DB: D1Database;
  ENVIRONMENT: "development" | "production" | "test";
  JWT_SECRET: string;
};
