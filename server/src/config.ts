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

  // JWT Secret
  secretKey: requireEnv("SECRET_KEY"),

  // Session Secret
  expressSessionSecret: requireEnv("EXPRESS_SESSION_SECRET"),

  // Email Configuration
  resendApiKey: requireEnv("RESEND_API_KEY"),
  resendFromEmail: requireEnv("RESEND_FROM_EMAIL"),

  // Frontend URL
  frontEnd: requireEnv("FRONT_END"),

  // Port
  port: process.env.PORT || "8081",

  // Host
  host: process.env.HOST || "0.0.0.0",

  // Google OAuth
  googleClientId: requireEnv("GOOGLE_CLIENT_ID"),
  googleClientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
  googleRedirectUrl: requireEnv("GOOGLE_REDIRECT_URL"),

  // Facebook OAuth
  facebookAppId: requireEnv("FACEBOOK_APP_ID"),
  facebookAppSecret: requireEnv("FACEBOOK_APP_SECRET"),
  facebookRedirectUrl: requireEnv("FACEBOOK_REDIRECT_URL"),
};

// Function to validate all required config at startup
export function validateConfig(): void {
  // Accessing all properties to trigger validation
  Object.keys(config).forEach(key => {
    (config as any)[key];
  });
}