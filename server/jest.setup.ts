process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tellme_test";
process.env.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || "test-clerk-secret";
process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || "test-resend-key";
process.env.RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "test@example.com";
process.env.FRONT_END = process.env.FRONT_END || "http://localhost:3000";
