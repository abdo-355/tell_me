import { config as dotenvConfig } from "dotenv";

// Load environment variables from .env file if present
dotenvConfig();

// Validation function
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
}

export const config = {
  // Database
  mongoUri: requireEnv("MONGODB_URI"),

  // Clerk
  clerkSecretKey: requireEnv("CLERK_SECRET_KEY"),

  // Email Configuration
  resendApiKey: requireEnv("RESEND_API_KEY"),
  resendFromEmail: requireEnv("RESEND_FROM_EMAIL"),

  // Frontend URL
  frontEnd: requireEnv("FRONT_END"),

  // Port
  port: process.env.PORT || "8081",

  // Host
  host: process.env.HOST || "0.0.0.0",
};

// Function to validate all required config at startup
export function validateConfig(): void {
  // Accessing all properties to trigger validation
  Object.keys(config).forEach(key => {
    (config as any)[key];
  });
}